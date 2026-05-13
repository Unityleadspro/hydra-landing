export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/health') {
      return json({ ok: true, service: 'unity-leads-pro-redirect-tracker', ts: new Date().toISOString() });
    }

    if (url.pathname !== '/go') {
      return json({ error: 'not_found', usage: '/go?offer=offer_key&utm_source=source' }, 404);
    }

    const offerKey = clean(url.searchParams.get('offer'));
    const source = clean(url.searchParams.get('utm_source') || 'direct');
    const campaign = clean(url.searchParams.get('utm_campaign') || 'default');

    if (!offerKey) return json({ error: 'missing_offer' }, 400);

    const target = await getOfferTarget(env, offerKey);
    if (!target) return json({ error: 'unknown_offer', offer: offerKey }, 404);

    const event = {
      id: crypto.randomUUID(),
      offer: offerKey,
      source,
      campaign,
      ip_hash: await sha256(request.headers.get('CF-Connecting-IP') || ''),
      user_agent: request.headers.get('User-Agent') || '',
      referer: request.headers.get('Referer') || '',
      country: request.cf?.country || '',
      ts: new Date().toISOString()
    };

    ctx.waitUntil(recordClick(env, event));
    ctx.waitUntil(sendTelegram(env, `Unity Leads Pro click: ${offerKey} from ${source}/${campaign}`));

    return Response.redirect(target, 302);
  }
};

function clean(value) {
  return String(value || '').trim().replace(/[^a-zA-Z0-9_.:-]/g, '').slice(0, 120);
}

async function getOfferTarget(env, offerKey) {
  // Preferred: Cloudflare KV binding named OFFERS, where key = offer slug and value = destination URL.
  if (env.OFFERS && typeof env.OFFERS.get === 'function') {
    const fromKv = await env.OFFERS.get(offerKey);
    if (fromKv) return fromKv;
  }

  // Fallback environment variable format:
  // OFFER_MAP={"blueprint":"https://buy.stripe.com/...","teleflora":"https://affiliate-link/..."}
  if (env.OFFER_MAP) {
    try {
      const map = JSON.parse(env.OFFER_MAP);
      return map[offerKey] || null;
    } catch (_) {
      return null;
    }
  }

  return null;
}

async function recordClick(env, event) {
  // Optional Cloudflare D1 binding named DB.
  if (env.DB && typeof env.DB.prepare === 'function') {
    await env.DB.prepare(
      'INSERT INTO clicks (id, offer, source, campaign, ip_hash, user_agent, referer, country, ts) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(event.id, event.offer, event.source, event.campaign, event.ip_hash, event.user_agent, event.referer, event.country, event.ts).run();
  }

  // Optional Logpush/webhook endpoint.
  if (env.CLICK_WEBHOOK_URL) {
    await fetch(env.CLICK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(event)
    });
  }
}

async function sendTelegram(env, text) {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return;
  const endpoint = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;
  await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text })
  });
}

async function sha256(input) {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('');
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' }
  });
}

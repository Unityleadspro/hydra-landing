export default {
  async fetch(request, env) {
    if (request.method !== 'POST') {
      return new Response('Unity Leads Pro Telegram webhook is online.', { status: 200 });
    }

    const update = await request.json().catch(() => null);
    if (!update) return json({ ok: false, error: 'invalid_json' }, 400);

    const message = update.message || update.edited_message || null;
    const chatId = message?.chat?.id;
    const text = String(message?.text || '').trim();

    if (!chatId) return json({ ok: true, ignored: true });

    if (text === '/start') {
      await reply(env, chatId, 'Unity Leads Pro bot connected. Use /status, /offers, /stripe, or /help.');
    } else if (text === '/status') {
      await reply(env, chatId, 'Status: Base44 app mapped, GitHub funnel repo initialized, Stripe products mapped. Missing: domain, final tracking links, production webhook secrets.');
    } else if (text === '/offers') {
      await reply(env, chatId, 'Approved Base44 offers: Framery Eyewear, Science and Nature, Mowrator, Ask a Lawyer, Air Doctor, Cashably, Arcade.Online, Teleflora. Tracking links still need to be inserted.');
    } else if (text === '/stripe') {
      await reply(env, chatId, 'Stripe products mapped: $27 Blueprint, $47 Toolkit, $97 Coaching Session, $60 Coaching. Add payment links to landing page when ready.');
    } else {
      await reply(env, chatId, 'Commands: /status /offers /stripe /help');
    }

    return json({ ok: true });
  }
};

async function reply(env, chatId, text) {
  if (!env.TELEGRAM_BOT_TOKEN) return;
  await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text })
  });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' }
  });
}

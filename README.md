# Unity Leads Pro / Hydra Landing System

This repository is the public launch/funnel layer for Unity Leads Pro, with Hydra treated as the internal automation engine.

## Current verified connected assets

- Base44 app: `Unity` (`69bbfdf5ab3f450f3e3db28a`)
- Stripe account display name: `Unityleadspro`
- Stripe products already present:
  - AI Affiliate Blueprint 2026 — $27
  - Passive Income Automation Toolkit — $47
  - AI Monetization Coaching Session — $97
  - Coaching — $60
- GitHub owner: `Unityleadspro`
- Primary repo target: `Unityleadspro/hydra-landing`

## Current build purpose

This repo provides:

1. A public static landing page.
2. A Cloudflare Worker redirect/tracking layer.
3. A normalized affiliate/service offer registry.
4. Stripe product/price mapping.
5. Telegram webhook template for status alerts.
6. Environment template without secrets.
7. Deployment checklist.

## Important status

The repo intentionally does **not** contain live secrets, tokens, API keys, Telegram bot tokens, MaxBounty API credentials, or private account credentials.

Still required before full live automation:

- Confirm custom domain ownership.
- Add real MaxBounty tracking links for approved offers.
- Set Telegram bot token locally or in secure platform secrets.
- Deploy Worker and landing page to Cloudflare/GitHub Pages/Replit/Base44.
- Connect the public frontend to Stripe payment links.
- Replace any unverified income claims in content with substantiated claims or neutral educational copy.

## Recommended public brand/domain

- Public brand: `Unity Leads Pro`
- Internal engine: `Hydra`
- Preferred brand domain if available/owned: `UnityLeadsPro.com`
- Candidate remembered from prior context: `hydra.my` — not yet proven owned.

## File map

```text
index.html                         Public landing page
config/offers.json                 Offer registry
config/stripe-products.json        Stripe product/price map
workers/redirect-tracker.js        Cloudflare Worker redirect and click tracker
telegram/webhook-template.js       Telegram webhook/status relay template
.env.example                       Required environment variables without secrets
docs/DEPLOYMENT_CHECKLIST.md       Step-by-step deployment checklist
```

## Operating rule

Do not commit secrets. Put tokens/API keys only in Cloudflare Worker secrets, Replit secrets, local `.env`, or the relevant platform's secure settings.

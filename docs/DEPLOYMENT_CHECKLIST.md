# Deployment Checklist

## 1. Confirm domain

Search Gmail and registrar accounts for actual proof of ownership.

Current Gmail evidence:

- Wix account activity exists.
- Wix sent a promotional email to claim a free domain.
- No confirmed registrar receipt or registered-domain proof has been found yet.

## 2. Create Stripe payment links

Existing Stripe price IDs:

| Product | Price ID | Amount |
|---|---|---:|
| AI Affiliate Blueprint 2026 | `price_1TIbLQKOK7HdwghXZf1yltws` | $27 |
| Passive Income Automation Toolkit | `price_1TIbLQKOK7HdwghXlzB0MBJx` | $47 |
| AI Monetization Coaching Session | `price_1TIbLRKOK7HdwghXl0JnLo9d` | $97 |
| Coaching | `price_1TGY7IKOK7HdwghX8Ir57HXd` | $60 |

After creating links, place only public checkout URLs into environment configuration.

## 3. Retrieve MaxBounty approved tracking links

Base44 lists these as approved or active but missing tracking URLs:

- Framery Eyewear
- Science and Nature
- Mowrator
- Ask a Lawyer On Call
- Air Doctor
- Cashably
- Arcade.Online
- Teleflora

Add those as environment variables or KV entries only after confirming traffic rules.

## 4. Deploy static site

Options:

1. GitHub Pages from this repository.
2. Cloudflare Pages connected to this repository.
3. Base44 public page if preferred.
4. Replit app if an interactive app shell is needed.

Cloudflare Pages is preferred if the Worker also handles tracking redirects.

## 5. Deploy Worker redirect tracker

Use `workers/redirect-tracker.js`.

Recommended secure bindings:

- `OFFERS` KV namespace for offer redirects.
- `DB` D1 database for click logging.
- `TELEGRAM_BOT_TOKEN` stored only as a platform secret.
- `TELEGRAM_CHAT_ID` stored only as a platform secret.
- `CLICK_WEBHOOK_URL` optional.

Minimum working setup:

- Set an offer map with at least one public Stripe checkout URL.
- Deploy Worker.
- Test the health endpoint.
- Test one redirect route.

## 6. Connect Telegram

Use `telegram/webhook-template.js` as the starting Worker for Telegram bot commands.

Never commit bot tokens, account passwords, API keys, recovery codes, or private session cookies.

## 7. Clean content claims

Base44 contains content drafts and published records with income claims. Do not publish or scale these unless the claims are verified.

Safer framing:

- Replace direct personal-income claims with educational or structural language.
- Replace unsupported “paid me” phrasing with neutral offer-analysis language.
- Add affiliate disclosure to all monetized content.

## 8. Launch order

1. Confirm domain.
2. Create Stripe payment links.
3. Add first Stripe checkout redirect to Worker.
4. Publish landing page.
5. Set Telegram alerts using secure platform secrets.
6. Add MaxBounty tracking links after approval and traffic-compliance checks.
7. Rewrite and publish compliant content.
8. Start lead generation with compliant outreach and opt-in follow-up only.

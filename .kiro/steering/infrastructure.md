---
inclusion: auto
---

# Gamefluence Infrastructure Context

## Owner
- **Name:** Joel Kirk
- **Company:** Gamefluence Pty Ltd (ACN: 696 199 461)
- **Address:** 66 Victoria Street, Lewisham, NSW 2049, Australia
- **Admin Email:** admin@gamefluence.com.au
- **Personal Gmail:** joelamoskirk@gmail.com

## Domains (Squarespace)
- **gamefluence.com.au** — Primary business domain, renews Oct 12, 2028
- **gamefluenceai.au** — Renews Jul 24, 2028
- **gamefluenceai.com** — Renews Jul 24, 2028 (currently aliased in Vercel as production URL)
- **mobileyesmarketing.com** — Separate domain, renews Sep 23, 2026
- All managed via Squarespace Domains dashboard
- DNS records for Vercel are in Squarespace DNS settings

## Google Workspace
- **Plan:** Business Plus (direct with Google, NOT through Squarespace reseller)
- **Domain:** gamefluence.com.au
- **Billing:** AUD, Flexible plan, Payment account 6259-3636-4274-2628
- **Users:** admin@gamefluence.com.au, joel@gamefluence.com.au
- **Previous issue (RESOLVED):** Had dual Workspace accounts (Squarespace reseller + direct Google). Squarespace one cancelled Apr 21, 2026. Payments profile was incorrectly set to US — changed to AU by Google Support.

## Hosting (Vercel)
- **Account:** joelamoskirk-5258s-projects
- **Project:** gamefluence
- **Production URL:** https://gamefluenceai.com
- **Framework:** Next.js 14 (App Router)
- **Plan:** Hobby (free tier — sufficient for current traffic)
- **Deployment:** Via CLI (`vercel --prod --yes`)
- **Note:** gamefluence.com.au domain needs to be reassigned in Vercel dashboard (stuck on old/deleted project)

## Environment Variables (Vercel Production)
- NEXT_PUBLIC_APP_URL: https://gamefluence.com.au
- NEXT_PUBLIC_APP_NAME: Gamefluence
- FOUNDER_USERNAME: (set, server-side only)
- FOUNDER_PASSWORD: (set, server-side only)
- FOUNDER_MASTER_KEY: (set, server-side only)

## Key Decisions
- Vercel for hosting (CLI-managed, no dashboard babysitting)
- Squarespace for domain registration only (no website built there)
- Google Workspace direct (no reseller) for email
- Stripe for payments (MCP integration)
- No database yet — static/client-side data

## Email System (Resend)
- **Provider:** Resend (resend.com)
- **Plan:** Free tier (3,000 emails/month, 100/day)
- **Paid tier:** $20/month Pro at 100+ leads/day
- **API routes:** /api/leads (creator signup), /api/contact (contact form)
- **Sends to:** admin@gamefluence.com.au
- **From address:** admin@gamefluence.com.au (after domain verification) or onboarding@resend.dev (test mode)
- **Env var:** RESEND_API_KEY, RESEND_FROM_EMAIL

## Deployment Commands
```bash
vercel --prod --yes    # Deploy to production
vercel env ls          # List environment variables
npm run build          # Local build check before deploy
```

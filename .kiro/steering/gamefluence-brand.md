---
inclusion: auto
---

# Gamefluence Brand Steering — v1.0

Read before every action in this project.

NEVER ask for clarification on anything in the spec files.
NEVER use placeholder text anywhere.
NEVER mention Mobileyes on this site (not even in comments).
Proceed with best judgment. Run npm run build after changes.

## Stack
Next.js 14 App Router + TypeScript + Tailwind CSS + Space Grotesk

## Brand Rules (enforce always)
- Icon: GFIcon component — live pulse, purple rings, WHITE play arrow
- Container: #1A0A2E (purple-tinted dark) — not #0D0D0D for icon container
- Wordmark on dark: WHITE #FFFFFF — never gradient text on dark
- Wordmark on light: gradient #9333EA → #EC4899
- No green (#1DB954) anywhere — zero tolerance
- Progress bars: bg-gradient-to-r from-[#7C3AED] to-[#EC4899]
- LIVE badge: bg-[#2D1B69] text-[#C4B5FD] border-[#4C1D95]
- Gradient button: hero CTAs only — one per screen max
- Background: #0D0D0D primary, #161616 surface
- Font: Space Grotesk (display 800/-1px, nav 700/-0.5px, body 400/default)

## 5-Token Colour System (complete — no additions)
- Brand gradient: #9333EA → #EC4899 (logo on light, progress bars, hero gradient CTA)
- Brand purple: #A855F7 (badges, active states, tagline accent)
- Brand pink: #EC4899 (gradient end, hover accents)
- Dark background: #0D0D0D (all surfaces, nav, modals, hero)
- Dark surface: #161616 (cards, inputs, panels, table rows)

## Button System
- Primary: white border, white text on dark
- Ghost: text only, hover to white
- Gradient: bg-gradient-to-r from-[#9333EA] to-[#EC4899] — HERO ONLY, one per screen
- Muted: bg-[#161616] text-gray-500

## Email
- From address: admin@gamefluence.com.au (via Resend)
- Resend API key: re_CzaXVhLs_MfgQV9qxS3UAEXAfBF92duFQ
- Never use admin@mobileyes.live from this codebase

## Verification (run before committing)
- npm run build — zero errors
- No green anywhere in public-facing UI
- No Mobileyes references in code or comments

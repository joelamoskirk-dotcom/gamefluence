# Gamefluence — Next Session Brief

Paste this into a fresh Kiro session to pick up where we left off.

---

## Project Context
- **Repo:** Gamefluence (Next.js 14, React 18, Tailwind, TypeScript)
- **Live site:** https://gamefluence.com.au
- **Vercel deploy:** auto-deploys from `main` branch on GitHub (joelamoskirk-dotcom/gamefluence)
- **Founder login:** /founder → username: `founder`, password: `GamefluenceAI2026!`, access key: `MASTER_OVERRIDE_ALPHA_PRIME`
- **Env vars** need to be set in Vercel project settings for auth to work in prod (FOUNDER_USERNAME, FOUNDER_PASSWORD, FOUNDER_MASTER_KEY)

---

## What Was Done This Session
1. ✅ /about page — conversion-focused rewrite (Phil from Intender style), expanded PROOF_POINTS with Candy Crush 10M launch, IAB quote, full InMobi series
2. ✅ Homepage — removed "Currently Operating" section and "9 APAC markets" pill
3. ✅ Homepage — service card #2 updated to mention "Mobile & Steam" UA
4. ✅ Homepage — scrolling logo marquee trust strip (mobile + desktop, pauses on hover, prefers-reduced-motion)
5. ✅ News article #8 — "Real Influence in a World of Fake Ads" (pillar piece, Joel editing)
6. ✅ News article #7 — "If You Can't Measure It, You Can't Fund It" (measurement piece)
7. ✅ Content calendar — 11-week plan (CONTENT_CALENDAR.md), Phil from Intender style
8. ✅ Frosty Fest AU studio database — 25 studios profiled (lib/frosty-fest-au-studios.ts)
9. ✅ AU outreach engine — email sequences ready (lib/au-studio-outreach-engine.ts)
10. ✅ Amy call prep doc (AMY_CALL_PREP_AND_ACTIONS.md)
11. ✅ All pushed to prod and deploying on Vercel

---

## Tasks For This Session (priority order)

### 1. Admin Portal Navigation & Discoverability
The platform has many routes that aren't linked from anywhere obvious. Build a proper admin sidebar/dashboard that shows ALL platform sections. Current hidden routes:
- `/admin` — Admin portal (exists but incomplete)
- `/agency-demo` — Agency campaign builder
- `/thailand-demo` — Thailand market demo
- `/beta` — Beta access page
- `/dashboard` — Main dashboard
- `/dashboard/analytics` — Analytics
- `/dashboard/brand` — Brand dashboard
- `/dashboard/brand/creators` — Creator management
- `/dashboard/creator` — Creator dashboard
- `/dashboard/campaign-3` — Campaign 3 APAC
- `/dashboard/market-intelligence` — Market intel
- `/campaigns` — Campaigns page
- `/pricing` — Pricing
- `/get-started` — Get started form
- `/creator-signup` — Creator signup
- `/about` — About (NOT in main nav — add it)
- `/news` — News (NOT in main nav — add it)

**Action:** Add /about and /news to the main navigation. Build an admin sidebar that lists all internal routes so Joel can find everything.

### 2. Spotlight/Flashlight Tour for New Features
Build a lightweight onboarding spotlight system that highlights new or unvisited sections of the platform. Think Shepherd.js-style tooltips that pulse/glow on elements Joel hasn't clicked yet. Track visited pages in localStorage. Show a "What's New" indicator on the admin dashboard.

### 3. Creator Profile Cards — Better Visual Storytelling
Current creator profiles need to show reach and audience engagement stats more prominently at the top. The first thing you see on each profile card should be:
- Follower count (large)
- Avg engagement rate
- Platform icon
- Gamefluence Score
- Content match percentage

Make this more visual — stat bars, colour-coded tiers, mini sparkline charts if possible.

### 4. Fabulate Influencer
Joel mentioned a "Fabulate" influencer that was discussed in a previous session — possibly from the mobileyes.live project. **Ask Joel for the link/handle** at the start of the session. Once provided:
- Run them through the CreatorLeadGenSystem scoring
- Add to the creator database
- Prepare outreach email using the templates in au-studio-outreach-engine.ts

### 5. Outreach Email Sending
The outreach email templates exist (lib/au-studio-outreach-engine.ts) but can't send from the platform yet. The project uses Resend (API key in .env.local). Wire up:
- An admin UI to preview and send outreach emails
- Use Resend to actually deliver them
- Track sent/replied status per studio in the Frosty Fest database

### 6. Article #8 Polish
Joel is editing the pillar article (#8 — "Real Influence in a World of Fake Ads"). When he's happy with it, update the content in `app/news/[id]/page.tsx` under post ID '8' and push to prod.

---

## Reminders (from Amy call prep)
- After Amy call → write Frosty Fest content piece ("51 ANZ Games...")
- After Amy call → reach out to Jane (Tempo Lab) directly
- After Amy call → send Frosty Games Fest attribution partnership pitch
- GTA article — write together with Joel (NOT yet drafted, holding)

---

## Key Files
- `app/page.tsx` — Homepage
- `app/about/page.tsx` — About page (conversion rewrite)
- `app/news/page.tsx` — News listing
- `app/news/[id]/page.tsx` — Individual articles (posts 1, 4, 5, 7, 8)
- `lib/frosty-fest-au-studios.ts` — 25 Frosty Fest studios
- `lib/au-studio-outreach-engine.ts` — Email templates + strategy
- `lib/creator-lead-gen.ts` — Creator scoring system (framework, needs real data)
- `CONTENT_CALENDAR.md` — 11-week publishing plan
- `AMY_CALL_PREP_AND_ACTIONS.md` — Amy meeting prep + reminders
- `components/ui/LogoMarquee.tsx` — Scrolling trust strip component
- `app/api/auth/founder/route.ts` — Founder authentication

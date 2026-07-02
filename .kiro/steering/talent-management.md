---
inclusion: auto
---

# Mobileyes Talent Management — Workflows & Rules

## What Mobileyes Is

Mobileyes is AU-first talent representation for live video creators. It's **IMG Models for streamers** — not a campaign marketplace. The relationship is personal, professional, and ongoing.

**Key Differences from Gamefluence:**
| | Gamefluence | Mobileyes |
|---|---|---|
| Model | Campaign marketplace | Talent representation |
| Relationship | Per-campaign | Ongoing roster |
| Payment | 7 days (marketplace) | 4 business days (talent-first) |
| Commission | 20% from creator fee | 20% from gross fee |
| Platforms | TikTok, YouTube, Instagram, Facebook | Kick, Twitch, YouTube, TikTok |
| Focus | APAC gaming campaigns | AU-first live video talent |
| Agreement | Per-signup terms | Full representation agreement |
| Brief model | Creator discovers & applies | Mobileyes matches & presents |

## Talent Lifecycle

```
Prospect → Onboarding → Active → (Paused) → (Terminated)
                ↓
         E-Form Signed (Agreement + Rates + Platforms)
                ↓
         Profile Reviewed (24-48 hrs)
                ↓
         Rate Card Confirmed
                ↓
         Brief Matching Begins
```

## Brief Flow

```
Brand/Agency Brief Received
        ↓
Mobileyes Matches to Talent
        ↓
Brief Sent via E-Form (talent has 48 hrs to respond)
        ↓
   ┌─── Accept (e-sign) ───┐
   │                        │
   │    Content Created     │
   │          ↓             │
   │    URL Submitted       │
   │          ↓             │
   │  Tech Verification     │
   │    (automated)         │
   │          ↓             │
   │  Payment Triggered     │
   │  (4 business days)     │
   │                        │
   └─── Decline ────────────┘
              ↓
        Brief returned to pool
```

## Verification Engine — What It Checks

| Check | Method | Tolerance |
|-------|--------|-----------|
| Content accessible | HTTP 200 on URL | Must pass |
| Correct platform | URL domain match | Must pass |
| Attribution link/code | Description/chat/caption scan | Must be present |
| Integration placement | Timestamp detection | ±10 seconds |
| Content duration | Platform API duration | Must meet minimum |
| Paid disclosure | Platform-specific tag detection | Must be enabled |
| Deadline met | Publication date vs deadline | Must be before |

**When verification fails:** Talent has 48 hours to correct. If not corrected, brief marked as incomplete.

**When verification passes:** Payment triggered automatically — 4 business days.

## Commission Structure

- **Default commission**: 20% (but flex per deal — see Pricing Engine)
- **Commission floor**: 15% (never go below — even for diamond talent)
- **Commission ceiling**: 35% (only for full-service high-effort bronze deals)
- **Joel decides**: Agents recommend, Joel has final say on every deal
- **Payment guarantee:** Mobileyes pays talent regardless of when brand pays
- **Pre-existing brands:** Excluded (declared in Schedule A at onboarding)
- **12-month introduction clause:** If Mobileyes introduced the brand, commission applies for 12 months

## Pricing & Margins — Flex Engine

Lib: `lib/pricing-margins-engine.ts`

### Principle
Tiers give you the range. You pick the point within that range. Every deal is different.

### Tier Rate Cards (Brand Pays)

**Mobileyes (AUD)**
| Tier | Min | Typical | Max | Commission Range |
|------|-----|---------|-----|-----------------|
| Diamond | $6,000 | $8,000 | $15,000 | 15-25% |
| Platinum | $3,500 | $5,000 | $7,000 | 15-25% |
| Gold | $1,800 | $2,500 | $4,000 | 18-28% |
| Silver | $800 | $1,500 | $2,000 | 18-30% |
| Bronze | $400 | $700 | $1,000 | 20-35% |

**Gamefluence (USD)**
| Tier | Min | Typical | Max | Commission Range |
|------|-----|---------|-----|-----------------|
| Diamond | $4,000 | $6,000 | $12,000 | 15-25% |
| Platinum | $2,000 | $3,000 | $5,000 | 18-25% |
| Gold | $1,000 | $1,500 | $2,500 | 18-28% |
| Silver | $500 | $800 | $1,200 | 20-30% |
| Bronze | $200 | $400 | $600 | 20-35% |

### When to Flex

| Context | Margin Adjustment | Reason |
|---------|-------------------|--------|
| New talent (first deal) | -2% | Incentivise signup, build trust |
| Repeat brand | +2% | Proven pipeline, lower risk |
| High-effort brief | +3% | Complex management overhead |
| Fabulate pipeline | -1% | Lower acquisition cost |
| Exclusivity deal | +5% | You're managing restrictions |
| Diamond talent | -2% | Retain premium talent |
| Bronze talent | +3% | Higher service-to-revenue ratio |

### What Talent Sees vs What You Track

| | Talent-facing | Backend (your view) |
|---|---|---|
| Commission | "20%" (standard messaging) | Actual % per deal (15-35%) |
| Rate | Their agreed 80% | Your flex margin applied |
| Invoice | Clean 80/20 split shown | Full margin analysis per deal |

This means: talent always sees "20% commission" in the agreement. But your actual take can flex deal-by-deal within the allowed range. The floor/ceiling protects you and them.

## Rate Card Types

| Type | Description | Typical Range (AU) |
|------|-------------|-------------------|
| Full Day | 8+ hours streaming/production | $2,000 – $8,000 |
| Half Day | 4 hours | $1,200 – $4,500 |
| Per-Deliverable | Single video/mention | $800 – $3,000 |
| Monthly Retainer | Ongoing work | $5,000 – $20,000 |

Rates reviewed quarterly. Mobileyes advises but talent approves all quotes.

## Supported Platforms

1. **Kick** 🟢 — Primary live streaming (growing AU market)
2. **Twitch** 🟣 — Established live streaming
3. **YouTube** 🔴 — VODs, live streams, shorts
4. **TikTok** 🎵 — Short-form and live

## Brief Sources

- **Direct** — Brands approaching Mobileyes directly
- **Fabulate** — Fabulate talent marketplace pipeline
- **Agency** — Via partner agencies
- **Repeat** — Returning brands from previous work

## Cancellation Rules

| Scenario | Consequence |
|----------|-------------|
| Talent cancels before acceptance | No issue |
| Talent cancels after acceptance | Reputation impact, find replacement |
| Talent no-shows | Suspension (7-30 days), may terminate |
| Brand cancels after talent acceptance | Talent gets 50% fee |
| Brand cancels after content created | Talent gets 100% fee |

## E-Forms

### 1. Talent Onboarding E-Form (`/talent-signup`)
Collects: personal info (incl. ABN), platforms, rate card, agreement signature.
Posts to: `/api/talent-signup` → Google Sheets "Talent Signups (MB)" tab + Audit Log.
Security: Rate limited (5/hour/IP), input validation, sanitization.

### 2. Brief Acceptance E-Form (`/brief-accept`)
Shows: full brief details, deliverables, payment breakdown, terms.
Collects: acceptance checkboxes (deliverables, deadline, rate, terms), e-signature.
Posts to: `/api/brief-accept` → Google Sheets "Brief Responses (MB)" tab + Audit Log.
Security: Signed token URL (HMAC), rate limited (10/hour/IP), token expiry (72 hours).

### 3. Content Submission Form (future)
Collects: content URL for verification.
Triggers: automated verification engine checks.

## Security Infrastructure

- **Signed brief tokens** (`lib/brief-tokens.ts`): HMAC-SHA256 signed URLs with 72-hour expiry. Prevents unauthorized brief access.
- **Audit logging** (`lib/audit-log.ts`): Every agreement signature and brief response logged with timestamp, IP, user agent, and SHA-256 data hash.
- **Rate limiting**: In-memory per-IP throttle on all public API endpoints.
- **Input validation** (`TalentInputValidator`): Email regex, phone format, URL validation, rate bounds, HTML sanitization.
- **Privacy policy**: `/mobileyes-privacy` — Australian Privacy Act compliant.

## Legal Framework

- **Governing law:** NSW, Australia
- **Agreement type:** Non-exclusive talent representation
- **Key protections:** 4-day payment, APAC rate protection, non-exclusive, 14 days to exit
- **E-signature validity:** Electronic Transactions Act 1999 (Cth), valid under NSW law
- **IP:** Talent retains all content rights; usage per brief only

## File Locations

- Agreement: `legal/mobileyes-talent-management-agreement.md`
- Verification engine: `lib/platform-verification-engine.ts`
- Talent management lib: `lib/mobileyes-talent-management.ts`
- Brief tokens (signed URLs): `lib/brief-tokens.ts`
- Audit logging: `lib/audit-log.ts`
- Brief acceptance form: `components/talent/BriefAcceptanceForm.tsx`
- Talent signup form: `components/talent/TalentAgreementForm.tsx`
- Talent signup page: `app/talent-signup/page.tsx`
- Brief acceptance page: `app/brief-accept/page.tsx`
- Privacy policy: `app/mobileyes-privacy/page.tsx`
- API — talent signup: `app/api/talent-signup/route.ts`
- API — brief accept: `app/api/brief-accept/route.ts`
- Google Sheets operations: `lib/google-sheets-db.ts` (Mobileyes section)

## Build Rules

- Mobileyes code lives in the same codebase as Gamefluence but is conceptually separate
- Mobileyes pages use indigo/purple colour scheme (not Gamefluence blue/pink gaming theme)
- Use `admin@mobileyes.live` for all Mobileyes communications
- Domain references: `mobileyes.live` (primary)
- Talent files go in `components/talent/` and `lib/mobileyes-*`
- Always show the 80% talent / 20% commission split clearly
- Payment terms: always reference "4 business days"
- Platform order preference: Kick > Twitch > YouTube > TikTok
- **Agents recommend, Joel decides** — no automated actions on pricing or accepting deals
- **External portals are NOT being built yet** — focus is internal process, accounting, and readiness
- **Flex pricing**: Backend tracks actual margin per deal, talent always sees clean "80/20" messaging

## Invoicing & Accounting

Lib: `lib/invoicing-engine.ts`

### Financial Lifecycle
```
Terry scouts → Dazza prices → Joel decides rate & margin
  → Invoice generated (draft)
  → Joel approves
  → Sent to brand (NET 14)
  → Brand pays
  → Content verified (tech engine)
  → Talent payment triggered (4 business days MB / 7 days GF)
  → Super paid quarterly (AU talent only)
  → Invoice marked complete
```

### Fee Types Available Per Invoice
| Fee | Who Pays | Who Sees It | When Used |
|-----|----------|-------------|-----------|
| Talent fee | You (from brand $) | Talent | Always |
| Commission | Brand (baked into total) | Joel only | Always |
| Agency fee | Brand (line item) | Brand | Multi-service briefs |
| Tech fee | Brand (line item) | Brand | Platform/verification charges |
| Management fee | Brand (line item) | Brand | Complex campaign coordination |
| Exclusivity fee | Brand (line item) | Brand + Talent | Competitive restrictions |
| Rush fee | Brand (line item) | Brand + Talent | <48hr turnaround |
| GST | Brand (10% on taxable) | Brand | AU brands only |

### What Each Party Sees

**Brand invoice shows:** Campaign fee + any additional fees + GST. One clean total. NO talent/commission split visible.

**Talent sees:** Their agreed fee, payment terms, due date. NO brand fee or your margin visible.

**You (Joel) see:** Full breakdown — brand pays, talent gets, you keep, margin %, GST owed, super owed, net profit, flags.

### Superannuation (AU Talent)
- Rate: 11.5% (FY2024-25)
- Applies to: AU-based contractors paid through Mobileyes
- NOT applicable to: International talent (APAC), Gamefluence creators
- Paid: Quarterly to talent's nominated super fund
- Fields needed: Fund name, USI, member number (collected at onboarding or first invoice)

### Invoice Numbering
- Mobileyes: `MB-2026-XXXX`
- Gamefluence: `GF-2026-XXXX`

### Process Flow When Outreach Converts

```
1. Batch upload contacts → Terry scores them
2. You reach out (DM/email) → Status: "contacted"
3. They reply interested → Status: "replied" / "interested"
4. Dazza shows rate options → You pick margin
5. Brief sent (signed URL) → They accept via e-form
6. Invoice generated (draft) → You review & approve
7. Brand invoiced → Brand pays (NET 14)
8. Talent creates content → Submits URL
9. Verification engine checks → Passes/fails
10. Verification passes → Talent payment triggered
11. You pay talent (4 days MB / 7 days GF)
12. Invoice complete → Profitability tracked → Agents learn
```

## Email System

All Mobileyes emails sent via Resend from `admin@mobileyes.live`.
Email templates: `lib/mobileyes-email.ts`

| Trigger | Email | Recipient |
|---------|-------|-----------|
| Talent signs up | Welcome email | Talent |
| Talent signs up | New talent notification | Admin |
| Brief sent | Brief delivery + accept link | Talent |
| 24 hours no response | Reminder email | Talent |
| 48 hours no response | Auto-decline notification | Talent + Admin |
| Brief accepted/declined | Response notification | Admin |
| Verification passes | Payment incoming notification | Talent |

## Cron Jobs

| Endpoint | Schedule | Purpose |
|----------|----------|---------|
| `/api/cron/brief-reminders` | Every hour | Check for briefs approaching 48hr deadline, send reminders, auto-decline |

Protected by `CRON_SECRET` Bearer token (Vercel Cron).

## Admin Dashboard

Route: `/dashboard/talent`
Component: `components/talent/TalentManagementDashboard.tsx`

Tabs:
- **Roster** — All talent with platforms, rates, earnings, reliability scores
- **Briefs** — All briefs with status, fees, commission, deadlines, source
- **Pipeline** — Kanban view (Awaiting → In Progress → Delivered → Verified/Paid)
- **Metrics** — Per-talent stats, platform breakdown, revenue by source

## Batch Contact Upload

Route: `/dashboard/batch-upload`
Also embedded in: `/dashboard/talent` (Mobileyes default), `/dashboard/outreach` (link)
API: `/api/batch-upload`
Lib: `lib/batch-contact-upload.ts`
Component: `components/admin/BatchContactUploader.tsx`

### How It Works
1. Select pipeline: Gamefluence (APAC gaming) or Mobileyes (AU live talent)
2. Paste CSV or upload file (max 200 rows per batch)
3. System auto-detects columns, validates each row, assigns tiers
4. Valid contacts logged to Google Sheets Outreach Log
5. Contacts appear in outreach dashboards with status "to_contact"

### CSV Format
```
name,platform,handle,profile_url,email,phone,location,followers,avg_viewers,engagement_rate,content_focus,market,notes
```

### Platform Support
- **Gamefluence**: tiktok, youtube, twitch, instagram, facebook
- **Mobileyes**: kick, twitch, youtube, tiktok

### Auto Features
- Builds profile URL from platform + handle if URL missing
- Parses K/M notation (85K → 85000, 4.4M → 4400000)
- Auto-assigns tier: diamond (1M+), platinum (500K+), gold (100K+), silver (50K+), bronze (<50K)
- Validates emails, URLs, platform matching
- Sanitizes all inputs

## AI Agents — Terry & Dazza

Route: `/dashboard/agents`
Lib: `lib/platform-agents.ts`
Component: `components/agents/AgentAdvisoryPanel.tsx`

### Terry 🔍 — Talent Scout
Evaluates every contact across 7 dimensions:
1. **Content** — Niche focus, quality, production value, uniqueness
2. **Audience** — Size, quality (real vs fake), demographics, growth rate
3. **Engagement** — Rate, likes, comments, shares, sentiment
4. **Consistency** — Posting frequency, reliability, schedule
5. **Monetisability** — Estimated rates, CPM, purchase intent, product fit
6. **Partnerships** — Previous brands, quality, exclusivity risk
7. **Brand Safety** — Language, controversies, flags

Outputs: Overall score (0-100) + verdict (SIGN NOW / HIGH POTENTIAL / WORTH WATCHING / PASS / RED FLAG)
Includes: Good things, concerns, tier classification, upgrade pathway, recommendation

### Dazza 💰 — Deal Agent
Prices every deal for profitability:
- **Rate calculation** — Based on tier, engagement, platform, market (AU vs APAC)
- **Rate range** — Min/max with recommended sweet spot
- **Invoice breakdown** — Gross fee, 20% commission, talent's 80%, payment terms
- **Negotiation tips** — How to anchor, what to lead with, retainer suggestion
- **Risk assessment** — Low/medium/high based on audience quality and reliability
- **Comparable deals** — Similar tier/market reference points

### C-Suite Advisory Layer 🏢
Cross-platform insights from CTO, CEO, CMO:
- **CTO** — Data quality, API integration needs, platform coverage gaps
- **CEO** — Pipeline value, growth opportunities, cross-platform comparison
- **CMO** — Platform mix, engagement quality, market coverage, brand positioning

Urgency levels: Immediate → This Week → This Month → Strategic

### How Agents Connect to Everything
```
Batch Upload → Terry evaluates each contact → Dazza prices the deal
       ↓                    ↓                         ↓
  Google Sheets      Scout Reports               Rate Cards
       ↓                    ↓                         ↓
  Outreach DB        Verdict feeds              Brief creation
       ↓             dashboard cards             uses Dazza's rate
  Status tracking         ↓                         ↓
       ↓            C-Suite layer              Invoicing engine
  Conversion         compares both              uses 80/20 split
  analytics          platforms                       ↓
                                               Payment (4 days)
```

---
inclusion: auto
---

# Automation & Workflow System

## Automated Workflows — Gamefluence

### 1. Creator Signup Flow (LIVE)
```
Trigger: Creator submits /creator-signup form
Actions:
  1. Validate form data (API route)
  2. Send admin notification email (Resend → admin@gamefluence.com.au)
  3. Send creator confirmation email (Resend → creator's email)
  4. Log to Google Sheets "Creator Signups" tab (with attribution params)
  5. If outreachRef present: update outreach record status → "signed"
Tracking: ref, source, event, market params preserved through entire flow
```

### 2. Brand Inquiry Flow (LIVE)
```
Trigger: Brand/agency submits /get-started form
Actions:
  1. Validate form data
  2. Send notification email (Resend → admin@gamefluence.com.au)
  3. Log to Google Sheets "Brand Inquiries" tab
  4. Status set to "new" — manually update to "contacted" / "converted"
```

### 3. Outreach Tracking Flow (MANUAL + LOGGED)
```
Trigger: You send a DM/email to a creator from the outreach database
Actions:
  1. Log outreach attempt to Google Sheets "Outreach Log" tab
  2. Record: creator_id, template_used, channel, timestamp
  3. When response received: update status + response_date
  4. When converted: update outcome + link to signup record
Learning: Over time, analyze which templates/channels/markets convert best
```

### 4. Event Attribution Flow (LIVE)
```
Trigger: Creator signs up via event-specific URL
  e.g. /creator-signup?event=supanova-sydney-2026
Actions:
  1. Event code captured in form submission
  2. Logged to Sheets with event attribution
  3. Visible in Roster Builder with source = event name
  4. ROI of attending events measurable over time
```

## Automated Workflows — Mobileyes

### 1. Campaign Brief Flow
```
Trigger: Brand submits brief form on mobileyes.live
Actions:
  1. Validate form data
  2. Send notification (Resend → admin@mobileyes.live)
  3. Log to Google Sheets "Campaign Briefs" tab
  4. Status: new → reviewed → matched → active → completed
```

### 2. Talent Signup Flow
```
Trigger: Creator applies via mobileyes.live talent form
Actions:
  1. Validate
  2. Send confirmation email
  3. Log to Google Sheets "Talent Signups" tab
  4. Status: new → reviewed → onboarded → active
```

## Google Sheets as Database — Best Practices

### Why Sheets (for now)
- Free, no infrastructure to manage
- You can view/edit data directly in browser
- Shareable with team members (Cake, future hires)
- Good enough for <1000 records
- Migrate to Supabase when you hit scale limits

### When to Migrate
- More than 1000 creator signups
- Need real-time queries (Sheets API has 100 req/100sec limit)
- Need relational data (creator → campaigns → payments)
- Multiple team members writing simultaneously

### Sheet Hygiene Rules
- Never delete rows — mark status as "archived" instead
- Timestamp everything (ISO format)
- Use consistent status values: new, contacted, replied, interested, signed, declined, archived
- One row per event (don't update in place — append new status rows if needed)

## Conversion Tracking & Learning

### What to Track Per Outreach
| Field | Why |
|-------|-----|
| template_used | Which message template converted |
| channel | DM vs email vs messenger |
| market | Which market responds best |
| tier | Which creator tier converts easiest |
| response_time | How fast they reply (hours) |
| outcome | signed / declined / no_response |

### Metrics to Review Weekly
- Response rate by market (VN vs ID vs PH vs TH)
- Response rate by channel (DM vs email)
- Response rate by template
- Time-to-sign (first contact → signed)
- Cost per signed creator (if paying Cake per creator)

### How This Feeds Back Into AI
Over time, the outreach data builds a dataset that improves:
- Template selection (which copy works per market)
- Channel selection (where to reach each tier)
- Timing optimization (when to send)
- Creator scoring (which profiles actually convert)

## Integration Architecture

```
┌─────────────────────────────────────────────────┐
│                  FRONTEND                         │
│  gamefluenceai.com / mobileyes.live              │
│  (Next.js on Vercel)                             │
└──────────────┬───────────────────────────────────┘
               │ API Routes
┌──────────────▼───────────────────────────────────┐
│              BACKEND SERVICES                      │
│  /api/leads → Resend email + Google Sheets        │
│  /api/contact → Resend email + Google Sheets      │
│  /api/twitch → Twitch Helix API                   │
│  /api/mcp/stripe → Stripe MCP                     │
└──────────────┬────────────┬──────────────────────┘
               │            │
┌──────────────▼──┐  ┌─────▼──────────────────────┐
│   RESEND EMAIL   │  │   GOOGLE SHEETS DATABASE    │
│  Notifications   │  │  Creator Signups            │
│  Confirmations   │  │  Outreach Log               │
│  Outreach seqs   │  │  Brand Inquiries            │
└─────────────────┘  │  Campaign Briefs (MB)        │
                     │  Talent Signups (MB)          │
                     └──────────────────────────────┘
```

## Kiro's Role in Both Projects

Kiro (this IDE) manages both codebases:
- **Gamefluence window**: Follows gamefluence steering rules, builds platform features
- **Mobileyes window**: Follows mobileyes steering rules, builds talent agency features
- **Shared**: Same Resend infrastructure, same Google Sheets backend, same Vercel hosting
- **Separated**: Different domains, different brands, different colour systems, different audiences

### What Kiro Can Do Automatically
- Build new pages and components
- Update API routes
- Deploy to Vercel
- Generate outreach templates
- Create market intelligence reports
- Build dashboards with live data

### What Requires Your Action
- Google Cloud service account setup (one-time)
- Sharing sheets with service account (one-time)
- Adding env vars to Vercel (one-time)
- Sending actual DMs to creators (manual — can't automate platform DMs)
- Reviewing and approving creator signups
- Updating outreach status when responses come in

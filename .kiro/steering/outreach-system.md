---
inclusion: auto
---

# Outreach & Creator Pipeline System

## Creator Outreach Flow
1. Creator identified in outreach database (lib/creator-outreach-database.ts)
2. Personalized message generated from template (market + tier specific)
3. Outreach sent via platform DM or email
4. Response tracked: not_contacted → contacted → replied → interested → signed
5. If interested: send personalized signup link with ref tracking
6. Signup form pre-fills known data, creator confirms
7. Resend sends confirmation email + admin notification
8. Creator added to Roster Builder with source attribution

## Signup URL Structure
- Base: /creator-signup
- Params: ?ref=[creator_id]&source=[outreach_source]&market=[market_code]
- Example: /creator-signup?ref=vn_20&source=dm_outreach&market=VN
- The ref param links back to the outreach database record for conversion tracking

## Email System (Resend)
- Admin notifications: admin@gamefluence.com.au
- Creator confirmations: sent from admin@gamefluence.com.au
- Outreach sequences: future — will use Resend broadcast when volume justifies
- All emails tracked in /api/leads route

## Calendar Integration
- Google Calendar links generated per task/meeting
- .ics export for bulk import
- When creator says "yes to meeting": generate pre-filled Google Calendar event URL
- Format: https://calendar.google.com/calendar/render?action=TEMPLATE&text=...&dates=...&details=...

## Conversion Tracking
Track per outreach attempt:
- template_used: which email/DM template
- sent_at: timestamp
- platform: where the message was sent
- response_received: boolean
- response_time: hours until reply
- outcome: replied | interested | signed | declined | no_response
- This data feeds back into template optimization over time

## What Works Per Market (Learning System)
- VN: Platform DM > email. Lead with money. Fast payment emphasis.
- ID: Must be in Bahasa. Relationship-first. Facebook Messenger preferred.
- PH: English works. Be direct about rates. Highest response rate in SEA.
- TH: Relationship before business. Don't lead with money. Build rapport.
- AU: Professional tone. LinkedIn or email. Mention APAC opportunity angle.

## Integration with Mobileyes
- Gamefluence handles gaming creators for APAC brand campaigns
- Mobileyes handles AU-first talent for live video/streaming briefs
- Shared infrastructure: Resend email, Vercel hosting, same founder
- NEVER cross-reference brands between platforms in outreach
- A creator can be on both platforms if they fit both profiles

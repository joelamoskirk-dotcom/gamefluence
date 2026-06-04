---
inclusion: auto
---

# S2S Attribution Engine — Gamefluence

## Architecture
Server-to-server conversion tracking for creator-driven campaigns.
When a campaign converts (signup, install, purchase, Discord join), the engine fires events
back to TikTok, Meta, and Google Ads so ad platforms can optimize delivery.

## UTM Structure (standard across all campaigns)
```
utm_source=gamefluence
utm_medium=creator_campaign
utm_campaign={campaign_id}  (e.g. racing_vn_q3_2026)
utm_content={creator_handle} (e.g. @speedracervn)
ref={creator_id}            (e.g. vn_12)
```

## Conversion Events Fired
| Event | TikTok | Meta | Google | Discord |
|-------|--------|------|--------|---------|
| signup | CompleteRegistration | CompleteRegistration | ✓ | — |
| install | Download | Lead | ✓ | — |
| purchase | Purchase | Purchase | ✓ | — |
| discord_join | AddToCart | Contact | — | ✓ (webhook) |
| lead | SubmitForm | Lead | ✓ | — |
| campaign_start | InitiateCheckout | InitiateCheckout | ✓ | — |

## TikTok Events API
- Endpoint: https://business-api.tiktok.com/open_api/v1.3/event/track/
- Auth: Access-Token header
- Env vars: TIKTOK_PIXEL_ID, TIKTOK_ACCESS_TOKEN
- Captures ttclid from URL params for click attribution

## Meta Conversions API (CAPI)
- Endpoint: https://graph.facebook.com/v19.0/{pixel_id}/events
- Auth: access_token query param
- Env vars: META_PIXEL_ID, META_ACCESS_TOKEN
- Captures fbclid from URL params for click attribution

## Google Ads Offline Conversions
- Requires: OAuth2 + Google Ads API
- Currently: Logged for manual upload
- Future: Automated via OfflineConversionUploadService
- Captures gclid from URL params

## Discord Integration
- Bot tracks invite code usage per member join
- Each creator gets a unique invite code via API
- Webhook endpoint: /api/webhooks/discord
- Events: member_join, invite_create
- Env vars: DISCORD_BOT_TOKEN, DISCORD_GUILD_ID, DISCORD_WEBHOOK_URL, DISCORD_WEBHOOK_SECRET

## Creative Analytics
The engine tracks per-creative:
- Format (short_video, long_video, live_stream, story, post, clip)
- Hook type (question, challenge, reaction, tutorial, story, gameplay, review)
- Duration, watch time, completion rate, drop-off point
- CTR, CVR, CPC, CPA, ROAS
- Engagement metrics (likes, comments, shares, saves)
- View-through vs click-through attribution
- Viral coefficient (shares/views)

### Insights Generated
- Best performing format per market
- Best performing hook type per campaign
- Optimal video duration
- Engagement vs conversion disconnect (high likes but no conversions = weak CTA)

## Privacy
- All PII (email, phone) is SHA-256 hashed before sending to ad platforms
- IP and user agent are sent for matching only, not stored
- No user-level tracking beyond what ad platforms require for S2S

## Env Vars Required
```
TIKTOK_PIXEL_ID=
TIKTOK_ACCESS_TOKEN=
META_PIXEL_ID=
META_ACCESS_TOKEN=
GOOGLE_ADS_CUSTOMER_ID=
GOOGLE_ADS_CONVERSION_ACTION_ID=
DISCORD_BOT_TOKEN=
DISCORD_GUILD_ID=
DISCORD_WEBHOOK_URL=
DISCORD_WEBHOOK_SECRET=
```

## Integration with Creator Outreach
When a creator-attributed signup occurs:
1. UTM params captured on landing page
2. Signup form includes ref={creator_id}
3. /api/leads fires S2S conversion to all platforms
4. Creative metrics logged for that creator's content
5. Over time: AI learns which creators + formats + hooks convert best

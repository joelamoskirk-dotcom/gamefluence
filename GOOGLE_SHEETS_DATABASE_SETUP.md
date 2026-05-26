# Google Sheets Database Setup — Gamefluence

## Overview
Google Sheets serves as our lightweight database until we outgrow it (500+ records).
Three sheets in one spreadsheet, connected via Google Sheets API.

## Spreadsheet Structure

### Sheet 1: Creator Pipeline
| Column | Field | Type | Notes |
|---|---|---|---|
| A | id | string | Auto-generated (market-###) |
| B | handle | string | @username |
| C | displayName | string | |
| D | platform | enum | tiktok/youtube/twitch/kick |
| E | profileUrl | string | Full URL |
| F | email | string | If known |
| G | phone | string | If known |
| H | market | enum | vietnam/thailand/indonesia/philippines/japan/newzealand/australia |
| I | language | string | Comma-separated |
| J | followers | number | |
| K | avgViews | number | |
| L | engagementRate | number | Percentage |
| M | postingFrequency | number | Posts per week |
| N | primaryGame | string | |
| O | gameCategories | string | Comma-separated |
| P | contentStyle | string | gameplay/review/comedy/tutorial/live-stream/shorts |
| Q | status | enum | discovered/researched/contacted/responded/interested/onboarded/rejected/inactive |
| R | source | string | How we found them |
| S | contactedDate | date | |
| T | responseDate | date | |
| U | notes | string | |
| V | gamefluenceScore | number | 0-100 |
| W | brandSafetyFlag | boolean | |
| X | estimatedCPV | number | USD |
| Y | addedDate | date | |
| Z | lastUpdated | date | |
| AA | addedBy | string | |
| AB | outreachGroup | string | Batch campaign name |
| AC | outreachTemplate | string | Which template was sent |
| AD | outreachResponse | string | What they said |

### Sheet 2: Leads (Brand/Agency Inquiries)
| Column | Field | Type | Notes |
|---|---|---|---|
| A | id | string | Auto-generated |
| B | submittedAt | datetime | |
| C | type | enum | brand_inquiry/agency_inquiry/creator_inquiry |
| D | name | string | |
| E | email | string | |
| F | company | string | |
| G | market | string | |
| H | budget | string | |
| I | message | string | |
| J | status | enum | new/contacted/qualified/proposal_sent/won/lost |
| K | followUpDate | date | |
| L | notes | string | |
| M | source | string | UTM source if available |
| N | convertedToClient | boolean | |
| O | revenue | number | If converted, total revenue |

### Sheet 3: Outreach Analytics
| Column | Field | Type | Notes |
|---|---|---|---|
| A | id | string | |
| B | creatorId | string | Links to Pipeline sheet |
| C | sentDate | date | |
| D | templateUsed | string | Which outreach template |
| E | market | string | |
| F | platform | string | |
| G | opened | boolean | If trackable |
| H | responded | boolean | |
| I | responseDate | date | |
| J | responseType | enum | positive/negative/question/no_response |
| K | convertedToOnboarded | boolean | |
| L | daysToResponse | number | Calculated |
| M | outreachBatch | string | Group name for A/B testing |
| N | notes | string | |

## Setup Steps (for next session)

1. **Create a Google Cloud project** (or use existing Gamefluence one)
2. **Enable Google Sheets API** in the project
3. **Create a Service Account** → download JSON key
4. **Create the Google Sheet** in your admin@gamefluence.com.au Drive
5. **Share the sheet** with the service account email
6. **Add the service account JSON** as a Vercel env var (GOOGLE_SHEETS_CREDENTIALS)
7. **Add the Sheet ID** as a Vercel env var (GOOGLE_SHEET_ID)
8. **Install googleapis package** (`npm install googleapis`)
9. **Wire up API routes** to read/write from Sheets instead of static data

## Conversion Metrics We'll Track

- **Outreach → Response rate** by market, platform, template
- **Response → Onboarded rate** by market
- **Lead → Client conversion rate** by type (brand vs agency)
- **Time to response** by market and platform
- **Best performing outreach templates** (A/B test by batch)
- **Creator quality score** vs actual campaign performance (once campaigns run)

## Data-Driven Outreach Strategy

Once we have 50+ outreach records:
- Identify which markets respond fastest
- Identify which platforms have highest conversion
- Identify which template language/tone works best
- Double down on high-converting segments
- Refine scoring model based on actual onboarding success

# Google Sheets Database Setup — 5 Minute Guide

## What This Does
Connects Gamefluence and Mobileyes to Google Sheets as a lightweight database.
All form submissions, outreach logs, and creator signups get written to sheets automatically.

---

## Step 1: Create a Google Cloud Service Account (3 minutes)

1. Go to: https://console.cloud.google.com/iam-admin/serviceaccounts
2. Select your project (or create one called "gamefluence-backend")
3. Click **"+ CREATE SERVICE ACCOUNT"**
4. Name: `gamefluence-sheets`
5. Click **Create and Continue**
6. Role: Skip (no role needed)
7. Click **Done**
8. Click on the service account you just created
9. Go to **Keys** tab → **Add Key** → **Create new key** → **JSON**
10. Download the JSON file

From the JSON file, you need two values:
- `client_email` → this is your GOOGLE_SERVICE_ACCOUNT_EMAIL
- `private_key` → this is your GOOGLE_PRIVATE_KEY

---

## Step 2: Create Your Google Sheets (1 minute)

### Gamefluence Sheet
1. Create a new Google Sheet: https://sheets.new
2. Name it: "Gamefluence Database"
3. Create these tabs (sheets):
   - `Creator Signups` — Headers: Timestamp, Name, Email, Social, Platform, Market, OutreachRef, Source, Event, Followers, Engagement
   - `Outreach Log` — Headers: SentAt, CreatorID, Name, Market, Platform, Template, Channel, Status, ResponseDate, Outcome
   - `Brand Inquiries` — Headers: Timestamp, Name, Email, Company, Market, Budget, Type, Message, Status
4. Copy the Sheet ID from the URL: `https://docs.google.com/spreadsheets/d/[THIS_IS_THE_ID]/edit`

### Mobileyes Sheet
1. Create another Google Sheet: https://sheets.new
2. Name it: "Mobileyes Database"
3. Create these tabs:
   - `Campaign Briefs` — Headers: Timestamp, Name, Company, Email, Phone, CampaignType, Market, Budget, Details, Status
   - `Talent Signups` — Headers: Timestamp, Name, Email, Social, Platform, Followers, Status
4. Copy the Sheet ID from the URL

---

## Step 3: Share Sheets with Service Account (30 seconds)

For EACH sheet:
1. Click **Share**
2. Paste the service account email (from Step 1)
3. Give it **Editor** access
4. Click **Send**

---

## Step 4: Add to .env.local (30 seconds)

Add these to your `.env.local`:

```
# Google Sheets Database
GOOGLE_SERVICE_ACCOUNT_EMAIL=gamefluence-sheets@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n"
GAMEFLUENCE_SHEET_ID=your_gamefluence_sheet_id_here
MOBILEYES_SHEET_ID=your_mobileyes_sheet_id_here
```

Also add these to your Vercel environment variables:
- Settings → Environment Variables → Add each one

---

## Step 5: Verify (automatic)

Once configured, every form submission will:
- ✅ Send email notification (Resend — already working)
- ✅ Write to Google Sheets (new — for persistence and tracking)
- ✅ Track outreach attribution (ref, source, event params)

---

## Sheet Structure

### Gamefluence — Creator Signups
| Timestamp | Name | Email | Social | Platform | Market | OutreachRef | Source | Event | Followers | Engagement |

### Gamefluence — Outreach Log
| SentAt | CreatorID | Name | Market | Platform | Template | Channel | Status | ResponseDate | Outcome |

### Gamefluence — Brand Inquiries
| Timestamp | Name | Email | Company | Market | Budget | Type | Message | Status |

### Mobileyes — Campaign Briefs
| Timestamp | Name | Company | Email | Phone | CampaignType | Market | Budget | Details | Status |

### Mobileyes — Talent Signups
| Timestamp | Name | Email | Social | Platform | Followers | Status |

---

*Once set up, this runs automatically. No maintenance needed.*

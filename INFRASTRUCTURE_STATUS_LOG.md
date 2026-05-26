# Gamefluence Infrastructure Status Log
**Date:** April 21, 2026

---

## 1. Squarespace Account

- **Account holder:** Joel Iris
- **Display name:** Joel Iris
- **Platform:** account.squarespace.com

---

## 2. Domains (Managed by Squarespace)

| Domain | Status | Provider | Expiration | Notes |
|---|---|---|---|---|
| gamefluence.com.au | ✅ Active | Squarespace | Oct 12, 2028 | 🔴 Email icon + warning icon visible. Google Workspace connected. Auto-renew ON, A$27/yr |
| gamefluenceai.au | ✅ Active | Squarespace | Jul 24, 2028 | Clean status |
| gamefluenceai.com | ✅ Active | Squarespace | Jul 24, 2028 | Clean status |
| mobileyesmarketing.com | ✅ Active | Squarespace | Sep 23, 2026 | Separate domain, also in account |

- 4 domains total (not 3 as initially logged — mobileyesmarketing.com also present).
- No Squarespace website created yet for any domain.
- **Email verification banner:** "Verify your email address — Send a verification email to confirm your email address." shown at top of Domains dashboard.

### gamefluence.com.au — Domain Detail

- **Renewal:** Oct 12, 2028 for A$27 (auto-renew ON)
- **Registrant:** Joel Iris, [address], Lewisham, NSW, 2049, [email]
- **Options shown:** Request Transfer Code, Move Domain, Edit Registration Info

---

## 3. Google Workspace (via Squarespace)

- **Domain:** gamefluence.com.au
- **Plan:** Business Standard (paid annually)
- **Billing expires:** Oct 12, 2026
- **Users:** 1 (joel — Administrator)
- **Action needed:** Accept Google Workspace Terms of Service (banner shown)

---

## 4. Google Admin Console — Subscriptions

| Subscription | Status | Licenses | Payment Plan |
|---|---|---|---|
| AI Expanded Access (add-on) | Active | 1 assigned | Flexible plan |
| Google Workspace Business Plus | Active | 0 available, 1 assigned | Annual plan (monthly payment) |

**Note:** Squarespace shows "Business Standard" but Google Admin shows "Business Plus." This is a discrepancy worth verifying — you may have upgraded directly through Google Admin.

---

## 5. Google Admin — Billing / Transactions (Apr 1–21, 2026)

| Date | Description | Amount (AUD) |
|---|---|---|
| Apr 18–30, 2026 | Google Workspace Business Plus: New commitment for 1 seat | A$10.05 |
| Apr 7–21, 2026 | AI Expanded Access: Usage of 1 seat | A$12.60 |
| Apr 7–18, 2026 | GST | A$2.27 |
| Apr 7, 2026 | Manual payment: Visa ····6930 | -A$45.00 |

- **Ending balance:** -A$20.08 (credit)
- **Starting balance:** A$0.00

---

## 6. Google Admin — Payment Accounts

| Account ID | Status | Subscriptions |
|---|---|---|
| 6259-3636-4274-2628 | In use | AI Expanded Access, Google Workspace Business Plus |

---

## 7. Google Admin — Access Issues

- **admin.google.com/ac/domains/manage** → **403 Forbidden** ("you do not have access to this page")
- **admin.google.com/ac/users** → **404 Not Found** ("The requested URL was not found on this server")

These errors suggest the Google Workspace admin account may have restricted permissions, possibly because:
- The workspace was provisioned through Squarespace (reseller), which can limit direct Google Admin access to certain sections like Domains and Users management.
- You may need to manage domains and users through Squarespace's interface instead, or contact Squarespace support to unlock full admin access.

---

## 8. Google Workspace ToS — Accept Button Broken

- Clicking "Accept Terms" on the Google Workspace management page redirects back to the admin page without completing.
- This is a known issue with Squarespace-provisioned Google Workspace accounts — the reseller relationship can interfere with the ToS acceptance flow.
- Likely tied to the same restricted admin access causing the 403/404 errors above.

---

## 9. Squarespace ↔ Google Workspace Domain Conflict

- **Error message:** "We couldn't connect Google Workspace to your domain."
- **Detail:** "Your domain is already connected to a Google Workspace account. Most likely, someone already registered this domain through Google or another reseller."
- **Options given:** "Try another domain" or follow Google's instructions to remove the domain from its existing account.

### Root Cause Diagnosis

This is the key issue tying everything together. There are **two separate Google Workspace accounts** in play:

1. **Squarespace-provisioned Google Workspace** — Business Standard plan on gamefluence.com.au, managed through Squarespace's reseller panel. This is what shows in the Squarespace domain settings.
2. **Direct Google Workspace account** — Business Plus plan, visible at admin.google.com. This was likely created separately (possibly signed up directly with Google using the same domain).

Because the domain gamefluence.com.au is already claimed by the direct Google account, Squarespace can't complete its own connection — hence the "couldn't connect" error, the ToS loop, and the 403/404 errors in Google Admin (the Squarespace-side admin has limited permissions since the domain is owned by the other account).

---

## 10. Second Google Workspace Account (Direct via Gmail)

- **Email from Google Workspace Team** dated Apr 18, 2026:
  - Subject: "[Action required] Set up billing for your Google Workspace account"
  - "Your free trial expires tomorrow"
  - **Username:** [email]
  - **Domain:** [email]
  - **Paid subscription start date:** May 1, 2026
- This confirms a **second, separate Google Workspace** was created directly through Google using a Gmail address — not through Squarespace.
- This trial account is what's claiming the domain and blocking Squarespace's connection.

---

## 11. Google Admin Console — Full Sidebar View

Confirmed accessible sections in Google Admin (admin.google.com):
- Home, Apps, Generative AI
- Billing → Subscriptions, Payment accounts, Buy or upgrade, License settings
- Account → (Show more)
- Send feedback

**Not accessible:** Domains, Users (403/404 errors — consistent with reseller-restricted account)

---

## Diagnosis Summary

The core problem has **two layers**:

### Layer 1: Dual Google Workspace (NOW RESOLVED)
| Account | Plan | Status |
|---|---|---|
| Squarespace-provisioned | Business Standard | ✅ CANCELLED — A$124.60 refund |
| Direct Google signup | Business Plus | ✅ Active — keeping this one |

### Layer 2: Google Payments Profile Set to United States (ACTIVE BLOCKER)

**This is the real issue now.** Your Google Payments profile is configured as:

- **Payments Profile ID:** 6887-6757-9854
- **Country/Region:** United States (US)
- **Address:** NEW YORK, NY 10013, United States
- **Account Type:** Individual
- **Name:** joel kirk

But you're an Australian business (Gamefluence Pty Ltd) operating with AUD billing. This mismatch is causing:

1. **Google Pay identity verification triggered** — Red banner: "To keep your services running and ensure you can still pay and get paid, verify your identity"
2. **Verification requires:** Government-issued ID + document showing name and address — but your Australian ID won't match a US payments profile
3. **Google Pay account may be temporarily suspended** — "We were unable to verify some information in your Google Account, so we have temporarily suspended your account"
4. **5 critical alerts** showing in Google Payments Center

**You cannot change the country on an existing payments profile.** Google requires you to create a new payments profile for a different country/region. The page even says: "You need to create a new payments profile when you move to a new country or region."

---

## Direct Google Workspace Account — Full Details

- **Plan:** Google Workspace Business Plus
- **Status:** Active since Apr 5, 2026
- **Payment plan:** Annual plan (monthly payment)
- **Contract ends:** Apr 19, 2027
- **Pricing:** A$23.18/user/month (25% off A$30.90) until Jul 18, 2026, then A$30.90/user/month
- **Licenses:** 1 purchased, 0 available, 1 assigned
- **Next billing date:** May 1, 2026
- **Payment account:** 6259-3636-4274-2628
- **Balance:** -A$20.08 (credit)
- **Last payment:** Apr 7 for A$45.00
- **Primary payment:** Visa ····6930 (expires 07/29)
- **Backup payment:** PayPal ([email])
- **Auto-renew:** Apr 19, 2027 at 1:46:57 PM UTC+10
- **Add-on:** AI Expanded Access (purchased)
- **Organization:** Gamefluence Pty Ltd
- **Admin email:** [email]

---

## Summary of Current State

| Area | Status |
|---|---|
| Domains (4) | ✅ Active — gamefluence.com.au, gamefluenceai.au, gamefluenceai.com, mobileyesmarketing.com |
| Squarespace email verification | ⚠️ Pending — banner asking to verify email |
| Squarespace Google Workspace | ✅ CANCELLED — A$124.60 refund coming |
| Google Workspace (Direct) | ✅ Active, Business Plus, next bill May 1 |
| Google Workspace ToS | Resolved with Squarespace cancellation |
| Google Admin — Domains page | Needs recheck now Squarespace is gone |
| Google Admin — Users page | Needs recheck now Squarespace is gone |
| Plan discrepancy | ✅ Resolved — only one account now |
| Squarespace website | ❌ Not created yet |
| Dual account conflict | ✅ RESOLVED |
| Google Payments Profile | 🔴 NEW BLOCKER — Set to US (New York), needs Australian profile |
| Google Pay verification | 🔴 Account suspended — identity verification required |
| Google Pay critical alerts | 🔴 5 critical alerts in Payments Center |

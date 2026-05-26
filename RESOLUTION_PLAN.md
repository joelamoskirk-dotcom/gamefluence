# Gamefluence — Infrastructure Resolution Plan
**For:** Joel (CEO)
**Date:** April 21, 2026
**Priority:** URGENT — blocking business launch

---

## The Problem (30-second version)

You accidentally ended up with **two Google Workspace accounts** fighting over the same domain (gamefluence.com.au):

1. **Account A** — Created through Squarespace (Business Standard). This is the one Squarespace manages. It can't finish setup because the domain is already claimed.
2. **Account B** — Created directly with Google using your Gmail (Business Plus). This one grabbed the domain first. It's on a free trial expiring **May 1, 2026**.

This conflict is why:
- The "Accept Terms" button loops
- Google Admin shows 403/404 errors
- Squarespace says "We couldn't connect Google Workspace to your domain"
- You're paying for two things that are blocking each other

---

## Recommended Path: Keep ONE account, kill the other

### My Recommendation: Keep the Direct Google Account (Account B), cancel the Squarespace one (Account A)

**Why this path wins:**

| Factor | Squarespace Google Workspace | Direct Google Workspace |
|---|---|---|
| Admin access | ❌ Restricted (403/404 errors, can't manage domains/users) | ✅ Full admin control |
| Plan | Business Standard | Business Plus (more features) |
| Flexibility | Locked to Squarespace as reseller | Direct with Google — no middleman |
| Adding users later | Must go through Squarespace | Direct in Google Admin |
| Domain control | Broken — can't connect | Already claimed the domain |
| Cost control | Squarespace markup possible | Direct Google pricing |

Going direct with Google gives you full control. No reseller in the middle. No permission issues. No loops. You own everything.

---

## Action Plan

### STEP 1 — Cancel Google Workspace through Squarespace (Account A)
**You need to do this — I can't access your Squarespace account.**

1. Go to your Squarespace domain settings for gamefluence.com.au
2. Click **Email** in the left sidebar
3. Look for option to **cancel** or **remove** the Google Workspace subscription
4. If there's no cancel option visible, contact Squarespace support directly:
   - Go to https://support.squarespace.com
   - Use live chat (available 24/7 in English)
   - Say: *"I need to cancel my Google Workspace subscription on gamefluence.com.au. I have a separate Google Workspace account directly with Google and the two are conflicting. Please remove the Squarespace-provisioned Google Workspace so I can use my direct account."*

**Time:** 10–15 minutes with support chat

---

### STEP 2 — Fix Google Payments Profile (US → Australia)
**You need to do this — this is now the #1 blocker.**

Your Google Payments profile is set to United States (New York, NY 10013). You can't change the country on an existing profile — Google doesn't allow it. You need to create a new Australian payments profile and link it to your Workspace billing.

**Do this:**

1. Go to https://pay.google.com → Settings
2. Click **"Create new profile"** (it's right there on your Settings page under Country/Region)
3. Set Country/Region to **Australia**
4. Enter your Australian business address (Lewisham, NSW 2049)
5. Set Account Type to **Business** (not Individual) — use "Gamefluence Pty Ltd"
6. Save the new profile

Then link it to your Workspace billing:

7. Go to **admin.google.com → Billing → Payment accounts → 6259-3636-4274-2628**
8. Click **"View payment settings"** or **"Manage payment methods"**
9. Switch the payments profile to your new Australian one
10. Add your Australian payment card or keep the Visa ····6930 if it works from AU

**Also:** Complete the identity verification (the red banner) — but do this AFTER creating the AU profile, so your Australian ID matches the Australian profile.

**Time:** 15 minutes

---

### STEP 2b — Clear the Google Pay Verification Hold
**After creating the AU payments profile:**

1. Go back to the verification form (Google Pay Help → Verify your account)
2. Submit your **Australian government-issued ID** (driver's licence or passport)
3. Submit a **document showing your name and Australian address** (bank statement or utility bill)
4. Make sure the "Email" field contains your Gmail address
5. Google will review and reactivate — usually within 1-3 business days

**Time:** 10 minutes to submit, 1-3 days for Google to process

---

### STEP 3 — Verify your domain in the Direct Google Account
**After Step 1 clears the Squarespace claim:**

1. In Google Admin (admin.google.com), go to **Account → Domains**
2. Add gamefluence.com.au as your domain (if not already added)
3. Google will give you a TXT record to add to your DNS
4. Go to Squarespace Domains → gamefluence.com.au → **DNS**
5. Add the TXT record Google provides
6. Go back to Google Admin and click **Verify**

**Time:** 5 minutes to set up, up to 48 hours for DNS propagation (usually under 1 hour)

---

### STEP 4 — Set up your business email
Once the domain is verified in your direct Google account:

1. In Google Admin, go to **Users**
2. Create your business email (e.g., joel@gamefluence.com.au)
3. Set up MX records in Squarespace DNS (Google Admin will tell you exactly what to add)

**Time:** 10 minutes

---

### STEP 5 — Verify your Squarespace account email
**Quick one — there's a banner on your Squarespace Domains page.**

1. Click **Send Verification** on the banner
2. Check your email and click the verification link

**Time:** 1 minute

---

## What I've Already Done

- ✅ Logged all infrastructure status from your screenshots
- ✅ Diagnosed the root cause (dual account conflict)
- ✅ Researched the correct resolution path via Google and Squarespace docs
- ✅ Created this action plan

## What I Can't Do (needs your hands)

- Cancel the Squarespace Google Workspace (requires your Squarespace login)
- Set up billing on the direct Google account (requires your Google login)
- Add DNS records (requires your Squarespace login)
- Verify your Squarespace email (requires your email access)

---

## Money You'll Save

- **Squarespace Google Workspace** (Business Standard): ~A$8.40/month — this goes away
- **Direct Google Workspace** (Business Plus): ~A$10.05/month — this stays, better features
- No more double-paying for conflicting services

---

## Timeline

| Step | Time | Urgency | Status |
|---|---|---|---|
| 1. Cancel Squarespace Workspace | — | — | ✅ DONE — Refund A$124.60 |
| 2. Fix Google Payments Profile (US→AU) | — | — | ✅ DONE |
| 2b. Google Pay identity verification | — | — | ✅ DONE (or in progress — won't block anything now) |
| 3. Verify domain + link to Google Workspace | — | — | ✅ DONE — Domains connected |
| 4. Set up business email | — | — | ✅ DONE — Admin account + joel user working |
| 5. Verify Squarespace email | 1 min | Low | ⬜ Do when convenient (click verify link in Squarespace) |

---

## INFRASTRUCTURE COMPLETE ✅

**What's now working:**
- Google Workspace Business Plus — active, AU billing
- gamefluence.com.au domain — verified and connected
- Business email — admin account + joel user live
- Squarespace domains — all active and linked

---

## NEXT: Getting the Platform Live

Now that infrastructure is sorted, here's what's needed to launch Gamefluence:

| # | Task | How | Time | Priority |
|---|---|---|---|---|
| 1 | Deploy the Next.js app | Deploy to Vercel (already has .vercel config). Run `vercel --prod` or connect GitHub repo to Vercel dashboard | 10 min | 🔴 HIGH |
| 2 | Connect custom domain in Vercel | Add gamefluence.com.au (or gamefluenceai.com) as custom domain in Vercel project settings. Add CNAME/A records in Squarespace DNS | 10 min | 🔴 HIGH |
| 3 | Set up environment variables | Add production env vars in Vercel dashboard (Stripe keys, any API keys from .env.local) | 5 min | 🔴 HIGH |
| 4 | SSL certificate | Automatic via Vercel once domain is connected | 0 min | Auto |
| 5 | Test production deployment | Verify all pages load, forms work, payment flow works | 15 min | 🔴 HIGH |
| 6 | Set up Stripe production keys | Switch from test to live Stripe keys for real payments | 5 min | 🟡 MEDIUM (can launch with test mode first) |
| 7 | Google Workspace email signatures | Set up professional email signatures for joel@gamefluence.com.au | 5 min | 🟢 LOW |
| 8 | Squarespace email verification | Click the verify link in the banner | 1 min | 🟢 LOW |

**Total time to go live: ~45 minutes of hands-on work.**

Want me to start on the deployment? I can prep the Vercel config and check the build is clean right now.

**Total hands-on time: ~30 minutes across a couple of days.**

---

## After This Is Resolved

Once your email and domain are clean, we can focus on getting the Gamefluence platform deployed and live. The app is built — it's this infrastructure tangle that's the blocker.

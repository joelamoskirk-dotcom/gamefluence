---
inclusion: auto
---

# Product Governance & Decision Framework

## Golden Rule
Before implementing ANY feature, page, or change that touches the public site, ask:
**"Would a visitor seeing this help them sign up, or does it expose internal operations?"**

If it exposes internals → it goes behind /founder auth. No exceptions.

## Personas & Access Levels

### 1. Public Visitor (no auth)
- **Goal:** Understand the platform, get excited, sign up or contact us
- **Sees:** Landing page, creators, pricing, news, legal pages, get-started form, creator signup
- **Never sees:** Dashboards, campaign tools, admin panels, system status, internal metrics
- **Conversion action:** Fill out /get-started form (brand/agency) or /creator-signup (creator)

### 2. Founder / Admin (Joel — /founder auth required)
- **Goal:** Manage everything — leads, campaigns, creators, analytics, system health
- **Sees:** Everything. All dashboards, all tools, all data.
- **Access:** /founder login → session cookie → full access to /admin/*, /dashboard/*, /batch-campaign, etc.

### 3. Future: Authenticated Brand/Agency (not yet built)
- **Goal:** Manage their campaigns, see their analytics, pay invoices
- **Sees:** Their campaign dashboard, their creator selections, their attribution data
- **NOT YET IMPLEMENTED** — currently all brand interaction is manual via email

### 4. Future: Authenticated Creator (not yet built)
- **Goal:** See campaign briefs, accept/reject, track earnings
- **NOT YET IMPLEMENTED** — currently all creator interaction is manual via email

## Pre-Implementation Checklist

Before building or changing anything, verify:

1. **Who is this for?** (visitor / founder / future brand / future creator)
2. **Is it public or protected?** If protected, is it in the middleware PROTECTED_ROUTES list?
3. **Does the nav expose it?** Public nav should ONLY show: Home, Creators, Pricing, News, Login, Sign Up
4. **Does it help conversion?** If it doesn't help someone sign up or contact us, it shouldn't be on the public site
5. **Is there sensitive data?** Campaign budgets, creator rates, system metrics, API keys — never public

## Navigation Rules

### Public Nav (visible to everyone)
- Gamefluence (logo/home)
- Creators
- Pricing
- News
- Login (→ /founder for now)
- Sign Up (→ /creator-signup)

### Admin Nav (only visible after /founder auth)
- All dashboard links
- Admin tools
- Campaign management
- System status

## Deployment Governance

- Always run `vercel --prod --yes` after changes
- Always verify the public site doesn't expose internal routes
- The middleware.ts file is the source of truth for access control
- If adding a new page, explicitly add it to either PUBLIC_ROUTES or PROTECTED_ROUTES in middleware.ts

## Strategic Questions to Ask Before Major Changes

1. Does this change affect what a public visitor sees?
2. Could a competitor learn our strategy/pricing/tools from this?
3. Does this create a new route? If so, is it in the middleware?
4. Is this a pre-sale feature (marketing) or post-sale feature (product)?
5. Will this require the founder to manually intervene, or is it automated?

## Contact & Escalation
- All public-facing forms email: admin@gamefluence.com.au
- Founder portal: gamefluence.com.au/founder
- Emergency: /emergency-access (protected, requires auth)

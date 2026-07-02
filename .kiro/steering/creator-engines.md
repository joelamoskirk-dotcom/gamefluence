---
inclusion: auto
---

# Creator Intelligence & Campaign Engines

## Engine 1 — Creator Index (living dataset)

Maintain a continuously updated index of gaming creators relevant to Gamefluence/Mobileyes verticals.

### Verticals
- **Mobile Racing**: CarX, Asphalt, FR Legends, Car Parking Multiplayer communities
- **Car Culture Gaming Crossover**: Real car meets + gaming content overlap
- **Flight Sim**: DCS, MSFS, sim rig builders
- **Sim Hardware & Peripherals**: Wheels, HOTAS, pedals, monitors, stream tech
- **AU Car-Meet Creators**: Gumball content, car culture events, track days
- **VN Gaming TikTok**: Vietnamese gaming content (mobile-first)
- **Live Streaming (General)**: Kick/Twitch variety and competitive

### Creator Range
- Primary target: 50K–500K followers
- Flag exceptional nano (10–50K) with >8% engagement
- Diamond/Platinum (500K+) for anchor campaigns only

### Fields Per Creator
| Field | Required | Notes |
|-------|----------|-------|
| handle | Yes | Primary social handle |
| platform(s) | Yes | kick, twitch, youtube, tiktok, instagram |
| geo | Yes | Country/city |
| followerCount | Yes | Latest verified |
| avgViews | Yes | Last 10 posts average |
| engagementRate | Yes | Calculated or scraped |
| estCPM | No | Estimated cost per mille |
| pastPromos | No | Known brand/game partnerships |
| contactRoute | No | email / DM / agency |
| vertical | Yes | From vertical list above |
| mobileyesRosterStatus | No | prospect / onboarding / active / declined |
| gamefluenceStatus | No | prospect / contacted / signed / active |
| gamblingOptIn | Yes | Default: FALSE. Must be explicitly TRUE for gambling briefs |
| vnPending | No | Flag TRUE if VN campaign but HCMC operation not yet staffed |
| tier | Yes | diamond / platinum / gold / silver / bronze |
| lastUpdated | Yes | ISO timestamp |

### Sources to Monitor
- Platform search (TikTok creator search, YouTube trending, Kick browse)
- Game community Discords and subreddits
- Competitor campaign credits (who did they use?)
- Event contacts (Supanova, PAX, car meets)
- Fabulate pipeline talent

## Engine 2 — Drop-to-Shortlist (per live-ops drop)

When a client content drop is logged:

1. Generate a 3–5 creator shortlist matched to content type and geo
2. Project per creator:
   - Installs = reach × platform CTR benchmark × install CVR
   - Projected CPI
   - Confidence: high/med/low (based on past promo data for that creator)
3. Compare projected CPI against client's paid-UA benchmark
4. Flag incrementality headroom (is creator audience net-new vs existing players?)
5. Auto-draft the creator brief in Mobileyes translated-brief format (brand version + creator version)

### Platform CTR Benchmarks (starting assumptions)
| Platform | Content Type | CTR Range |
|----------|-------------|-----------|
| TikTok | Organic integration | 1.5–3.0% |
| YouTube | Dedicated video | 3.0–6.0% |
| Kick/Twitch | Live mention + link | 0.8–2.0% |
| Instagram | Story/Reel | 1.0–2.5% |

### Install CVR Assumptions (mobile gaming)
| Source Quality | CVR Range |
|---------------|-----------|
| High-intent audience (niche match) | 15–25% |
| Mid-intent (gaming but not exact genre) | 8–15% |
| Broad entertainment | 3–8% |

## Engine 3 — Calendar Sentinel

### Events to Track
- Gumball 3000 rally calendar (Miami 2026 live; Seoul–Tokyo Oct 2027)
- Roadburn/client release notes and content roadmaps
- Gaming events: PAX AU, TGS, Supanova, GCAP
- Car meets: Fitted Friday, WTAC, Bathurst

### Behaviour
- **T-minus 4 weeks**: Auto-draft campaign brief + creator shortlist
- **T-minus 1 week**: Surface launch checklist:
  - Deep links built?
  - Creators contracted?
  - Measurement live?
  - Brief sent & accepted?
  - Attribution links generated?

## Engine 4 — ROI Learning Loop

Post-campaign, ingest per-creator actuals:
- Installs attributed
- D1/D7 retention of their cohort
- Time-to-first-race (or equivalent activation event)
- IAP conversion rate
- Actual CPI achieved

### Update Cycle
- Update creator's ROI rank and confidence score
- Compare projection vs actual
- Adjust CVR assumptions per vertical
- Output: rolling "top 20 by proven ROI" list per vertical, refreshed after every campaign

## Engine 5 — Cross-Promo Experiment Tracker

Log all cross-promo tests:
- House ads (portfolio placements)
- Audience syncs (lookalike seeding)
- Creator-led dual-title promotion

### For Creator Cross-Promo
- Track cross-install rate vs house-ad baseline
- This is a novel mechanic — document methodology carefully for GCAP talk and case-study library
- Measure: incremental installs, cost-per-cross-install, audience overlap %

## Guardrails (apply to all engines)

1. **No gambling briefs** unless creator's `gamblingOptIn` = TRUE
2. **No AU-facing real-money gambling promotion, ever** — regardless of opt-in
3. **VN campaigns** route through HCMC operation once staffed; until then flag `vnPending: true`
4. **All projections must show assumptions** — never present modelled numbers as actuals in client-facing docs
5. **Rate recommendations are recommendations** — Joel has final say on all pricing
6. **No creator data shared externally** without explicit consent
7. **Exclusivity conflicts checked** before shortlisting — don't pitch a creator who has a competing exclusivity deal

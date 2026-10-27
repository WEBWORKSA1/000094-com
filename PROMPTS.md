# 000094.com — Phase-wise Build Prompts

Concept: **Chapter 94 Trade Desk** — free trade-intelligence hub for HS Chapter 94 goods (furniture, bedding/mattresses, lighting, prefabricated buildings). Revenue: AdSense (high-CPC B2B trade/freight/customs niche) + lead gen (supplier/freight/broker/inspection referrals) + sponsorships + donations.

Global constraints for every prompt:
- Static HTML/CSS/vanilla JS, no build step, GitHub Pages free plan, custom domain 000094.com.
- AdSense code in `<head>` of every page: `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6620975821265271" crossorigin="anonymous"></script>`; `ads.txt` = `google.com, pub-6620975821265271, DIRECT, f08c47fec0942fa0`.
- Top of every page: "Contact, if you are interested in this website / domain name / Sponsorship / Advertisement / Partnership" → https://web.works/contact.
- All forms deliver to the owner inbox via FormSubmit AJAX; the address is assembled at runtime in JS and never appears as text, in markup, or in a mailto visible in source.
- No trademark use of "000094"; include trademark/copyright disclosure; not affiliated with WCO/CBP/ICC.

---

## Phase 1 — Positioning & information architecture
> Act as a product strategist. For the domain 000094.com ("0000 94"), define a site for HS Chapter 94 trade (headings 94.01–94.06). Output: audience segments (importers, retailers, designers, exporters, prefab developers, students), top 30 search intents with commercial value, sitemap (tools, guides, lead gen, monetization, legal), and the KPI for each page (ad RPM, lead conversion, email signup).

## Phase 2 — Design system
> Create `assets/css/style.css`: a "shipping manifest" aesthetic — paper (#F4F1EA), ink navy (#14213D), signal amber (#E8A33D), teal (#1F7A6E). Fonts: Fraunces (display), IBM Plex Sans (body), IBM Plex Mono (codes/figures). Tokens on `:root` with dark mode via `prefers-color-scheme` and `[data-theme]`. Components: sticky header, mobile drawer nav, cards, tags, chips, buttons, forms, multi-step progress bar, tables, countdown, timeline, FAQ, footer, cookie notice, reveal animation (respect reduced motion). Mobile-first, 16px gutters, no horizontal scroll.

## Phase 3 — Site runtime
> Write `assets/js/site.js`: inject shared header/footer (relative root via `data-root`), theme toggle with try/catch storage, cookie notice (Accept / Essential only → `requestNonPersonalizedAds=1`), form engine (honeypot, validation, multi-step, FormSubmit AJAX with runtime-assembled destination), `data-mail` links that open the mail app without exposing the address, countdown widget, lite YouTube embeds from a `SITE_CONFIG.videos` array with fallback topic cards, donation buttons wired to `SITE_CONFIG.donate` links (fallback to pledge form).

## Phase 4 — Home page
> Build `index.html`: hero with product-description search → HS explorer, manifest card of 6 headings, 4 verified stats with sources, tool grid, Section 232 countdown block, compact lead form ("Get my free quotes" with "Just researching" option), guides grid, video section, support/contests/careers cards, FAQ, mobile sticky CTA. WebSite JSON-LD.

## Phase 5 — HS 94 Explorer
> Build `hs-94.html` + `assets/js/hs94-data.js` with all 54 HS 2022 six-digit subheadings, plain-English notes and tariff-exposure flags. Live search (code, material, room, product), heading chips, detail panel with copy-code and "Get quotes" link pre-filling the RFQ heading (`?hs=`). Exclusions section with sources.

## Phase 6 — Calculators
> Landed-cost calculator: currency, FOB vs CIF basis, goods/freight/insurance/units, MFN %, additional duty %, AD/CVD %, U.S. MPF (0.3464% with editable min/max) and HMF (0.125%), VAT/GST, broker/inland/other, markup → total, per unit, stacked bar, suggested retail price, presets, print/PDF, methodology. Container calculator: carton L/W/H, cartons per item, kg, qty, freight rate → CBM, items per 20'GP/40'GP/40'HC (volume and weight limits), containers, fill %, freight per item, LCL vs FCL tip, reference table.

## Phase 7 — Tariff tracker
> Build `tariff-tracker.html`: dated timeline (29 Sep 2025 proclamation; 14 Oct 2025 effective 10%/25%/25%; caps UK 10%, EU/Japan 15% incl. MFN; stacking/drawback; 31 Dec 2025 deferral; 1 Jan 2027 30%/50% step-up; HS 2028 edition), current vs scheduled table, countdown, market context, action list, official source links, "last reviewed" date. Re-verify every fact with a web search before publishing.

## Phase 8 — Lead generation
> Build `sourcing.html`: 3-step RFQ (role + services → product heading, description, quantity, timeline incl. "Before 1 Jan 2027", origin, destination, budget → name, company, business email, phone, consent, newsletter opt-in). Benefits list, 3-step explainer, partner application form for suppliers/forwarders/brokers/inspectors. CTA copy: "Get my free quotes" (never "Submit").

## Phase 9 — Content
> Write 6 original guides (800–1,200 words each, sources, checklist, internal links): classification method, landed cost with worked example, Section 232, LED lighting 94.05 (HS 2022 split), prefab 94.06, supplier vetting & compliance. Guides hub + glossary. Article JSON-LD. Plan 2 new guides per month (country lanes, mattresses AD/CVD, Incoterms, 3PL for bulky goods).

## Phase 10 — Video library
> Build `videos.html`: featured embeds from `SITE_CONFIG.videos` (privacy-enhanced youtube-nocookie, click-to-load) and 9 topic collections linking to curated YouTube searches. Add only verified video IDs.

## Phase 11 — Monetization pages
> `support.html`: donation tiers ($5/$25/$100 mo/custom), fund-allocation meters (operations 40, talent 25, promotion 20, contests 15), pledge form, sponsorship packages + media-kit form, link to web.works/contact. `contests.html`: Classify-It Challenge, Best Guide Award, Creator Award, registration form, rules summary (no purchase necessary, skill-based, 18+, void where prohibited). `careers.html`: 6 freelance roles + application form.

## Phase 12 — AdSense compliance & legal
> Create About (editorial standards, funding, corrections), Contact, Privacy (AdSense/third-party cookie disclosure, opt-out links, processors, rights, retention), Terms, Disclaimer (trademark/copyright disclosure for "000094", non-affiliation, affiliate disclosure, not advice, DMCA), 404, `ads.txt`, `robots.txt`, `sitemap.xml`. Checklist: original content on every indexable page, no empty ad placeholders, clear navigation, no prohibited content, labelled sponsored content, working contact path.

## Phase 13 — Deploy
> Push to github.com/WEBWORKSA1/000094-com (main). Add `CNAME` (000094.com) and `.nojekyll`. Settings → Pages → Deploy from branch `main` / root. DNS at registrar: A records 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153; `www` CNAME → webworksa1.github.io. Enable "Enforce HTTPS". Submit sitemap in Google Search Console; add site in AdSense, enable Auto ads and Google's consent message (CMP) for EEA/UK.

## Phase 14 — Growth loop
> Weekly: re-verify tariff facts, update tracker date. Monthly: 2 guides, 1 tool improvement (e.g., country duty presets, PDF export by email for lead capture), newsletter. Quarterly: run a contest, pitch 10 forwarders/brokers for paid partner listings, review AdSense placements by RPM.

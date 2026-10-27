# 000094.com — Chapter 94 Trade Desk

Free, independent trade-intelligence hub for **furniture, bedding, lighting and prefabricated buildings** — the goods classified in Chapter 94 of the Harmonized System.

Static site (HTML/CSS/vanilla JS). No build step. Hosted on GitHub Pages (free plan) with custom domain `000094.com`.

## Structure
- `index.html` — home
- `hs-94.html` — interactive Chapter 94 code explorer
- `landed-cost.html` — landed-cost & duty calculator
- `container-calculator.html` — CBM / container load calculator
- `tariff-tracker.html` — tariff timeline & countdown
- `sourcing.html` — lead generation (multi-step RFQ)
- `guides.html` + `guides/` — long-form guides
- `videos.html` — video library
- `support.html`, `contests.html`, `careers.html` — donations, sponsorship, contests, talent
- `about.html`, `contact.html`, `privacy.html`, `terms.html`, `disclaimer.html`
- `ads.txt`, `robots.txt`, `sitemap.xml`, `CNAME`

## Config
Edit `assets/js/site.js` → `SITE_CONFIG` to add payment links (PayPal / Stripe / Buy Me a Coffee) and YouTube video IDs.

## Forms
All forms post through FormSubmit (AJAX). The destination address is assembled at runtime and never appears in page text or markup. The first submission triggers a one-time activation email — click it once to activate delivery.

## Legal
"000094" is used as a descriptive numeric domain name. Not affiliated with the WCO, any customs authority, or any trademark owner. See `disclaimer.html`.

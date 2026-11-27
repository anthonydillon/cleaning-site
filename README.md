# Cleaning Company website

A fast, SEO-ready website for a cleaning company, built with [Astro](https://astro.build) from the Claude Design file "Cleaning Company Website". It's a static site, so there's no server or database to run.

- Five service pages, plus a booking form, a quote form, prices, reviews, FAQ and contact pages
- Call and WhatsApp buttons on every page (the bottom quick-action bar)
- SEO: unique titles and descriptions, schema.org data for the business, services, FAQs and breadcrumbs, a sitemap and robots.txt
- Form submissions are emailed to you through [Web3Forms](https://web3forms.com) (free, no backend)

## Run it locally

You need Node.js 18.20.8 or later (22 recommended; see `.nvmrc`).

```bash
npm install
npm run dev        # http://localhost:4321
```

Other commands:

```bash
npm run build      # production site, written to dist/
npm run preview    # serve dist/ locally
npm run build:demo # clickable prototype in demo-site/ (forms don't send)
```

## Put it on GitHub

```bash
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

## Host it

Any static host works. The settings are the same everywhere:

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Output / publish directory | `dist` |
| Node version | 22 |

- **Netlify:** Add new site → Import from GitHub → choose the repo, then enter the settings above.
- **Cloudflare Pages:** Workers & Pages → Create → Pages → Connect to Git, choose the "Astro" preset and check the settings above.
- **Vercel:** New Project → import the repo. Astro is detected automatically.

Each push to `main` then redeploys the site.

**Before going live**, set your real domain in `astro.config.mjs` (`site`) and `public/robots.txt`. Canonical links, the sitemap and the business data for Google are built from it.

## Pages

`/` · `/domestic-cleaning/` · `/deep-cleaning/` · `/end-of-tenancy-cleaning/` · `/office-cleaning/` · `/carpet-cleaning/` · `/book/` · `/free-quote/` · `/prices/` · `/reviews/` · `/faq/` · `/contact/` · `/privacy/` · `/thank-you/` (hidden from search)

## Where to edit things

| What | File |
|---|---|
| Business name, town, phone, WhatsApp, email, hours, areas, reply time | `src/config/site.ts` |
| Web3Forms access key (without it, forms show an error) | `src/config/site.ts` → `web3formsKey` |
| Service pages: price, checklist, facts, FAQs (the file name is the URL) | `src/content/services/*.md` |
| Package cards on the Prices page | `src/pages/prices.astro` |
| Home page copy | `src/pages/index.astro` |
| General FAQs | `src/data/faqs.ts` |
| Reviews (real ones only), then `rating` and `googleReviewsUrl` in site config | `src/data/reviews.ts` |
| Colours and type | `src/styles/global.css` (`:root` tokens) |
| Logo | `src/components/Logo.astro`, `public/favicon.svg`, `public/logo.png` |
| Photos | `src/assets/img/`, mapped in `src/data/images.ts` |
| Google Analytics / Tag Manager | `src/layouts/BaseLayout.astro` (call, WhatsApp, book and quote clicks are already pushed to `dataLayer`) |

A price is either a number of pounds (`'60'`) or a phrase such as `Speak to us`. Only numbers are passed to Google as prices.

## Still to fill in before launch

Search the site for `[` to find the remaining placeholders: areas covered, opening hours, email, reply time, FAQ policy answers, property sizes, durations and team sizes, and reviews. Also:

- Replace the dummy phone and WhatsApp number (`00000 000000`)
- Confirm the "Cleaning Company" name and "Luton" town (both temporary)
- Confirm the claims in the lists: insured, background-checked, products supplied, two-hour minimum, free re-clean
- Have the privacy notice (`src/pages/privacy.astro`) reviewed for UK GDPR, then remove its TODO line
- Add a Google Business Profile with the same name and phone, and submit `sitemap-index.xml` in Google Search Console

## Photos

The photos came from the Claude Design file. Confirm you have the right to use them commercially, or replace them with your own, before launch.

# Penny-Stock Finder (Demo)

A very simple browser-based penny stock finder app built with plain HTML, CSS, and JavaScript.

## Features

- Table of penny stocks using mock data
- Simple ranking score based on price, volume, and daily momentum
- Filters for max price and minimum volume
- Save favorites to a watchlist
- Responsive layout for desktop and mobile
- Clear disclaimer that this is not financial advice

## Open it locally in your browser

From the project folder, run:

```bash
python3 -m http.server 8000
```

Then open:

- `http://localhost:8000`

## One-click deploy options

### Vercel

Use the Vercel import flow for this repo:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Netlify

Use the Netlify import flow for this repo:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

> Tip: both platforms can auto-detect this as a static site. Build command can be left empty, and publish directory is the project root (`.`).

## Deploy it with GitHub Pages (simple + free)

1. Push this repo to GitHub.
2. In your GitHub repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push to your branch (`main`, `master`, or `work`) or run the workflow manually from the **Actions** tab.
5. Once deployment finishes, open the Pages URL shown in the workflow summary.

A workflow file is included at `.github/workflows/deploy-pages.yml` so deployment is automatic after pushes.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static landing page for **ErickDDP Servicios** — an accounting + AI services business based in CDMX. No build system, no framework, no package manager. Everything runs directly in the browser.

## Development

Since this is a plain static site, open `index.html` directly in a browser or use any local HTTP server:

```bash
# Python
python -m http.server 8080

# Node (npx)
npx serve .
```

There is no build step, no linter config, and no test suite.

## Architecture

Three files form the entire frontend:

- **`index.html`** — All page structure. Sections in order: navbar, hero, social-proof, services (flip cards), metrics dashboard, digitalization, about, CTA, contact form, footer.
- **`styles.css`** — All visual styles. Uses CSS custom properties (`--primary-400`, `--text-muted`, etc.) for theming. Dark mode + glassmorphism aesthetic throughout.
- **`script.js`** — All interactivity, initialized inside a single `DOMContentLoaded` listener. Key systems:
  - Particle background (dynamically created DOM elements)
  - Scroll reveal via `IntersectionObserver` (`.reveal` → adds `.visible`)
  - Animated counters triggered on scroll (`.metric-number[data-target]`)
  - Flip cards: CSS-driven on desktop (hover), JS `IntersectionObserver` on mobile (touch devices)
  - Hero phrase cycling loop (sequential fade-in of `.phrase` spans)
  - Contact form submission to Make.com webhook (`MAKE_WEBHOOK_URL` constant at line 167)

## Contact Form / Webhook

The form (`#form-servicios-erickddp`) POSTs JSON to a Make.com webhook. The URL is hardcoded in `script.js:167`. Validation requires at least one of WhatsApp or email before sending. On success it resets the form; on failure it shows a WhatsApp fallback link.

## Deployment

Deployed via GitHub Pages. The `CNAME` file sets the custom domain. Pushing to `main` publishes the site.

## Legal Pages

- `aviso-privacidad.html` — Privacy notice (linked from contact form and footer)
- `legal.html` — Contains Terms of Service (`#terminos`) and AI Ethics Protocol (`#etica`)

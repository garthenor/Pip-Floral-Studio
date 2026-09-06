# Pre-launch checklist

Tick every line before switching the custom domain to production.

## Content
- [ ] All nine pages present and matching `content/pip-floral-studio-v1-approved-copy.md` word for word
- [ ] Open decisions D1–D12 in `docs/DECISIONS.md` resolved and applied
- [ ] Testimonial wording, attribution and permissions confirmed (D11)
- [ ] Privacy and Cookies page legally reviewed; "Last updated" date current (D12)
- [ ] No `Development placeholder` figures remain: `grep -r "ph__label" site/` returns nothing
- [ ] No TODO/REPLACE markers remain: `grep -rn "REPLACE_\|FORMSPREE_\|TODO" site/` returns nothing
- [ ] No case-study links, draft notes or unpublished-work references

## Assets
- [ ] Every launch-critical item in `ASSET_REQUIREMENTS.md` supplied and in place
- [ ] Photographer permissions and credits recorded; credits shown where required
- [ ] Funeral images checked: no identifiable people, cards or messages without agreement
- [ ] Logo SVG in header (and cream variant in footer if supplied); favicons and `site.webmanifest` in place, `<link>` tags un-commented
- [x] Fonts: WOFF2 files in `site/assets/fonts/`, `@font-face` active, no third-party font requests
- [ ] Recoleta licence confirmed to cover self-hosted web use on the production domain
- [ ] Social image `assets/img/og/pip-floral-studio-og-default.jpg` at 1200×630; test a share preview
- [ ] Images: responsive `srcset`/`sizes`, `width`/`height` set, lazy-loaded below the fold, heroes not lazy; largest page under ~1.5 MB on first load

## Forms
- [x] Three Formspree IDs replaced (6 Sept 2026)
- [ ] Forms restricted to the production domain (and `*.pages.dev` while testing)
- [x] Notification email set and verified in Formspree for all three forms (6 Sept 2026)
- [ ] Test submission from each form on the preview deployment reaches Anna's inbox with the correct subject format
- [ ] Failure path tested: answers retained, error panel shown, reload restores answers, success clears storage
- [ ] Duplicate submission prevented while sending (button disabled)
- [ ] Keyboard-only completion of all three forms
- [ ] Screen-reader pass (VoiceOver or NVDA): labels, required markers, errors announced, progress indicator, success/error panels
- [ ] Formspree spam protection on defaults; no CAPTCHA added

## Technical
- [ ] Cloudflare Pages: production branch `main`, output directory `site`, no build command, no Functions
- [ ] `_redirects`: all six legacy routes return 301 to the right place (test with `curl -I`)
- [ ] `_headers`: CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy, nosniff present on a production URL; no CSP violations in the console on any page, including a real form submission
- [ ] Custom domain live; non-canonical host redirects to canonical; HTTPS enforced
- [ ] Canonical tags, `og:url`, `sitemap.xml`, `robots.txt` all use the final host
- [ ] Preview deployments return `X-Robots-Tag: noindex`; production does not
- [ ] `404.html` served with a 404 status for an unknown URL
- [ ] Cloudflare Web Analytics active (token in place or automatic injection), visible in the dashboard; no GA4/GTM/Meta Pixel
- [ ] Deployed site checked for cookies and storage: none set by the site; `sessionStorage` only after a failed submission
- [ ] Structured data validates (Rich Results Test) with no invented facts
- [ ] Sitemap submitted in Search Console only after domain and redirects verified

## Accessibility and responsive
- [ ] Skip link works; one visible `<h1>` per page; heading order logical
- [ ] Mobile menu: opens/closes by keyboard, Escape closes, focus returns to the button
- [ ] Current page indicated in nav (underline + `aria-current`)
- [ ] Colour contrast verified on real fonts (text ≥ 4.5:1, UI ≥ 3:1)
- [ ] No horizontal scroll at 320 px on any page; checked at 375, 768, 1024 (landscape tablet), 1440+
- [ ] 200% browser zoom usable
- [ ] `prefers-reduced-motion` respected (fades and reveals off)
- [ ] Decorative SVGs `aria-hidden`; meaningful images have alt text
- [ ] Touch targets ≥ 44 px on controls and nav links

## Performance
- [ ] Lighthouse mobile on Home, Weddings, Enquire: Performance ≥ 90, no layout-shift warnings
- [ ] Test on a throttled mobile connection
- [ ] Long-lived cache headers on `/assets/*` confirmed

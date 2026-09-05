# Pip Floral Studio — website

Static site for Pip Floral Studio. Plain HTML, one CSS file, two small JavaScript files, forms via Formspree, hosted on Cloudflare Pages, deployed from this Git repository.

No framework, no build step, no runtime dependencies.

## Repository layout

```
site/                      ← published output directory (Cloudflare Pages serves this)
  index.html               Home
  weddings/index.html
  the-process/index.html
  about/index.html
  other-services/index.html
  funeral-flowers/index.html
  enquire/index.html
  privacy/index.html
  404.html
  css/styles.css           all styles; brand tokens at the top
  js/main.js               navigation, current page, gentle scroll reveal
  js/forms.js              enquiry forms (progressive reveal, validation, submission)
  assets/fonts|img|svg|icons   fonts, logo and icons in place; photography pending (see READMEs inside)
  _redirects  _headers  robots.txt  sitemap.xml
content/                   approved copy and photography brief — the source of truth for wording
docs/                      build spec, brand palette, forms / deployment docs, checklist, decisions log
ASSET_REQUIREMENTS.md      everything still needed from Anna, by page and component
```

## Local preview

Any static file server pointed at `site/` works. For example:

```
cd site
python3 -m http.server 8000
# → http://localhost:8000/
```

Clean URLs (`/weddings/`) resolve because each page is an `index.html` in its own folder. `_redirects` and `_headers` only take effect on Cloudflare Pages, so test those on a preview deployment.

## Editing

- **Copy**: the wording on every page must match `content/pip-floral-studio-v1-approved-copy.md` exactly. If a correction is needed, record it in `docs/DECISIONS.md` for approval rather than editing the page silently.
- **Header and footer** are repeated in each HTML file. Change them in every page (a project-wide find and replace is the intended workflow). The current page is marked with `aria-current="page"` on its nav link.
- **Cache-busting**: CSS and JS are linked as `styles.css?v=N`, `main.js?v=N`, `forms.js?v=N`. Bump `N` in every page (find and replace) whenever CSS or JS changes, or visitors may see a stale stylesheet.
- **Styles**: `site/css/styles.css` is organised in numbered sections with a contents list at the top. Brand colours, type scale and spacing are CSS custom properties in section 1. The palette values must not change.
- **Colour and contrast**: only dark green on cream (or cream on dark green) is used for text. Olive, pink and orange fall below WCAG contrast against both, so they are used purely decoratively (panels, rules, marks). Keep it that way.
- **Fonts**: self-hosted WOFF2 in `site/assets/fonts/`; `@font-face` rules in section 2 of the stylesheet. See the README in that folder.

### Adding photography

Each image slot is a placeholder `<figure class="ph …" data-asset="ID">`. The ID matches `ASSET_REQUIREMENTS.md`. Replace the whole `<figure>` with a `<picture>`:

```html
<figure>
  <picture>
    <source type="image/webp"
            srcset="/assets/img/weddings-hero-800.webp 800w,
                    /assets/img/weddings-hero-1400.webp 1400w,
                    /assets/img/weddings-hero-2400.webp 2400w"
            sizes="(min-width: 56em) 55vw, 100vw">
    <img src="/assets/img/weddings-hero-1400.jpg"
         srcset="/assets/img/weddings-hero-800.jpg 800w,
                 /assets/img/weddings-hero-1400.jpg 1400w,
                 /assets/img/weddings-hero-2400.jpg 2400w"
         sizes="(min-width: 56em) 55vw, 100vw"
         width="2400" height="1600"
         alt="Describe the setting and the flowers"
         loading="lazy" decoding="async">
  </picture>
  <figcaption class="credit">Photograph: Photographer Name</figcaption>   <!-- only where a credit is required -->
</figure>
```

Rules:
- Always set `width` and `height` (the intrinsic size of the fallback `src`) so the layout doesn't move while loading.
- Hero images at the top of a page: **omit `loading="lazy"`** and add `fetchpriority="high"`. Everything else is lazy.
- Meaningful photographs get descriptive `alt` text. The two Enquire-page images are decorative: `alt=""`.
- Keep photographer credits where the photographer requires them.
- No lightbox. Images sit in the page.

Generating sizes: any image tool will do. A one-off script using `sharp` (Node) or `Pillow` (Python) to output 800/1400/2400-wide WebP and JPEG variants is appropriate; if one is added to the repo, put it in `tools/`, keep it out of `site/`, and document it here. It is a development-time tool, not a runtime dependency.

### Floral SVG elements

Place Anna's SVGs in `site/assets/svg/`. Inline them or use `<img alt="">`, add `aria-hidden="true"`, and keep them away from text, focus order and controls.

## Forms

See `docs/FORMS.md`. Three Formspree endpoint placeholders need replacing before the forms will send:
`FORMSPREE_WEDDING_ID`, `FORMSPREE_OTHER_ID` (both in `site/enquire/index.html`) and `FORMSPREE_FUNERAL_ID` (in `site/funeral-flowers/index.html`).

## Deployment

See `docs/DEPLOYMENT.md`. Short version: Cloudflare Pages, connected to this repository, production branch `main`, framework preset **None**, build command **empty**, output directory **`site`**.

## Before launch

Work through `docs/PRELAUNCH_CHECKLIST.md`. Open questions and source conflicts are in `docs/DECISIONS.md`.

# Deployment — Cloudflare Pages

## Project settings

| Setting | Value |
|---|---|
| Source | This Git repository (GitHub `garthenor/Pip-Floral-Studio`) |
| Production branch | `main` |
| Framework preset | None |
| Build command | *(leave empty)* |
| Build output directory | `site` |
| Root directory | `/` (repo root) |
| Environment variables | none |
| Pages Functions | none — do not add a `functions/` directory |
| Smart Placement, Workers bindings, D1/KV/R2 | off — not used in V1 |

The first deployment needs at least one commit on `main`. Connect Cloudflare after the first push.

## How deploys work

- Every push to `main` deploys to production.
- Every push to any other branch (and every pull request) creates a **preview deployment** at `<hash>.<project>.pages.dev`. Use previews to test redirects, headers, forms and layout before merging.
- Previews must not be indexed. In the Pages project: **Settings → Access policy** (optional, gates previews behind Cloudflare Access) **and/or** add the header below to `_headers` scoped to the preview host. Cloudflare also sets `X-Robots-Tag: noindex` automatically on `*.pages.dev` hosts; verify with `curl -I` on a preview URL before relying on it.

  ```
  https://:project.pages.dev/*
    X-Robots-Tag: noindex
  ```

## Files Cloudflare reads from `site/`

- `_redirects` — permanent redirects from the previous site's routes (`/event-flowers`, `/enquiry-form`, `/privacy-policy`, with and without trailing slash). Test each on a preview: `curl -I https://<preview>/event-flowers` → `301` → `/other-services/`.
- `_headers` — security headers and CSP. The CSP allows only: self-hosted assets, Formspree (`form-action`, `connect-src`), and Cloudflare Web Analytics (`script-src` static.cloudflareinsights.com, `connect-src` cloudflareinsights.com). If a resource is ever added, extend the specific directive; do not loosen to wildcards.
- `404.html` — served automatically for unknown routes with a 404 status.
- `robots.txt`, `sitemap.xml` — both reference the canonical host; update if the domain differs (see DECISIONS.md D1).

## Custom domain

1. Confirm the canonical hostname (D1 in `docs/DECISIONS.md`). Everything in the build currently assumes `https://pipfloralstudio.com` (no `www`).
2. Pages project → **Custom domains** → add the apex and `www`. If the DNS zone is on Cloudflare this is automatic; otherwise add the CNAME records Cloudflare shows.
3. Set the non-canonical host to redirect to the canonical one (Bulk Redirects or a Page Rule: `www.pipfloralstudio.com/*` → `https://pipfloralstudio.com/$1`, 301).
4. Only after the domain resolves and redirects correctly: re-check `<link rel="canonical">`, `og:url`, `sitemap.xml` and `robots.txt` all use the final host (search the repo for `pipfloralstudio.com`), then submit the sitemap in Google Search Console.
5. Keep the old site's routes redirecting for at least a year.

## Cloudflare Web Analytics

1. Cloudflare dashboard → **Analytics & Logs → Web Analytics → Add a site**. Choose the custom domain. Copy the beacon token.
2. In every page in `site/`, near the bottom, un-comment the beacon `<script>` and replace `REPLACE_WITH_CF_ANALYTICS_TOKEN` with the token (nine files; a find-and-replace).
3. Alternatively, if the domain's DNS is proxied through Cloudflare, enable **automatic setup** and leave the script commented out — Cloudflare injects it at the edge. Pick one method, not both.
4. Web Analytics sets no cookies and sends no personal data; the Privacy page describes it. Do not add GA4, GTM or Meta Pixel — that is a V2 decision requiring a consent review.
5. The CSP already permits the beacon.

## Verifying a deployment

```
curl -sI https://<host>/ | grep -iE "content-security|x-frame|referrer|x-content"
curl -sI https://<host>/event-flowers | grep -iE "^HTTP|location"
curl -sI https://<host>/nothing-here | grep "^HTTP"        # expect 404
curl -s  https://<host>/robots.txt
```

Then in a browser: DevTools → Application → Cookies and Storage on each page. Expected: **no cookies** set by the site; `sessionStorage` only after a failed form submission. Cloudflare's `__cf_bm`/`cf_clearance` may appear if bot protection triggers — they are strictly necessary and covered by the Privacy page.

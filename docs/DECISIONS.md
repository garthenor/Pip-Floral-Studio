# Decisions log — open questions and source conflicts

Items marked **OPEN** need a decision from Anna / Jonny. Nothing here has been resolved by guessing: where the spec and copy disagree, the copy's wording was kept and the conflict recorded.

## Open — need approval before launch

**D1 — Canonical hostname. OPEN.**
The spec asks for one canonical host but none was supplied. The build uses `https://pipfloralstudio.com` (inferred from the email address) in canonical tags, Open Graph URLs, `sitemap.xml`, `robots.txt` and JSON-LD. Confirm apex vs `www`, then find-and-replace across `site/`.

**D2 — Footer contents: spec vs copy. OPEN.**
Spec footer list: location statement, *service area statement*, email, nav links, Funeral Flowers, *Privacy and Cookies*, Instagram.
Approved copy footer: "Based in Ceredigion, West Wales." / email / Instagram / Explore links / Additional: Funeral Flowers, *Privacy Policy*, *Cookie Policy* / "Studio not open for visitors." / © Pip Floral Studio.
Built as the copy is written. Consequences: (a) there is **no service-area statement** in the footer — adding one needs approved wording (the Home hero line "Based in Ceredigion, creating wedding flowers across South and West Wales, South West England and beyond." is a candidate); (b) "Privacy Policy" links to `/privacy/` and "Cookie Policy" links to `/privacy/#cookies` — both land on the single combined page. Options: A) keep as built; B) use the Home hero line as the footer service-area statement; C) merge the two links into one "Privacy and Cookies" link.

**D3 — Instagram URL. OPEN.**
Not supplied. The footer link currently points at `https://www.instagram.com/` (the site root). Replace with the profile URL in all nine pages before launch; also add it to `sameAs` in the Home JSON-LD.

**D4 — Funeral Flowers page: local place names. OPEN — conflict.**
Spec: "The page must naturally include the approved local wording naming Tregaron, Lampeter, Aberaeron and Cardigan." The approved copy for `/funeral-flowers/` contains **no such wording** (the only mention of Tregaron anywhere is on the Privacy page). No place names were added — that would be inventing copy. Needs an approved sentence, and a decision on where it sits (the "Based in Ceredigion." section is the natural home).

**D5 — Other Services CTA routing for installations and commissions. OPEN.**
Spec: installation and commission CTAs should "route to Other flowers with either Corporate event or Something else selected". The copy defines only four query values (`private-party`, `corporate`, `workshop`, `other`) and says spec-level links must use approved values. Both CTAs therefore use `?type=other` (Other flowers selected, enquiry type left for the visitor to choose). If preselection of "Something else" is wanted, approve a new query value, e.g. `?type=something-else`.

**D6 — 404 page copy. OPEN.**
No 404 copy exists in the approved document. The built page reads: "Page not found." / "The page you were looking for could not be found. It may have moved, or the address may have been typed incorrectly." / "You may be looking for one of these:" + the four required links. Approve or supply alternative wording.

**D7 — Enquiry type control label. OPEN (minor).**
The Wedding flowers / Other flowers radio group needs a visible group label for accessibility; the copy names the section "Enquiry type" but gives no on-page label. "Enquiry type" is used as the legend. Approve or replace.

**D8 — Hint text for conditionally-required contact fields. OPEN (minor).**
The copy specifies the rule ("Required: Yes, unless a telephone number is supplied") but not visitor-facing wording. To give instruction before errors occur, the funeral forms show hints: "Required unless a telephone number is supplied." / "Required unless an email address is supplied." Approve or replace.

**D9 — Error and "unavailable" messages on the Other and Funeral forms. OPEN (minor).**
The copy provides a submission-error block and validation messages only under the wedding form. They are generic, so the same texts are used on all three forms. Confirm that is acceptable.

**D10 — Wedding autoresponse. OPEN.**
The wedding success copy states "A copy of your enquiry has been sent to your email address." This depends on Formspree's Autoresponse feature (paid plan). Confirm the plan, or the sentence needs revisiting.

**D11 — Testimonial permissions. OPEN (from the copy's own TODOs).**
Home (F&T), Weddings (J&A, E&S, C&B) and About (unattributed quote) testimonials are published as supplied; the copy document flags that wording, attribution and permission still need confirming.

**D12 — Privacy page legal review. OPEN (from the copy's own TODO).**
Published as approved; requires the pre-launch legal check and a live-cookie check against the deployed site (see PRELAUNCH_CHECKLIST.md).

**D13 — Additional investment note. APPROVED (Jonny, 5 Sept 2026).**
A third contextual note was added to the wedding form for the "That is in line with what we are planning." option: "Great, thank you! Tell me a little more about your wedding and what you have in mind below." Not in the original copy document; add it there when next revised.

## Decisions taken in the build (for information)

- **Published output directory is `site/`**, with `content/` and `docs/` alongside in the repo. Keeps source documents versioned without publishing them.
- **No build step.** Header/footer are repeated per page (nine files). A generator was used once to produce them consistently but is not part of the repo; find-and-replace is the maintenance path.
- **Accent colours are decorative only.** Olive, pink and orange measure 2.3–2.9:1 against cream and green, below WCAG AA for text and UI boundaries. They appear as colour panels behind images, the footer band and stage markers. Text is always green on cream or cream on green (6.7:1).
- **Fonts**: `@font-face` rules are present but commented out until licensed files arrive; fallback stacks are Iowan Old Style/Palatino/Georgia and system sans-serif.
- **Placeholders** are grey hatched `<figure>`s labelled "Development placeholder" with the asset ID, `aria-hidden="true"`. They cannot be mistaken for approved imagery.
- **Logo** (supplied 5 Sept): stacked tulip + wordmark lock-up used in the header at ~60px tall, viewBox cropped to the artwork; fill set to palette green `#475445` (source file used `#485445`). Replaced the same day by the supplied horizontal lock-up (`logo-horizontal.svg`, ~46px tall in the header); the stacked version is kept in `assets/svg/logo.svg` for other uses. Favicons and web-app icons generated from the icon SVG. Originals kept in `docs/brand/`.
- **Enquire page headings**: each route has its own `<h1>` ("Tell me about your wedding." / "What are you planning?"); only the active route is in the DOM's rendered tree. Without JavaScript both routes and both forms are shown, stacked.
- **Enquire-page images** are hidden below 64em so they never compete with the form on phones.
- **Weddings testimonials** have no paired photographs (no confirmed image–couple relationship).
- **Structured data** (Home): `Florist` with name, URL, email, founder Anna Lambert, founding year 2021, locality Tregaron / Ceredigion, area served. All facts come from the approved copy. No opening hours, phone, street address, prices or ratings.
- **Session storage** is written only after a failed submission, cleared on success — matching the Privacy page.
- **Design tweaks after first deploy (5 Sept 2026)**: 16px corner radius site-wide; header Enquire button is outline style (filled when current); wedding-form progress indicator sticky at all viewport sizes.
- **Query strings** use the trailing-slash form `/enquire/?type=…` (spec) rather than `/enquire?type=…` (copy); Cloudflare Pages normalises to the trailing slash anyway.

## Deferred to V2 (record only)

CMS-backed case studies; rich portfolio filtering; seasonal and venue galleries; planning guides; semi-bespoke package builder and approval portal; integrated appointment booking; broader analytics and advertising measurement; GA4 and Meta Pixel with consent controls. None are partially built.

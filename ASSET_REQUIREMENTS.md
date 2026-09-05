# Pip Floral Studio website — asset requirements

Status: V1 build complete with development placeholders. **No production assets have been supplied yet.**

This list is written for Anna. It says exactly what the finished website needs, where each item goes, and what shape it should be. It was produced by reconciling the photography brief against the pages as actually built, so the counts below are what the templates hold — not a wish list.

Every placeholder on the site is labelled with an ID (for example `home-hero`). Those IDs appear in the tables below, so a file named to match can be dropped straight into place.

Nothing has been substituted: no stock images, no generated artwork, no redrawn logo, no invented credits. Each placeholder is a plain grey hatched block that says "Development placeholder".

---

## Summary

| Group | Launch-critical | Optional / enhancement |
|---|---|---|
| Brand (logo, favicons, fonts, social image) | 4 items | 1 |
| Home photography | 5 | 3 |
| Weddings photography | 14 | 4 |
| The Process photography | 3 | 3 |
| About photography | 2 | 2 |
| Other Services photography | 3 | 3 |
| Funeral Flowers photography | 2 | 1 |
| Enquire photography | 0 | 2 |
| Floral SVG elements | 0 | 3–5 |

**Minimum to launch: 29 photograph slots plus the 4 brand items.** That sits inside the brief's 25–35 image estimate. Several photographs can be reused in more than one place (see "Reuse" notes), which brings the distinct count down further — realistically **20–24 distinct photographs** will fill the whole site.

---

## A. How photographs are handled

- Supply the **largest original JPEG** you have (or the photographer's full-resolution export). Do not resize, crop or compress first. Do not send screenshots or Instagram downloads.
- The build creates every web size and format (WebP with JPEG fallback, several widths per image, mobile crops where noted). You never need to make these yourself.
- Where a "mobile crop" is marked **Yes**, a companion portrait-orientation version of the same scene is helpful but not essential — a wide image will be centre-cropped otherwise, so keep important subjects away from the edges.
- **Minimum dimensions** are the smallest that will look sharp on a large screen. Bigger is always fine.
- Suggested filename: the **ID** from the tables, followed by the photographer's name, e.g. `weddings-hero-jane-smith.jpg`. If you prefer the brief's format (`service-subject-location-photographer-sequence.jpg`) that is fine too — just include the ID somewhere in the name or in the accompanying list so each file can be matched to its slot.

### For every photograph, please also confirm
1. Pip Floral Studio has permission to publish it on the website.
2. Whether the photographer requires a credit, and the exact published name they want.
3. Any restriction on cropping or use.
4. That any identifiable people have agreed to appear (essential for funeral images and for the "people" gallery image).

A one-line-per-image list (filename · wedding/event · venue · photographer · permission · restrictions · people not to show) is all that's needed. **Photographer credits will be shown as a small caption beneath the image** wherever a credit is required; nothing is shown otherwise.

---

## B. Brand assets — launch-critical

| ID | Item | Purpose and placement | Format | Notes |
|---|---|---|---|---|
| **B1** | Logo — primary | Header on every page (links to Home). Currently a text stand-in reading "pip floral studio". | SVG (vector), dark green `#475445` on transparent | The tulip line drawing and "pip floral studio" wordmark from the palette artwork. Also supply a **cream version** for the dark green footer if one exists. Please do not send a JPEG/PNG only — the header needs a vector to stay crisp. |
| **B2** | Logo — mark only | Favicon source; possible use as a small decorative mark | SVG | The tulip on its own, if it exists as a separate file. |
| **B3** | Favicons and app icons | Browser tab icon, phone home-screen icon | Generated from B2 by the build: `favicon.ico`, `icon.svg`, `apple-touch-icon.png` (180×180), `icon-192.png`, `icon-512.png` | Nothing needed from you beyond B2. Currently no favicon is set. |
| **B4** | Fonts — Recoleta (Medium or Regular) and Rubik (variable, or Regular + Medium + Italic) | All headings (Recoleta); all body text, navigation, labels and buttons (Rubik) | WOFF2 (web font files) | Must be **licensed for self-hosted web use**. Recoleta is a commercial typeface: check the licence bought covers web embedding for this domain. Rubik is open-source (SIL OFL) and can be downloaded freely. Until supplied, the site uses similar system fonts. |
| **B5** | Social sharing image | Shown when a page is shared on Instagram, WhatsApp, Facebook, iMessage | JPEG, exactly 1200×630, under 300 KB | One strong, wide wedding image with no text on it — it can be a crop of the homepage hero. Filename: `pip-floral-studio-og-default.jpg`. |

Optional: **B6** — a cream-on-green logo lock-up for the footer (if not covered in B1).

---

## C. Photography by page

Legend — **Crit.** = launch-critical. **Mobile crop** = a portrait companion version is useful. Reuse notes say where one image can safely do two jobs.

### Home (`/`)

| ID | Crit. | Placement | Subject | Orientation / ratio | Min. size | Mobile crop | Alt text needed | Reuse |
|---|---|---|---|---|---|---|---|---|
| `home-hero` | Yes | Top of page, beside the headline | The single best wedding image: flowers visibly shaping a real space, colour, atmosphere. Not a close-up bouquet. | Landscape, 3:2 | 2400 × 1600 | Yes | Yes — describe the setting and flowers | Also B5 (social image) via crop |
| `home-what-1-wide` | Yes | "What could flowers do" — first image | Wide ceremony or reception view | Landscape, 16:9 | 2400 × 1350 | No | Yes | Can reuse `weddings-scene-2-reception` |
| `home-what-2-installation` | Yes | "What could flowers do" — second image | A significant installation or focal point | Landscape, 3:2 | 1600 × 1067 | No | Yes | Can reuse `weddings-gallery-4-installation` |
| `home-what-3-detail` | Optional | "What could flowers do" — third image | Close detail: colour, texture, seasonal character | Portrait, 3:4 | 1000 × 1333 | No | Yes | Can reuse `weddings-gallery-5-colour-detail` |
| `home-designed` | Yes | "It starts with your wedding" (dark green section) | One expressive, personal image — bouquet, table or unusual detail | Portrait, 4:5 | 1200 × 1500 | No | Yes | Can reuse `weddings-gallery-1-bouquet` |
| `home-anna-portrait` | Yes | "Meet Anna" | Primary portrait of Anna, relaxed, looking towards camera, room around her | Portrait, 4:5 | 1200 × 1500 | No | Yes — "Anna, florist and designer at Pip Floral Studio…" | Same file as `about-anna-primary-portrait` |
| `home-sustainability` | Optional | "How I work with flowers" | British-grown stems, foam-free mechanics, or flowers being prepared | Landscape, 3:2 | 1600 × 1067 | No | Yes | Can reuse `process-3-flowers-conditioning` |
| `home-other-services` | Optional | "Flowers for other occasions" | Non-wedding work: party table, workshop or seasonal installation | Square, 1:1 | 1200 × 1200 | No | Yes | Can reuse any Other Services image |

### Weddings (`/weddings/`)

| ID | Crit. | Placement | Subject | Orientation / ratio | Min. size | Mobile crop | Alt text | Reuse |
|---|---|---|---|---|---|---|---|---|
| `weddings-hero` | Yes | Top of page | High-impact wedding image, **different from the home hero**: complete ceremony/reception setting or an installation with a sense of place | Landscape, 3:2 | 2400 × 1600 | Yes | Yes | — |
| `weddings-scene-1-ceremony-wide` | Yes | "Setting the scene" — full width | Wide ceremony setting | Very wide, 21:9 | 2800 × 1200 | Yes | Yes | — |
| `weddings-scene-2-reception` | Yes | "Setting the scene" — left | Reception room | Landscape, 3:2 | 1600 × 1067 | No | Yes | → `home-what-1-wide` |
| `weddings-scene-3-tablescape` | Yes | "Setting the scene" — right | Tablescape, or entrance/staircase/marquee/architectural feature | Landscape, 3:2 | 1600 × 1067 | No | Yes | — |
| `weddings-gallery-1-bouquet` | Yes | "A few possibilities" gallery | Bouquet or personal flowers | Portrait, 3:4 | 1200 × 1600 | No | Yes | → `home-designed`, `weddings-service-personal` |
| `weddings-gallery-2-ceremony` | Yes | Gallery | Ceremony flowers | Landscape, 3:2 | 1600 × 1067 | No | Yes | → `weddings-service-ceremony` |
| `weddings-gallery-3-reception-tables` | Yes | Gallery | Reception tables | Landscape, 3:2 | 1600 × 1067 | No | Yes | → `weddings-service-reception` |
| `weddings-gallery-4-installation` | Yes | Gallery | Statement installation | Landscape, 3:2 | 1600 × 1067 | No | Yes | → `weddings-service-installation`, `home-what-2-installation` |
| `weddings-gallery-5-colour-detail` | Yes | Gallery | Colourful detail | Square, 1:1 | 1200 × 1200 | No | Yes | → `home-what-3-detail` |
| `weddings-gallery-6-restrained` | Optional | Gallery | A quieter, more restrained design | Square, 1:1 | 1200 × 1200 | No | Yes | — |
| `weddings-gallery-7-people` | Optional | Gallery | Flowers being enjoyed by people | Square, 1:1 | 1200 × 1200 | No | Yes | Needs people's permission |
| `weddings-direction` | Yes | "Finding the right floral direction" (dark green section) | Seasonal, varied palette — shows colour/form/texture choices | Portrait, 4:5 | 1200 × 1500 | No | Yes | — |
| `weddings-service-personal` | Yes | "Flowers throughout your wedding" — Personal flowers | Personal flowers | Landscape, 3:2 | 1200 × 800 | No | Yes | Crop of gallery-1 |
| `weddings-service-ceremony` | Yes | — Ceremony flowers | Ceremony | Landscape, 3:2 | 1200 × 800 | No | Yes | = gallery-2 |
| `weddings-service-reception` | Yes | — Reception flowers | Reception | Landscape, 3:2 | 1200 × 800 | No | Yes | = gallery-3 |
| `weddings-service-installation` | Yes | — Installations | Installation | Landscape, 3:2 | 1200 × 800 | No | Yes | = gallery-4 |
| `weddings-anna-working` | Optional | "I'm Anna" | Anna working, installing or carrying flowers — not the main portrait | Portrait, 4:5 | 1200 × 1500 | No | Yes | → `about-anna-making` |
| `weddings-process-support` | Optional | "From enquiry to wedding day" | Preparation, mechanics, buckets of conditioned flowers, loading, or a finished design being checked | Portrait, 3:4 | 1200 × 1600 | No | Yes | → any Process image |

Testimonials on this page deliberately have **no photographs beside them**, because no image has been confirmed as belonging to a quoted couple. If a photo from J&A, E&S or C&B's wedding is available with permission, say so and it can be paired.

### The Process (`/the-process/`)

| ID | Crit. | Placement | Subject | Orientation / ratio | Min. size | Mobile crop | Alt text | Reuse |
|---|---|---|---|---|---|---|---|---|
| `process-hero-moodboard` | Yes | Top of page | Early ideas: samples, sketches, swatches or moodboard work | Landscape, 3:2 | 2000 × 1333 | No | Yes | — |
| `process-2-anna-conversation` | Optional | Stage 03 "A chance to explore the ideas" | Anna in conversation or at a venue, natural not posed | Portrait, 4:5 | 1000 × 1250 | No | Yes | — |
| `process-3-flowers-conditioning` | Yes | Stage 09 "The flowers arrive" | Flowers arriving or being conditioned in buckets | Landscape, 3:2 | 1600 × 1067 | No | Yes | → `home-sustainability` |
| `process-5-installation-build` | Yes | Stage 10 "Setting everything in place" | An installation being built | Portrait, 4:5 | 1000 × 1250 | No | Yes | → `weddings-anna-working` if Anna is in it |
| `process-7-bunching` | Optional | Stage 11 "Making the most of the flowers" | Clearance, bunching, or flowers ready to take home | Landscape, 3:2 | 1600 × 1067 | No | Yes | — |
| `process-6-finished-venue` | Optional | Full-width band before the final call to action | Finished venue before guests arrive | Very wide, 21:9 | 2800 × 1200 | Yes | Yes | → `weddings-scene-1-ceremony-wide` |

Stages without a natural photograph (01, 02, 04–08) intentionally carry none. Please don't supply weak "instructional" images to fill them.

### About (`/about/`)

| ID | Crit. | Placement | Subject | Orientation / ratio | Min. size | Mobile crop | Alt text | Reuse |
|---|---|---|---|---|---|---|---|---|
| `about-anna-primary-portrait` | Yes | Top of page | Primary portrait — Anna looking towards the camera, studio/outdoors/with flowers, space around her, not a corporate headshot | Portrait, 4:5 | 1600 × 2000 | No | Yes | = `home-anna-portrait` |
| `about-anna-making` | Yes | "Flowers have always been part of my life" | Anna making or arranging, working naturally | Portrait, 3:4 | 1200 × 1600 | No | Yes | → `weddings-anna-working` |
| `about-detail-colour-texture` | Optional | "I'm happiest when I'm creating" | A detail connecting flowers with colour, texture or Anna's textile background | Square, 1:1 | 1200 × 1200 | No | Yes | — |
| `about-anna-studio-landscape` | Optional | "Your ideas, with clear guidance" | Anna within the studio or the surrounding landscape; may be informal | Landscape, 3:2 | 1600 × 1067 | No | Yes | — |

### Other Services (`/other-services/`)

| ID | Crit. | Placement | Subject | Orientation / ratio | Min. size | Mobile crop | Alt text | Reuse |
|---|---|---|---|---|---|---|---|---|
| `other-hero` | Yes | Top of page | Best non-wedding work with a sense of occasion | Landscape, 3:2 | 2000 × 1333 | No | Yes | Can be the same as the strongest of the five below |
| `other-private-party` | Yes | Private parties | Party or dinner flowers | Landscape, 3:2 | 1600 × 1067 | No | Yes | → `home-other-services` |
| `other-corporate-event` | Yes | Corporate events | Corporate event, launch or larger organised event | Landscape, 3:2 | 1600 × 1067 | No | Yes | — |
| `other-workshop` | Optional | Floral workshops | Workshop in progress or completed pieces | Landscape, 3:2 | 1600 × 1067 | No | Yes | — |
| `other-seasonal-installation` | Optional | Seasonal installations | Entrance, staircase, mantelpiece or window installation | Portrait, 4:5 | 1200 × 1500 | No | Yes | — |
| `other-creative-commission` | Optional | Creative commissions | Shoot, campaign, set or launch work | Landscape, 3:2 | 1600 × 1067 | No | Yes | — |

If there isn't strong real work for a category, tell us and that section's image will be removed rather than filled with a wedding photograph.

### Funeral Flowers (`/funeral-flowers/`)

This page uses fewer, larger images with more space. **Restraint matters here.** No identifiable mourners, no visible cards, names or messages, unless explicitly agreed.

| ID | Crit. | Placement | Subject | Orientation / ratio | Min. size | Mobile crop | Alt text | Reuse |
|---|---|---|---|---|---|---|---|---|
| `funeral-1-full-tribute` | Yes | Full-width band below the introduction | A full tribute shown clearly, calm and natural | Very wide, 21:9 | 2800 × 1200 | Yes | Yes | — |
| `funeral-2-soft-detail` | Yes | "Arrangements for the funeral and gathering" | Softer detail — seasonal flowers and texture | Portrait, 4:5 | 1200 × 1500 | No | Yes | — |
| `funeral-3-natural-garden` | Optional | "Working carefully with natural materials" | Natural or garden-inspired arrangement; or flowers in their setting where respectful | Portrait, 3:4 | 1200 × 1600 | No | Yes | — |

### Enquire (`/enquire/`)

Both are optional, shown only on wide screens beside the form, and hidden on phones so they never compete with the form.

| ID | Crit. | Placement | Subject | Orientation / ratio | Min. size | Alt text | Reuse |
|---|---|---|---|---|---|---|---|
| `enquire-wedding-quiet` | Optional | Beside the wedding form | One quiet wedding image | Portrait, 3:4 | 1000 × 1333 | Decorative — no alt text needed | Any calm wedding image |
| `enquire-other-neutral` | Optional | Beside the Other flowers form | One neutral floral image that suits any occasion. **Not a funeral image.** | Portrait, 3:4 | 1000 × 1333 | Decorative | Any Other Services image |

### Privacy and Cookies, 404, form states
No photography. Nothing needed.

---

## D. Hand-drawn floral SVG elements — optional

Anna's own line drawings, for use as light compositional accents (for example beside a heading or at the corner of a colour panel). They are not needed for launch and will not be substituted with anything else.

| ID | Item | Format | Notes |
|---|---|---|---|
| `svg-floral-1` … `svg-floral-5` | 3–5 individual elements: single stems, a small cluster, a leaf or two | SVG, single colour (dark green `#475445`), transparent background, tidy paths | Each drawing as its own file. They will be marked decorative for screen readers and placed clear of text and controls. If they only exist on paper or as scans, a clean high-resolution scan (PNG, 300 dpi+) can be traced later. |

---

## E. Things reviewed when assets arrive

When the files come in, each will be checked and flagged here if:
- the orientation doesn't suit its slot (for example a portrait supplied for a 21:9 band);
- the resolution is below the minimum listed;
- important subjects sit too close to an edge for the mobile crop;
- a credit or permission is missing;
- a funeral image includes identifiable people or private details.

Anything flagged will be listed with a suggested alternative rather than forced into place.

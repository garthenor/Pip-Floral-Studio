# Pip Floral Studio: V1 Build Specification
Status: Ready for repository handoff
## Read this first
Build the initial Pip Floral Studio website as a lean static site using semantic HTML, CSS and vanilla JavaScript.
The final photography, logo files, hand-drawn floral SVGs, font files and other production assets are not yet included. Do not treat the current repository as a complete asset pack.
Before implementing visual placeholders, inspect the repository and create a file named `ASSET_REQUIREMENTS.md`. It must list every asset required to complete the build, grouped by page and component. For each item include:
- Purpose and intended placement
- Recommended orientation or aspect ratio
- Minimum useful dimensions
- Whether a mobile alternative crop is required
- File format
- Suggested filename
- Alt-text requirement
- Photographer credit or permission requirement, where relevant
- Whether another supplied asset could safely be reused
Use the photography brief as the starting point, but reconcile it against the final templates and components you build.
Do not download stock imagery, generate substitute floral artwork, redraw the Pip identity, fabricate photographer credits or present temporary assets as final. Where an asset is absent, use a clearly labelled neutral development placeholder that cannot be mistaken for approved material.
## Source documents
Use these as the source of truth:
- `content/pip-floral-studio-v1-approved-copy.md`
- `content/pip-floral-studio-v1-photography-requirements.md`
- The supplied Pip Floral Studio palette artwork and any later approved brand assets
Approved copy must not be rewritten, condensed, expanded or silently corrected. Preserve punctuation, capitalisation and wording unless a change is explicitly approved.
Build notes, comments and content TODOs in the copy document are instructions, not public page content.
If the source documents conflict, stop and record the conflict rather than deciding which wording to publish.
## V1 scope
V1 includes:
- Home
- Weddings
- The Process
- About
- Other Services
- Funeral Flowers
- Enquire
- Privacy and Cookies
- 404
V1 does not include:
- Case studies
- A CMS
- A blog or journal
- The future semi-bespoke package portal
- Online appointment booking
- GA4
- Meta Pixel
- Marketing email collection
- An Instagram feed
- A full-screen image lightbox
Keep the codebase easy to extend for V2, but do not add framework, CMS or application infrastructure for hypothetical future requirements.
## Technology
Use:
- Semantic HTML5
- Modern CSS
- Minimal vanilla JavaScript
- Formspree for form submission
- Cloudflare Pages for hosting
- Cloudflare Web Analytics
- Git-based deployment
Do not introduce Astro, React, Vue, a CSS framework, a component library, a build-time CMS or a client-side router.
A small build script is acceptable only if it materially reduces repeated markup or reliably handles image processing. The published output must remain a conventional static site and must not require JavaScript for page navigation or core content.
Prefer no runtime dependencies. Document any dependency that is introduced and explain why it is required.
## Routes
Use clean URLs:
- `/`
- `/weddings/`
- `/the-process/`
- `/about/`
- `/other-services/`
- `/funeral-flowers/`
- `/enquire/`
- `/privacy/`
- `/404.html`
Use one canonical hostname consistently once the production domain is connected.
## Redirects
Create a Cloudflare Pages `_redirects` file in the published output.
Required permanent redirects:
```text
/event-flowers /other-services/ 301
/event-flowers/ /other-services/ 301
/enquiry-form /enquire/ 301
/enquiry-form/ /enquire/ 301
/privacy-policy /privacy/ 301
/privacy-policy/ /privacy/ 301
```
Preserve any current route that is unchanged. Test redirects on the Cloudflare preview deployment before launch.
## Global header
The header contains:
- Pip Floral Studio logo, linked to Home
- Weddings
- The Process
- About
- Other Services
- Enquire, treated as the primary action
Funeral Flowers is not included in the primary navigation.
Desktop navigation should remain calm and uncluttered. Mobile navigation must be fully operable by keyboard, close reliably and return focus to its trigger.
The current page should be identifiable in navigation without relying on colour alone.
## Global footer
Use the approved footer copy and links from the master copy.
It must include:
- Location statement
- Service area statement
- Clickable email address
- Weddings
- The Process
- About
- Other Services
- Enquire
- Funeral Flowers
- Privacy and Cookies
- Instagram
Funeral Flowers must remain available in the footer on every page.
Do not add a public telephone number or full studio address.
## Visual direction
The site should feel creative, calm, colourful, personal and assured. It should not feel like a generic luxury wedding template.
Avoid:
- Overly sparse layouts that make the site feel unfinished
- Excessive animation
- Script-style decorative type
- Generic botanical graphics
- Artificial paper textures unless supplied and approved
- Large quantities of centred copy
- Carousels that hide important content
- Full-screen lightboxes
Use photography generously while preserving breathing room and readable page rhythm.
## Typography
Use:
- Recoleta for display headings
- Rubik for body copy, navigation, labels and controls
Both fonts will be hosted locally. Font files are not yet included.
Define a restrained type scale that works from small phones through large desktops. Maintain comfortable line lengths for body copy. Avoid very light font weights for essential text.
Provide robust fallback stacks until the production font files are supplied.
## Colour palette
Use the approved palette:
- Olive: `#879655`
- Pink: `#BA81A4`
- Cream: `#F0EBD9`
- Dark green: `#475445`
- Orange: `#EE7B30`
Treat the dark green and cream as the primary text and background relationship. Use olive, pink and orange with intention rather than assigning one accent to every component.
Check every text, control, focus and link combination for accessible contrast. Brand colours may need to be paired with dark text rather than white where contrast is insufficient. Do not alter the approved palette values, but do not use an inaccessible pairing.
## Floral elements
Anna will supply hand-drawn floral elements as SVG files. They are not yet included.
Use them as supporting compositional elements rather than repeated decoration. SVGs must not interfere with reading order, focus or controls. Decorative SVGs should be hidden from assistive technology. Meaningful SVGs need accessible labels.
Do not create substitute floral drawings.
## Layout system
Create a consistent layout system covering:
- Maximum content widths
- Reading-width text columns
- Full-width photography
- Split text and image sections
- Editorial image grids
- Vertical spacing
- Buttons and text links
- Form controls
- Testimonial treatment
- Call-to-action sections
Pages should share a recognisable system without all using the same section pattern.
The page order and approved section hierarchy come from the master copy. Do not add promotional sections merely to balance a template.
## Page implementation
### Home
Use the approved sections in their existing order, excluding Selected Weddings. V1 has no case-study section, case-study cards or links to unpublished work.
The page must still demonstrate real weddings through strong photography. Keep the Funeral Flowers signpost near Other Services and make it easy to find without allowing it to dominate the wedding journey.
### Weddings
This is the main service page and should carry the richest wedding photography.
Keep personal flowers, ceremony flowers, reception flowers, installations and movement between spaces easy to understand. Preserve the minimum-spend wording exactly.
Testimonials must use approved wording and attribution. Do not infer that an adjacent photograph belongs to a quoted couple unless that relationship is confirmed.
### The Process
Present the process as a clear sequence from initial enquiry through clearance after the wedding.
The page should feel reassuring rather than procedural. On smaller screens, do not create a horizontal timeline that requires sideways scrolling.
### About
Give Anna's portrait and maker story appropriate prominence. Use a mixture of portrait, working and contextual imagery when supplied.
Do not add invented biography, credentials, awards or studio details.
### Other Services
Retain Private Parties, Corporate Events, Workshops, Seasonal Installations and Creative Commissions as page sections.
Seasonal Installation and Creative Commission are intentionally not separate options in the enquiry form. Their calls to action should route to Other flowers with either Corporate event or Something else selected, depending on context.
### Funeral Flowers
Use the approved gentler visual and content treatment. This page has its own enquiry form.
Keep imagery restrained and spacious. Do not use rotating galleries, promotional overlays or intrusive calls to action.
The page must naturally include the approved local wording naming Tregaron, Lampeter, Aberaeron and Cardigan, alongside the wider South and West Wales service area.
### Enquire
The page contains two top-level choices:
- Wedding flowers, selected by default
- Other flowers
Switching the choice updates the introduction and visible form without navigating away. The selection must be a real labelled form control, keyboard accessible and announced correctly to assistive technology.
Links from Other Services open `/enquire/?type=other`. More specific links use the approved query values in the master copy and preselect the matching option.
Funeral flowers appears only within the Other flowers enquiry-type selector. Do not place it in the top-level toggle or use funeral-focused copy in the default wedding view.
The dedicated Funeral Flowers page continues to use its own form.
### Privacy and Cookies
Publish the approved combined page at `/privacy/`.
Do not display a consent banner in V1 unless testing shows that a non-essential cookie or equivalent technology has been introduced.
Before launch, confirm the actual Cloudflare, Formspree and browser-storage behaviour against this page. Any later introduction of GA4, Meta Pixel or embedded third-party services requires a privacy and consent review before activation.
### 404
Create a concise branded 404 page with routes to:
- Home
- Weddings
- Funeral Flowers
- Enquire
Do not add novelty copy that conflicts with the site's tone.
## Photography and galleries
Follow `content/pip-floral-studio-v1-photography-requirements.md`.
Assets are not yet supplied. The build must not be considered content-complete until the asset list has been reconciled with Anna's handover.
Requirements:
- Use responsive image markup
- Provide appropriate width and density variants
- Reserve image dimensions to prevent layout movement
- Prefer modern formats with a reliable fallback where the workflow supports them
- Lazy-load images below the initial viewport
- Do not lazy-load the likely largest visible hero image
- Set useful alt text for meaningful images
- Use empty alt text for purely decorative images
- Preserve required photographer credits
- Do not open gallery images in a full-screen lightbox
Images may expand within the page layout or be presented in an editorial grid, but clicking them should not unexpectedly take over the screen.
## Forms
Implement the exact fields, conditions, supporting copy, validation and success messages in the master copy.
Use Formspree endpoints supplied later. Keep endpoint values easy to replace and do not commit private account credentials. A public Formspree form endpoint is configuration, not a secret, but it should still be documented clearly.
Forms required:
- Wedding enquiry
- Other enquiry
- Funeral Flowers enquiry on the Funeral Flowers page
- Funeral Flowers variant within Other enquiries
### Form behaviour
- Use native form controls wherever possible
- Associate every field with a visible label
- Mark required fields in text and programmatically
- Place errors beside the relevant field
- Announce validation and submission messages to assistive technology
- Move focus to the first error after failed validation
- Retain entered answers after a submission error
- Clear stored answers after successful submission
- Prevent duplicate submission while a request is in progress
- Do not lose answers when the Wedding flowers / Other flowers choice changes accidentally
- Respect the approved conditional required fields for email and telephone
- Do not require a funeral date
- Do not ask for a funeral time
- Do not add a telephone field to the wedding form
Use session storage only for temporary recovery after a failed submission. Clear it after success and allow it to disappear when the browser tab is closed.
### Wedding progress
The wedding form uses the approved progressive reveal:
- You
- Wedding
- Flowers
- Inspiration
Previous sections remain visible and editable. The progress indicator sits below the form on desktop and remains sticky on mobile.
Do not hide essential context or errors behind animation. Respect reduced-motion preferences.
### Spam protection
Start with Formspree's default spam protection. Do not add an interactive challenge unless real submission behaviour shows it is necessary.
### Form notifications
Configure and test:
- The approved email subject formats
- Delivery to Anna's Google Workspace inbox
- Automatic copy to wedding enquirers where supported and approved
- Success and error states
- Submission source and timestamp
Do not expose submissions or personal details in analytics, URLs, logs or the page source.
## Accessibility
Target WCAG 2.2 AA.
At minimum:
- Include a skip-to-content link
- Use one clear page-level heading
- Maintain logical heading order
- Use landmarks appropriately
- Support complete keyboard operation
- Provide visible focus styles
- Meet text and control contrast requirements
- Maintain usable touch targets
- Support browser zoom and text resizing
- Respect `prefers-reduced-motion`
- Avoid content that flashes
- Ensure mobile navigation manages focus correctly
- Do not rely on colour alone
- Provide useful form instructions before errors occur
- Test forms with a screen reader and keyboard
- Ensure SVG decorations do not create noise
Do not use ARIA to recreate behaviour already provided by native HTML.
## Responsive behaviour
Design mobile-first.
Test at a representative range rather than a small set of device-specific breakpoints. Pay particular attention to:
- Long Recoleta headings
- Navigation wrapping
- Hero cropping
- Editorial image grids
- Form labels and error messages
- Sticky wedding-form progress
- Footer links
- Landscape tablet widths
- Very narrow phones
- Large desktop reading widths
No page should scroll horizontally at 320 CSS pixels wide.
## Search implementation
For every public page provide:
- Unique page title
- Unique meta description
- Canonical URL
- One descriptive H1
- Open Graph title, description and image
- Appropriate social-card metadata
- Descriptive document language
Also provide:
- `sitemap.xml`
- `robots.txt`
- Favicons and web app icons once supplied
- Structured data appropriate to a local florist, using only verified business facts
- Meaningful internal links
- Redirects from current routes
Do not create doorway location pages or repeat lists of places unnaturally. Use the approved service-area copy.
Exclude preview deployments from indexing. Confirm production indexing only after the canonical domain and redirects are correct.
## Performance
Keep the site lightweight.
Requirements:
- No unnecessary JavaScript
- No third-party font requests
- No embedded social feeds
- No layout movement caused by images or fonts
- Preload only the assets genuinely required for the first viewport
- Use long-lived caching for fingerprinted static assets where applicable
- Avoid render-blocking scripts
- Keep CSS organised and remove unused rules
- Test representative pages on a mobile connection
Photography will be the main page-weight risk. Generate appropriately sized files rather than serving original camera exports.
## Security and headers
Provide a Cloudflare Pages `_headers` file suitable for a static site.
Include appropriate production headers for:
- Content type sniffing protection
- Referrer policy
- Framing protection
- Permissions policy
- Content Security Policy
The Content Security Policy must allow only the actual resources required by the site, including the final Formspree submission destination and Cloudflare Web Analytics. Do not use a broad wildcard policy simply to make development easier.
Test headers on the deployed preview because Cloudflare Pages applies `_headers` to the published static output.
## Cloudflare Pages deployment
Use a Git-connected Cloudflare Pages project.
The site is static and should not use Pages Functions unless a confirmed requirement cannot be met without them. Form submissions go directly to Formspree.
Document:
- Production branch
- Preview deployment behaviour
- Build command, if any
- Published output directory
- Custom-domain setup
- Redirect and header file locations
- Cloudflare Web Analytics activation
- Any environment-specific configuration
Do not enable Smart Placement, Workers bindings, databases or other platform services for V1.
Before the custom domain is switched, validate the site on a Cloudflare preview deployment.
## Analytics
Enable Cloudflare Web Analytics only.
Do not add:
- GA4
- Google Tag Manager
- Meta Pixel
- Advertising audiences
- Cross-site tracking
Do not send form contents, names, email addresses, telephone numbers, venue details or free-text answers to analytics.
The future addition of GA4 or Meta Pixel is outside V1 and must include a consent and privacy review.
## Content integrity
During implementation:
- Preserve approved copy exactly
- Keep Welsh place names and punctuation accurate
- Do not reintroduce removed services or wording
- Do not add a phone number
- Do not state that the studio is open to visitors
- Do not imply VAT applies
- Do not change the £1,500 minimum-spend wording
- Do not invent availability, response times, package prices or service boundaries
- Do not call the booking payment anything other than the approved term in the copy
- Do not add case studies
- Do not present placeholders as real weddings or testimonials
If a correction appears necessary, list it separately for approval rather than changing the public copy.
## Repository deliverables
Claude should produce:
1. The complete static site source
2. A clear published output directory ready for Cloudflare Pages
3. `ASSET_REQUIREMENTS.md`
4. `README.md` covering local preview, editing and deployment
5. `_redirects`
6. `_headers`
7. `robots.txt`
8. `sitemap.xml`
9. Form configuration documentation
10. A concise pre-launch checklist
11. A record of any unresolved decisions or source conflicts
## Required asset report
`ASSET_REQUIREMENTS.md` is a required deliverable, not an optional note.
Claude must:
- Inspect every finished page and component
- Compare the implementation with the photography brief
- List all missing production assets
- Separate launch-critical assets from optional enhancements
- Identify where one asset can serve multiple placements
- Flag unsuitable dimensions, orientation or cropping when supplied assets are reviewed
- List required logo variants, font files, floral SVGs, icons, social images and favicons as well as photography
- Never fill a missing requirement with an unapproved external or generated asset
The report should be useful to Anna without requiring her to inspect the codebase.
## Pre-launch acceptance
The site is ready to launch only when:
- All public pages are complete
- Final approved copy is present
- Launch-critical assets have been supplied and replaced
- Photographer permissions and credits are recorded
- Forms have been submitted successfully in production-like testing
- Form failures preserve answers
- Form notifications reach Anna
- Redirects work
- Canonical URLs use the final domain
- Privacy and Cookies matches the live implementation
- The deployed site has been checked for actual cookies and storage
- Keyboard and screen-reader form testing is complete
- Colour contrast is verified
- Mobile layouts are checked
- Images are responsive and optimised
- Metadata, sitemap and robots directives are correct
- Preview deployments are not indexed
- No case-study links, draft notes, TODOs or development placeholders are public
- Cloudflare Web Analytics is active without personal information being sent
- A useful 404 response is served
## Deferred to V2
Record these as future scope only:
- CMS-backed case studies
- Rich portfolio filtering
- Seasonal and venue galleries
- Planning guides
- Semi-bespoke package builder and approval portal
- Integrated appointment booking
- Broader analytics and advertising measurement
- GA4 and Meta Pixel with appropriate consent controls
Do not build partial versions of these features into V1.

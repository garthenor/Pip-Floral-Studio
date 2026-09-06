# Forms — configuration and behaviour

Four forms, three Formspree endpoints. **Live as of 6 Sept 2026** — real endpoint IDs are wired in:

| Form | Page | Formspree endpoint | Success message shown |
|---|---|---|---|
| Wedding enquiry | `/enquire/` (default view) | `xljewlre` — `site/enquire/index.html` | Wedding success (includes "A copy of your enquiry has been sent…") |
| Other enquiry | `/enquire/` → Other flowers | `xyeydpzg` — `site/enquire/index.html` | General success, or the funeral variant when "Funeral flowers" is chosen |
| Funeral Flowers variant | `/enquire/` → Other flowers → Funeral flowers | same endpoint as Other enquiry | Funeral success |
| Funeral Flowers enquiry | `/funeral-flowers/` | `xeaqlzoo` — `site/funeral-flowers/index.html` | Funeral page success |

A Formspree form ID is public configuration, not a secret. It lives in the `action` attribute of each `<form>` so the form also works with JavaScript disabled.

Still to do in the Formspree dashboard before launch (see checklist below): notification email, domain restriction, spam-protection check, and the wedding autoresponse decision (D10).

## Formspree account setup (per form)

1. ~~Create three forms in Formspree named **Wedding enquiry**, **Other enquiry**, **Funeral flowers enquiry**.~~ Done (6 Sept 2026).
2. Set the notification email to Anna's Google Workspace address. Verify it.
3. **Spam protection**: leave Formspree's defaults on (honeypot is already in the markup as `_gotcha`). Do not enable reCAPTCHA unless real spam appears.
4. **Wedding form only** — autoresponder: enable Formspree's *Autoresponse* (Plugins → Autoresponse), sending to the `email` field. The approved success copy tells the enquirer a copy has been sent, so this must be on before launch, or that sentence must be reviewed. Autoresponse is a paid-plan feature on Formspree — confirm the plan (see D10 in `DECISIONS.md`).
5. Allowed domains: restrict each form to the production domain (and the `*.pages.dev` preview domain while testing).
6. Optional: turn on Formspree's *Submission archive* so entries are retained in the dashboard (the Privacy page says they are).

## What Anna receives

Subject lines are built by `forms.js` into the hidden `_subject` field, per the approved formats:

- `Wedding enquiry: [Names], [Wedding date or timeframe]`
- `Other enquiry: [Enquiry type], [Name], [Date if supplied]`
- `Funeral flowers enquiry: [Name], [Date if supplied]`

Every submission also carries `submitted_at` (ISO timestamp, browser time) and `source_page` (path). Formspree adds its own received-time and IP; nothing about the submission is sent to analytics.

Fields (as submitted), wedding form: `name`, `partner_name`, `email`, `wedding_date` or `date_not_confirmed` + `likely_timeframe`, `venue` or `venue_not_booked` + `likely_location`, `investment`, `about_your_wedding`, `inspiration_links`, `heard_about` (multiple), `heard_about_other`, `access_preferences`.

Other form: `name`, `email`, `enquiry_type`, then for non-funeral: `event_date` or `date_not_sure`, `location`, `plans`, `budget`, `brief_link`, `anything_else`, `access_preferences`; for funeral: `telephone`, `contact_preference`, `funeral_date`, `funeral_venue`, `funeral_director`, `how_can_i_help`, `personal_meaning`.

Funeral page form: `name`, `email`, `telephone`, `contact_preference`, `funeral_date`, `venue`, `funeral_director`, `how_can_i_help`, `reflect`, `budget`, `anything_else`, `access_preferences`.

Hidden/not-applicable fields are stripped before sending so Anna only sees what was asked.

## Behaviour (implemented in `site/js/forms.js`)

- **Progressive reveal (wedding)**: You → Wedding → Flowers → Inspiration. A section appears once the required fields above it are valid; earlier sections stay open and editable. The progress indicator (`<ol class="progress">`) sits below the form, is sticky at the bottom on small screens, shows a tick on completed sections and underlines the active one. Screen readers get "(completed)" text.
- **Other form**: You → Your plans → More information. Fields under "Your plans" appear once the enquiry type is chosen. Choosing Funeral flowers switches to the funeral field set, reveals telephone and contact preference, and hides "More information".
- **Conditional required fields**: wedding date not required when "Our date is not confirmed yet" is ticked (then the timeframe is); venue not required when "We have not booked a venue yet" is ticked; date required only for Private party and Corporate event; email/telephone each required unless the other is supplied on funeral forms. Funeral date is never required; no funeral time is asked; the wedding form has no telephone field.
- **Validation**: on submit only (fields don't nag while typing; an error clears as soon as the field becomes valid). Messages are the approved ones, placed in the field's `.error` element, which is referenced by `aria-describedby`; the field gets `aria-invalid`. Focus moves to the first error.
- **Submission**: `fetch` POST to Formspree with `Accept: application/json`. The submit button is disabled (aria-disabled/aria-busy) while a request is in flight. On success the form is hidden and the success panel (`role="status"`) receives focus. On failure the error panel (`role="alert"`) appears with a "Try again" button; answers are saved to `sessionStorage` and restored if the page reloads. Successful submission clears storage. Storage is written *only* after a failure.
- **Switching Wedding/Other** hides one form and shows the other; values are retained in both.
- **`?type=` preselection**: `private-party`, `corporate`, `workshop` select Other flowers + that option; `other` selects Other flowers only. Unknown values are ignored.
- **Without JavaScript**: all sections are visible, native `required` validation runs, the browser POSTs to Formspree, and Formspree's own thank-you page is shown.

## Testing checklist

- Submit each form empty → first field error, focus moves.
- Invalid email → "Please enter a valid email address."
- Wedding: tick "date not confirmed" → timeframe required; untick → date required again.
- Other → Funeral flowers with telephone only (no email) → no email error.
- Simulate failure (temporarily break the endpoint) → error panel, reload, answers restored.
- Real submission on the preview deployment → arrives in Anna's inbox with the right subject; wedding autoresponse arrives at the test address.
- Check Formspree's dashboard shows `submitted_at` and `source_page`.
- Keyboard-only run through each form; screen reader run (VoiceOver/NVDA) through the wedding form including the progress indicator.

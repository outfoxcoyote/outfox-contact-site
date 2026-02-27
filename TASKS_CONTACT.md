# TASKS_CONTACT.md — Outfox Contact Page
## Task Breakdown for Claude Code

Execute tasks in order. Complete and verify each group before moving to the next.

---

## Pre-Flight

- [ ] Read CLAUDE.md fully
- [ ] Read DESIGN_CONTACT.md fully
- [ ] Read ARCHITECTURE_CONTACT.md fully
- [ ] Confirm asset files are available: `assets/logo.png`, `assets/images/photo1.jpg` through `photo6.jpg`

---

## Group 1 — Project Scaffold

**Task 1.1 — Create file structure**
```
outfox-contact/
├── index.html          (empty)
├── style.css           (empty)
├── script.js           (empty)
├── config.js           (stub only — do not populate URL)
├── .gitignore
├── assets/
│   ├── logo.png        ← copy from existing assets
│   └── images/
│       └── (photos)    ← copy from existing assets
└── README.md
```

**Task 1.2 — Create .gitignore**
Contents:
```
config.js
.DS_Store
```

**Task 1.3 — Create config.js stub**
```js
// Configure your GHL webhook URL before deploying
const GHL_WEBHOOK_URL = 'https://your-webhook-url-here';
```

**Task 1.4 — Create README.md**
Brief: project name, purpose, how to configure webhook URL, Oil Can font swap instructions (two steps only).

**Verify:** File structure matches spec. `.gitignore` contains `config.js`.

---

## Group 2 — HTML Structure

**Task 2.1 — Write index.html shell**
- `<!DOCTYPE html>`, charset, viewport meta, title, stylesheet link
- Two script tags at bottom: `config.js` then `script.js`

**Task 2.2 — Left panel**
- `div#left-panel`
- `div#logo-block` containing `img.logo-img` (src: `assets/logo.png`)
- `div#form-wrapper`

**Task 2.3 — Contact form**
Inside `#form-wrapper`:
- `form#contact-form.contact-form` with `novalidate`
- Row 1: `.form-row` containing First Name + Last Name groups
- Phone group (full width)
- Email group (full width)
- Message textarea group
- Consent block 1 (transactional) — verbatim copy from ARCHITECTURE doc
- Consent block 2 (marketing) — verbatim copy from ARCHITECTURE doc
- `div#form-error.form-error` (empty, `aria-live="polite"`)
- `button.submit-btn` — "Send Message"
- `div#form-success.form-success` — success message text, `hidden` attribute

**Task 2.4 — Right panel**
- `div#right-panel`
- `div#carousel-track`
- 6 `.car-slide` divs, each containing an `img` for photo1–photo6

**Task 2.5 — Mobile banner**
- `div#mobile-banner` (hidden on desktop via CSS)
- `img` pointing to `assets/images/photo1.jpg`

**Verify:** HTML validates. All IDs match JS and CSS references exactly. A2P consent copy is verbatim.

---

## Group 3 — CSS

**Task 3.1 — Reset and CSS variables**
```css
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { height: 100%; }
:root { /* all variables from ARCHITECTURE doc */ }
```

**Task 3.2 — Left panel layout**
- Fixed, top-left, 42% width, min 360px, max 560px, 100vh, flex column
- `#logo-block`: flex-shrink 0, justify-content flex-end (right-align), padding 24px 28px 16px
- `.logo-img`: max-height 80px, width auto, object-fit contain
- `#form-wrapper`: flex 1, min-height 0, display flex, align-items center, justify-content center, overflow-y auto, padding 20px 28px 32px

**Task 3.3 — Right panel and carousel**
- `#right-panel`: fixed, top 0, right 0, left 42%, height 100vh, overflow hidden
- `@media (min-width: 1334px)` override: `left: 560px`
- `#carousel-track`: flex, flex-direction column, height 100%
- `.car-slide`: flex-shrink 0, width 100%, height 100vh
- `.car-slide img`: width 100%, height 100%, object-fit cover, retro filter, display block

**Task 3.4 — Mobile banner**
- `#mobile-banner`: `display: none` by default
- `@media (max-width: 1024px)`:
  - `#left-panel`: position static, width 100%, max-width 100%, height auto, overflow visible
  - `#right-panel`: display none
  - `#mobile-banner`: display block, height 180px, overflow hidden
  - `#mobile-banner img`: width 100%, height 100%, object-fit cover, retro filter

**Task 3.5 — Mobile small breakpoint**
- `@media (max-width: 768px)`:
  - Logo block padding: 20px 20px 12px
  - Form wrapper padding: 20px 20px 40px
  - `.form-row`: flex-direction column, gap 0

**Task 3.6 — Form styles**
All form CSS from ARCHITECTURE doc:
- `.contact-form`, `.form-row`, `.form-group`, labels, inputs, textarea
- `.consent-group`, checkbox size, consent label
- `.form-error` (red, 0.75rem)
- `.submit-btn` default and hover states, disabled state
- `.form-success` (centered, 1.4rem uppercase)

**Verify:** No color outside the black/white system. Logo is right-aligned. Form fills available width. Mobile banner hidden on desktop.

---

## Group 4 — JavaScript

**Task 4.1 — Carousel init**
```js
function initCarousel() { ... }
```
- Query `#carousel-track`
- Clone all slides and append (seamless loop)
- Set interval: advance on timer
- On advance: calculate slide height from parent, translate Y
- On reaching end of originals: snap back to top without transition

**Task 4.2 — Form validation function**
```js
function validateForm(form) { ... }
// Returns { valid: boolean, error: string }
```
Validate: firstName, lastName not empty; phone not empty; email contains @; consentTransactional checked.

**Task 4.3 — Form submission function**
```js
async function submitToGHL(payload) { ... }
```
- POST to `GHL_WEBHOOK_URL`
- `Content-Type: application/json`
- Throw on non-OK response

**Task 4.4 — Form submit handler**
```js
function handleSubmit(e) { ... }
```
- preventDefault
- Clear error state
- Run validation — show error and return if invalid
- Build payload object
- Disable button, set text to "Sending..."
- Call submitToGHL
- On success: hide form, show success div
- On error: show error message, re-enable button

**Task 4.5 — DOMContentLoaded entry point**
```js
document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  document.getElementById('contact-form')
    .addEventListener('submit', handleSubmit);
});
```

**Verify:** No `console.error` on load. Carousel advances automatically. Submitting empty form shows validation error. Submitting with all fields + consent checked fires POST to GHL_WEBHOOK_URL.

---

## Group 5 — Integration Test

**Task 5.1 — Local test**
- Open in browser (file:// or local server)
- Confirm carousel advances and loops
- Confirm logo is top-right
- Confirm form is always visible, no toggle needed
- Confirm validation errors appear for empty required fields
- Confirm transactional consent checkbox is required
- Confirm mobile layout at 375px and 768px

**Task 5.2 — Webhook test**
- Populate `config.js` with real GHL webhook URL
- Submit a test contact with all fields filled
- Confirm success state renders (form hidden, confirmation shown)
- Confirm contact created in GHL system

**Task 5.3 — Final checks**
- No JS errors in browser console
- No broken image paths
- `.gitignore` still contains `config.js`
- Page title is: "Contact — Outfox Consulting LLC"

---

## Done
When all groups pass verification, the build is complete and ready for Vercel deployment.

**Deployment:**
1. Push to GitHub (confirm config.js is NOT in the commit)
2. Connect repo to Vercel if not already connected
3. Deploy — no build settings needed
4. Verify live URL renders correctly
5. Re-run Task 5.2 against live URL

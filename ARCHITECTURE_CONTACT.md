# ARCHITECTURE_CONTACT.md — Outfox Contact Page
## Technical Architecture

---

## Overview
Single-page static site. Three files: `index.html`, `style.css`, `script.js`. GHL webhook integration via `config.js` (gitignored). Deployed to Vercel — no build step.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Markup | HTML5 |
| Styling | CSS3, vanilla |
| Logic | Vanilla JS (ES6+) |
| Font | Georgia (placeholder) → Oil Can (self-hosted, pending) |
| Form submission | GHL webhook — HTTP POST, `application/json` |
| Hosting | Vercel (static) |
| Version control | GitHub |

---

## File Structure

```
outfox-contact/
├── index.html
├── style.css
├── script.js
├── config.js               ← gitignored
├── .gitignore
├── assets/
│   ├── logo.png
│   └── images/
│       ├── photo1.jpg
│       ├── photo2.jpg
│       ├── photo3.jpg
│       ├── photo4.jpg
│       ├── photo5.jpg
│       └── photo6.jpg
└── README.md
```

**.gitignore must contain:**
```
config.js
```

---

## HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact — Outfox Consulting LLC</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <!-- DESKTOP: Left Panel -->
  <div id="left-panel">

    <!-- Logo: top-right aligned -->
    <div id="logo-block">
      <img src="assets/logo.png" alt="Outfox Consulting LLC" class="logo-img">
    </div>

    <!-- Contact Form: always open, fills remaining height -->
    <div id="form-wrapper">
      <form id="contact-form" class="contact-form" novalidate>

        <div class="form-row">
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input type="text" id="firstName" name="firstName" autocomplete="given-name" required>
          </div>
          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input type="text" id="lastName" name="lastName" autocomplete="family-name" required>
          </div>
        </div>

        <div class="form-group">
          <label for="phone">Phone *</label>
          <input type="tel" id="phone" name="phone" autocomplete="tel" required>
        </div>

        <div class="form-group">
          <label for="email">Email *</label>
          <input type="email" id="email" name="email" autocomplete="email" required>
        </div>

        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" name="message" rows="4"></textarea>
        </div>

        <!-- A2P Transactional Consent -->
        <div class="consent-group">
          <input type="checkbox" id="consentTransactional" name="consentTransactional" required>
          <label for="consentTransactional">
            By checking this box, you consent to receive service-related and transactional 
            text messages (such as appointment confirmations, follow-ups, and account 
            notifications) from Outfox Consulting LLC. Message frequency varies. 
            Message and data rates may apply. Reply STOP to unsubscribe at any time. 
            Reply HELP for assistance.
          </label>
        </div>

        <!-- A2P Marketing Consent -->
        <div class="consent-group">
          <input type="checkbox" id="consentMarketing" name="consentMarketing">
          <label for="consentMarketing">
            By checking this box, you also consent to receive promotional and marketing 
            text messages from Outfox Consulting LLC. This consent is optional and not 
            required to receive our services. Message frequency varies. Message and data 
            rates may apply. Reply STOP to unsubscribe at any time. Reply HELP for assistance.
          </label>
        </div>

        <div id="form-error" class="form-error" aria-live="polite"></div>

        <button type="submit" class="submit-btn">Send Message</button>

      </form>

      <!-- Success state: hidden until submission confirmed -->
      <div id="form-success" class="form-success" aria-live="polite" hidden>
        <p>Message received. We'll be in touch shortly.</p>
      </div>
    </div>

  </div>

  <!-- DESKTOP: Right Panel Carousel -->
  <div id="right-panel">
    <div id="carousel-track">
      <div class="car-slide"><img src="assets/images/photo1.jpg" alt=""></div>
      <div class="car-slide"><img src="assets/images/photo2.jpg" alt=""></div>
      <div class="car-slide"><img src="assets/images/photo3.jpg" alt=""></div>
      <div class="car-slide"><img src="assets/images/photo4.jpg" alt=""></div>
      <div class="car-slide"><img src="assets/images/photo5.jpg" alt=""></div>
      <div class="car-slide"><img src="assets/images/photo6.jpg" alt=""></div>
    </div>
  </div>

  <!-- MOBILE: Static Banner (hidden on desktop) -->
  <div id="mobile-banner">
    <img src="assets/images/photo1.jpg" alt="Outfox Consulting">
  </div>

  <script src="config.js"></script>
  <script src="script.js"></script>
</body>
</html>
```

---

## CSS Architecture

### CSS Variables
```css
:root {
  --font-body: Georgia, serif;
  --font-display: Georgia, serif;
  --bg-panel: #000000;
  --text-primary: #ffffff;
  --text-secondary: #999999;
  --border-base: #333333;
  --bg-input: #0a0a0a;
}
```

### Layout
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  background: #000;
  color: #fff;
  font-family: var(--font-body);
}

/* ---- LEFT PANEL ---- */
#left-panel {
  position: fixed;
  top: 0;
  left: 0;
  width: 42%;
  min-width: 360px;
  max-width: 560px;
  height: 100vh;
  background: var(--bg-panel);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 10;
}

#logo-block {
  flex-shrink: 0;
  display: flex;
  justify-content: flex-end;  /* right-align logo */
  padding: 24px 28px 16px;
}

.logo-img {
  max-height: 80px;
  width: auto;
  object-fit: contain;
}

#form-wrapper {
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  padding: 20px 28px 32px;
}

/* ---- RIGHT PANEL ---- */
#right-panel {
  position: fixed;
  top: 0;
  right: 0;
  left: calc(42%);
  /* Clamp to match left panel constraints */
  height: 100vh;
  overflow: hidden;
}

/* When left panel is at max-width, right panel needs offset */
@media (min-width: 1334px) { /* 560px / 0.42 ≈ 1334px */
  #right-panel {
    left: 560px;
  }
}

/* ---- CAROUSEL ---- */
#carousel-track {
  display: flex;
  flex-direction: column;
  height: 100%;
  will-change: transform;
}

.car-slide {
  flex-shrink: 0;
  width: 100%;
  height: 100vh;
}

.car-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: sepia(0.30) saturate(0.70) contrast(0.88) brightness(0.96) hue-rotate(8deg);
  display: block;
}

/* ---- MOBILE BANNER (hidden on desktop) ---- */
#mobile-banner {
  display: none;
}

/* ---- RESPONSIVE ---- */
@media (max-width: 1024px) {
  #left-panel {
    position: static;
    width: 100%;
    min-width: 0;
    max-width: 100%;
    height: auto;
    overflow: visible;
  }

  #right-panel {
    display: none;
  }

  #mobile-banner {
    display: block;
    width: 100%;
    height: 180px;
    overflow: hidden;
  }

  #mobile-banner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: sepia(0.30) saturate(0.70) contrast(0.88) brightness(0.96) hue-rotate(8deg);
    display: block;
  }

  #form-wrapper {
    padding: 24px 24px 40px;
    align-items: flex-start;
  }
}

@media (max-width: 768px) {
  #logo-block {
    padding: 20px 20px 12px;
  }

  #form-wrapper {
    padding: 20px 20px 40px;
  }

  .form-row {
    flex-direction: column;
    gap: 0;
  }
}
```

### Form CSS
```css
.contact-form {
  width: 100%;
}

.form-row {
  display: flex;
  gap: 16px;
  width: 100%;
}

.form-group {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 16px;
}

.form-group label {
  font-family: var(--font-body);
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--text-secondary);
  margin-bottom: 6px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 16px 20px;
  font-family: var(--font-body);
  font-size: 1rem;
  color: #ffffff;
  background: var(--bg-input);
  border: 3px solid var(--border-base);
  border-radius: 4px;
  transition: border-color 0.15s ease;
  appearance: none;
  -webkit-appearance: none;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #ffffff;
  outline: none;
}

.form-group textarea {
  min-height: 120px;
  resize: vertical;
}

.consent-group {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin-bottom: 16px;
}

.consent-group input[type="checkbox"] {
  width: 18px;
  height: 18px;
  min-width: 18px;
  flex-shrink: 0;
  margin-top: 2px;
  cursor: pointer;
  accent-color: #ffffff;
}

.consent-group label {
  font-family: var(--font-body);
  font-size: 0.72rem;
  line-height: 1.6;
  color: #888888;
  cursor: pointer;
}

.form-error {
  font-size: 0.75rem;
  color: #ff4444;
  margin-bottom: 12px;
  min-height: 1em;
}

.submit-btn {
  width: 100%;
  padding: 18px;
  font-family: var(--font-body);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #000000;
  background: #ffffff;
  border: 3px solid #ffffff;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}

.submit-btn:hover {
  background: #000000;
  color: #ffffff;
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.form-success {
  width: 100%;
  text-align: center;
  padding: 40px 0;
}

.form-success p {
  font-family: var(--font-display);
  font-size: 1.4rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #ffffff;
  line-height: 1.5;
}
```

---

## JS Architecture

### script.js — Module Structure
```
1. Carousel init and loop
2. Form validation
3. Form submission (webhook)
4. Form success/error state management
```

### Carousel
```js
const CAROUSEL_CONFIG = {
  pauseMs: 5000,
  scrollMs: 1350,
  ease: 'cubic-bezier(0.45, 0, 0.25, 1)'
};

function initCarousel() {
  const track = document.getElementById('carousel-track');
  if (!track) return;

  const slides = [...track.querySelectorAll('.car-slide')];
  if (slides.length === 0) return;

  // Clone all slides for seamless loop
  slides.forEach(slide => track.appendChild(slide.cloneNode(true)));

  let currentIndex = 0;
  const totalOriginal = slides.length;

  function advance() {
    currentIndex++;
    const slideH = track.parentElement.clientHeight;
    track.style.transition = `transform ${CAROUSEL_CONFIG.scrollMs}ms ${CAROUSEL_CONFIG.ease}`;
    track.style.transform = `translateY(-${currentIndex * slideH}px)`;

    // Reset to top seamlessly after last original slide
    if (currentIndex >= totalOriginal) {
      setTimeout(() => {
        track.style.transition = 'none';
        track.style.transform = 'translateY(0)';
        currentIndex = 0;
      }, CAROUSEL_CONFIG.scrollMs + 50);
    }
  }

  setInterval(advance, CAROUSEL_CONFIG.pauseMs);
}
```

### Form Submission
```js
async function submitForm(payload) {
  const response = await fetch(GHL_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response;
}

function handleFormSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('contact-form');
  const errorEl = document.getElementById('form-error');
  const btn = form.querySelector('.submit-btn');

  errorEl.textContent = '';

  // Validation
  const firstName = form.firstName.value.trim();
  const lastName = form.lastName.value.trim();
  const phone = form.phone.value.trim();
  const email = form.email.value.trim();
  const consentTransactional = form.consentTransactional.checked;

  if (!firstName || !lastName) {
    errorEl.textContent = 'Please enter your first and last name.';
    return;
  }
  if (!phone) {
    errorEl.textContent = 'Phone number is required.';
    return;
  }
  if (!email || !email.includes('@')) {
    errorEl.textContent = 'Please enter a valid email address.';
    return;
  }
  if (!consentTransactional) {
    errorEl.textContent = 'Please accept the transactional messaging consent to continue.';
    return;
  }

  const payload = {
    firstName,
    lastName,
    phone,
    email,
    message: form.message.value.trim(),
    consentTransactional: true,
    consentMarketing: form.consentMarketing.checked
  };

  btn.disabled = true;
  btn.textContent = 'Sending...';

  submitForm(payload)
    .then(() => {
      document.getElementById('contact-form').hidden = true;
      document.getElementById('form-success').hidden = false;
    })
    .catch(() => {
      errorEl.textContent = 'Something went wrong. Please try again or contact us directly.';
      btn.disabled = false;
      btn.textContent = 'Send Message';
    });
}

document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  document.getElementById('contact-form')
    .addEventListener('submit', handleFormSubmit);
});
```

---

## config.js (gitignored)
```js
const GHL_WEBHOOK_URL = 'https://your-webhook-url-here';
```

---

## GHL Webhook Payload
```json
{
  "firstName": "string",
  "lastName": "string",
  "phone": "string",
  "email": "string",
  "message": "string",
  "consentTransactional": true,
  "consentMarketing": false
}
```

Map fields in GHL workflow: Create/Update Contact action using these exact keys.

---

## Oil Can Font Swap (when files available)
Change only these two blocks — no other code changes needed:

**Add to top of style.css:**
```css
@font-face {
  font-family: 'Oil Can';
  src: url('assets/fonts/OilCan.woff2') format('woff2'),
       url('assets/fonts/OilCan.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

**Update CSS variables:**
```css
:root {
  --font-body: 'Oil Can', Georgia, serif;
  --font-display: 'Oil Can', Georgia, serif;
}
```

---

## Deployment Checklist
1. `config.js` in `.gitignore` — verify before first commit
2. `GHL_WEBHOOK_URL` populated in `config.js` on server / env
3. All asset files present: `logo.png`, `photo1.jpg`–`photo6.jpg`
4. Push to GitHub → Vercel auto-deploys
5. Test form submission end-to-end after deploy
6. Verify contact created in GHL after test submission

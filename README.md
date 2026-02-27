# Outfox Contact Page

Standalone contact page for **Outfox Consulting LLC**. Split-screen layout: left panel with logo and contact form; right panel with vertical auto-scrolling photo carousel.

Static site — no build step. Deploy directly to Vercel.

---

## Configure Webhook URL

Before deploying, open `config.js` and replace the placeholder with your real GHL webhook URL:

```js
const GHL_WEBHOOK_URL = 'https://your-actual-ghl-webhook-url';
```

`config.js` is gitignored and must never be committed to version control.

---

## Asset Setup

Copy the following files from the main Outfox site assets:

- `assets/logo.png`
- `assets/images/photo1.jpg` through `photo6.jpg`

---

## Oil Can Font Swap

When the Oil Can font files are available, two changes only:

**1. Add to the top of `style.css`:**

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

**2. Update the two CSS variables in `:root`:**

```css
--font-body: 'Oil Can', Georgia, serif;
--font-display: 'Oil Can', Georgia, serif;
```

No other code changes needed.

---

## Deployment

1. Verify `config.js` is in `.gitignore` (do not commit it)
2. Push to GitHub
3. Connect repo to Vercel — no build settings required
4. Verify live URL renders correctly
5. Test form submission end-to-end and confirm contact created in GHL

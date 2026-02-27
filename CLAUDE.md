# CLAUDE.md — Outfox Contact Page Build
## Agent Operating Instructions

---

## Mission
Build a standalone contact page for Outfox Consulting LLC. This is a trimmed variant of the full Outfox site: the split-screen layout is preserved, but the left panel contains **only the logo and the contact form**. No header stack, no accordion, no leader cards, no mobile drawers for other sections.

This is a **production build**. Write clean, maintainable, standard HTML/CSS/JS. No frameworks. No shortcuts that create debt.

---

## What You Are Building
A single-page site (`index.html`, `style.css`, `script.js`) with:

- **Left panel (42% width, fixed):** Logo top-right-aligned + full contact form below, always visible, no toggle
- **Right panel (remaining width):** Vertical auto-scrolling photo carousel (identical to main site)
- **Mobile:** Single-column. Static banner image top. Contact form below. Logo top-right of header area.

---

## Files to Produce
```
outfox-contact/
├── index.html
├── style.css
├── script.js
├── config.js               ← gitignored, webhook URL only
├── .gitignore
├── assets/
│   ├── logo.png            ← copy from main site assets
│   └── images/
│       └── photo1–6.jpg    ← copy from main site assets
└── README.md
```

---

## Non-Negotiables
1. **Georgia, serif** as placeholder font — two CSS variables only (`--font-body`, `--font-display`). No other font references.
2. **Black and white color palette only** — no neon, no gold, no accents. See DESIGN doc.
3. **GHL webhook submission** — loads from `config.js` (`GHL_WEBHOOK_URL`). Never hardcode the URL.
4. **A2P consent copy must not be modified.** Reproduce it verbatim from ARCHITECTURE doc.
5. **config.js must be in .gitignore** before any commit.
6. **No JS frameworks, no CSS frameworks, no CDN imports** unless explicitly specified.
7. Logo aligned to **top-right** of the left panel.
8. Contact form always open — no accordion toggle, no open/closed state.
9. On successful submission: replace form with a centered confirmation message in matching large type.
10. Do not add features not specified. Do not remove specified features.

---

## Execution Order
1. Read DESIGN_CONTACT.md fully before writing any code
2. Read ARCHITECTURE_CONTACT.md fully before writing any code
3. Read TASKS_CONTACT.md and execute tasks in order
4. After each major task group, verify output matches spec before proceeding
5. Final check: form submits correctly to webhook, confirmation state renders, mobile layout is clean

---

## Quality Bar
- Page load < 2 seconds
- No console errors on load or submission
- Form validation fires before submission attempt
- Carousel loops seamlessly
- Mobile layout renders correctly at 375px, 768px, and 1024px breakpoints

---

## Deployment
- Static site — no build step
- Vercel-compatible as-is
- Ensure `config.js` is gitignored before first push

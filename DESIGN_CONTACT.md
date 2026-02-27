# DESIGN_CONTACT.md — Outfox Contact Page
## Design Specification

---

## Concept
Same visual language as the full Outfox site — black and white, editorial, direct — but stripped to a single purpose: capture the lead. No distractions. The left panel is the entire experience.

---

## Layout

### Desktop (>1024px)
- **Split screen, full viewport height**
- Left panel: 42% width, min 360px, max 560px, fixed, true black
- Right panel: remaining width, full-height vertical auto-scrolling photo carousel
- Left panel layout (top to bottom):
  ```
  [ LOGO — top-right aligned ]
  [ CONTACT FORM — fills remaining height, vertically centered ]
  ```

### Mobile / Tablet (≤1024px)
- Single column
- Static banner image at top: 180px tall, retro filter applied
- Logo: top-right within the banner or directly above the form area
- Contact form below banner, full width

---

## Color System — Strict Black and White

| Variable | Value | Usage |
|---|---|---|
| `--bg-panel` | `#000000` | Left panel background |
| `--text-primary` | `#ffffff` | All primary text |
| `--text-secondary` | `#999999` | Secondary / muted text |
| `--border-base` | `#333333` | Form input borders |
| `--bg-input` | `#0a0a0a` | Form input background |

**No neon. No gold. No color accents. No exceptions.**

---

## Typography

### Fonts
```css
:root {
  --font-body: Georgia, serif;
  --font-display: Georgia, serif;
}
```
Georgia is the structural placeholder. Oil Can (self-hosted woff2/woff) drops in by updating these two variables only.

### Type Scale

| Element | Size | Case | Letter-spacing |
|---|---|---|---|
| Form labels | 0.65rem | Uppercase | 0.14em |
| Input text | 1rem | Mixed | normal |
| Consent text | 0.72rem | Mixed | normal |
| Submit button | 0.85rem | Uppercase | 0.16em |
| Confirmation message | 1.4rem | Uppercase | 0.08em |
| Logo: sized by image asset — do not override |

All weights 400.

---

## Logo Block

- Position: top-right of left panel
- `text-align: right` or `justify-content: flex-end`
- Padding: 24px top, 28px right
- `max-height: 80px`, `width: auto`, `object-fit: contain`
- Asset: `assets/logo.png`

---

## Contact Form

Always visible. No accordion. No toggle. No open/closed state.

### Fields
1. First Name + Last Name — side by side on one row
2. Phone — full width
3. Email — full width
4. Message — textarea, full width

### Input Styling
- `width: 100%`
- `padding: 16px 20px`
- `font-size: 1rem`
- `border: 3px solid #333333`
- Focus: `border-color: #ffffff`
- `border-radius: 4px`
- `background: #0a0a0a`
- `color: #ffffff`

### Labels
- `font-size: 0.65rem`, uppercase, `letter-spacing: 0.14em`, `color: #999999`
- `margin-bottom: 6px`

### Textarea
- `min-height: 120px`
- `resize: vertical`

### A2P Consent Block (verbatim — do not modify)
Two checkboxes required:

**Checkbox 1 — Transactional:**
```
By checking this box, you consent to receive service-related and transactional 
text messages (such as appointment confirmations, follow-ups, and account 
notifications) from Outfox Consulting LLC. Message frequency varies. 
Message and data rates may apply. Reply STOP to unsubscribe at any time. 
Reply HELP for assistance.
```

**Checkbox 2 — Marketing:**
```
By checking this box, you also consent to receive promotional and marketing 
text messages from Outfox Consulting LLC. This consent is optional and not 
required to receive our services. Message frequency varies. Message and data 
rates may apply. Reply STOP to unsubscribe at any time. Reply HELP for assistance.
```

Checkbox size: 18px × 18px minimum.
Consent label: `font-size: 0.72rem`, `line-height: 1.6`, `color: #888888`.

### Submit Button
- Full width
- `padding: 18px`
- `font-size: 0.85rem`, uppercase, `letter-spacing: 0.16em`
- Default: white background, black text
- Hover: black background, white text, `border: 3px solid #ffffff`
- `border-radius: 4px`

### Success State
On successful webhook submission:
- Replace form contents with centered confirmation block
- Text: "Message received. We'll be in touch shortly."
- Style: `font-size: 1.4rem`, uppercase, `letter-spacing: 0.08em`, `color: #ffffff`
- Vertically and horizontally centered within the form area

### Error State
On failed submission:
- Display error message below submit button
- Text: "Something went wrong. Please try again or contact us directly."
- `color: #ff4444`, `font-size: 0.75rem`

---

## Borders & Lines

| Element | Weight | Color |
|---|---|---|
| Top border of left panel (optional separator) | 0 (none needed — panel fills viewport) | — |
| Form inputs | 3px solid | `#333333` (focus: `#ffffff`) |
| Submit button hover | 3px solid | `#ffffff` |

No decorative dividers. No scanlines (omit for contact-only build — simplicity).

---

## Right Panel — Carousel (unchanged from main site)

- Full viewport height, vertical auto-scroll
- Hold: 5 seconds per image
- Scroll: 1.35 seconds, `cubic-bezier(0.45, 0, 0.25, 1)`
- Seamless loop
- Retro filter: `filter: sepia(0.30) saturate(0.70) contrast(0.88) brightness(0.96) hue-rotate(8deg);`
- No dimming behavior (no leader cards to trigger it)
- Images: `assets/images/photo1.jpg` through `photo6.jpg`

---

## Responsive

### Desktop (>1024px)
- Split screen as described above
- Left panel fixed, right panel carousel fills remainder

### Tablet (769px–1024px)
- Single column
- Right panel hidden
- Static banner: first carousel image, 180px height, retro filter
- Logo: top-right of page, `padding: 20px 24px`
- Form below banner, full width, `padding: 0 24px 40px`

### Mobile (≤768px)
- Same as tablet layout
- Form fields: all stacked single column (First Name and Last Name stack vertically)
- Padding reduces to 20px
- Input font-size: 1rem (maintain — prevents iOS zoom on focus)

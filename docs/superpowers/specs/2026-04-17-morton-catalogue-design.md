# Morton Backpacks Catalogue Page — Design Spec

**Date:** 2026-04-17
**Source:** Figma file `DPWyE3fjxm1wI6hMIC5OH4`, node `2558:1003` ("morton v3.2")
**Stack:** Next.js (App Router) + Tailwind CSS
**Design width:** 1440px desktop, responsive down to mobile

---

## Architecture

Single-page Next.js app composing 7 section components. Products fetched from Payload CMS via server-side `fetch()`. Tally embed for the contact form.

### File Structure

```
src/
  app/
    layout.tsx          — Root layout (Geist font, globals)
    page.tsx            — Home page composing all sections
    globals.css         — Tailwind directives, custom tokens
  components/
    Navbar.tsx
    Hero.tsx
    ProductSlider.tsx
    InfoSection.tsx
    Advantages.tsx
    ContactSection.tsx
    Footer.tsx
    ui/
      Button.tsx        — Shared button component (small + dark variants)
```

---

## Design Tokens

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--morton-red` | `#e50000` | NEW badge |
| `--morton-neon` | `#e5fc74` | Dark button text |
| `--color-black` | `#000000` | Footer bg, dark buttons |
| `--color-white` | `#ffffff` | Page bg, navbar, light buttons |
| `--color-gray-50` | `#f9f9f9` | Contact section bg |
| `--color-gray-100` | `#f0eeee` | Advantage tooltip bg |
| `--color-gray-200` | `#e5e5e5` | Product card name bar |
| `--color-gray-300` | `#eee` | Tags/labels bg |

### Typography

Font family: **Geist** + **Geist Mono** (via `next/font/google` or `next/font/local`)

| Style | Font | Weight | Size | Tracking | Usage |
|-------|------|--------|------|----------|-------|
| Nav link | Geist Mono | SemiBold (600) | 14px | — | Navbar links, footer headings, tags |
| Hero text | Geist | Regular (400) | 142px | -2.84px | Hero "Morton backpacks" |
| Advantage word | Geist Mono | Regular (400) | 64px | -1.28px | Quality, Love, Bold, etc. |
| Contact heading | Geist | SemiBold (600) | 58px | -1.16px | "Can't find what you want?" |
| Footer info | Geist Mono | SemiBold (600) | 20px | — | Shipping/warranty text |
| Body text | Geist | Regular (400) | 14px | -0.28px | Subtitles, footer links |
| Small text | Geist | Regular (400) | 12px | 0.36px | Info section, tooltips, labels |
| Badge text | Geist | Medium (500) | 12px | -0.24px | NEW badge, product name bar |
| Product name | Geist | Medium (500) | 14px | -0.28px | Product card name + price |

---

## Section Specifications

### 1. Navbar

- **Height:** ~37px (desktop), auto (mobile)
- **Background:** white
- **Layout:** 3-column flex (left links, center logo, right login+cart)
- **Left links:** SHOP / CUSTOM / ABOUT — Geist Mono SemiBold 14px, uppercase, gap 32px
- **Center:** Morton logo image (120x19px)
- **Right:** LOGIN text (same style as left links) + cart icon (16x17px) — gap 32px
- **Border radius:** 6px on inner nav container
- **Mobile:** hamburger menu, slide-out nav
- **Scroll behavior:** transparent on hero → white on scroll (optional enhancement)

### 2. Hero

- **Height:** 100dvh (860px content on desktop)
- **Background:** full-bleed cover image from Figma (video placeholder)
- **Content:** "MORTON BACKPACKS" text at bottom center
  - Geist Regular 142px, white, uppercase, tracking -2.84px
  - Responsive: scales down on mobile (clamp or viewport units)
- **Video controls:** bottom-right corner
  - Glass-white pill (bg rgba(255,255,255,0.2), rounded-full, padding 4px)
  - Two icon buttons: play + mute (16x16 each, gap 14px)
- **Video:** `<video>` element with poster image from Figma, src placeholder

### 3. Product Slider

- **Library:** Swiper.js (swiper package)
- **Config:** looped, autoplay, pagination dots
- **Layout:** horizontal slider, 5 cards visible on desktop
- **Card structure (width ~340px each, gap 5px):**
  - Product image: full width, 396px height, object-cover, rounded corners
  - Name bar: #e5e5e5 bg, 34px height, 10px padding
    - Left: product name (Geist Medium 14px)
    - Right: price, e.g. "€175.99"
  - NEW badge (conditional): absolute top-left, #e50000 bg, white text, padding 2px 4px
- **Pagination:** 6px dots, centered below slider
- **Mobile:** 1-2 cards visible, touch swipe
- **Data source:** Payload CMS — product name, price, image, isNew flag

### 4. Info Section

- **Height:** 728px (desktop), 100dvh
- **Background:** full-bleed image from Figma
- **Content:** centered text block with generous horizontal padding (327px each side)
  - 12px uppercase text, white, tracking 0.36px, line-height 1.5
  - "Learn more" button (small white variant)
- **Mobile:** reduced padding, smaller text

### 5. Advantages Section

- **Height:** 748px (desktop), auto (mobile)
- **Layout:** CSS Grid, 4 columns, off-grid (images and texts don't align in strict rows)
- **Grid placement (desktop):**
  - Row 1: image(210x252) | "Quality"(64px) | — | image(210x252)
  - Row 2: — | — | — | "Bold"(64px) + tooltip
  - Row 3: "Love"(64px) | image(210x252) | "LONG-LASTING"(64px) | image(210x252)
- **Advantage texts:** Geist Mono Regular 64px, uppercase, tracking -1.28px
- **Hover tooltips:** #f0eeee bg, 272px wide, padding 10px
  - 12px text, uppercase, tracking 0.36px, line-height 1.3
  - Appears on hover over the advantage word
  - Position varies per item (absolute, offset from trigger)
- **Images:** 210x252px, object-cover
- **Mobile:** single column stack, text scales down, images interspersed

### 6. Contact Section

- **Height:** 888px (desktop), auto (mobile)
- **Background:** #f9f9f9
- **Layout:** 2-column — text left, product image right
- **Left content:**
  - "Custom design" tag — #eee bg, Geist Mono SemiBold 12px, rounded 2px, padding 2px 5px
  - "Can't find what you want?" — Geist SemiBold 58px, uppercase, tracking -1.16px
  - "Spice up your bag with your favorite colors" — Geist Regular 14px
  - "Send message" button — dark variant (black bg, neon #e5fc74 text, 20px)
- **Right:** product image (272x340px, object-cover)
- **Button action:** opens Tally embed (iframe or popup)
- **Mobile:** stacked, image below text

### 7. Footer

- **Height:** 862px (desktop)
- **Background:** black
- **Layout:** multi-zone
  - **Top (96px from top):** 2-column
    - Left (440px): shipping info text (Geist Mono SemiBold 20px, white) + newsletter section
      - "Get updates about new drops!" heading (Geist SemiBold 14px)
      - Description (Geist Regular 14px, line-height 1.2)
      - Email input (border-2 white, padding 12px 10px) + subscribe button (small white)
    - Right: 3 columns (Service, About, Social) with links
      - Column headers: Geist Mono SemiBold 14px, uppercase, gap 24px
      - Links: Geist Regular 14px, gap 10px
  - **Middle (~375px from top):** large logo graphic (Morton wordmark + decorative element)
  - **Bottom (~631px from top):** white rounded shapes (decorative) + copyright text (12px, white)
    - "COPYRIGHT 20-25. MORTON Backpacks. All rights reserved."
- **Mobile:** single column, reduced spacing

---

## Shared Components

### Button

Two variants from Figma:

| Property | Small (Default) | Dark |
|----------|----------------|------|
| Background | white | black |
| Text color | black | #e5fc74 (neon) |
| Text size | 12px | 20px |
| Padding | 6px horizontal, 4px vertical | 14px horizontal, 10px vertical |
| Icon | 14px arrow icon | 18px arrow icon |
| Font | Geist Mono SemiBold, uppercase | Geist Mono SemiBold, uppercase |

---

## Responsive Breakpoints

| Breakpoint | Width | Key Changes |
|------------|-------|-------------|
| Mobile | <640px | Single column, hamburger nav, hero text scales, 1 product card visible |
| Tablet | 640-1024px | 2 product cards, reduced grid for advantages |
| Desktop | 1024-1440px | Full layout as designed |
| Wide | >1440px | Max-width 1440px, centered |

### Hero Text Scaling
```
font-size: clamp(48px, 10vw, 142px)
```

### Advantage Text Scaling
```
font-size: clamp(36px, 5vw, 64px)
```

---

## Dependencies

| Package | Purpose |
|---------|---------|
| `next` | Framework (App Router) |
| `tailwindcss` | Styling |
| `swiper` | Product slider |
| `@tailwindcss/typography` | Optional, for prose content |
| `next/font` | Geist font loading |

---

## Payload CMS Integration

Products collection schema:
```
{
  name: string,
  slug: string,
  price: number,
  image: upload,
  isNew: boolean,
  category: relationship
}
```

Fetched server-side in `page.tsx` via Payload REST API.

---

## Assets Needed from Figma

- Hero cover image (background)
- Product images (5+)
- Morton logo (navbar + footer)
- Cart icon
- Video control icons (play, mute)
- Info section background image
- Advantage section images (4)
- Contact section product image
- Footer logo graphic (large)
- Button arrow icons (14px + 18px)

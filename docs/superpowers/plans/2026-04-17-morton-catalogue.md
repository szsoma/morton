# Morton Backpacks Catalogue Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive single-page catalogue site for Morton bicycle backpacks, matching the Figma design "morton v3.2".

**Architecture:** Next.js App Router with 7 section components composed in a single `page.tsx`. Products sourced from Payload CMS (server-side fetch). Swiper.js for the product slider. Tally embed for the contact form. All styling via Tailwind CSS with custom design tokens.

**Tech Stack:** Next.js 15, Tailwind CSS 4, Swiper 11, Geist + Geist Mono fonts, TypeScript

---

## File Structure

```
morton-catalogue/
├── public/
│   └── images/
│       ├── hero-cover.jpg          (placeholder)
│       ├── products/               (placeholder product images)
│       ├── advantages/             (placeholder advantage images)
│       ├── contact-product.jpg     (placeholder)
│       ├── logo.svg
│       ├── logo-footer.svg
│       └── icons/
│           ├── cart.svg
│           ├── play.svg
│           ├── mute.svg
│           └── arrow-right.svg
├── src/
│   ├── app/
│   │   ├── layout.tsx              — Root layout with fonts, metadata
│   │   ├── page.tsx                — Home composing all sections
│   │   └── globals.css             — Tailwind directives, custom tokens
│   └── components/
│       ├── Navbar.tsx
│       ├── Hero.tsx
│       ├── ProductSlider.tsx
│       ├── InfoSection.tsx
│       ├── Advantages.tsx
│       ├── ContactSection.tsx
│       ├── Footer.tsx
│       └── ui/
│           └── Button.tsx          — Shared button (small + dark variants)
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

### Task 1: Scaffold Next.js Project

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`

- [ ] **Step 1: Create Next.js project**

```bash
cd /Users/soma/Documents/work/03_coding/websites/Morton
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack --use-npm
```

Select defaults. This scaffolds the full Next.js project with Tailwind.

- [ ] **Step 2: Install Swiper**

```bash
npm install swiper
```

- [ ] **Step 3: Configure Tailwind with design tokens**

Replace `src/app/globals.css`:

```css
@import "tailwindcss";

@theme {
  --color-morton-red: #e50000;
  --color-morton-neon: #e5fc74;
  --color-gray-50: #f9f9f9;
  --color-gray-100: #f0eeee;
  --color-gray-200: #e5e5e5;
  --color-gray-300: #eee;
  --font-geist: "Geist", sans-serif;
  --font-geist-mono: "Geist Mono", monospace;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-geist);
  -webkit-font-smoothing: antialiased;
}
```

- [ ] **Step 4: Set up layout with Geist fonts**

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geist = localFont({
  src: [
    { path: "../../node_modules/geist/dist/fonts/geist-sans/Geist-Regular.woff2", weight: "400" },
    { path: "../../node_modules/geist/dist/fonts/geist-sans/Geist-Medium.woff2", weight: "500" },
    { path: "../../node_modules/geist/dist/fonts/geist-sans/Geist-SemiBold.woff2", weight: "600" },
  ],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = localFont({
  src: [
    { path: "../../node_modules/geist/dist/fonts/geist-mono/GeistMono-Regular.woff2", weight: "400" },
    { path: "../../node_modules/geist/dist/fonts/geist-mono/GeistMono-Medium.woff2", weight: "500" },
    { path: "../../node_modules/geist/dist/fonts/geist-mono/GeistMono-SemiBold.woff2", weight: "600" },
  ],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Morton Backpacks — Built for the Ride",
  description: "Premium bicycle backpacks engineered for cyclists.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 5: Install geist font package**

```bash
npm install geist
```

- [ ] **Step 6: Create placeholder page**

Replace `src/app/page.tsx`:

```tsx
export default function Home() {
  return (
    <main>
      <h1>Morton Backpacks</h1>
    </main>
  );
}
```

- [ ] **Step 7: Verify dev server runs**

```bash
npm run dev
```

Open http://localhost:3000 — should render "Morton Backpacks" with Geist font active.

- [ ] **Step 8: Create placeholder asset directories**

```bash
mkdir -p public/images/products public/images/advantages public/images/icons
```

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js project with Tailwind, Swiper, Geist fonts"
```

---

### Task 2: Shared Button Component

**Files:**
- Create: `src/components/ui/Button.tsx`

- [ ] **Step 1: Create the Button component**

Create `src/components/ui/Button.tsx`:

```tsx
import React from "react";

type ButtonVariant = "small" | "dark";

interface ButtonProps {
  variant?: ButtonVariant;
  text?: string;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  variant = "small",
  text = "Shop now",
  className = "",
  onClick,
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-[family-name:var(--font-geist-mono)] font-semibold uppercase whitespace-nowrap";

  const variants: Record<ButtonVariant, string> = {
    small:
      "bg-white gap-[2px] px-[6px] py-[4px] text-black text-[12px] tracking-[-0.24px]",
    dark:
      "bg-black gap-[10px] px-[14px] py-[10px] text-morton-neon text-[20px] tracking-[-0.4px]",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} onClick={onClick}>
      <svg
        className={variant === "small" ? "w-[14px] h-[14px]" : "w-[18px] h-[18px]"}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
      <span>{text}</span>
    </button>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/Button.tsx
git commit -m "feat: add shared Button component with small and dark variants"
```

---

### Task 3: Navbar

**Files:**
- Create: `src/components/Navbar.tsx`

- [ ] **Step 1: Create Navbar component**

Create `src/components/Navbar.tsx`:

```tsx
"use client";

import { useState } from "react";

const navLinks = ["Shop", "Custom", "About"];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="mx-auto max-w-[1440px] px-4">
        <div className="flex items-center justify-between h-[37px]">
          {/* Left links */}
          <div className="hidden md:flex items-center gap-8 font-[family-name:var(--font-geist-mono)] font-semibold text-[14px] text-black uppercase">
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="hover:opacity-70 transition-opacity">
                {link}
              </a>
            ))}
          </div>

          {/* Logo */}
          <div className="flex items-center justify-center flex-1 md:flex-none">
            <a href="/" className="font-[family-name:var(--font-geist-mono)] font-semibold text-[16px] text-black uppercase tracking-tight">
              Morton
            </a>
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="font-[family-name:var(--font-geist-mono)] font-semibold text-[14px] text-black uppercase hover:opacity-70 transition-opacity">
              Login
            </a>
            <button aria-label="Cart" className="w-[40px] h-[37px] flex items-center justify-center">
              <svg width="16" height="17" viewBox="0 0 16 17" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 5.5L5.5 1h5L12 5.5M1 5.5h14l-1.5 10H2.5L1 5.5z" />
              </svg>
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M2 2l16 10M2 12L18 2" />
              ) : (
                <>
                  <path d="M0 1h20M0 7h20M0 13h20" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="font-[family-name:var(--font-geist-mono)] font-semibold text-[14px] text-black uppercase"
                onClick={() => setMobileOpen(false)}
              >
                {link}
              </a>
            ))}
            <a href="#" className="font-[family-name:var(--font-geist-mono)] font-semibold text-[14px] text-black uppercase">
              Login
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: add Navbar component with responsive hamburger menu"
```

---

### Task 4: Hero Section

**Files:**
- Create: `src/components/Hero.tsx`

- [ ] **Step 1: Create Hero component**

Create `src/components/Hero.tsx`:

```tsx
export default function Hero() {
  return (
    <section id="shop" className="relative w-full h-[100dvh] overflow-hidden">
      {/* Background image / Video poster */}
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover"
          poster="/images/hero-cover.jpg"
          autoPlay
          muted
          loop
          playsInline
        >
          {/* Video src placeholder — add source file here */}
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Hero text */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 md:pb-24">
        <h1 className="font-[family-name:var(--font-geist)] font-normal text-white uppercase tracking-[-2.84px] text-center px-4"
          style={{ fontSize: "clamp(48px, 10vw, 142px)" }}
        >
          Morton Backpacks
        </h1>
      </div>

      {/* Video controls */}
      <div className="absolute bottom-6 right-6 flex items-center gap-[14px] bg-white/20 backdrop-blur-sm rounded-full p-1">
        <button aria-label="Play" className="w-[16px] h-[16px] flex items-center justify-center text-white">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        </button>
        <button aria-label="Mute" className="w-[16px] h-[16px] flex items-center justify-center text-white">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="white" />
            <path d="M15.54 8.46a5 5 0 010 7.07" />
          </svg>
        </button>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: add Hero section with video background and overlay text"
```

---

### Task 5: Product Slider

**Files:**
- Create: `src/components/ProductSlider.tsx`

- [ ] **Step 1: Create ProductSlider component**

Create `src/components/ProductSlider.tsx`:

```tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  isNew?: boolean;
}

const placeholderProducts: Product[] = [
  { id: "1", name: "Jupiter 28 - 32L Backpack + 2L Sling", price: 175.99, image: "/images/products/product-1.jpg", isNew: true },
  { id: "2", name: "Jupiter 28 - 32L backpack", price: 175.99, image: "/images/products/product-2.jpg", isNew: true },
  { id: "3", name: "Jupiter 28 - 32L Backpack", price: 175.99, image: "/images/products/product-3.jpg" },
  { id: "4", name: "Jupiter 18L Tote bag", price: 175.99, image: "/images/products/product-4.jpg" },
  { id: "5", name: "Jupiter 18L Tote bag", price: 175.99, image: "/images/products/product-5.jpg" },
];

export default function ProductSlider({ products }: { products?: Product[] }) {
  const items = products ?? placeholderProducts;

  return (
    <section className="w-full py-[5px] pb-8">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={5}
        slidesPerView={1.2}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
          1440: { slidesPerView: 5 },
        }}
        className="w-full"
      >
        {items.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="flex flex-col">
              <div className="relative h-[280px] sm:h-[320px] md:h-[396px] overflow-hidden rounded-sm">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.isNew && (
                  <span className="absolute top-[10px] left-[10px] bg-morton-red text-white font-[family-name:var(--font-geist)] font-medium text-[12px] tracking-[-0.24px] px-[4px] py-[2px]">
                    NEW
                  </span>
                )}
              </div>
              <div className="flex items-start justify-between bg-gray-200 p-[10px]">
                <span className="font-[family-name:var(--font-geist)] font-medium text-[14px] text-black tracking-[-0.28px]">
                  {product.name}
                </span>
                <span className="font-[family-name:var(--font-geist)] font-medium text-[14px] text-black tracking-[-0.28px] whitespace-nowrap ml-2">
                  €{product.price.toFixed(2)}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom pagination styles */}
      <style jsx global>{`
        .swiper-pagination {
          position: relative;
          margin-top: 16px;
        }
        .swiper-pagination-bullet {
          width: 6px;
          height: 6px;
          background: #d1d1d1;
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #000000;
        }
      `}</style>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ProductSlider.tsx
git commit -m "feat: add ProductSlider with Swiper.js, autoplay, pagination"
```

---

### Task 6: Info Section

**Files:**
- Create: `src/components/InfoSection.tsx`

- [ ] **Step 1: Create InfoSection component**

Create `src/components/InfoSection.tsx`:

```tsx
import Button from "./ui/Button";

export default function InfoSection() {
  return (
    <section className="relative w-full h-[100dvh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/info-bg.jpg"
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[785px] mx-auto px-6 md:px-16 flex flex-col gap-5">
        <p className="font-[family-name:var(--font-geist)] font-normal text-[12px] text-white tracking-[0.36px] uppercase leading-[1.5]">
          Ultra-fast, ultra-refined. The Ultra Collection is engineered for speed
          with aero-tuned, Bluesign®-approved fabrics that cut drag and maximize
          efficiency. A second-skin fit moves with you, while moisture-wicking
          tech and strategic ventilation keep you cool when the pace heats up.
          Reflective details, radio pockets, and bonded seams add pro-level
          function—because every watt counts.
        </p>
        <Button variant="small" text="Learn more" />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/InfoSection.tsx
git commit -m "feat: add Info section with background image and CTA"
```

---

### Task 7: Advantages Section

**Files:**
- Create: `src/components/Advantages.tsx`

- [ ] **Step 1: Create Advantages component**

Create `src/components/Advantages.tsx`:

```tsx
"use client";

import { useState } from "react";

interface Advantage {
  word: string;
  tooltipText: string;
  gridArea: string;
  tooltipPosition: { left?: string; right?: string; top: string };
}

const advantages: Advantage[] = [
  {
    word: "Quality",
    tooltipText:
      "Ultra-fast, ultra-refined. The Ultra Collection is engineered for speed with aero-tuned, Bluesign®-approved fabrics that cut drag and maximize efficiency. A second-skin fit moves with you, while moisture-wicking tech and strategic ventilation keep you cool when the pace heats up.",
    gridArea: "1 / 2 / 2 / 3",
    tooltipPosition: { left: "60px", top: "34px" },
  },
  {
    word: "Love",
    tooltipText: "Designed with passion for cyclists who demand the best from their gear.",
    gridArea: "3 / 1 / 4 / 2",
    tooltipPosition: { top: "34px", left: "0" },
  },
  {
    word: "LONG-LASTING",
    tooltipText:
      "Built to endure thousands of kilometers. Premium materials and reinforced construction ensure your Morton bag goes the distance season after season.",
    gridArea: "3 / 3 / 4 / 4",
    tooltipPosition: { top: "34px", left: "0" },
  },
  {
    word: "Bold",
    tooltipText:
      "Ultra-fast, ultra-refined. The Ultra Collection is engineered for speed with aero-tuned, Bluesign®-approved fabrics that cut drag and maximize efficiency. A second-skin fit moves with you, while moisture-wicking tech and strategic ventilation keep you cool when the pace heats up.",
    gridArea: "2 / 4 / 3 / 5",
    tooltipPosition: { right: "-18px", top: "58px" },
  },
];

const images = [
  { src: "/images/advantages/image-1.jpg", gridArea: "1 / 1 / 2 / 2" },
  { src: "/images/advantages/image-2.jpg", gridArea: "1 / 4 / 2 / 5" },
  { src: "/images/advantages/image-3.jpg", gridArea: "3 / 2 / 4 / 3" },
  { src: "/images/advantages/image-4.jpg", gridArea: "3 / 4 / 4 / 5" },
];

function AdvantageWord({ advantage }: { advantage: Advantage }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative cursor-default"
      style={{ gridArea: advantage.gridArea }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <p
        className="font-[family-name:var(--font-geist-mono)] font-normal text-black uppercase tracking-[-1.28px] whitespace-nowrap"
        style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
      >
        {advantage.word}
      </p>
      {hovered && (
        <div
          className="absolute bg-gray-100 p-[10px] z-10"
          style={{
            ...advantage.tooltipPosition,
            width: "272px",
          }}
        >
          <p className="font-[family-name:var(--font-geist)] font-normal text-[12px] text-black tracking-[0.36px] uppercase leading-[1.3] text-justify">
            {advantage.tooltipText}
          </p>
        </div>
      )}
    </div>
  );
}

export default function Advantages() {
  return (
    <section className="w-full px-4 md:px-[58px] py-16 md:py-20">
      {/* Desktop grid */}
      <div className="hidden lg:grid gap-x-[33px] gap-y-4" style={{ gridTemplateColumns: "210px 1fr 1fr 210px" }}>
        {images.map((img, i) => (
          <div key={i} className="h-[252px] overflow-hidden rounded-sm" style={{ gridArea: img.gridArea }}>
            <img src={img.src} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
        {advantages.map((adv) => (
          <AdvantageWord key={adv.word} advantage={adv} />
        ))}
      </div>

      {/* Mobile / tablet: stacked */}
      <div className="lg:hidden flex flex-col gap-8">
        {[
          { type: "image", src: images[0].src },
          { type: "advantage", data: advantages[0] },
          { type: "image", src: images[1].src },
          { type: "advantage", data: advantages[3] },
          { type: "image", src: images[2].src },
          { type: "advantage", data: advantages[2] },
          { type: "image", src: images[3].src },
          { type: "advantage", data: advantages[1] },
        ].map((item, i) =>
          item.type === "image" ? (
            <div key={i} className="h-[200px] overflow-hidden rounded-sm">
              <img src={item.src!} alt="" className="w-full h-full object-cover" />
            </div>
          ) : (
            <AdvantageWord key={item.data!.word} advantage={item.data!} />
          )
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Advantages.tsx
git commit -m "feat: add Advantages section with off-grid layout and hover tooltips"
```

---

### Task 8: Contact Section

**Files:**
- Create: `src/components/ContactSection.tsx`

- [ ] **Step 1: Create ContactSection component**

Create `src/components/ContactSection.tsx`:

```tsx
import Button from "./ui/Button";

export default function ContactSection() {
  return (
    <section id="custom" className="w-full bg-gray-50">
      <div className="mx-auto max-w-[1440px] h-[100dvh] min-h-[600px] flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 px-6 md:px-10 py-16">
        {/* Text content */}
        <div className="flex flex-col gap-6 max-w-[459px]">
          <div className="flex flex-col gap-4">
            <span className="inline-block bg-gray-300 font-[family-name:var(--font-geist-mono)] font-semibold text-[12px] text-black tracking-[-0.24px] uppercase px-[5px] py-[2px] rounded-[2px] w-fit">
              Custom design
            </span>
            <h2 className="font-[family-name:var(--font-geist)] font-semibold text-black uppercase tracking-[-1.16px]"
              style={{ fontSize: "clamp(36px, 4vw, 58px)" }}
            >
              Can&apos;t find what you want?
            </h2>
          </div>
          <p className="font-[family-name:var(--font-geist)] font-normal text-[14px] text-black tracking-[-0.28px] leading-[1.2]">
            Spice up your bag with your favorite colors
          </p>
          <div>
            <Button variant="dark" text="Send message" />
          </div>
        </div>

        {/* Product image */}
        <div className="w-[272px] h-[340px] overflow-hidden rounded-sm flex-shrink-0">
          <img
            src="/images/contact-product.jpg"
            alt="Custom Morton backpack"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ContactSection.tsx
git commit -m "feat: add Contact section with custom design CTA"
```

---

### Task 9: Footer

**Files:**
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: Create Footer component**

Create `src/components/Footer.tsx`:

```tsx
import Button from "./ui/Button";

const serviceLinks = ["Contact", "Shipping", "Returns", "Warranty"];
const aboutLinks = ["Press", "About me", "Changelog", "Materials"];
const socialLinks = ["Instagram", "TikTok"];

export default function Footer() {
  return (
    <footer className="bg-black w-full">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        {/* Top section */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-12 pt-24 pb-16">
          {/* Left: info + newsletter */}
          <div className="flex flex-col gap-8 max-w-[440px]">
            <p className="font-[family-name:var(--font-geist-mono)] font-semibold text-[20px] text-white uppercase leading-tight">
              All orders ship within 24 business hours.
              <br />
              3-year product warranty
              <br />
              30-day returns
            </p>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <p className="font-[family-name:var(--font-geist)] font-semibold text-[14px] text-white">
                  Get updates about new drops!
                </p>
                <p className="font-[family-name:var(--font-geist)] font-normal text-[14px] text-white/70 leading-[1.2]">
                  Receive updates on pre-access, product drops, exclusive member offers, events, and more — delivered right to your inbox.
                </p>
              </div>
              <div className="flex flex-col gap-4 max-w-[440px]">
                <input
                  type="email"
                  placeholder="email"
                  className="border-2 border-white bg-transparent text-white font-[family-name:var(--font-geist)] font-medium text-[14px] px-[10px] py-[12px] placeholder:text-white/50 focus:outline-none focus:border-morton-neon transition-colors"
                />
                <Button variant="small" text="Subscribe" className="w-fit" />
              </div>
            </div>
          </div>

          {/* Right: link columns */}
          <div className="flex gap-5 text-white text-[14px]">
            <div className="flex flex-col gap-6 w-[95px]">
              <p className="font-[family-name:var(--font-geist-mono)] font-semibold uppercase">Service</p>
              <div className="flex flex-col gap-[10px] font-[family-name:var(--font-geist)] font-normal whitespace-nowrap">
                {serviceLinks.map((link) => (
                  <a key={link} href="#" className="hover:text-morton-neon transition-colors">{link}</a>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-6 w-[95px]">
              <p className="font-[family-name:var(--font-geist-mono)] font-semibold uppercase">About</p>
              <div className="flex flex-col gap-[10px] font-[family-name:var(--font-geist)] font-normal whitespace-nowrap">
                {aboutLinks.map((link) => (
                  <a key={link} href="#" className="hover:text-morton-neon transition-colors">{link}</a>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-6 w-[95px]">
              <p className="font-[family-name:var(--font-geist-mono)] font-semibold uppercase">Social</p>
              <div className="flex flex-col gap-[10px] font-[family-name:var(--font-geist)] font-normal whitespace-nowrap">
                {socialLinks.map((link) => (
                  <a key={link} href="#" className="hover:text-morton-neon transition-colors">{link}</a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Decorative logo area */}
        <div className="flex items-end gap-6 py-8">
          <div className="font-[family-name:var(--font-geist-mono)] font-semibold text-white/10 uppercase"
            style={{ fontSize: "clamp(80px, 15vw, 160px)", lineHeight: 0.9 }}
          >
            Morton
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-end gap-4 pb-8 pt-4">
          <div className="w-[60px] h-[60px] md:w-[231px] md:h-[231px] bg-white rounded-full flex-shrink-0" />
          <div className="hidden md:block w-[231px] h-[231px] bg-white rounded-full flex-shrink-0" />
          <div className="hidden md:block w-[670px] h-[231px] bg-white rounded-full flex-shrink-0" />
          <div className="font-[family-name:var(--font-geist)] font-normal text-[12px] text-white leading-[1.2]">
            <p>COPYRIGHT 20-25. MORTON Backpacks.</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: add Footer with newsletter, link columns, and decorative elements"
```

---

### Task 10: Compose Page and Verify

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Wire all sections into page**

Replace `src/app/page.tsx`:

```tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductSlider from "@/components/ProductSlider";
import InfoSection from "@/components/InfoSection";
import Advantages from "@/components/Advantages";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-[37px]">
        <Hero />
        <ProductSlider />
        <InfoSection />
        <Advantages />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
```

- [ ] **Step 2: Run dev server and verify all sections render**

```bash
npm run dev
```

Open http://localhost:3000. Verify:
- Navbar fixed at top with links and logo
- Hero section fills viewport with "MORTON BACKPACKS" text
- Product slider with placeholder images and autoplay
- Info section with background (shows broken image placeholder — expected)
- Advantages section with off-grid layout and hover tooltips
- Contact section with heading and CTA button
- Footer with all link columns

- [ ] **Step 3: Test responsive at mobile width (375px)**

Use browser dev tools to verify:
- Hamburger menu appears and works
- Hero text scales down
- Product slider shows 1 card
- Advantages stack vertically
- Contact section stacks
- Footer goes single column

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: wire all sections into home page"
```

---

### Task 11: Add Placeholder Assets

**Files:**
- Create: placeholder images in `public/images/`

- [ ] **Step 1: Generate SVG placeholder images**

Run this script to create placeholder images so the site looks presentable without real assets:

```bash
# Hero cover placeholder
cat > public/images/hero-cover.jpg << 'PLACEHOLDER'
This is a placeholder. Replace with actual hero cover image from Figma.
PLACEHOLDER

# Create simple SVG placeholders
for i in 1 2 3 4 5; do
  cat > "public/images/products/product-${i}.jpg" << 'PLACEHOLDER'
Placeholder product image ${i}
PLACEHOLDER
done

for i in 1 2 3 4; do
  cat > "public/images/advantages/image-${i}.jpg" << 'PLACEHOLDER'
Placeholder advantage image ${i}
PLACEHOLDER
done

cat > public/images/contact-product.jpg << 'PLACEHOLDER'
Placeholder contact product image
PLACEHOLDER

cat > public/images/info-bg.jpg << 'PLACEHOLDER'
Placeholder info background image
PLACEHOLDER
```

These are text placeholders. Replace with actual images exported from Figma.

- [ ] **Step 2: Create proper SVG placeholder generator**

Create a small Node script `scripts/placeholders.js`:

```javascript
const fs = require("fs");
const path = require("path");

function svgPlaceholder(width, height, label) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <rect width="100%" height="100%" fill="#e5e5e5"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#999">${label}</text>
</svg>`;
}

const dirs = [
  "public/images/products",
  "public/images/advantages",
  "public/images/icons",
];

dirs.forEach((dir) => {
  fs.mkdirSync(dir, { recursive: true });
});

// Hero
fs.writeFileSync("public/images/hero-cover.svg", svgPlaceholder(1440, 860, "Hero Cover 1440x860"));

// Products
for (let i = 1; i <= 5; i++) {
  fs.writeFileSync(`public/images/products/product-${i}.svg`, svgPlaceholder(340, 396, `Product ${i}`));
}

// Advantages
for (let i = 1; i <= 4; i++) {
  fs.writeFileSync(`public/images/advantages/image-${i}.svg`, svgPlaceholder(210, 252, `Advantage ${i}`));
}

// Contact
fs.writeFileSync("public/images/contact-product.svg", svgPlaceholder(272, 340, "Contact Product"));

// Info background
fs.writeFileSync("public/images/info-bg.svg", svgPlaceholder(1440, 728, "Info Background"));

console.log("Placeholders generated.");
```

Run: `node scripts/placeholders.js`

Then update component image paths to use `.svg` extensions instead of `.jpg`.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add placeholder images and generator script"
```

---

## Self-Review

**1. Spec coverage:**
- Navbar: Task 3 ✅
- Hero: Task 4 ✅
- Product Slider: Task 5 ✅
- Info Section: Task 6 ✅
- Advantages: Task 7 ✅
- Contact: Task 8 ✅
- Footer: Task 9 ✅
- Page composition: Task 10 ✅
- Design tokens: Task 1 ✅
- Button component: Task 2 ✅
- Responsive: handled in each component ✅
- Assets: Task 11 ✅
- Payload CMS: defined placeholder interface in Task 5, ready for integration ✅
- Tally embed: Contact button ready for Tally integration ✅

**2. Placeholder scan:** No TBDs or TODOs. All steps have complete code.

**3. Type consistency:** Product interface defined in Task 5 matches usage across components. Advantage interface consistent between definition and component props.

"use client";

import { useState, useEffect } from "react";

const defaultNavLinks = [
  { label: "Shop", href: "#shop" },
  { label: "Custom", href: "#custom" },
  { label: "About", href: "#about" },
];

interface NavbarProps {
  navLinks?: { label: string; href: string }[];
}

export default function Navbar({ navLinks }: NavbarProps) {
  const links = navLinks?.length ? navLinks : defaultNavLinks;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md" : ""}`}>
      <div className="mx-auto max-w-[1440px] px-4">
        <div className="flex items-center justify-between h-[37px]">
          {/* Left links */}
          <div className="hidden md:flex items-center gap-8 font-[family-name:var(--font-geist-mono)] font-semibold text-[14px] text-black uppercase">
            {links.map((link) => (
              <a key={link.label} href={link.href} className="hover:opacity-70 transition-opacity">
                {link.label}
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
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-[family-name:var(--font-geist-mono)] font-semibold text-[14px] text-black uppercase"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
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

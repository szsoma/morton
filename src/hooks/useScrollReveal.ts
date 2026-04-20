"use client";

import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    // Add js-enabled class to avoid FOIC
    document.documentElement.classList.add("js-enabled");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target as HTMLElement;
          el.classList.add("is-visible");

          // Handle stagger children
          if (el.dataset.reveal === "stagger") {
            const children = el.querySelectorAll("[data-reveal-child]");
            children.forEach((child, i) => {
              (child as HTMLElement).style.setProperty("--stagger-index", String(i));
              child.classList.add("is-visible");
            });
          }

          observer.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

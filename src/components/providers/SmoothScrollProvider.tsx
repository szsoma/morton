"use client";

import { ReactLenis } from "lenis/react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useScrollReveal();

  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}

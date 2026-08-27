"use client";

/**
 * SMOOTH SCROLL
 * ─────────────────────────────────────────────────────────────
 * Wraps the whole site in Lenis, which gives the page its weighted,
 * slightly-lagging scroll feel.
 *
 * TO TURN IT OFF: delete <SmoothScroll> from src/app/layout.tsx.
 * Nothing else depends on it.
 *
 * TO TUNE IT: `lerp` is the only dial that matters.
 *   0.05 = very heavy and floaty
 *   0.1  = current
 *   0.2  = close to native scrolling
 */

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Visitors who have asked for reduced motion get native scrolling.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      // Touch devices already have good native momentum.
      syncTouch: false,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

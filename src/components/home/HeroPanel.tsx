"use client";

/**
 * HERO PANEL
 * ─────────────────────────────────────────────────────────────
 * The portrait video panel on the mobile home page — 261 × 381 in the
 * Figma frame, held to that ratio at any width.
 *
 * Uses the same video and poster as the desktop hero, so replacing the
 * footage in content/site.ts updates both. It plays here even on
 * phones, unlike the full-bleed desktop hero: this one is a small
 * cropped panel, so the file is the same but the visual weight is
 * much lower and it is the whole point of the page.
 *
 * Anyone with reduced motion turned on gets the still.
 */

import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "../../../content/site";

export function HeroPanel() {
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () => setPlayVideo(!reduced.matches);
    decide();
    reduced.addEventListener("change", decide);
    return () => reduced.removeEventListener("change", decide);
  }, []);

  return (
    <div className="relative aspect-[261/381] w-full overflow-hidden bg-ink">
      <Image
        src={site.hero.poster}
        alt={site.hero.imageAlt}
        fill
        priority
        sizes="261px"
        className="object-cover"
      />

      {playVideo ? (
        <video
          src={site.hero.video}
          poster={site.hero.poster}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
          className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-1000 ease-[var(--ease-out-expo)]"
        />
      ) : null}
    </div>
  );
}

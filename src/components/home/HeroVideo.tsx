"use client";

/**
 * HERO VIDEO
 * ─────────────────────────────────────────────────────────────
 * The full-bleed looping video behind the home page.
 *
 * TO SWAP THE VIDEO
 *   Replace public/video/hero.mp4 and public/images/home-hero-poster.jpg.
 *   Keep the MP4 under about 4MB — it loads before anything else, and a
 *   heavy hero is the fastest way to make a site feel slow. Re-encode
 *   with: ffmpeg -i input.mp4 -an -vf scale=1280:-2 -crf 27 -preset slow
 *          -pix_fmt yuv420p -movflags +faststart hero.mp4
 *   The -an is important: it strips audio. Browsers refuse to autoplay
 *   anything with sound.
 *
 * ON MOBILE it deliberately shows the poster image instead of the
 * video. Phone visitors are usually on mobile data, and a few megabytes
 * for a background loop is not a fair trade. Do not "fix" this.
 *
 * Visitors with reduced motion turned on also get the still.
 */

import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "../../../content/site";

export function HeroVideo() {
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    const wideEnough = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const decide = () => setPlayVideo(wideEnough.matches && !reduced.matches);
    decide();

    wideEnough.addEventListener("change", decide);
    reduced.addEventListener("change", decide);
    return () => {
      wideEnough.removeEventListener("change", decide);
      reduced.removeEventListener("change", decide);
    };
  }, []);

  return (
    <div className="absolute inset-0 bg-ink">
      {/* Poster: always rendered, so there is never an empty frame. */}
      <Image
        src={site.hero.poster}
        alt={site.hero.imageAlt}
        fill
        priority
        sizes="100vw"
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
          // Fades in once the first frame is ready, so the cut from
          // poster to video is not visible.
          onCanPlay={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
          className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-1000 ease-[var(--ease-out-expo)]"
        />
      ) : null}
    </div>
  );
}

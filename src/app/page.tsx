/**
 * HOME PAGE
 * ─────────────────────────────────────────────────────────────
 * Full-bleed photo, three mono labels across the middle, and the dot
 * strip blended over the lower third. All text comes from
 * content/site.ts → hero.
 */

import Image from "next/image";
import { site } from "../../content/site";
import { NavBar } from "@/components/nav/NavBar";
import { DotStrip } from "@/components/layout/DotStrip";

export default function HomePage() {
  return (
    <>
      <NavBar theme="dark" />

      <main className="relative h-svh w-full overflow-hidden bg-ink">
        {/* Background photo */}
        <Image
          src={site.hero.image}
          alt={site.hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="animate-[hero-in_2.4s_var(--ease-out-expo)_both] object-cover"
        />

        {/* The three labels, sitting just above centre as in the design */}
        <div className="absolute inset-x-0 top-[calc(50%-104px)] z-10 px-(--spacing-gutter) mix-blend-difference">
          <div className="flex items-baseline justify-between font-sc text-(length:--text-label) tracking-design text-paper">
            <span>{site.hero.left}</span>
            <span className="hidden sm:inline">{site.hero.centre}</span>
            <span className="hidden md:inline">{site.hero.right}</span>
          </div>
        </div>

        {/* Dot strip across the lower third */}
        <div className="absolute inset-x-0 bottom-[124px] z-10 px-(--spacing-gutter)">
          <DotStrip blend />
        </div>
      </main>
    </>
  );
}

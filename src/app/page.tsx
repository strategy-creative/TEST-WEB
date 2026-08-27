/**
 * HOME PAGE
 * ─────────────────────────────────────────────────────────────
 * Full-bleed looping video and the circle strip pinned to the bottom of
 * the screen. Nothing else — the page is deliberately bare, with the
 * nav bar the only text over the footage.
 *
 * The CIRCLES are the one thing that blends: they invert against
 * whatever the video is doing behind them, so they react to the
 * footage.
 *
 * The video and poster come from content/site.ts → hero.
 */

import { NavBar } from "@/components/nav/NavBar";
import { DotStrip } from "@/components/layout/DotStrip";
import { HeroVideo } from "@/components/home/HeroVideo";

export default function HomePage() {
  return (
    <>
      <NavBar theme="dark" />

      <main className="relative h-svh w-full overflow-hidden bg-ink">
        <HeroVideo />

        {/*
          Circle strip: pinned 20px off the bottom of the screen, and
          capped at its design width so it does not balloon on very wide
          monitors.

          ⚠ The difference blend MUST live on this outer element, not on
          the SVG inside it. `z-10` creates a stacking context, and a
          blend applied below one only sees that context — not the video
          behind it — so the circles would render flat white. If they
          ever stop reacting to the footage, this is why.
        */}
        <div className="absolute inset-x-0 bottom-[20px] z-10 px-(--spacing-gutter) mix-blend-difference">
          {/*
            On phones the full 1380-wide pattern squeezes down to
            specks, so it is held at a minimum width and allowed to run
            off the right edge instead. Circles stay circle-sized.
          */}
          <div className="mx-auto w-full max-w-(--container-frame) overflow-hidden">
            <DotStrip blend className="min-w-[680px]" />
          </div>
        </div>
      </main>
    </>
  );
}

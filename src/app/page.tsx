/**
 * HOME PAGE
 * ─────────────────────────────────────────────────────────────
 * Two completely different designs, chosen by breakpoint. Both come
 * from the Figma file; this is not a responsive squeeze of one layout.
 *
 * PHONES — white page. Logo centred, a portrait video panel, an
 * underlined VIEW EVENTS link, and a small circle strip beneath.
 *
 * DESKTOP (sm and up) — black page. Full-bleed looping video with the
 * circle strip pinned 20px off the bottom. No text but the nav.
 *
 * On desktop the CIRCLES are the one thing that blends: they invert
 * against the video and react to the footage.
 */

import Link from "next/link";
import { site } from "../../content/site";
import { NavBar } from "@/components/nav/NavBar";
import { Frame } from "@/components/layout/Frame";
import { DotStrip } from "@/components/layout/DotStrip";
import { HeroVideo } from "@/components/home/HeroVideo";
import { HeroPanel } from "@/components/home/HeroPanel";

export default function HomePage() {
  return (
    <>
      {/* Phones get the light nav; desktop's sits over the video. */}
      <div className="sm:hidden">
        <NavBar theme="light" showLogo={false} />
      </div>
      <div className="hidden sm:block">
        <NavBar theme="dark" />
      </div>

      {/* ══ PHONES ═══════════════════════════════════════════════ */}
      <main className="flex min-h-svh flex-col bg-paper pt-[146px] pb-[40px] sm:hidden">
        <Frame>
          <div className="flex flex-col items-center gap-[36px]">
            <h1 className="w-full text-center text-(length:--text-heading) leading-[0.9] uppercase tracking-design text-heading">
              {site.name}
            </h1>

            {/* Portrait video panel, 261 × 381 in the design */}
            <div className="w-[261px] max-w-full">
              <HeroPanel />
            </div>

            <Link
              href="/events"
              className="w-full text-center text-(length:--text-heading) leading-[0.9] uppercase tracking-design text-heading underline decoration-solid underline-offset-[6px]"
            >
              VIEW EVENTS &gt;
            </Link>
          </div>
        </Frame>

        {/*
          Small circle strip, well below the link.
          ⚠ It is white-filled under a difference blend, which renders
          BLACK on the white page and inverts over anything darker.
          A black fill here would difference to white and disappear.
        */}
        <div className="mt-[115px] flex justify-center">
          <div className="w-[107px] mix-blend-difference">
            <DotStrip blend />
          </div>
        </div>
      </main>

      {/* ══ DESKTOP ══════════════════════════════════════════════ */}
      <main className="relative hidden h-svh w-full overflow-hidden bg-ink sm:block">
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
        <div className="absolute inset-x-0 bottom-[20px] z-10 mix-blend-difference">
          <Frame>
            <DotStrip blend />
          </Frame>
        </div>
      </main>
    </>
  );
}

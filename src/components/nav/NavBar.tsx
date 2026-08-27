"use client";

/**
 * NAV BAR
 * ─────────────────────────────────────────────────────────────
 * Logo left, page name beside it, hamburger right. Sits on every page.
 *
 * `theme` controls the colour:
 *   "light" — black text, for pages with a white background
 *   "dark"  — white text, for the full-bleed home page hero
 *
 * `pageName` is the word next to the logo ("EVENTS", "GALLERY"). Leave
 * it out on the home page, as designed.
 */

import Link from "next/link";
import { useState } from "react";
import { site } from "../../../content/site";
import { MenuIcon } from "./MenuIcon";
import { MenuOverlay } from "./MenuOverlay";

type NavBarProps = {
  pageName?: string;
  theme?: "light" | "dark";
};

export function NavBar({ pageName, theme = "light" }: NavBarProps) {
  const [open, setOpen] = useState(false);

  // Over the home page video and inside the open menu, the nav is plain
  // white — no blending. Only the circle strip blends with the footage.
  const onDark = open || theme === "dark";
  const tone = onDark ? "text-paper" : "text-heading";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 px-(--spacing-gutter) py-(--spacing-gutter) ${tone} transition-colors duration-300`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-baseline gap-[110px]">
            <Link
              href="/"
              className="text-(length:--text-heading) uppercase leading-[0.9] tracking-design"
            >
              {site.name}
            </Link>

            {pageName ? (
              <span className="text-(length:--text-heading) uppercase leading-[0.9] tracking-design">
                {pageName}
              </span>
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="cursor-pointer p-1 -m-1"
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </header>

      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}

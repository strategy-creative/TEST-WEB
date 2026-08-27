"use client";

/**
 * NAV BAR
 * ─────────────────────────────────────────────────────────────
 * Logo left, page name in the second column, hamburger far right.
 * Sits fixed on every page.
 *
 * ⚠ THE SECOND COLUMN IS FIXED AT 350px.
 * That is 25.36% of the 1380px content frame, straight from the Figma
 * file. The page name AND the open menu's links both sit in it, so they
 * line up exactly as you open and close the menu. If you change
 * NAV_COLUMN here, change it in MenuOverlay too — or better, keep them
 * both reading this constant.
 *
 * `theme` controls the colour:
 *   "light" — black text, for pages with a white background
 *   "dark"  — white text, for the home page video
 */

import Link from "next/link";
import { useState } from "react";
import { site } from "../../../content/site";
import { MenuIcon } from "./MenuIcon";
import { MenuOverlay } from "./MenuOverlay";

/** Left offset of the second column, inside the content frame. */
export const NAV_COLUMN = 350;

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
        <div className="mx-auto flex w-full max-w-(--container-frame) items-start justify-between">
          <div
            className="grid items-start"
            style={{ gridTemplateColumns: `${NAV_COLUMN}px auto` }}
          >
            <Link
              href="/"
              className="text-(length:--text-heading) leading-[0.9] uppercase tracking-design"
            >
              {site.name}
            </Link>

            {/* Hidden while the menu is open — the menu's own list takes
                this column, so the two must not overlap. */}
            {pageName && !open ? (
              <span className="text-(length:--text-heading) leading-[0.9] uppercase tracking-design">
                {pageName}
              </span>
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="-m-1 cursor-pointer p-1"
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </header>

      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}

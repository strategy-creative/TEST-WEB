"use client";

/**
 * NAV BAR
 * ─────────────────────────────────────────────────────────────
 * Logo left, page name in the second column, hamburger far right.
 * Fixed on every page.
 *
 * ⚠ THE SECOND COLUMN IS FIXED AT 350px on desktop.
 * That is 25.36% of the 1380px content frame, straight from the Figma
 * file. The page name AND the open menu's links both sit in it, so they
 * line up as you open and close the menu. If you change NAV_COLUMN,
 * MenuOverlay follows it automatically — it imports the constant.
 *
 * On phones the second column collapses: the page name is hidden and
 * the logo sits alone, as in the mobile frames.
 *
 * ⚠ THE SCROLL BACKDROP. At rest the bar is transparent, exactly as
 * designed. Once the page scrolls past SCROLL_THRESHOLD it fades in a
 * paper background, because the bar is fixed and long pages would
 * otherwise run their text straight through it. Do not remove it
 * without making the bar static instead.
 */

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "../../../content/site";
import { Frame } from "../layout/Frame";
import { MenuIcon } from "./MenuIcon";
import { MenuOverlay } from "./MenuOverlay";

/** Left offset of the second column, inside the content frame. */
export const NAV_COLUMN = 350;

/** Pixels of scroll before the backdrop fades in. */
const SCROLL_THRESHOLD = 40;

type NavBarProps = {
  pageName?: string;
  theme?: "light" | "dark";
  /**
   * Hide the logo in the bar. Used on the mobile home page, where the
   * logo is set large and centred in the page itself — showing it twice
   * reads as a mistake.
   */
  showLogo?: boolean;
};

export function NavBar({
  pageName,
  theme = "light",
  showLogo = true,
}: NavBarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /*
   * ⚠ The open menu is WHITE on phones and BLACK on desktop, so the bar
   * has to flip with it: ink on the mobile panel, paper on the desktop
   * one. Setting a single colour here makes the icon vanish on one of
   * the two — which is exactly what happened before.
   */
  const onDark = open || theme === "dark";
  const tone = open
    ? "text-ink sm:text-paper"
    : theme === "dark"
      ? "text-paper"
      : "text-heading";

  // No backdrop over the home video, and none while the menu is open —
  // the menu panel is already behind it.
  const backdrop = scrolled && !onDark ? "bg-paper" : "bg-transparent";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 py-(--spacing-gutter) ${tone} ${backdrop} transition-colors duration-300`}
      >
        <Frame>
          <div className="flex items-start justify-between">
            {/*
              ⚠ The column width is passed as a CSS variable, not as an
              inline gridTemplateColumns. An inline style beats every
              responsive class, so setting the 350px column that way
              applied it on phones too and pushed the hamburger off the
              right edge. One column on phones, two from sm up.
            */}
            <div
              className="grid grid-cols-1 items-start gap-x-0 sm:grid-cols-[var(--nav-col)_auto]"
              style={{ "--nav-col": `${NAV_COLUMN}px` } as React.CSSProperties}
            >
              {showLogo ? (
                <Link
                  href="/"
                  className="text-(length:--text-heading) leading-[0.9] uppercase tracking-design"
                >
                  {site.name}
                </Link>
              ) : (
                <span aria-hidden />
              )}

              {/* Hidden on phones, and while the menu is open — the
                  menu's own list takes this column on desktop. */}
              {pageName && !open ? (
                <span className="hidden text-(length:--text-heading) leading-[0.9] uppercase tracking-design sm:block">
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
        </Frame>
      </header>

      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}

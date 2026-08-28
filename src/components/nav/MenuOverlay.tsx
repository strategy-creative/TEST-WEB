"use client";

/**
 * MENU OVERLAY
 * ─────────────────────────────────────────────────────────────
 * Two different designs, one component.
 *
 * DESKTOP (sm and up) — full-screen BLACK panel sliding up. Links sit
 * at the top at logo size, in the same 350px column the page name
 * occupies in the nav bar, so opening the menu reads as the page name
 * being swapped for the list.
 *
 * PHONES — full-screen WHITE panel. Links sit at the BOTTOM, left
 * aligned, each with a ">" pushed to the right edge. The nav bar's
 * logo and close icon stay black over it.
 *
 * That difference is deliberate and comes straight from the Figma
 * mobile frames — it is not a responsive accident. Do not collapse the
 * two into one treatment.
 *
 * ⚠ Column offset comes from NAV_COLUMN in NavBar.tsx. Do not hardcode
 * a second copy of that number here.
 *
 * Links come from content/site.ts → menuLinks.
 */

import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "../../../content/site";
import { Frame } from "../layout/Frame";
import { NAV_COLUMN } from "./NavBar";

type MenuOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  // Escape closes it, and the page behind must not scroll.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.nav
          className="fixed inset-0 z-40 flex flex-col bg-paper py-(--spacing-gutter) text-ink sm:bg-ink sm:text-paper"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* ── Phones: links pinned to the bottom ─────────────── */}
          <Frame className="mt-auto sm:hidden">
            <ul className="flex flex-col gap-[12px] text-(length:--text-heading) leading-[1.05] uppercase tracking-design">
              {site.menuLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.22 + i * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <span aria-hidden>&gt;</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </Frame>

          {/* ── Desktop: links in the nav's second column ───────── */}
          <Frame className="hidden sm:block">
            <div
              className="grid items-start"
              style={{ gridTemplateColumns: `${NAV_COLUMN}px auto` }}
            >
              {/* The nav bar's logo sits over this cell. */}
              <div aria-hidden />

              <ul className="flex flex-col text-(length:--text-heading) leading-[1.5] uppercase tracking-design">
                {site.menuLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.22 + i * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="transition-colors duration-300 hover:text-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </Frame>

          {/* Location line along the bottom — desktop only */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-auto hidden sm:block"
          >
            <Frame>
              <div className="flex items-end justify-between font-sc text-(length:--text-base) tracking-design">
                <span>{site.hero.centre}</span>
                <span>{site.hero.right}</span>
              </div>
            </Frame>
          </motion.div>
        </motion.nav>
      ) : null}
    </AnimatePresence>
  );
}

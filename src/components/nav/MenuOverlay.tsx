"use client";

/**
 * MENU OVERLAY
 * ─────────────────────────────────────────────────────────────
 * Full-screen black panel that slides up from below.
 *
 * The links sit at the TOP, at logo size, in the same 350px column the
 * page name occupies in the nav bar — so opening the menu reads as the
 * page name being replaced by the list, not as a separate screen. The
 * logo and the close icon are the nav bar's own; it sits above this
 * panel (z-50 vs z-40) and shows straight through.
 *
 * ⚠ Column offset comes from NAV_COLUMN in NavBar.tsx. Do not hardcode
 * a second copy of that number here.
 *
 * The links come from content/site.ts → menuLinks. Add one there and it
 * appears here, no code change.
 */

import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "../../../content/site";
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
          className="fixed inset-0 z-40 bg-ink px-(--spacing-gutter) py-(--spacing-gutter) text-paper"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mx-auto w-full max-w-(--container-frame)">
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
          </div>

          {/* Location line, bottom of the panel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="absolute inset-x-0 bottom-(--spacing-gutter) px-(--spacing-gutter)"
          >
            <div className="mx-auto flex w-full max-w-(--container-frame) items-end justify-between font-sc text-(length:--text-base) tracking-design">
              <span>{site.hero.centre}</span>
              <span>{site.hero.right}</span>
            </div>
          </motion.div>
        </motion.nav>
      ) : null}
    </AnimatePresence>
  );
}

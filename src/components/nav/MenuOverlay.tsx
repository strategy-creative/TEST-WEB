"use client";

/**
 * MENU OVERLAY
 * ─────────────────────────────────────────────────────────────
 * The full-screen black panel. In the Figma file it is parked one
 * screen-height below the viewport and slides up — that is exactly what
 * this does.
 *
 * The links come from content/site.ts → menuLinks. Add a link there and
 * it appears here, no code change.
 */

import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "../../../content/site";

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
          className="fixed inset-0 z-40 flex flex-col justify-end bg-ink px-(--spacing-gutter) pb-(--spacing-gutter) pt-[120px] text-paper"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <ul className="flex flex-col gap-[8px]">
            {site.menuLinks.map((link, i) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.25 + i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block text-[clamp(2.5rem,7vw,73px)] uppercase leading-[1.1] tracking-design transition-colors duration-300 hover:text-muted"
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </ul>

          <div className="mt-[60px] flex items-end justify-between font-sc text-(length:--text-base) tracking-design">
            <span>{site.hero.centre}</span>
            <span>{site.hero.right}</span>
          </div>
        </motion.nav>
      ) : null}
    </AnimatePresence>
  );
}

"use client";

/**
 * PAGE LOADER
 * ─────────────────────────────────────────────────────────────
 * The black panel that covers the screen on first load, counts up,
 * then wipes upward to reveal the site.
 *
 * TO REMOVE IT: delete <PageLoader /> from src/app/layout.tsx.
 * TO CHANGE ITS LENGTH: `DURATION_MS` below, and the matching
 *   `loader-out` keyframes in globals.css.
 *
 * It only runs once per browser session, so navigating around the site
 * does not replay it.
 */

import { useEffect, useState } from "react";
import { site } from "../../../content/site";

const DURATION_MS = 2000;
const SESSION_KEY = "unit20:loaded";

export function PageLoader() {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // Private browsing can throw on storage access. Treat as unseen.
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduced) return;

    setShow(true);
    document.body.style.overflow = "hidden";

    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / (DURATION_MS * 0.55), 1);
      setCount(Math.round(progress * 100));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const done = window.setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
      try {
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // Nothing to do — the loader simply replays next time.
      }
    }, DURATION_MS);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(done);
      document.body.style.overflow = "";
    };
  }, []);

  if (!show) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-100 flex items-end justify-between bg-ink px-(--spacing-gutter) py-(--spacing-gutter) text-paper"
      style={{
        animation: `loader-out ${DURATION_MS}ms var(--ease-out-expo) forwards`,
      }}
    >
      <span
        className="font-sc text-(length:--text-label) tracking-design"
        style={{ animation: `loader-count ${DURATION_MS}ms linear forwards` }}
      >
        {site.name}
      </span>
      <span
        className="font-sc tabular-nums text-(length:--text-label) tracking-design"
        style={{ animation: `loader-count ${DURATION_MS}ms linear forwards` }}
      >
        {String(count).padStart(3, "0")}
      </span>
    </div>
  );
}

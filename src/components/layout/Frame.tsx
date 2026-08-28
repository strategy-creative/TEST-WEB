/**
 * FRAME
 * ═════════════════════════════════════════════════════════════
 * The page margin, in one place.
 *
 * ⚠ EVERY page and every full-width band uses this. Do not write the
 * container classes by hand — that is exactly how the margins drifted
 * out of sync before.
 *
 *   <Frame>…page content…</Frame>
 *   <Frame as="header">…</Frame>
 *
 * What it does: centres the content, caps it at 1440px, and holds a
 * gutter on both sides at every width (15px on phones, 30px from the
 * sm breakpoint up). Content therefore tops out at 1380px — the Figma
 * frame width — and never touches the edge of the window.
 *
 * The bug this replaces: pages used `px-(--spacing-gutter) sm:px-0`,
 * which removed the gutter above 640px. Between 640px and 1380px the
 * content ran hard to both edges.
 */

import type { ElementType } from "react";

type FrameProps = {
  children: React.ReactNode;
  className?: string;
  as?: ElementType;
};

export function Frame({ children, className = "", as: Tag = "div" }: FrameProps) {
  return (
    <Tag
      className={`mx-auto w-full max-w-(--container-page) px-(--spacing-gutter) ${className}`}
    >
      {children}
    </Tag>
  );
}

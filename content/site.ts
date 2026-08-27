/**
 * SITE SETTINGS
 * ─────────────────────────────────────────────────────────────
 * Venue-wide details. Change things here, not in the components.
 * Everything in this file is safe to edit.
 */

export const site = {
  /** Shown as the logo, top-left of every page. */
  name: "UNIT/20",

  /** Browser tab title + search results. */
  title: "UNIT/20 — Christchurch",
  description:
    "UNIT/20 is a club and live venue in Christchurch, New Zealand. Events, tickets and gallery.",

  /** The three labels across the middle of the home page hero. */
  hero: {
    left: "UNIT/20",
    centre: "CHRISTCHURCH,NZ",
    right: "-43.5374 /172.6410",
    /** Full-bleed background photo. Put the file in public/images/. */
    image: "/images/home-hero.jpg",
    imageAlt: "A packed crowd on the UNIT/20 dancefloor",
  },

  /** Footer link list, in order. Add or remove freely. */
  footerLinks: [
    { label: "EVENTS", href: "/events" },
    { label: "LOG IN", href: "/login" },
    { label: "REGISTER", href: "/register" },
    { label: "GALLERY", href: "/gallery" },
    { label: "TERMS", href: "/terms" },
  ],

  /** Bottom-right of the footer. */
  copyright: "ALL RIGHTS RESERVED @UNIT20",

  /** Links in the full-screen menu overlay (the hamburger). */
  menuLinks: [
    { label: "HOME", href: "/" },
    { label: "EVENTS", href: "/events" },
    { label: "GALLERY", href: "/gallery" },
    { label: "LOG IN", href: "/login" },
    { label: "REGISTER", href: "/register" },
  ],
} as const;

export type Site = typeof site;

export type NavLink = {
  label: string;
  href: string;
  /** Hidden until someone is signed in. See src/lib/session.ts. */
  requiresAuth?: boolean;
};

/**
 * SITE SETTINGS
 * ═════════════════════════════════════════════════════════════
 * The venue-editable settings — page title, description, the location
 * line and the copyright — live in content/site-settings.json and are
 * edited in the admin at /keystatic under "Site settings".
 *
 * Everything else here (links, the hero video paths) is structure
 * rather than copy, so it stays in code. Change a link and the route
 * has to exist; that is a developer change, not a content one.
 */

/*
 * ⚠ A STATIC IMPORT, not a file read. This module is used by client
 * components (the nav, the footer, the loader), so it must never touch
 * node:fs — that drags the filesystem into the browser bundle and the
 * build fails. JSON imports are bundled safely on both sides.
 */
import settings from "./site-settings.json";

export const site = {
  /** Shown as the logo, top-left of every page. */
  name: "UNIT/20",

  /** Browser tab title + search results. Edited in the admin. */
  title: settings.title,
  description: settings.description,

  hero: {
    /**
     * Location line. No longer shown on the home page — it now appears
     * along the bottom of the open menu overlay.
     */
    centre: settings.locationLabel,
    right: settings.coordinates,
    /**
     * Full-bleed background video. Shown on screens 768px and wider.
     * See src/components/home/HeroVideo.tsx before replacing it —
     * there are encoding settings that matter.
     */
    video: "/video/hero.mp4",
    /**
     * Still frame. Shown on phones, on slow connections, and to anyone
     * with reduced motion turned on. Should look good on its own.
     */
    poster: "/images/home-hero-poster.jpg",
    imageAlt: "A packed crowd on the UNIT/20 dancefloor",
  },

  /**
   * Footer link list, in order. Add or remove freely.
   * `requiresAuth` links only appear once someone is signed in.
   */
  footerLinks: [
    { label: "EVENTS", href: "/events" },
    { label: "LOG IN", href: "/login" },
    { label: "GALLERY", href: "/gallery" },
    { label: "TERMS", href: "/terms" },
    // ⚠ MY TICKETS is deliberately absent — that page is switched off
    // until real accounts exist, and a link to a 404 is worse than no
    // link. See src/lib/accounts.ts before putting it back.
  ] as NavLink[],

  /** Bottom-right of the footer. Edited in the admin. */
  copyright: settings.copyright,

  /**
   * Links in the full-screen menu overlay (the hamburger).
   * They render at logo size, stacked, in the second column.
   * `requiresAuth` links only appear once someone is signed in.
   */
  menuLinks: [
    { label: "EVENTS", href: "/events" },
    { label: "GALLERY", href: "/gallery" },
    { label: "LOG IN", href: "/login" },
    // ⚠ See the note on footerLinks — MY TICKETS stays off.
  ] as NavLink[],
} as const;

export type Site = typeof site;


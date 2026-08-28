/**
 * EVENTS
 * ═════════════════════════════════════════════════════════════
 * ⚠ DO NOT EDIT EVENTS IN THIS FILE.
 *
 * Events are edited in the admin at /keystatic. Each one is a JSON
 * file in content/events/, written by that admin. This file just reads
 * them, sorts them and gives the rest of the site a typed shape to
 * work with.
 *
 * You may edit this file to change HOW events behave — sorting,
 * filtering, the grid size. Not to change WHAT the events are.
 *
 * To add a field: add it to keystatic.config.ts first, then to the
 * type below, then render it in the page that needs it. All three, or
 * it will not show up.
 */

import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { VenueEvent } from "./types";

export type {
  EventStatus,
  TicketTier,
  DjSlot,
  VenueEvent,
} from "./types";

const DIR = path.join(process.cwd(), "content", "events");

function readAll(): VenueEvent[] {
  let files: string[] = [];
  try {
    files = fs.readdirSync(DIR).filter((f) => f.endsWith(".json"));
  } catch {
    // No events yet — the site should still build and render empty.
    return [];
  }

  return files
    .map((file) => {
      const raw = JSON.parse(fs.readFileSync(path.join(DIR, file), "utf8"));
      return {
        ...raw,
        slug: file.replace(/\.json$/, ""),
        // Keystatic writes empty optional fields as "" or null.
        subtitle: raw.subtitle || undefined,
        externalTicketUrl: raw.externalTicketUrl || undefined,
        tiers: raw.tiers ?? [],
        lineup: raw.lineup ?? [],
      } as VenueEvent;
    })
    .sort((a, b) => a.date.localeCompare(b.date));
}

export const events: VenueEvent[] = readAll();

/** Events still to come. Anything marked "past" drops off on its own. */
export function upcomingEvents(): VenueEvent[] {
  return events.filter((e) => e.status !== "past");
}

export function getEvent(slug: string): VenueEvent | undefined {
  return events.find((e) => e.slug === slug);
}

/**
 * The events grid is drawn as a fixed 4-across grid with dashed
 * placeholders in the empty slots, exactly as designed.
 */
export const EVENTS_GRID_SLOTS = 8;

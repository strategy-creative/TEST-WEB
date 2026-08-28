/**
 * MY TICKETS
 * ─────────────────────────────────────────────────────────────
 * ⚠ SAMPLE DATA ONLY. These are hardcoded so the page can be designed
 * and reviewed. A real "my tickets" list belongs to whichever ticketing
 * platform took the payment — it knows who bought what, and it issues
 * the scannable code that gets checked at the door.
 *
 * When ticketing is connected, this file is replaced by a fetch against
 * that platform's API for the signed-in buyer. Do not build a ticket
 * store here. See CLAUDE.md → Ticketing.
 */

import "server-only";
import { events } from "./events";
import type { HeldTicket, HeldTicketWithEvent } from "./types";

export type { HeldTicket, HeldTicketWithEvent } from "./types";

export const heldTickets: HeldTicket[] = [
  {
    reference: "U20-0001",
    eventSlug: "aperture-presents-smoke-and-dart",
    quantity: 2,
  },
  { reference: "U20-0002", eventSlug: "our-sound-05", quantity: 1 },
];

/** The events those tickets are for, in the order held. */
export function ticketsWithEvents(): HeldTicketWithEvent[] {
  return heldTickets.flatMap((ticket) => {
    const event = events.find((e) => e.slug === ticket.eventSlug);
    return event ? [{ ...ticket, event }] : [];
  });
}

/** The grid is drawn four across with dashed empty slots, as designed. */
export const TICKETS_GRID_SLOTS = 4;

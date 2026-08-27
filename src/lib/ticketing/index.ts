/**
 * TICKETING
 * ═════════════════════════════════════════════════════════════
 * READ THIS BEFORE WIRING UP TICKET SALES.
 *
 * The site does not sell tickets by itself. It talks to a ticketing
 * provider through the small interface below. Swapping platforms means
 * changing ONE environment variable and, if it is a new platform,
 * adding one file in ./providers.
 *
 * ── The three modes ──────────────────────────────────────────
 *
 * 1. "external"  (recommended, and the fastest to go live)
 *    Every GET TICKETS button links out to your ticketing platform —
 *    Flicket, Humanitix, Eventbrite, Ticket Tailor, iTicket. They take
 *    the payment, issue the ticket, scan it at the door and handle
 *    refunds. You do nothing. Set each event's `externalTicketUrl` in
 *    content/events.ts.
 *
 * 2. "embed"
 *    The platform's own checkout widget renders inside the dashed
 *    checkout panel, so buyers never leave the site. Needs an embed
 *    key from the platform. Styling is limited to whatever the widget
 *    exposes.
 *
 * 3. "stripe"
 *    On-site checkout using Stripe. The card fields are Stripe's own
 *    hosted inputs, styled to match the design — the card number never
 *    touches this site or its server, which is what keeps the venue out
 *    of PCI-DSS scope. Requires a Stripe account and a server route to
 *    create the payment intent. This is the most work and the most
 *    control.
 *
 * ── Which to pick ────────────────────────────────────────────
 * If the venue already sells tickets somewhere, use "external" and
 * point at that. It is live in an afternoon and someone else owns the
 * hard parts. Move to "stripe" only when there is a concrete reason.
 *
 * ⚠ NEVER collect raw card numbers into fields on this site. The Figma
 * design shows plain CARD NUMBER / EXPIRY / CVV boxes; those are
 * rendered as the provider's hosted fields instead. Do not "simplify"
 * them back into ordinary inputs.
 */

export type TicketingMode = "external" | "embed" | "stripe";

export type CheckoutIntent = {
  eventSlug: string;
  eventTitle: string;
  tierName: string;
  /** Whole dollars, NZD. */
  unitPrice: number;
  quantity: number;
  buyer: {
    email: string;
    firstName: string;
    lastName: string;
  };
  promoCode?: string;
};

export type CheckoutResult =
  | { kind: "redirect"; url: string }
  | { kind: "ticket"; ticketId: string }
  | { kind: "error"; message: string };

export type TicketingProvider = {
  mode: TicketingMode;
  /** Human name, shown in dev warnings. */
  label: string;
  /** Where a GET TICKETS button should point, if it links out. */
  ticketUrlFor(eventSlug: string, fallback?: string): string | null;
  /** Runs when the buyer hits PURCHASE. */
  checkout(intent: CheckoutIntent): Promise<CheckoutResult>;
};

/**
 * Reads NEXT_PUBLIC_TICKETING_MODE from the environment.
 * Defaults to "external" — the safe option.
 */
export function getTicketingMode(): TicketingMode {
  const raw = process.env.NEXT_PUBLIC_TICKETING_MODE;
  if (raw === "embed" || raw === "stripe" || raw === "external") return raw;
  return "external";
}

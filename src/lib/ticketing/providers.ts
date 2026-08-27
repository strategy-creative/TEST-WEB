/**
 * TICKETING PROVIDERS
 * ─────────────────────────────────────────────────────────────
 * One object per platform. To add a new platform, copy `externalProvider`,
 * rename it, and register it in `getProvider` at the bottom.
 */

import type {
  CheckoutIntent,
  CheckoutResult,
  TicketingProvider,
} from "./index";
import { getTicketingMode } from "./index";

/* ═══════════════════════════════════════════════════════════════
   1. EXTERNAL — link out to a ticketing platform
   ═══════════════════════════════════════════════════════════════ */

export const externalProvider: TicketingProvider = {
  mode: "external",
  label: "External ticketing platform",

  ticketUrlFor(_eventSlug, fallback) {
    // Per-event URLs live in content/events.ts → externalTicketUrl.
    // A site-wide box office page can be set as the fallback.
    return fallback ?? process.env.NEXT_PUBLIC_BOX_OFFICE_URL ?? null;
  },

  async checkout(): Promise<CheckoutResult> {
    return {
      kind: "error",
      message:
        "This event links out to the ticketing platform. Set externalTicketUrl on the event in content/events.ts.",
    };
  },
};

/* ═══════════════════════════════════════════════════════════════
   2. EMBED — the platform's widget renders in the checkout panel
   ═══════════════════════════════════════════════════════════════ */

export const embedProvider: TicketingProvider = {
  mode: "embed",
  label: "Embedded widget",

  ticketUrlFor() {
    // Stays on-site — the widget handles it.
    return null;
  },

  async checkout(): Promise<CheckoutResult> {
    return {
      kind: "error",
      message:
        "The embedded widget owns its own checkout. Nothing to submit from this form.",
    };
  },
};

/* ═══════════════════════════════════════════════════════════════
   3. STRIPE — on-site checkout, hosted card fields
   ═══════════════════════════════════════════════════════════════ */

export const stripeProvider: TicketingProvider = {
  mode: "stripe",
  label: "Stripe",

  ticketUrlFor() {
    return null;
  },

  async checkout(intent: CheckoutIntent): Promise<CheckoutResult> {
    // Server route lives at src/app/api/checkout/route.ts.
    // It is a stub until Stripe keys are added — see CLAUDE.md.
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(intent),
      });

      if (!res.ok) {
        return { kind: "error", message: "Payment could not be started." };
      }

      return (await res.json()) as CheckoutResult;
    } catch {
      return { kind: "error", message: "Network error. Please try again." };
    }
  },
};

/* ═══════════════════════════════════════════════════════════════ */

export function getProvider(): TicketingProvider {
  switch (getTicketingMode()) {
    case "embed":
      return embedProvider;
    case "stripe":
      return stripeProvider;
    default:
      return externalProvider;
  }
}

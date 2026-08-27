/**
 * CHECKOUT API — STUB
 * ═════════════════════════════════════════════════════════════
 * This route only runs when ticketing is in "stripe" mode. It is a
 * deliberate stub: it refuses every request until a real payment
 * provider is connected.
 *
 * ⚠ IT MUST NEVER RETURN A SUCCESSFUL "ticket" RESULT WITHOUT AN
 * ACTUAL PAYMENT. A checkout that issues tickets without taking money
 * is worse than a broken one — people turn up at the door holding
 * something that looks valid.
 *
 * TO CONNECT STRIPE
 *   1. npm install stripe
 *   2. Add STRIPE_SECRET_KEY and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
 *      to Vercel → Project → Settings → Environment Variables.
 *      Never put keys in this repo.
 *   3. Replace the body below with a PaymentIntent, and return
 *      { kind: "redirect", url } to Stripe's hosted page, or the
 *      client secret for Elements.
 *   4. Add a webhook route to issue the ticket only after Stripe
 *      confirms payment — not here, and not on the client.
 *
 * Read src/lib/ticketing/index.ts first. For most venues, "external"
 * mode is the right answer and this file stays a stub forever.
 */

import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      kind: "error",
      message:
        "No payment provider is connected. See CLAUDE.md → Ticketing.",
    },
    { status: 501 },
  );
}

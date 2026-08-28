"use client";

/**
 * CHECKOUT PANEL
 * ─────────────────────────────────────────────────────────────
 * The dashed panel on the right of an event page. Three steps, matching
 * the three Figma frames:
 *
 *   1. "details"  — ticket tier, buyer name/email, quantity, NEXT >
 *   2. "payment"  — hosted card fields, promo code, PURCHASE
 *   3. "complete" — VIEW TICKET >
 *
 * When ticketing is in "external" mode this whole panel is replaced by
 * a single button linking to the ticketing platform. That is the
 * default and the recommended setup — see src/lib/ticketing/index.ts.
 */

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { VenueEvent } from "../../../content/types";
import { getProvider } from "@/lib/ticketing/providers";
import { QuantityStepper } from "./QuantityStepper";
import { Field } from "./Field";
import { HostedCardFields } from "./HostedCardFields";

type Step = "details" | "payment" | "complete";

const panelTransition = {
  duration: 0.5,
  ease: [0.16, 1, 0.3, 1] as const,
};

export function CheckoutPanel({ event }: { event: VenueEvent }) {
  const provider = getProvider();

  const availableTier =
    event.tiers.find((t) => t.status === "available") ?? event.tiers[0];

  const [step, setStep] = useState<Step>("details");
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [promo, setPromo] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);

  const soldOut = event.status === "sold-out";
  const total = availableTier.price * quantity;

  /* ── External mode: link straight out, no on-site checkout ────── */
  const externalUrl = provider.ticketUrlFor(
    event.slug,
    event.externalTicketUrl,
  );

  if (provider.mode === "external") {
    /*
     * ⚠ A ticket link is set — send them to the platform.
     */
    if (externalUrl) {
      return (
        <PanelShell event={event} total={availableTier.price}>
          <div className="flex h-[237px] items-center justify-center border border-dashed border-ink">
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-ink px-[41px] py-[8px] font-sc text-(length:--text-body) tracking-design text-paper transition-opacity duration-200 hover:opacity-80"
            >
              GET TICKETS &gt;
            </a>
          </div>
        </PanelShell>
      );
    }

    /*
     * ⚠ NO TICKET LINK SET — THE CHECKOUT IS A MOCK-UP.
     *
     * The three-step flow below is real, working UI, and it is kept
     * visible on purpose so the design can be seen and reviewed. But
     * it CANNOT TAKE MONEY: /api/checkout refuses every request.
     *
     * So it carries a banner saying exactly that. Without one, a
     * stranger could fill in their name and email, reach a payment
     * step that errors, and reasonably believe they had bought a
     * ticket. The banner is the whole reason this is safe to leave up.
     *
     * ⚠ DO NOT REMOVE THE BANNER while the checkout is unconnected.
     * Set the event's Ticket link in the admin and both the banner and
     * the mock checkout disappear, replaced by a GET TICKETS button.
     */
    // falls through to the checkout below, with `isMockCheckout` set
  }

  const isMockCheckout = provider.mode === "external" && !externalUrl;

  /* ── Sold out ──────────────────────────────────────────────── */
  if (soldOut) {
    return (
      <PanelShell event={event} total={availableTier.price}>
        <div className="flex h-[237px] items-center justify-center border border-dashed border-ink">
          <span className="font-sc text-(length:--text-body) tracking-design">
            SOLD OUT
          </span>
        </div>
      </PanelShell>
    );
  }

  /* ── Step handlers ─────────────────────────────────────────── */

  const goToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.includes("@") || !firstName.trim() || !lastName.trim()) {
      setError("Please fill in your name and a valid email.");
      return;
    }

    setStep("payment");
  };

  const purchase = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);

    const result = await provider.checkout({
      eventSlug: event.slug,
      eventTitle: event.title,
      tierName: availableTier.name,
      unitPrice: availableTier.price,
      quantity,
      buyer: { email, firstName, lastName },
      promoCode: promo || undefined,
    });

    setBusy(false);

    if (result.kind === "redirect") {
      window.location.href = result.url;
      return;
    }
    if (result.kind === "ticket") {
      setTicketId(result.ticketId);
      setStep("complete");
      return;
    }
    setError(result.message);
  };

  return (
    <PanelShell event={event} total={total} mock={isMockCheckout}>
      <AnimatePresence mode="wait">
        {/* ── STEP 1 — details ──────────────────────────────── */}
        {step === "details" ? (
          <motion.form
            key="details"
            onSubmit={goToPayment}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={panelTransition}
            className="flex flex-col gap-[63px] border border-dashed border-ink p-[20px]"
          >
            <div className="flex flex-col gap-[40px] xl:flex-row xl:gap-[121px]">
              <div className="flex w-[186px] shrink-0 flex-col gap-[16px] font-sc text-(length:--text-body) tracking-design">
                <p>{availableTier.name}</p>
                <p>${availableTier.price}</p>
              </div>

              <div className="flex w-full max-w-[389px] flex-col gap-[18px]">
                <Field
                  id="email"
                  label="EMAIL:"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  required
                  autoComplete="email"
                />
                <Field
                  id="first-name"
                  label="NAME:"
                  value={firstName}
                  onChange={setFirstName}
                  required
                  autoComplete="given-name"
                />
                <Field
                  id="last-name"
                  label="LAST NAME:"
                  value={lastName}
                  onChange={setLastName}
                  required
                  autoComplete="family-name"
                />
              </div>
            </div>

            <div className="flex items-end justify-between">
              <QuantityStepper value={quantity} onChange={setQuantity} />

              <button
                type="submit"
                className="h-[27px] cursor-pointer border border-ink bg-ink px-[38px] font-sc text-(length:--text-body) leading-none tracking-design text-paper transition-opacity duration-200 hover:opacity-80"
              >
                NEXT &gt;
              </button>
            </div>

            {error ? <ErrorNote>{error}</ErrorNote> : null}
          </motion.form>
        ) : null}

        {/* ── STEP 2 — payment ──────────────────────────────── */}
        {step === "payment" ? (
          <motion.form
            key="payment"
            onSubmit={purchase}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={panelTransition}
            className="flex flex-col gap-[20px] border border-dashed border-ink p-[20px]"
          >
            <div className="flex flex-col justify-between gap-[40px] xl:flex-row">
              <div className="flex w-[186px] shrink-0 flex-col gap-[87px]">
                <div className="flex flex-col gap-[16px] font-sc text-(length:--text-body) tracking-design">
                  <p>{availableTier.name}</p>
                  <p>${availableTier.price}</p>
                </div>
                <QuantityStepper value={quantity} onChange={setQuantity} />
              </div>

              {/* Provider-hosted — see HostedCardFields.tsx */}
              <HostedCardFields />

              <div className="flex w-[173px] shrink-0 flex-col justify-between gap-[60px]">
                <div className="flex flex-col gap-[12px]">
                  <label
                    htmlFor="promo"
                    className="font-sc text-(length:--text-tiny) tracking-design"
                  >
                    PROMO CODE:
                  </label>
                  <input
                    id="promo"
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                    className="h-[28px] w-full bg-field px-[10px] font-sc text-(length:--text-tiny) tracking-design outline-none focus-visible:ring-1 focus-visible:ring-ink"
                  />
                </div>

                <button
                  type="submit"
                  disabled={busy}
                  className="h-[30px] w-full cursor-pointer border border-ink bg-ink font-sc text-(length:--text-body) leading-none tracking-design text-paper transition-opacity duration-200 hover:opacity-80 disabled:opacity-40"
                >
                  {busy ? "…" : "PURCHASE"}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep("details")}
                className="cursor-pointer font-sc text-(length:--text-tiny) tracking-design text-muted-soft transition-colors duration-200 hover:text-ink"
              >
                &lt; BACK
              </button>
              <p className="font-sc text-(length:--text-tiny) tracking-design">
                TOTAL ${total}
              </p>
            </div>

            {error ? <ErrorNote>{error}</ErrorNote> : null}
          </motion.form>
        ) : null}

        {/* ── STEP 3 — complete ─────────────────────────────── */}
        {step === "complete" ? (
          <motion.div
            key="complete"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={panelTransition}
            className="flex h-[237px] items-center justify-center border border-dashed border-ink"
          >
            <Link
              href={ticketId ? `/tickets/${ticketId}` : "/tickets"}
              className="font-sc text-(length:--text-body) tracking-design underline underline-offset-4 transition-opacity duration-200 hover:opacity-60"
            >
              VIEW TICKET &gt;
            </Link>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </PanelShell>
  );
}

/* ═══════════════════════════════════════════════════════════════
   The dashed outer frame — date and location header, CHECKOUT title,
   ticket tier line. Shared by every step.
   ═══════════════════════════════════════════════════════════════ */

function PanelShell({
  event,
  total,
  children,
  mock = false,
}: {
  event: VenueEvent;
  total: number;
  children: React.ReactNode;
  /** No ticket link set — show the "not connected" banner. */
  mock?: boolean;
}) {
  return (
    <div className="flex min-h-[833px] w-full flex-col justify-between border border-dashed border-ink p-[25px]">
      {/*
        ⚠ The honesty banner. See the note in CheckoutPanel — this is
        what makes an unconnected checkout safe to leave on a live site.
      */}
      {mock ? (
        <div className="mb-[24px] border border-ink bg-ink px-[16px] py-[10px] font-sc text-(length:--text-tiny) leading-[1.5] tracking-design text-paper">
          PREVIEW — TICKET SALES ARE NOT CONNECTED YET. Nothing on this
          form can be purchased. Tickets will be on sale shortly.
        </div>
      ) : null}
      {/* Header: date left, location right */}
      <div className="flex flex-col gap-[40px] font-sc text-(length:--text-caption) tracking-design xl:flex-row xl:gap-[162px]">
        <p className="w-[278px] break-words">
          {event.dateLabel}
          <br />
          {event.timeLabel}
        </p>

        <div className="flex w-[221px] flex-col gap-[28px]">
          <div className="flex items-start gap-[20px]">
            <span className="shrink-0">LOCATION:</span>
            <span className="min-w-0 break-words text-muted-soft">
              {event.location}
            </span>
          </div>
          <p>{event.doorsLabel}</p>
        </div>
      </div>

      {/* Body */}
      <div className="mt-[80px] flex flex-col gap-[83px]">
        <div className="flex flex-col gap-[27px] font-sc">
          <div className="flex items-start justify-between whitespace-nowrap text-(length:--text-checkout) tracking-design">
            <h2 className="shrink-0">CHECKOUT</h2>
            <p>${total}</p>
          </div>

          {/* Tier line — available in black, sold out in grey */}
          <p className="break-words text-(length:--text-caption) tracking-design">
            {event.tiers.map((tier, i) => (
              <span
                key={tier.name}
                className={
                  tier.status === "available" ? "text-ink" : "text-muted-soft-alt"
                }
              >
                {tier.name}
                {i < event.tiers.length - 1 ? "," : ""}
              </span>
            ))}
          </p>
        </div>

        {children}
      </div>
    </div>
  );
}

function ErrorNote({ children }: { children: React.ReactNode }) {
  return (
    <p
      role="alert"
      className="font-sc text-(length:--text-tiny) tracking-design text-ink"
    >
      {children}
    </p>
  );
}

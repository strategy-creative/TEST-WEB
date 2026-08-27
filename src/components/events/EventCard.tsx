/**
 * EVENT CARD
 * ─────────────────────────────────────────────────────────────
 * One event in the events grid. Three states, chosen automatically
 * from the event's `status` in content/events.ts:
 *
 *   on-sale   → photo; hovering darkens it and reveals GET TICKETS →
 *   sold-out  → crossed-out dashed block, not clickable
 *   announced → photo, with TICKETS SOON instead of GET TICKETS
 *
 * You should not need to edit this file to change what is on the site.
 */

import Image from "next/image";
import Link from "next/link";
import type { VenueEvent } from "../../../content/events";
import { SoldOutBlock } from "./SoldOutBlock";

function EventInfo({ event }: { event: VenueEvent }) {
  return (
    <div className="mt-[27px] flex h-[72px] flex-col justify-between font-sc text-ink">
      <div className="flex items-start justify-between text-(length:--text-base) tracking-design">
        <p className="pr-[12px]">
          {event.title}
          {event.subtitle ? (
            <>
              <br />
              {event.subtitle}
            </>
          ) : null}
        </p>
        <p className="whitespace-nowrap text-right">${event.fromPrice}</p>
      </div>

      <p className="text-(length:--text-meta) tracking-design">
        {event.dateLabel}
        <br />
        {event.timeLabel}
      </p>
    </div>
  );
}

export function EventCard({ event }: { event: VenueEvent }) {
  /* ── Sold out: rendered as a dead block, deliberately not a link ── */
  if (event.status === "sold-out") {
    return (
      <article aria-label={`${event.title} — sold out`}>
        <SoldOutBlock />
        <EventInfo event={event} />
      </article>
    );
  }

  const announced = event.status === "announced";
  const cta = announced ? "TICKETS SOON" : "GET TICKETS  →";

  const media = (
    <div className="relative aspect-[330/395] w-full overflow-hidden bg-placeholder">
      <Image
        src={event.image}
        alt={event.imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 45vw, 330px"
        className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
      />

      {/* Scrim + CTA, revealed on hover and on keyboard focus */}
      <div className="absolute inset-0 flex items-center justify-center bg-scrim opacity-0 transition-opacity duration-500 ease-[var(--ease-out-expo)] group-hover:opacity-100 group-focus-visible:opacity-100">
        <span className="font-sc text-(length:--text-cta) tracking-design text-paper underline decoration-solid underline-offset-4">
          {cta}
        </span>
      </div>
    </div>
  );

  if (announced) {
    return (
      <article className="group">
        {media}
        <EventInfo event={event} />
      </article>
    );
  }

  return (
    <article className="group">
      <Link
        href={`/events/${event.slug}`}
        className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        aria-label={`${event.title} — get tickets`}
      >
        {media}
      </Link>
      <EventInfo event={event} />
    </article>
  );
}

/** The dashed empty slot that fills out the grid. */
export function EventPlaceholder() {
  return (
    <div
      aria-hidden
      className="aspect-[330/396] w-full border border-dashed border-ink"
    />
  );
}

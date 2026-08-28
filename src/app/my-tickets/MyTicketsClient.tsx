"use client";

/**
 * MY TICKETS — signed-in view
 * ─────────────────────────────────────────────────────────────
 * Shows the ticket grid when someone is signed in, and a short prompt
 * to log in when they are not.
 *
 * ⚠ THE GATE HERE IS PRESENTATIONAL. It hides the grid in the browser;
 * it does not stop anyone reaching the data. The tickets are sample
 * data from content/tickets.ts, so there is nothing private to leak
 * yet — but the moment real tickets are wired in, the fetch must move
 * to the server and be scoped to the signed-in buyer there.
 * See src/lib/session.ts.
 */

import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/lib/session";
import { Reveal } from "@/components/motion/Reveal";
import { EventPlaceholder } from "@/components/events/EventCard";
import {
  ticketsWithEvents,
  TICKETS_GRID_SLOTS,
} from "../../../content/tickets";

export function MyTicketsClient() {
  const { signedIn, ready } = useSession();

  // Nothing until we know — avoids a flash of the wrong state.
  if (!ready) return <div className="min-h-[50svh]" />;

  if (!signedIn) {
    return (
      <div className="flex min-h-[50svh] flex-col items-start gap-[24px]">
        <p className="font-sc text-(length:--text-base) tracking-design text-muted">
          You need to be logged in to see your tickets.
        </p>
        <Link
          href="/login"
          className="font-sc text-(length:--text-heading) leading-[0.9] uppercase tracking-design underline underline-offset-[6px] transition-opacity duration-200 hover:opacity-60"
        >
          LOG IN &gt;
        </Link>
      </div>
    );
  }

  const tickets = ticketsWithEvents();
  const placeholders = Math.max(0, TICKETS_GRID_SLOTS - tickets.length);

  return (
    <div className="grid grid-cols-1 gap-x-[20px] gap-y-[60px] sm:grid-cols-2 xl:grid-cols-4">
      {tickets.map((ticket, i) => (
        <Reveal key={ticket.reference} delay={(i % 4) * 0.06}>
          <article className="group">
            <Link
              href={`/tickets/${ticket.reference}`}
              className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
              aria-label={`View ticket for ${ticket.event.title}`}
            >
              <div className="relative aspect-[330/395] w-full overflow-hidden bg-placeholder">
                <Image
                  src={ticket.event.image}
                  alt={ticket.event.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 45vw, 330px"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                />

                {/*
                  Unlike the events grid, VIEW TICKET is always visible —
                  you already own this one, so it is a label rather than
                  a call to action. It just deepens on hover.
                */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors duration-500 group-hover:bg-scrim">
                  <span className="font-sc text-(length:--text-cta) tracking-design text-paper underline underline-offset-4">
                    VIEW TICKET
                  </span>
                </div>
              </div>
            </Link>

            <div className="mt-[27px] font-sc text-(length:--text-base) tracking-design">
              <p>
                {ticket.event.title}
                {ticket.event.subtitle ? (
                  <>
                    <br />
                    {ticket.event.subtitle}
                  </>
                ) : null}
              </p>
              <p className="mt-[8px] text-(length:--text-meta) text-muted-soft">
                {ticket.quantity} × {ticket.event.dateLabel}
              </p>
            </div>
          </article>
        </Reveal>
      ))}

      {Array.from({ length: placeholders }).map((_, i) => (
        <Reveal key={`placeholder-${i}`} delay={(i % 4) * 0.06}>
          <EventPlaceholder />
        </Reveal>
      ))}
    </div>
  );
}

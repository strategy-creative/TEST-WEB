/**
 * MY TICKETS
 * ─────────────────────────────────────────────────────────────
 * The logged-in ticket list. Four across, dashed placeholders in the
 * empty slots, VIEW TICKET revealed over each poster.
 *
 * ⚠ The tickets are sample data from content/tickets.ts. A real list
 * comes from the ticketing platform for the signed-in buyer, and the
 * ticket itself needs a scannable code that platform issues. Read
 * CLAUDE.md → Ticketing before wiring this to anything.
 */

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { NavBar } from "@/components/nav/NavBar";
import { Footer } from "@/components/layout/Footer";
import { Frame } from "@/components/layout/Frame";
import { Reveal } from "@/components/motion/Reveal";
import { EventPlaceholder } from "@/components/events/EventCard";
import { ticketsWithEvents, TICKETS_GRID_SLOTS } from "../../../content/tickets";

export const metadata: Metadata = {
  title: "My tickets — UNIT/20",
  description: "Tickets you are holding for upcoming nights at UNIT/20.",
};

export default function MyTicketsPage() {
  const tickets = ticketsWithEvents();
  const placeholders = Math.max(0, TICKETS_GRID_SLOTS - tickets.length);

  return (
    <>
      <NavBar pageName="MY TICKETS" />

      <Frame as="main" className="pt-[226px]">
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
                      Unlike the events grid, VIEW TICKET is always
                      visible — you already own this one, so it is a
                      label rather than a call to action. It just
                      deepens on hover.
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
      </Frame>

      <Footer />
    </>
  );
}

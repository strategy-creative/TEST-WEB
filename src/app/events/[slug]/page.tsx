/**
 * EVENT PAGE
 * ─────────────────────────────────────────────────────────────
 * Event card on the left, checkout panel on the right.
 * Everything on this page comes from content/events.ts.
 */

import type { Metadata } from "next";
import { Fragment } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { NavBar } from "@/components/nav/NavBar";
import { Footer } from "@/components/layout/Footer";
import { Frame } from "@/components/layout/Frame";
import { CheckoutPanel } from "@/components/checkout/CheckoutPanel";
import { Reveal } from "@/components/motion/Reveal";
import { events, getEvent } from "../../../../content/events";

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) return { title: "Event — UNIT/20" };

  return {
    title: `${event.title} — UNIT/20`,
    description: event.description.slice(0, 155),
    openGraph: { images: [event.image] },
  };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEvent(slug);

  if (!event) notFound();

  return (
    <>
      <NavBar pageName="EVENTS" />

      <Frame as="main" className="pt-[226px]">
        <div className="flex flex-col gap-[60px] xl:flex-row xl:items-start xl:justify-between">
          {/* ── Left: the event ─────────────────────────────── */}
          <Reveal className="w-full xl:w-[563px]">
            <div className="flex flex-col gap-[29px]">
              <div className="relative aspect-[563/395] w-full overflow-hidden bg-placeholder">
                <Image
                  src={event.image}
                  alt={event.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1280px) 100vw, 563px"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col gap-[96px]">
                <h1 className="font-sc text-[clamp(1.75rem,3vw,38.964px)] tracking-design">
                  {event.title}
                  {event.subtitle ? ` ${event.subtitle}` : ""}
                </h1>

                {/*
                  Two columns, one grid: the labels sit at 0 and BOTH
                  content blocks start at 234px, so the description and
                  the DJ names line up down the page exactly as drawn.
                  Do not swap this back to separate flex rows — that is
                  what let the two columns drift out of alignment.
                */}
                <div className="grid grid-cols-1 gap-x-[0px] gap-y-[52px] font-body text-(length:--text-micro) tracking-[-0.03em] sm:grid-cols-[234px_1fr]">
                  <p className="whitespace-nowrap">About this event:</p>
                  <p className="max-w-[307px]">{event.description}</p>

                  <p className="whitespace-nowrap">DJ&rsquo;s:</p>
                  <dl className="grid max-w-[307px] grid-cols-[116px_1fr]">
                    {event.lineup.map((slot) => (
                      <Fragment key={slot.name}>
                        <dt>{slot.name}</dt>
                        <dd>{slot.time}</dd>
                      </Fragment>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ── Right: checkout ─────────────────────────────── */}
          <Reveal delay={0.08} className="w-full xl:w-[797px]">
            <CheckoutPanel event={event} />
          </Reveal>
        </div>
      </Frame>

      <Footer />
    </>
  );
}

/**
 * EVENT PAGE
 * ─────────────────────────────────────────────────────────────
 * Event card on the left, checkout panel on the right.
 * Everything on this page comes from content/events.ts.
 */

import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { NavBar } from "@/components/nav/NavBar";
import { Footer } from "@/components/layout/Footer";
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

      <main className="mx-auto w-full max-w-(--container-frame) px-(--spacing-gutter) pt-[226px] sm:px-0">
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

                <div className="flex flex-col gap-[52px] font-sans text-(length:--text-micro) leading-[1.15] tracking-[-0.03em]">
                  <div className="flex flex-col gap-[16px] sm:flex-row sm:gap-[139px]">
                    <p className="shrink-0 whitespace-nowrap">
                      About this event:
                    </p>
                    <p className="max-w-[308px]">{event.description}</p>
                  </div>

                  <div className="flex flex-col gap-[16px] sm:flex-row sm:justify-between">
                    <p className="w-[233px] shrink-0">DJ&rsquo;s:</p>

                    <dl className="flex w-full max-w-[330px] justify-between">
                      <div className="flex flex-col">
                        {event.lineup.map((slot) => (
                          <dt key={slot.name} className="leading-[1.2]">
                            {slot.name}
                          </dt>
                        ))}
                      </div>
                      <div className="flex flex-col">
                        {event.lineup.map((slot) => (
                          <dd key={slot.name} className="leading-[1.2]">
                            {slot.time}
                          </dd>
                        ))}
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ── Right: checkout ─────────────────────────────── */}
          <Reveal delay={0.08} className="w-full xl:w-[797px]">
            <CheckoutPanel event={event} />
          </Reveal>
        </div>
      </main>

      <Footer />
    </>
  );
}

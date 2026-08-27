import type { Metadata } from "next";
import { NavBar } from "@/components/nav/NavBar";
import { Footer } from "@/components/layout/Footer";
import { EventCard, EventPlaceholder } from "@/components/events/EventCard";
import { Reveal } from "@/components/motion/Reveal";
import { upcomingEvents, EVENTS_GRID_SLOTS } from "../../../content/events";

export const metadata: Metadata = {
  title: "Events — UNIT/20",
  description: "Upcoming nights at UNIT/20, Christchurch.",
};

export default function EventsPage() {
  const events = upcomingEvents();
  const placeholders = Math.max(0, EVENTS_GRID_SLOTS - events.length);

  return (
    <>
      <NavBar pageName="EVENTS" />

      <main className="mx-auto w-full max-w-(--container-frame) px-(--spacing-gutter) pt-[225px] sm:px-0">
        <div className="grid grid-cols-1 gap-x-[20px] gap-y-[93px] sm:grid-cols-2 xl:grid-cols-4">
          {events.map((event, i) => (
            <Reveal key={event.slug} delay={(i % 4) * 0.06}>
              <EventCard event={event} />
            </Reveal>
          ))}

          {Array.from({ length: placeholders }).map((_, i) => (
            <Reveal key={`placeholder-${i}`} delay={(i % 4) * 0.06}>
              <EventPlaceholder />
            </Reveal>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

/**
 * CONTENT TYPES
 * ─────────────────────────────────────────────────────────────
 * Shapes only — no file reading. Client components import from here,
 * server components import the modules that actually read the files.
 *
 * ⚠ WHY THIS FILE EXISTS
 * content/events.ts and content/gallery.ts read the content folder off
 * disk, which only works on the server. A client component importing
 * them drags `node:fs` into the browser bundle and the build fails
 * outright. So: types live here, data is read on the server and passed
 * down as props. Keep it that way.
 */

export type EventStatus = "on-sale" | "sold-out" | "announced" | "past";

export type TicketTier = {
  name: string;
  price: number;
  status: "available" | "sold-out";
};

export type DjSlot = { name: string; time: string };

export type VenueEvent = {
  slug: string;
  title: string;
  subtitle?: string;
  status: EventStatus;
  image: string;
  imageAlt: string;
  date: string;
  dateLabel: string;
  timeLabel: string;
  doorsLabel: string;
  location: string;
  fromPrice: number;
  tiers: TicketTier[];
  description: string;
  lineup: DjSlot[];
  /** Where GET TICKETS points. Set per event in the admin. */
  externalTicketUrl?: string;
};

export type Act = { name: string; default?: boolean };

export type GalleryShape = "landscape" | "portrait" | "small" | "large";

export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  align: "left" | "right";
  indent?: number;
  acts: string[];
};

export type HeldTicket = {
  reference: string;
  eventSlug: string;
  quantity: number;
};

export type HeldTicketWithEvent = HeldTicket & { event: VenueEvent };

/**
 * EVENTS
 * ─────────────────────────────────────────────────────────────
 * This is the file you edit to add, change or remove an event.
 * Nothing else needs to be touched to put a new night on the site.
 *
 * TO ADD AN EVENT
 *   1. Copy an existing block below, paste it at the TOP of the list.
 *   2. Change the details. `slug` must be unique — it becomes the URL.
 *   3. Put the poster image in public/images/ and point `image` at it.
 *   4. Save. Push. It is live.
 *
 * TO MARK AN EVENT SOLD OUT
 *   Set  status: "sold-out"
 *   The card is crossed out and stops being clickable. Nothing else to do.
 *
 * STATUS OPTIONS
 *   "on-sale"   — tickets available, card links through to checkout
 *   "sold-out"  — crossed out, not clickable
 *   "announced" — visible, but no tickets yet ("TICKETS SOON")
 *   "past"      — hidden from the events page automatically
 */

export type EventStatus = "on-sale" | "sold-out" | "announced" | "past";

export type TicketTier = {
  /** Shown in the checkout panel, e.g. "GENERAL ADMISSION". */
  name: string;
  /** Whole dollars, NZD. */
  price: number;
  /** "available" tiers are selectable; "sold-out" ones show greyed out. */
  status: "available" | "sold-out";
};

export type DjSlot = {
  name: string;
  /** Free text, e.g. "10 - 11:15". */
  time: string;
};

export type VenueEvent = {
  slug: string;
  title: string;
  /** Optional second line on the events card, e.g. "SMOKE & DART". */
  subtitle?: string;
  status: EventStatus;
  /** Poster / photo. Sits in public/images/. */
  image: string;
  imageAlt: string;
  /** Human-readable, exactly as it should appear. */
  dateLabel: string;
  timeLabel: string;
  /** Machine-readable date — used to sort and to auto-hide past events. */
  date: string;
  doorsLabel: string;
  location: string;
  /** Lowest ticket price, shown on the events grid. */
  fromPrice: number;
  tiers: TicketTier[];
  /** Longer copy on the event page. Plain text — line breaks are fine. */
  description: string;
  lineup: DjSlot[];
  /**
   * Where "GET TICKETS" goes.
   *   - Leave undefined to use the built-in checkout.
   *   - Set an external URL to send buyers straight to your ticketing
   *     platform (Flicket, Humanitix, Eventbrite, etc.).
   * See CLAUDE.md → "Ticketing" before changing this.
   */
  externalTicketUrl?: string;
};

export const events: VenueEvent[] = [
  {
    slug: "aperture-presents-smoke-and-dart",
    title: "APERTURE PRESENTS:",
    subtitle: "SMOKE & DART",
    status: "on-sale",
    image: "/images/event-smoke-and-dart.jpg",
    imageAlt: "Crowd bathed in red light at UNIT/20",
    dateLabel: "SATURDAY 19TH SEPTEMBER,2026",
    timeLabel: "9:00PM - LATE",
    date: "2026-09-19",
    doorsLabel: "21:00 - 2:00",
    location: "UNIT/20, CHRISTCHURCH",
    fromPrice: 25,
    tiers: [
      { name: "EARLY BIRD", price: 25, status: "available" },
      { name: "2ND RELEASE", price: 30, status: "sold-out" },
      { name: "FINAL RELEASE", price: 35, status: "sold-out" },
    ],
    description:
      "Aperture take over UNIT/20 for a night of low-slung house and after-hours disco. Doors at nine, no re-entry after midnight.",
    lineup: [
      { name: "Djeru", time: "8 - 9" },
      { name: "Bkay", time: "9 - 10" },
      { name: "Ballie", time: "10 - 11:15" },
      { name: "Licious", time: "11:15 - 12:45" },
      { name: "Texture's", time: "12:45 - 1:30" },
    ],
  },
  {
    slug: "our-sound-05",
    title: "OUR SOUND 05",
    status: "on-sale",
    image: "/images/event-our-sound-05.jpg",
    imageAlt: "The UNIT/20 dancefloor from behind the booth",
    dateLabel: "SATURDAY 19TH SEPTEMBER,2026",
    timeLabel: "9:00PM - LATE",
    date: "2026-09-19",
    doorsLabel: "21:00 - 2:00",
    location: "UNIT/20, CHRISTCHURCH",
    fromPrice: 25,
    tiers: [
      { name: "EARLY BIRD", price: 25, status: "available" },
      { name: "2ND RELEASE", price: 30, status: "sold-out" },
      { name: "FINAL RELEASE", price: 35, status: "sold-out" },
    ],
    description:
      "We're super stoked to be taking over Unit 20 with an insanely stacked lineup for you all. For this momentous occasion, we thought to bring down Poneke-based, multi-genre selecta, Licious. The night will be filled with increasing tempos and a plethora of club music and will have you dancing till your last dart. We have curated the rest of the lineup with some of the best producers/DJs the 03 has to offer.",
    lineup: [
      { name: "Djeru", time: "8 - 9" },
      { name: "Bkay", time: "9 - 10" },
      { name: "Ballie", time: "10 - 11:15" },
      { name: "Licious", time: "11:15 - 12:45" },
      { name: "Texture's", time: "12:45 - 1:30" },
    ],
  },
  {
    slug: "sam-alfred-unit-exclusive",
    title: "SAM ALFRED",
    subtitle: "UNIT EXCLUSIVE",
    status: "sold-out",
    image: "/images/event-sam-alfred.jpg",
    imageAlt: "Sam Alfred portrait",
    dateLabel: "SATURDAY 19TH SEPTEMBER,2026",
    timeLabel: "9:00PM - LATE",
    date: "2026-09-19",
    doorsLabel: "21:00 - 2:00",
    location: "UNIT/20, CHRISTCHURCH",
    fromPrice: 50,
    tiers: [
      { name: "GENERAL ADMISSION", price: 50, status: "sold-out" },
    ],
    description:
      "A one-off UNIT exclusive. Limited capacity, no door sales.",
    lineup: [{ name: "Sam Alfred", time: "10 - 2" }],
  },
];

/** Events still to come, newest first. Past events drop off on their own. */
export function upcomingEvents(): VenueEvent[] {
  return events
    .filter((e) => e.status !== "past")
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function getEvent(slug: string): VenueEvent | undefined {
  return events.find((e) => e.slug === slug);
}

/**
 * The events grid is drawn as a fixed 4-across grid with dashed
 * placeholders in the empty slots, exactly as designed. This works out
 * how many placeholders to draw.
 */
export const EVENTS_GRID_SLOTS = 8;

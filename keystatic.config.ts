/**
 * KEYSTATIC — THE EDITOR
 * ═════════════════════════════════════════════════════════════
 * This file defines what the venue can change from the admin at
 * /keystatic.
 *
 * ⚠ THE PHILOSOPHY: THE LAYOUT FLEXES, THE LIMITS ONLY NUDGE.
 * The caps below are generous on purpose. They are a hint about what
 * reads well, not a cage — because a venue that cannot name its own
 * event will just work around you.
 *
 * The real protection is in the components, not here. Every block that
 * renders this content wraps, breaks long words, and GROWS rather than
 * clipping or overlapping. A long title wraps and the card gets
 * taller; the whole grid row grows with it so the cards beside it stay
 * aligned. It degrades into a sensible design, not a broken one.
 *
 * That is the deal: he can type what he needs, and the page adapts.
 *
 * HOW IT WORKS
 * Keystatic is git-based. There is no database and no monthly bill.
 * Saving in the admin writes a JSON file into `content/` and commits
 * it to GitHub, exactly as if someone had edited the file by hand.
 * Vercel sees the commit and redeploys. Roll back a bad edit with
 * git, like any other change.
 *
 * ⚠ IF YOU RAISE A CAP, TEST IT.
 * Fill every field to its new maximum and look at the page. The point
 * is not that long text is forbidden — it is that long text still
 * produces something you would be happy to publish.
 *
 * Adding a field here does nothing on its own — the matching page
 * component has to render it. Fields and layout move together.
 */

import { config, collection, singleton, fields } from "@keystatic/core";

/* ═══════════════════════════════════════════════════════════════
   Shared field definitions
   ═══════════════════════════════════════════════════════════════ */

/**
 * Event posters and gallery photos are shown in fixed frames, so they
 * are stored at a known path and cropped by the layout. Portrait or
 * squarish images work best — a very wide panorama will be cut hard
 * top and bottom.
 */
const eventImage = fields.image({
  label: "Poster / photo",
  description:
    "Shown in a tall frame (roughly 330 × 395). Portrait images work best. Landscape ones get cropped top and bottom.",
  directory: "public/images/events",
  publicPath: "/images/events/",
  validation: { isRequired: true },
});

export default config({
  /*
   * "local" lets anyone running the site on their own machine edit
   * without logging in. On the live site Keystatic uses GitHub, so the
   * venue signs in with a GitHub account and every save is a commit
   * under their name.
   *
   * To switch the live site to GitHub mode, change this to:
   *   storage: { kind: "github", repo: "strategy-creative/TEST-WEB" }
   * and add the GitHub App credentials to Vercel. See EDITING.md.
   */
  storage: { kind: "local" },

  ui: {
    brand: { name: "UNIT/20" },
    navigation: {
      "What's on": ["events"],
      Gallery: ["galleryPhotos", "acts"],
      Settings: ["site"],
    },
  },

  collections: {
    /* ═════════════════════════════════════════════════════════
       EVENTS
       ═════════════════════════════════════════════════════════ */
    events: collection({
      label: "Events",
      slugField: "title",
      path: "content/events/*",
      format: { data: "json" },
      columns: ["title", "dateLabel", "status"],

      entryLayout: "form",

      schema: {
        title: fields.slug({
          name: {
            label: "Event name",
            description:
              "Line one of the card. Around 24 characters keeps it to one line; longer is fine, it wraps and the card grows.",
            validation: { isRequired: true, length: { min: 2, max: 40 } },
          },
          slug: {
            label: "Web address",
            description:
              "The end of the page's URL. Lowercase, dashes instead of spaces. Do not change this once tickets are out — old links stop working.",
          },
        }),

        subtitle: fields.text({
          label: "Second line",
          description:
            "Optional. Sits under the event name on the card. Leave empty if the name says it all.",
          validation: { isRequired: false, length: { min: 0, max: 40 } },
        }),

        status: fields.select({
          label: "Status",
          description:
            "Sold out crosses the card out and stops it being clickable. Past hides it from the events page.",
          options: [
            { label: "On sale", value: "on-sale" },
            { label: "Sold out", value: "sold-out" },
            { label: "Announced — tickets not yet on sale", value: "announced" },
            { label: "Past — hide from the site", value: "past" },
          ],
          defaultValue: "on-sale",
        }),

        image: eventImage,

        imageAlt: fields.text({
          label: "Photo description",
          description:
            "One line describing the photo, for people using a screen reader. e.g. “Crowd bathed in red light”.",
          validation: { isRequired: true, length: { min: 4, max: 120 } },
        }),

        /* ── When ─────────────────────────────────────────── */
        date: fields.date({
          label: "Date",
          description:
            "Used to sort events and to hide them once they have passed.",
          validation: { isRequired: true },
        }),

        dateLabel: fields.text({
          label: "Date as it should read",
          description:
            "Exactly as it appears on the card, e.g. SATURDAY 19TH SEPTEMBER,2026. It is set in capitals automatically.",
          validation: { isRequired: true, length: { min: 4, max: 44 } },
        }),

        timeLabel: fields.text({
          label: "Time as it should read",
          description: "e.g. 9:00PM - LATE",
          defaultValue: "9:00PM - LATE",
          validation: { isRequired: true, length: { min: 2, max: 28 } },
        }),

        doorsLabel: fields.text({
          label: "Doors",
          description: "e.g. 21:00 - 2:00",
          defaultValue: "21:00 - 2:00",
          validation: { isRequired: true, length: { min: 2, max: 28 } },
        }),

        location: fields.text({
          label: "Location",
          defaultValue: "UNIT/20, CHRISTCHURCH",
          validation: { isRequired: true, length: { min: 2, max: 48 } },
        }),

        /* ── Tickets ──────────────────────────────────────── */
        fromPrice: fields.integer({
          label: "Price shown on the card",
          description:
            "The lowest ticket price, in whole dollars. No dollar sign.",
          validation: { isRequired: true, min: 0, max: 999 },
        }),

        tiers: fields.array(
          fields.object({
            name: fields.text({
              label: "Tier name",
              description: "e.g. EARLY BIRD. Three tiers share a line, so shorter reads better — but a long one wraps rather than breaking.",
              validation: { isRequired: true, length: { min: 2, max: 24 } },
            }),
            price: fields.integer({
              label: "Price",
              validation: { isRequired: true, min: 0, max: 999 },
            }),
            status: fields.select({
              label: "Availability",
              options: [
                { label: "Available", value: "available" },
                { label: "Sold out", value: "sold-out" },
              ],
              defaultValue: "available",
            }),
          }),
          {
            label: "Ticket tiers",
            description:
              "Shown as a line under CHECKOUT. Three is the most that fits on one line.",
            itemLabel: (props) => props.fields.name.value || "Tier",
            validation: { length: { min: 1, max: 3 } },
          },
        ),

        externalTicketUrl: fields.url({
          label: "Ticket link",
          description:
            "Where GET TICKETS sends people — your Flicket, Humanitix or Eventbrite page for this night. Leave empty only if the on-site checkout has been connected.",
        }),

        /* ── The page ─────────────────────────────────────── */
        description: fields.text({
          label: "About this event",
          multiline: true,
          description:
            "A paragraph or two. Around 400 characters fits the column without running past the artwork.",
          validation: { isRequired: true, length: { min: 10, max: 600 } },
        }),

        lineup: fields.array(
          fields.object({
            name: fields.text({
              label: "DJ",
              validation: { isRequired: true, length: { min: 1, max: 28 } },
            }),
            time: fields.text({
              label: "Set time",
              description: "e.g. 10 - 11:15",
              validation: { isRequired: true, length: { min: 1, max: 16 } },
            }),
          }),
          {
            label: "Line-up",
            itemLabel: (props) => props.fields.name.value || "DJ",
            validation: { length: { min: 0, max: 10 } },
          },
        ),
      },
    }),

    /* ═════════════════════════════════════════════════════════
       GALLERY PHOTOS
       ═════════════════════════════════════════════════════════ */
    galleryPhotos: collection({
      label: "Gallery photos",
      slugField: "alt",
      path: "content/gallery/*",
      format: { data: "json" },
      columns: ["alt", "align"],
      entryLayout: "form",

      schema: {
        alt: fields.slug({
          name: {
            label: "Photo description",
            description:
              "Doubles as the caption under the large view and as the description for screen readers. One line.",
            validation: { isRequired: true, length: { min: 4, max: 120 } },
          },
        }),

        image: fields.image({
          label: "Photo",
          directory: "public/images/gallery",
          publicPath: "/images/gallery/",
          validation: { isRequired: true },
        }),

        /*
         * The stepped column layout is the design's signature. Rather
         * than let anyone type arbitrary pixel sizes, these are the
         * three shapes the layout is built around.
         */
        shape: fields.select({
          label: "Shape in the grid",
          description:
            "Which slot this photo fills in the stepped column. Mix them up — that stagger is the look.",
          options: [
            { label: "Landscape — wide", value: "landscape" },
            { label: "Portrait — tall", value: "portrait" },
            { label: "Small — square-ish", value: "small" },
            { label: "Large — the big one", value: "large" },
          ],
          defaultValue: "landscape",
        }),

        align: fields.select({
          label: "Side of the column",
          description:
            "Alternate left and right down the list to keep the stagger.",
          options: [
            { label: "Left", value: "left" },
            { label: "Right", value: "right" },
          ],
          defaultValue: "left",
        }),

        indent: fields.checkbox({
          label: "Indent this one",
          description:
            "Nudges the photo in from the edge, breaking the rhythm. Use sparingly — one or two per set.",
          defaultValue: false,
        }),

        acts: fields.array(
          fields.text({
            label: "Act",
            validation: { isRequired: true, length: { min: 1, max: 30 } },
          }),
          {
            label: "Which acts is this from?",
            description:
              "Must match the names in the Acts list exactly. A photo can belong to several.",
            itemLabel: (props) => props.value || "Act",
            validation: { length: { min: 1, max: 8 } },
          },
        ),
      },
    }),
  },

  singletons: {
    /* ═════════════════════════════════════════════════════════
       ACTS — the filter row at the top of the gallery
       ═════════════════════════════════════════════════════════ */
    acts: singleton({
      label: "Gallery acts",
      path: "content/acts",
      format: { data: "json" },
      schema: {
        acts: fields.array(
          fields.object({
            name: fields.text({
              label: "Act name",
              validation: { isRequired: true, length: { min: 1, max: 30 } },
            }),
            isDefault: fields.checkbox({
              label: "Selected when the page opens",
              description: "Tick exactly one.",
              defaultValue: false,
            }),
          }),
          {
            label: "Acts",
            description:
              "The big line across the top of the gallery. Around 8 is the most that fits in three lines.",
            itemLabel: (props) => props.fields.name.value || "Act",
            validation: { length: { min: 1, max: 10 } },
          },
        ),
      },
    }),

    /* ═════════════════════════════════════════════════════════
       SITE SETTINGS
       ═════════════════════════════════════════════════════════ */
    site: singleton({
      label: "Site settings",
      path: "content/site-settings",
      format: { data: "json" },
      schema: {
        title: fields.text({
          label: "Browser tab title",
          validation: { isRequired: true, length: { min: 2, max: 60 } },
        }),
        description: fields.text({
          label: "Search engine description",
          multiline: true,
          description:
            "One or two sentences. Shows under the link in Google and when the site is shared.",
          validation: { isRequired: true, length: { min: 10, max: 200 } },
        }),
        locationLabel: fields.text({
          label: "Location line",
          description: "Shown along the bottom of the open menu.",
          validation: { isRequired: true, length: { min: 2, max: 30 } },
        }),
        coordinates: fields.text({
          label: "Coordinates",
          validation: { isRequired: true, length: { min: 2, max: 30 } },
        }),
        copyright: fields.text({
          label: "Footer copyright line",
          validation: { isRequired: true, length: { min: 2, max: 60 } },
        }),
      },
    }),
  },
});

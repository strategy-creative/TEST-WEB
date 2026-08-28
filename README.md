# UNIT/20

The website for UNIT/20 — a club and live venue in Christchurch, New Zealand.

Built from the `Working-Title` Figma file. Next.js on Vercel, deploying from
GitHub on every push to `main`.

---

## Running it on your computer

You need [Node.js](https://nodejs.org) (version 20 or newer). Then:

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. The admin is at
<http://localhost:3000/keystatic> — running locally it needs no login.

```bash
npm run build   # check it compiles — always do this before pushing
npm run lint
```

---

## Making changes

**Everything the venue changes day to day is done in the admin at
`/keystatic`** — events, prices, sold-out signs, gallery photos. No code, no
terminal. See `EDITING.md` for the walkthrough written for the venue.

The sections below describe what those admin changes write to, for anyone
working on the code.

### Add an event

Admin → **Events** → **Add**. Each event is written to
`content/events/<slug>.json`; the poster lands in `public/images/events/`.

### Mark an event sold out

Admin → the event → **Status** → **Sold out**. The card is crossed out and
stops being clickable.

### Add a photo to the gallery

Admin → **Gallery photos** → **Add**. Pick a shape and a side; the 01 / 02 /
03 numbering updates itself. Photos go to `public/images/gallery/`.

### Where it all lands

```
content/events/*.json    one file per event
content/gallery/*.json   one file per photo
content/acts.json        the gallery filter row
content/site-settings.json
```

`content/events.ts`, `gallery.ts` and `tickets.ts` read those files and hand
typed data to the pages. They are `server-only` — see `CLAUDE.md`.

### Change the venue name, footer links or home page labels

`content/site.ts`.

### Change the home page video

Replace `public/video/hero.mp4` and `public/images/home-hero-poster.jpg`.
Keep the video under about 4MB and strip the audio — the encoding command is
in `src/components/home/HeroVideo.tsx`. Phones see the poster image instead
of the video on purpose, to save people's mobile data.

### A note on capitals

The site sets Fragment Mono in all caps everywhere, automatically. Type
event titles however you like in the admin — they come out
uppercase either way.

---

## Ticket sales

**The site does not take payments yet, on purpose.**

Handling card payments yourself means legal and financial responsibility for
that card data. The right move for a venue is to use a ticketing platform —
[Flicket](https://www.flicket.io/), [Humanitix](https://humanitix.com/nz),
[iTicket](https://www.iticket.co.nz/), Eventbrite or Ticket Tailor all work in
New Zealand. They take the payment, issue the ticket, scan it at the door and
handle refunds.

Once you have picked one:

1. In Vercel → Settings → Environment Variables, set
   `NEXT_PUBLIC_TICKETING_MODE` to `external`.
2. Add each event's ticket link as `externalTicketUrl` in
   the admin at `/keystatic`.

That is the whole integration. See `CLAUDE.md` section 5 for the other two
modes and the reasoning.

---

## Deploying

Push to `main`. Vercel builds and publishes automatically.

If a build fails, Vercel keeps the last working version live — the site does
not go down. Fix the error and push again.

---

## Working on this with Claude

`CLAUDE.md` in this folder is a briefing that Claude reads automatically. It
covers the design rules, where things live, and the parts that must not be
changed without thought — particularly around payments. You should not need to
explain the project each time.

Good things to ask for:

> Add a new event on 14 November called OUR SOUND 06, $30, doors 9pm

> Mark the Sam Alfred night as sold out

> Swap the third gallery photo for the one I just put in public/images

---

## Still to do

- Pick a ticketing platform and wire it up (above)
- Switch Keystatic to GitHub storage so the venue can edit the live site
  (`keystatic.config.ts` → `storage`; see `EDITING.md`)
- Real terms and conditions on `/terms`
- Decide whether Log in / Register are needed at all — if ticketing is
  external, probably not
- Buy a Neue Haas Grotesk webfont licence if you want it exact — Inter stands
  in until then (see `CLAUDE.md` → Fonts)

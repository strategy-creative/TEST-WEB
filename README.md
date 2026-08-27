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

Open <http://localhost:3000>. Changes appear as you save.

```bash
npm run build   # check it compiles — always do this before pushing
npm run lint
```

---

## Making changes

**Nearly everything you will want to change is in the `content` folder.**
You do not need to touch any code to run the site day to day.

### Add an event

Open `content/events.ts`. Copy one of the existing blocks, paste it at the top
of the list, and change the details:

```ts
{
  slug: "friday-night-fever",        // becomes the web address — must be unique
  title: "FRIDAY NIGHT FEVER",
  status: "on-sale",
  image: "/images/friday-night.jpg", // put the file in public/images first
  dateLabel: "FRIDAY 3RD OCTOBER,2026",
  fromPrice: 20,
  // …the rest
}
```

Save, then push. The event is live in about a minute.

### Mark an event sold out

Change one word:

```ts
status: "sold-out",
```

The card is crossed out and stops being clickable. Nothing else to do.

### Add a photo to the gallery

Put the image in `public/images/`, then add a block to `content/gallery.ts`.
The 01 / 02 / 03 numbering updates itself.

### Change the venue name, footer links or home page labels

`content/site.ts`.

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
   `content/events.ts`.

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
- Real terms and conditions on `/terms`
- Decide whether Log in / Register are needed at all — if ticketing is
  external, probably not
- Buy licences for ABC Favorit and Neue Haas Grotesk if you want the exact
  Figma typography (see `CLAUDE.md` → Fonts)

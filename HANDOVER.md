# UNIT/20 — project status

**Last worked on:** 28 August 2026
**Designed and built by:** Samuel Ames, Strategy Creative

⚠ **The addresses below are the DESIGNER'S working copy, not the
venue's.** They are recorded for reference only. The venue creates its
own GitHub repo and its own Vercel project and owns them outright —
nothing in this handover depends on the accounts below.

- Designer's preview: https://samuel-test.vercel.app
- Designer's repo: https://github.com/strategy-creative/TEST-WEB
- Designer's Vercel project: `samuel-test` (Strategy Creative team)
**Built from:** Figma file `Working-Title` (`EwBeAjABWPzIW7QOQ5SnPe`)

This file is the state of play. `README.md` is for the venue — how to run
the site and add events. `CLAUDE.md` is the briefing Claude reads before
touching anything. Read those two first if you are picking this up cold.

---

## 1. Where things stand

The site is **built and deployed, but not ready to sell tickets.** Four
pages are complete and match the Figma file. Everything a venue changes
week to week — events, prices, photos, sold-out status — is editable as
data in `/content` without touching code.

### Done

| Page | State |
| --- | --- |
| **Home** | Full-bleed looping video, circle strip pinned to the bottom, black loader wipe on first visit. No text besides the nav. |
| **Gallery** | Acts along the top act as filters. Clicking a photo opens it in the large panel; photos rise in as a stagger when the act changes. |
| **Events** | Four-across grid, hover reveals GET TICKETS, dashed empty slots, sold-out block. |
| **Event + checkout** | Event detail with lineup, then a three-step checkout panel: details → payment → view ticket. |

Plus: menu overlay, footer, `/terms`, `/login`, `/register` and
`/tickets/[id]` shells.

### Deliberately unfinished

These are not bugs. They are decisions waiting on someone.

- **Ticketing is not connected.** The checkout runs, but `/api/checkout`
  refuses every request on purpose. Nothing can be sold yet. This is the
  one real blocker.
- **Terms** is placeholder text. Real terms are a legal question.
- **Log in / Register / My Tickets are SWITCHED OFF** behind
  `NEXT_PUBLIC_ENABLE_ACCOUNTS`, and 404 in production. They are not
  empty shells — the login accepted any credentials and showed
  plausible-looking ticket references, which live is worse than
  nothing. See `src/lib/accounts.ts`. If ticketing runs through an
  external platform, delete them rather than finishing them.
- **`/tickets/[id]`** is a shell. A real ticket needs a scannable code
  that is verifiable at the door and cannot be forged or reused — that
  belongs to the ticketing platform, not to this codebase.
- **Sam Alfred** is set to `sold-out` to demonstrate that state. Change
  **Status** in the admin for the real listing.
- **Gallery act tags are guesses.** Each photo lists which acts it
  belongs to. I assigned them so every filter has something to show;
  they need retagging against what the photos actually are.
- **Event copy** for Smoke & Dart is written filler. Only Our Sound 05
  has real copy from the Figma file.

---

## 2. The three things blocking handover

In order. Nothing else is waiting on anything.

### 1. Pick a ticketing platform

Everything else is cosmetic next to this. The venue does not need to
build payments — [Flicket](https://www.flicket.io/),
[Humanitix](https://humanitix.com/nz), [iTicket](https://www.iticket.co.nz/),
Eventbrite and Ticket Tailor all operate in New Zealand and handle
payment, refunds, door scanning and chargebacks.

Once chosen, the integration is: set `NEXT_PUBLIC_TICKETING_MODE` to
`external` in Vercel, and paste each event's ticket URL into
the **Ticket link** field in the admin. That is the whole job.

**Ask the venue what they use now.** If they are already selling
tickets, the decision is already made.

### 2. Neue Haas Grotesk licence

The site names Neue Haas Grotesk Text Pro first and falls back to Inter.
If Strategy holds a webfont licence, drop the files into
`src/app/fonts/`, add an `@font-face`, and nothing else changes. Until
then Inter renders in its place — close enough that it is not urgent.

Fragment Mono is free and is the real thing.

### 3. Real terms and conditions

Ticket terms, entry conditions and a refund policy. The venue supplies
these; they are not something to write on their behalf.

---

## 3. Decisions worth not re-litigating

Three choices that look like they could be "fixed" and should not be.

### Card fields are provider-hosted, not our own inputs

The Figma design draws CARD NUMBER / EXPIRY / CVV as ordinary boxes. The
build renders the payment provider's hosted fields instead, styled to
match exactly.

If this site collects a raw card number into its own `<input>`, the venue
lands inside PCI-DSS scope: the card data passes through the server and
the logs, and they become liable for how it is handled. That is a legal
and financial problem, not a technical preference.

`src/components/checkout/HostedCardFields.tsx` carries the full note.

### Fragment Mono is always uppercase

Enforced once, on `body` in `src/app/globals.css` — not sprinkled through
components. That means no page can drift out of it and no content edit
can break it. `.font-body` (Neue Haas) is the single exception, for
running body copy.

### The home page circle strip blends; nothing else does

The circles carry `mix-blend-difference` so they invert against the video
and react to the footage. The blend lives on the positioned wrapper in
`src/app/page.tsx`, **not** on the SVG — `z-10` creates a stacking
context, and a blend applied inside one cannot see the video behind it.
If the circles ever go flat white, that is the cause.

---

## 4. Corrections carried from Figma

Typos in the design file, corrected in the build. Worth fixing in Figma
so they do not come back:

| Figma | Build |
| --- | --- |
| CHRISTCHUCH | CHRISTCHURCH |
| REGESTER | REGISTER |
| QUANITITY | QUANTITY |

---

## 5. Where things live

```
content/            ← the venue's data. Nearly every change starts here.
  site.ts             venue name, footer links, hero video
  events.ts           every event, price, tier, sold-out status
  gallery.ts          acts list, photos, act tags

src/app/            ← routes
src/components/
  motion/             ALL animation. Nothing animates outside this folder.
  home/               hero video
  gallery/            acts filter, photo grid, viewing panel
  events/             event cards, sold-out block
  checkout/           the three-step panel + hosted card fields
  nav/                nav bar, menu overlay, menu icon
  layout/             footer, circle strip
src/lib/ticketing/  ← the swappable payment adapter. Read before touching checkout.

public/images/      photography
public/video/       hero.mp4 (3.7MB, muted, no audio track)
```

**Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind v4
(tokens in `globals.css`, no config file), Motion, Lenis.

---

## 6. Picking it up next session

```bash
cd ~/Downloads/unit20
npm install      # first time only
npm run dev      # http://localhost:3000
npm run build    # must pass before pushing
git push         # Vercel deploys automatically
```

A good first move is to open `CLAUDE.md` and let Claude read it — it
covers the design rules, the uppercase rule, and the parts of checkout
that must not be changed without thought.

### Known friction

Commits made from the Cowork sandbox leave empty lock files in `.git`
that the sandbox cannot delete. They are moved to `.git/_stale/` rather
than removed. Harmless, but if git ever complains about
`index.lock: File exists`, that is why — `rm -f .git/*.lock` clears it.

---

## 7. Ideas parked, not started

- Stripping the home page to video-only means a first-time visitor sees
  no text but the logo. The hamburger is carrying the whole job of
  signalling there is more. Worth watching in analytics before deciding
  it needs anything.
- The gallery's right-hand panel has room for a date or photo credit
  under the caption if that content ever exists.
- Events auto-hide once `status` is set to `past`, but nothing sets it
  automatically. A date check could do it.

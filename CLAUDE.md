# UNIT/20 — working notes for Claude

You are working on the website for **UNIT/20**, a club and live venue in
Christchurch, New Zealand. Read this file before changing anything.

The person you are helping runs the venue. Assume they are not a developer.
Explain what you changed in plain language, and never leave the site in a
broken state to "come back to it later".

---

## 1. The rule that matters most

**Almost every routine change is a content change, not a code change.**

Before editing a component, check whether the thing you want to change lives
in `/content`:

| To change…                            | Edit this file        |
| ------------------------------------- | --------------------- |
| Add / edit / remove an event          | `content/events.ts`   |
| Mark an event sold out                | `content/events.ts`   |
| Ticket prices and tiers               | `content/events.ts`   |
| Gallery photos and the act list       | `content/gallery.ts`  |
| Venue name, footer links, home labels | `content/site.ts`     |

If a request can be satisfied by editing `/content`, do that and stop. Do not
refactor components to accommodate a content change.

---

## 2. Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind v4** — configured through CSS tokens in `src/app/globals.css`,
  not a `tailwind.config.js`
- **Motion** (`motion/react`) for animation
- **Lenis** for smooth scrolling
- Hosted on **Vercel**, deploying from **GitHub** on push to `main`

```
content/            ← the venue's data. Start here.
src/app/            ← routes
src/components/     ← UI, grouped by area
  motion/           ← ALL animation lives here
src/lib/ticketing/  ← payment provider adapter
public/images/      ← photography
```

---

## 3. Design rules

The site is a direct build of a Figma file
(`Working-Title`, file key `EwBeAjABWPzIW7QOQ5SnPe`). Hold the line on these:

- **Never hardcode a colour, font size or spacing value.** Everything is a
  token in the `@theme` block at the top of `src/app/globals.css`. Use
  `text-(length:--text-base)`, `bg-field`, `px-(--spacing-gutter)` and so on.
  If you need a value that does not exist, add a token — do not inline a hex.
- **Page margin is 30px on all four sides** (`--spacing-gutter`), content
  width 1380px (`--container-frame`).
- **Everything is Fragment Mono**, uppercase, tracked tight. The only
  exception is the event description body, which is a grotesk.
- **Black, white and greys only.** The photography is the only colour.
- Dashed borders (`border-dashed`) are a real design element — empty event
  slots, the checkout panel, the sold-out block. They are not placeholders to
  be tidied away.

### The home page

Three rules that are easy to break by accident:

1. **All text is plain white.** No blending on the nav or the labels.
2. **The circle strip is the only thing that blends.** It carries
   `mix-blend-difference` so it inverts against the video behind it and reacts
   to the footage. The blend lives on the positioned wrapper in
   `src/app/page.tsx`, **not** on the SVG — `z-10` creates a stacking context,
   and a blend applied inside one cannot see the video. If the circles ever go
   flat white, that is the cause.
3. **The strip is pinned 20px from the bottom of the viewport** and capped at
   1380px wide so it does not balloon on large monitors. On phones it holds a
   minimum width and bleeds off the right edge rather than shrinking to specks.

### Fonts — two typefaces, and only two

This is settled. Do not introduce a third.

| Face                       | Used for                          | Case            |
| -------------------------- | --------------------------------- | --------------- |
| **Fragment Mono**          | Everything — nav, labels, buttons, events, checkout | **ALWAYS UPPERCASE** |
| **Neue Haas Grotesk**      | Running body copy only (event descriptions) | Sentence case |

The earlier Figma file also referenced Fragment Mono SC and ABC Favorit.
Both are gone. Do not reintroduce them.

#### ⚠ The uppercase rule

**Every use of Fragment Mono is all caps, everywhere, without exception.**

It is enforced once, in `src/app/globals.css`:

```css
body { font-family: var(--font-mono); text-transform: uppercase; }
```

That means content in `/content` can be typed in any case and still comes out
uppercase. Do not add `uppercase` classes to individual components — it is
already handled — and do not add `text-transform: none` anywhere to work
around it.

The single exception is `.font-body`, which switches to Neue Haas and opts
back into sentence case. It is used for the event description paragraphs.
**Do not create a second exception.**

#### Neue Haas licensing

Neue Haas Grotesk Text Pro is a Monotype licence. The font stack in
`globals.css` names it first and falls back to Inter, so:

- If the venue holds a webfont licence, drop the files into `src/app/fonts/`
  and add an `@font-face` — nothing else changes.
- Until then, Inter renders in its place. Close enough that it is not urgent.

Never commit "trial" font files. They are not licensed for a live site.

---

## 4. Animation

All motion lives in `src/components/motion/`. Three pieces:

- `PageLoader` — the black wipe on first load. Runs once per browser session.
- `SmoothScroll` — Lenis. `lerp` is the only dial worth touching.
- `Reveal` — the scroll-in fade. Wrap anything: `<Reveal>…</Reveal>`.

Plus `src/components/home/HeroVideo.tsx` — the looping home page video.
It shows the still poster on phones and to anyone with reduced motion on;
that is deliberate, not a bug. Encoding notes are in the file. Keep the MP4
under about 4MB and always strip audio (`-an`) — browsers refuse to autoplay
anything with sound.

**Do not scatter animation code through the page components.** If a section
should animate in, wrap it in `<Reveal>`. This is deliberate: it means content
can be added and reordered without ever breaking the motion.

Every animation respects `prefers-reduced-motion`. Keep it that way.

---

## 5. Ticketing — the important part

⚠️ **Read `src/lib/ticketing/index.ts` in full before touching checkout.**

The site does not sell tickets on its own. It talks to a provider through a
small adapter, selected by the `NEXT_PUBLIC_TICKETING_MODE` environment
variable:

- `external` *(default, recommended)* — GET TICKETS links out to a ticketing
  platform. Set `externalTicketUrl` per event in `content/events.ts`.
- `embed` — the platform's widget renders inside the checkout panel.
- `stripe` — on-site checkout with Stripe's hosted card fields.

### Three things that must not happen

1. **Never build plain `<input>` fields for card number, expiry or CVV.**
   The Figma design draws them that way; the build deliberately does not.
   Collecting raw card data puts the venue inside PCI-DSS scope and makes them
   liable for it. `src/components/checkout/HostedCardFields.tsx` renders the
   payment provider's hosted fields styled to match. Leave it that way.

2. **Never issue a ticket without a confirmed payment.** `/api/checkout` is a
   stub that refuses every request on purpose. A checkout that hands out
   tickets without taking money is worse than one that is offline — people
   turn up at the door holding something that looks valid.

3. **Never commit API keys.** They go in Vercel → Settings → Environment
   Variables. `.env.local` is gitignored; keep it that way.

### Recommended path

The venue almost certainly does not need to build payments. Pick a platform
(Flicket, Humanitix, Eventbrite, Ticket Tailor and iTicket all operate in NZ),
set mode to `external`, and paste each event's ticket URL into
`content/events.ts`. They handle payment, refunds, scanning at the door and
chargebacks. Revisit only if there is a concrete reason.

---

## 6. Known gaps

Things left deliberately unfinished, so nobody "discovers" them as bugs:

- **Log in / Register** are empty shells. If ticketing runs externally, buyers
  manage tickets on that platform and these pages can be deleted (remove them
  from `content/site.ts` → `footerLinks` too).
- **Terms** is placeholder copy. Real terms are a legal question, not a
  writing exercise — the venue needs to supply them.
- **`/tickets/[id]`** is a shell. A real ticket needs a scannable code that is
  verifiable at the door and cannot be forged or reused. That belongs to the
  ticketing platform. Do not invent a ticket format.
- **Sam Alfred** is currently set to `sold-out` to demonstrate that state.
  Change `status` in `content/events.ts` to `on-sale` for the real listing.
- **Typos carried over from Figma, corrected in the build:** `CHRISTCHUCH` →
  `CHRISTCHURCH`, `REGESTER` → `REGISTER`, `QUANITITY` → `QUANTITY`. If the
  Figma file is updated, keep the corrected spellings.

---

## 7. Deploying

Push to `main`. Vercel builds and deploys automatically.

```bash
npm run dev     # local, http://localhost:3000
npm run build   # must pass before pushing
npm run lint
```

Always run `npm run build` before pushing. A type error will fail the Vercel
deploy and take the live site's last good version with it until fixed.

---

## 8. Working with the venue

- Prefer the smallest change that solves the problem.
- If asked for something that would break the design system (a new colour, a
  different font, an off-grid layout), say so and offer the on-system version.
- If asked to make the checkout "just work" without a payment provider,
  explain why that is not something to fake, and point at section 5.

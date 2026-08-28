# START HERE

This is the UNIT/20 website. Everything needed to run it, change it and
put it online is in this folder.

You do not need to be a developer. You need about twenty minutes for
the setup, once.

---

## What this folder is

A complete, working website. Not a template or a mockup — the real
thing, built from the Figma designs. It has:

- A home page with the video
- An events page, with individual pages and a checkout layout
- A gallery that filters by act
- A my-tickets page and a log-in page
- An **admin screen** where you add events and photos yourself

---

## The five minutes that matter

**Read `EDITING.md`.** It is written for you, has no code in it, and
covers adding an event, marking one sold out, and adding gallery
photos. That is the day-to-day.

Everything below is one-time setup.

---

## Setting it up

### 1. Install Node

The site needs [Node.js](https://nodejs.org) — download the version
marked **LTS** and run the installer. Nothing to configure.

### 2. Open the folder with Claude

Claude Code can read, run and change this whole project. Install it
from [claude.com/code](https://claude.com/code), then point it at this
folder.

Paste this as your first message:

> This is my venue's website. Read START-HERE.md, CLAUDE.md and
> HANDOVER.md, then tell me what state the project is in and what I
> need to do to get it online.

Claude will read the notes written for it and take it from there. It
already knows the design rules, what it is allowed to change, and — more
importantly — what it must not.

### 3. See it running

Ask Claude to start the site, or in a terminal in this folder:

```bash
npm install
npm run dev
```

Then open **http://localhost:3000** in your browser. The admin is at
**http://localhost:3000/keystatic**.

Changes you make appear as you save.

---

## Accounts — all of them yours

**You do not need anyone else's login.** Not the designer's, not
anyone's. This folder is a clean copy with no connection to whoever
built it. You create your own accounts and you own the site outright.

You will need three, all free to start:

| | What for | Cost |
| --- | --- | --- |
| **GitHub** | Stores the site and every version of it | Free |
| **Vercel** | Puts it online and re-publishes it on every change | Free tier is plenty |
| **A domain** | e.g. unit20.co.nz | ~$25–40/year |

The domain is the only thing you have to pay for.

---

## Getting it online

Three things, in order.

### GitHub

A free account at [github.com](https://github.com). It stores the site
and keeps every version, so nothing is ever lost and any change can be
undone.

Ask Claude: *"help me put this on GitHub under my account"*. It will
walk you through it.

### Vercel

A free account at [vercel.com](https://vercel.com). Connect it to your
GitHub repository and it puts the site online, then re-publishes it
automatically every time anything changes.

Ask Claude: *"connect this repo to Vercel and deploy it"*.

Once that is done, your site is live on a free `.vercel.app` address.

### Your own domain

Buy it wherever you like — any New Zealand registrar sells `.co.nz`.
You do **not** have to buy it through Vercel.

Then in Vercel: **Project → Settings → Domains → Add**. It tells you
exactly which DNS records to enter at whoever you bought the domain
from, and takes care of the security certificate itself.

Ask Claude: *"help me point my domain at this Vercel project"*.

### One extra step for the admin

Right now the admin only works on your own computer. To edit the live
site from anywhere, it needs connecting to GitHub properly.

Ask Claude: *"switch Keystatic to GitHub storage so I can edit the live
site"*. It is a ten-minute job and it is documented in
`keystatic.config.ts`.

⚠ It connects to **your** GitHub account and **your** repository. If
anyone else's username appears in that step, something has gone wrong —
stop and check.

---

## Before you sell a single ticket

**The site cannot take payments yet, and that is deliberate.**

Handling card details yourself makes you legally and financially
responsible for them. It is not something to switch on casually.

The right move for a venue is a ticketing platform — **Flicket**,
**Humanitix**, **iTicket**, **Eventbrite** and **Ticket Tailor** all
work in New Zealand. They take the payment, issue the ticket, scan it
at the door and handle refunds and chargebacks.

Once you have picked one, it is a small job: paste each event's ticket
link into the **Ticket link** field in the admin, and ask Claude to set
the ticketing mode. That is the whole integration.

**Do not ask Claude to build a checkout that takes card numbers
directly.** It has been told why not, and it will explain if you ask.

---

## The other files, and who they are for

| File | Who it is for |
| --- | --- |
| **`START-HERE.md`** | You. This one. |
| **`EDITING.md`** | You. Adding events and photos. |
| `README.md` | You or a developer. Running the site. |
| `CLAUDE.md` | Claude. The design rules and the guardrails. |
| `HANDOVER.md` | A developer. What is done and what is not. |
| `BUILD-NOTES.md` | A developer. One build quirk. |

You only ever need the first two.

---

## If something breaks

Nothing you do in the admin can break the site. The limits in there
exist so that whatever you type comes out looking right.

If a change does go wrong, every version is kept. Ask Claude: *"undo my
last change"*.

And if the site does not update after a couple of minutes, check
vercel.com — if a build failed, the previous version stays live. **The
site does not go down.**

---

## Still to sort

- Pick a ticketing platform and paste the links in
- Real terms and conditions on the `/terms` page
- Decide whether you want accounts at all — if tickets are sold through
  an outside platform, people manage them there and the log-in page can
  probably go

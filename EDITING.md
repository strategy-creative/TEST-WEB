# Running the UNIT/20 website

You do not need to know any code to run this site. Everything you
change week to week — events, prices, photos, sold-out signs — is done
through an admin page in your browser.

---

## Where to go

**yourdomain.com/keystatic**

Sign in with GitHub the first time. That is the only account you need,
it is free, and it is how the site knows the change came from you.

Every time you hit Save, the site rebuilds and is live about a minute
later.

---

## Adding an event

1. Go to **Events** in the sidebar, click **Add**.
2. Fill it in. The grey text under each box tells you what it is for
   and how long it can be.
3. Upload the poster under **Poster / photo**.
4. Put the ticket link in **Ticket link** — the page on Flicket,
   Humanitix or wherever you sell.
5. **Save**.

That is it. It appears on the events page, gets its own page, and sorts
itself into the right order by date.

### A few fields worth understanding

**Web address** — the end of the event's URL. Once you have shared a
link or put it on a poster, **do not change this.** Old links stop
working the moment you do.

**Date** vs **Date as it should read** — the first is for the computer
(sorting, and hiding the event once it has been and gone). The second
is what people actually see on the card. Keep them in step.

**Price shown on the card** — the lowest ticket price. Whole dollars,
no dollar sign.

**Ticket tiers** — the line under CHECKOUT. Three is the most that
fits on one line, so the admin will not let you add a fourth.

---

## Marking an event sold out

Open the event, change **Status** to **Sold out**, Save.

The card gets crossed out and stops being clickable, so nobody can
click through to a checkout that would fail them.

The other two statuses:

- **Announced** — the night is up but tickets are not on sale yet.
- **Past** — hides it from the events page. You do not have to use
  this; events hide themselves once their date has gone by. It is there
  for pulling something early.

---

## Adding gallery photos

1. Go to **Gallery photos**, click **Add**.
2. Upload the photo.
3. Write a **photo description** — one line, e.g. "Hands in the air,
   room washed in red". This becomes the caption under the big view
   and is what people using a screen reader hear.
4. Pick a **shape**. This is the important one: the gallery is a
   stepped column, and the shape decides which slot the photo fills.
   Mix them up — that stagger is the whole look.
5. Pick a **side** — alternate left and right down the list.
6. Tick which **acts** it is from. A photo can be in several.
7. **Save**.

**The act names must match exactly.** If you tag a photo "Disco" but
the act is called "DISCO", the filter will not find it. Copy the name
from the Gallery acts page.

### Adding a new act

**Gallery acts** in the sidebar. Add the name, then tag at least one
photo with it — an act with no photos shows an empty gallery.

Tick **Selected when the page opens** on exactly one act. That is the
one people see first.

---

## Site settings

Page title, the description that shows in Google, the location line at
the bottom of the menu, and the footer copyright.

You will probably set these once and never touch them again.

---

## What you cannot change here, and why

The admin deliberately will not let you do certain things:

- **Character limits on titles and descriptions.** These are not
  arbitrary — they are the point at which that text starts wrapping
  badly or running into something else. If something genuinely needs
  to be longer, that is a small design change, not a limit to argue
  with.
- **Photo shapes come from a list.** No typing in your own pixel
  sizes. The four shapes are the ones the gallery layout is built
  around; free numbers would break the stagger.
- **Three ticket tiers, ten DJs, ten acts.** Those are what fit.
- **Page layouts, colours, fonts, the menu.** These are the design.
  Changing them is a developer job.

The point of all of this is that **you cannot break the design from
this screen.** Fill in whatever you like; it will come out looking
right.

---

## If something goes wrong

Every save is recorded, so nothing is ever really lost. A bad edit can
be undone — ask whoever set the site up, or ask Claude, and mention
that the site uses Keystatic and the change needs reverting in git.

If the site does not update after a minute or two, check
**vercel.com** — a build may have failed, in which case the last
working version stays live. The site does not go down.

---

## The one thing still to do

Ticket sales are **not connected yet**. Until they are, GET TICKETS
needs a link to wherever you actually sell — put that in the
**Ticket link** field on each event.

If you have not picked a ticketing platform, Flicket, Humanitix,
iTicket and Eventbrite all work in New Zealand and handle the payment,
the refunds and the scanning at the door. Pick one, and paste the event
link in. That is the whole job.

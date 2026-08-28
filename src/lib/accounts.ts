/**
 * ACCOUNTS — OFF BY DEFAULT
 * ═════════════════════════════════════════════════════════════
 * The log-in, my-tickets and view-ticket pages are DESIGN WORK that is
 * not backed by a real account system. They are switched off unless
 * NEXT_PUBLIC_ENABLE_ACCOUNTS is set to "true".
 *
 * ⚠ WHY THEY ARE OFF
 * The log-in page accepts any email and any password, and then shows a
 * My Tickets page with ticket references on it. Live, that means a
 * stranger can "sign in" as nobody and be looking at something that
 * appears to be a valid ticket for your door. That is not an empty
 * shell — it is worse, because it looks real.
 *
 * The pages are kept in the repo so the design is not lost. They just
 * do not answer to the public.
 *
 * ⚠ DO NOT SET THIS TO "true" TO "SEE THE PAGES". Run the site locally
 * instead — it is on there. Only turn it on when there is a real
 * account system behind it.
 *
 * If ticketing runs through an external platform — the recommendation —
 * buyers manage their tickets there, and these three pages should be
 * DELETED rather than finished.
 */

export const accountsEnabled =
  process.env.NEXT_PUBLIC_ENABLE_ACCOUNTS === "true";

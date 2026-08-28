/**
 * ACCOUNTS — OFF BY DEFAULT
 * ═════════════════════════════════════════════════════════════
 * The my-tickets, register and view-ticket pages are DESIGN WORK that
 * is not backed by a real account system. They are switched off unless
 * NEXT_PUBLIC_ENABLE_ACCOUNTS is set to "true".
 *
 * ⚠ THE LOG IN PAGE IS NOT GATED. It stays public on purpose: it is
 * good design, it takes nothing it cannot handle, and submitting it
 * returns an honest error rather than a fake session. The hazard was
 * never the form — it was what the form used to unlock.
 *
 * ⚠ WHY THEY ARE OFF
 * The log-in page used to accept any email and any password and then
 * show a My Tickets page with ticket references on it. A stranger
 * could "sign in" as nobody and be looking at something that appeared
 * to be a valid ticket for your door. That is not an empty shell — it
 * is worse, because it looks real.
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

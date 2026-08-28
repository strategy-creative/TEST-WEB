"use client";

/**
 * SESSION — PREVIEW STAND-IN
 * ═════════════════════════════════════════════════════════════
 * ⚠⚠ THIS IS NOT AUTHENTICATION. READ THIS BEFORE RELYING ON IT.
 *
 * There is no account system on this site. This module keeps a single
 * boolean in the browser's own storage so the signed-in screens can be
 * designed and reviewed. It:
 *
 *   • checks no password
 *   • verifies nothing against a server
 *   • can be switched on by anyone with a browser console
 *
 * So it hides the My Tickets link and shows a signed-out state on that
 * page — which is a UI convenience, NOT a security boundary. Anything
 * genuinely private must be protected on the SERVER, not here.
 *
 * WHEN REAL ACCOUNTS ARRIVE
 * Replace this file with the real session, keep the same `useSession`
 * shape, and every component that reads it keeps working. Then move
 * the My Tickets data fetch server-side so the page cannot render
 * someone else's tickets even if this flag is forced on.
 *
 * ⚠ Do NOT put anything sensitive behind this. Do not extend it into a
 * "real enough" login. See CLAUDE.md → Ticketing: if ticketing runs on
 * an external platform, buyers manage tickets there and this whole
 * area should be deleted rather than finished.
 */

import { useEffect, useState } from "react";

const KEY = "unit20:preview-signed-in";

/** Fires when the flag changes, so every component updates at once. */
const EVENT = "unit20:session-change";

function read(): boolean {
  try {
    return window.localStorage.getItem(KEY) === "1";
  } catch {
    // Private browsing can throw on storage access. Treat as signed out.
    return false;
  }
}

export function useSession() {
  // Always starts false so the server and the first client render match.
  const [signedIn, setSignedIn] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setSignedIn(read());
    sync();
    setReady(true);

    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return { signedIn, ready };
}

/** Preview only. Does not check anything. */
export function startPreviewSession() {
  try {
    window.localStorage.setItem(KEY, "1");
  } catch {
    /* nothing to do */
  }
  window.dispatchEvent(new Event(EVENT));
}

export function endPreviewSession() {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* nothing to do */
  }
  window.dispatchEvent(new Event(EVENT));
}

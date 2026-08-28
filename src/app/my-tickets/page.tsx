/**
 * MY TICKETS
 * ─────────────────────────────────────────────────────────────
 * The logged-in ticket list. Four across, dashed placeholders in the
 * empty slots, VIEW TICKET over each poster.
 *
 * ⚠ Signed-out visitors see a prompt to log in instead of the grid —
 * but that gate is presentational only, and there is no real account
 * system. See src/lib/session.ts and MyTicketsClient.tsx.
 *
 * ⚠ The tickets are sample data from content/tickets.ts. A real list
 * comes from the ticketing platform for the signed-in buyer, fetched
 * on the SERVER. Read CLAUDE.md → Ticketing before wiring this up.
 */

import type { Metadata } from "next";
import { NavBar } from "@/components/nav/NavBar";
import { Footer } from "@/components/layout/Footer";
import { Frame } from "@/components/layout/Frame";
import { MyTicketsClient } from "./MyTicketsClient";
import {
  ticketsWithEvents,
  TICKETS_GRID_SLOTS,
} from "../../../content/tickets";

export const metadata: Metadata = {
  title: "My tickets — UNIT/20",
  description: "Tickets you are holding for upcoming nights at UNIT/20.",
};

export default function MyTicketsPage() {
  return (
    <>
      <NavBar pageName="MY TICKETS" />

      {/*
        min-h keeps the footer below the fold on this page even when the
        grid is short or empty, so it reads as a page you scroll rather
        than a stub with a footer stuck under it.
      */}
      <Frame as="main" className="min-h-svh pt-[226px]">
        <MyTicketsClient
          tickets={ticketsWithEvents()}
          gridSlots={TICKETS_GRID_SLOTS}
        />
      </Frame>

      <Footer />
    </>
  );
}

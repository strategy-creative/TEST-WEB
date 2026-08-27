/**
 * TICKET VIEW
 * ─────────────────────────────────────────────────────────────
 * Where VIEW TICKET > lands after a purchase.
 *
 * ⚠ This is a shell. A real ticket needs a scannable code that is
 * verifiable at the door and cannot be forged or reused. That belongs
 * to whichever ticketing platform takes the payment — do not invent a
 * ticket format here. See CLAUDE.md → Ticketing.
 */

import { SimplePage } from "@/components/layout/SimplePage";

export default async function TicketPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <SimplePage pageName="TICKET" title="YOUR TICKET">
      <p className="font-sc">REFERENCE: {id}</p>
      <p className="mt-[24px]">
        Ticket delivery is handled by the ticketing platform. Connect one
        before taking real money — see CLAUDE.md.
      </p>
    </SimplePage>
  );
}

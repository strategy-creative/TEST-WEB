import { SimplePage } from "@/components/layout/SimplePage";
import { notFound } from "next/navigation";
import { accountsEnabled } from "@/lib/accounts";

export const metadata = { title: "Register — UNIT/20" };

export default function RegisterPage() {
  // ⚠ Off unless accounts are genuinely built. See src/lib/accounts.ts.
  if (!accountsEnabled) notFound();
  return (
    <SimplePage pageName="REGISTER" title="REGISTER">
      <p>
        Accounts are not wired up yet. See the note on the log in page.
      </p>
    </SimplePage>
  );
}

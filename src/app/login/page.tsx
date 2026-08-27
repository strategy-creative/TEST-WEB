import { SimplePage } from "@/components/layout/SimplePage";

export const metadata = { title: "Log in — UNIT/20" };

export default function LoginPage() {
  return (
    <SimplePage pageName="LOG IN" title="LOG IN">
      <p>
        Accounts are not wired up yet. If ticketing runs through an external
        platform, buyers manage their tickets there and this page can be
        removed from content/site.ts &rarr; footerLinks.
      </p>
    </SimplePage>
  );
}

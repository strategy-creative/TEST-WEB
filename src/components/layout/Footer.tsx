"use client";

/**
 * FOOTER
 * ─────────────────────────────────────────────────────────────
 * Venue name left, link list centre, copyright right — then the dot
 * strip below it. Links come from content/site.ts → footerLinks.
 */

import Link from "next/link";
import { site } from "../../../content/site";
import { useSession } from "@/lib/session";
import { DotStrip } from "./DotStrip";
import { Frame } from "./Frame";
import { Reveal } from "../motion/Reveal";

export function Footer() {
  const { signedIn } = useSession();

  // Auth-gated links are hidden until signed in. See src/lib/session.ts.
  const links = site.footerLinks.filter((l) => !l.requiresAuth || signedIn);

  return (
    <Frame as="footer" className="pt-[200px] pb-[60px]">
      <Reveal>
        <div className="flex flex-col gap-[60px] font-sc text-(length:--text-base) tracking-design md:flex-row md:items-start md:justify-between md:gap-0">
          <div className="flex w-full max-w-[779px] items-start justify-between gap-[60px]">
            <span>{site.name}</span>

            <ul className="flex w-auto min-w-[79px] flex-col gap-[10px] whitespace-nowrap">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors duration-300 hover:text-muted"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <span className="whitespace-nowrap">{site.copyright}</span>
        </div>
      </Reveal>

      <div className="mt-[275px] text-ink">
        <DotStrip />
      </div>
    </Frame>
  );
}

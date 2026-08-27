/**
 * FOOTER
 * ─────────────────────────────────────────────────────────────
 * Venue name left, link list centre, copyright right — then the dot
 * strip below it. Links come from content/site.ts → footerLinks.
 */

import Link from "next/link";
import { site } from "../../../content/site";
import { DotStrip } from "./DotStrip";
import { Reveal } from "../motion/Reveal";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-(--container-frame) px-(--spacing-gutter) pt-[200px] pb-[60px] sm:px-0">
      <Reveal>
        <div className="flex flex-col gap-[60px] font-sc text-(length:--text-base) tracking-design md:flex-row md:items-start md:justify-between md:gap-0">
          <div className="flex w-full max-w-[779px] items-start justify-between gap-[60px]">
            <span>{site.name}</span>

            <ul className="flex w-[79px] flex-col gap-[10px]">
              {site.footerLinks.map((link) => (
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
    </footer>
  );
}

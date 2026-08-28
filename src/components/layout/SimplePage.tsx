/**
 * SIMPLE PAGE
 * ─────────────────────────────────────────────────────────────
 * Shared shell for the plain text pages (terms, log in, register).
 * Replace the children with real content when you have it.
 */

import { NavBar } from "../nav/NavBar";
import { Footer } from "./Footer";
import { Frame } from "./Frame";
import { Reveal } from "../motion/Reveal";

export function SimplePage({
  pageName,
  title,
  children,
}: {
  pageName: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar pageName={pageName} />

      <Frame as="main" className="pt-[226px]">
        <Reveal>
          <h1 className="font-sc text-[clamp(1.75rem,3vw,38.964px)] tracking-design">
            {title}
          </h1>
          <div className="mt-[60px] max-w-[560px] font-body text-(length:--text-micro) leading-[1.6] tracking-[-0.02em]">
            {children}
          </div>
        </Reveal>
      </Frame>

      <Footer />
    </>
  );
}

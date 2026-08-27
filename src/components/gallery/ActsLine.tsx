/**
 * ACTS LINE
 * ─────────────────────────────────────────────────────────────
 * The big grey run of act names at the top of the gallery, with one
 * name set in black. Names come from content/gallery.ts → acts.
 * Reflows naturally at any width.
 */

import { acts } from "../../../content/gallery";
import { Reveal } from "../motion/Reveal";

export function ActsLine() {
  return (
    <h1 className="flex flex-wrap items-baseline gap-x-[0.55em] gap-y-[0.15em] text-[clamp(2rem,5.1vw,73.333px)] leading-[1.1] uppercase tracking-[-0.03em]">
      {acts.map((act, i) => (
        <Reveal
          as="span"
          key={act.name}
          delay={i * 0.04}
          distance={16}
          className={act.highlight ? "text-ink" : "text-muted"}
        >
          {act.name}
          {i < acts.length - 1 ? "," : "."}
        </Reveal>
      ))}
    </h1>
  );
}

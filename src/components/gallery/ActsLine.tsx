"use client";

/**
 * ACTS LINE
 * ─────────────────────────────────────────────────────────────
 * The big run of act names at the top of the gallery. Each one is a
 * filter button.
 *
 *   not selected   grey        (--color-muted)
 *   hover / focus  darker grey (--color-muted-hover)
 *   selected       black       (--color-ink)
 *
 * One act is always selected — there is no "show everything" state, by
 * design. The acts come in as a prop; the page reads them.
 */

import type { Act } from "../../../content/types";

type ActsLineProps = {
  acts: Act[];
  selected: string;
  onSelect: (act: string) => void;
};

export function ActsLine({ acts, selected, onSelect }: ActsLineProps) {
  return (
    <h1 className="flex flex-wrap items-baseline gap-x-[0.55em] gap-y-[0.15em] text-[clamp(2rem,5.1vw,73.333px)] leading-[1.1] uppercase tracking-[-0.03em]">
      {acts.map((act, i) => {
        const isSelected = act.name === selected;

        return (
          <button
            key={act.name}
            type="button"
            onClick={() => onSelect(act.name)}
            aria-pressed={isSelected}
            className={`cursor-pointer transition-colors duration-300 ease-[var(--ease-out-expo)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink ${
              isSelected
                ? "text-ink"
                : "text-muted hover:text-muted-hover focus-visible:text-muted-hover"
            }`}
          >
            {act.name}
            {i < acts.length - 1 ? "," : "."}
          </button>
        );
      })}
    </h1>
  );
}

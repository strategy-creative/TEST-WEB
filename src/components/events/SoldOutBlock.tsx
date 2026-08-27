/**
 * SOLD OUT BLOCK
 * ─────────────────────────────────────────────────────────────
 * A dashed box crossed corner to corner with SOLD OUT across the middle.
 *
 * Shown automatically when an event has  status: "sold-out"  in
 * content/events.ts. The card is NOT a link when this shows, so it
 * cannot be clicked through to a checkout that would fail.
 */

export function SoldOutBlock() {
  return (
    <div
      className="relative aspect-[330/396] w-full border border-dashed border-ink"
      role="img"
      aria-label="Sold out"
    >
      {/* The two crossing rules, drawn corner to corner */}
      <svg
        className="absolute inset-0 size-full"
        viewBox="0 0 330 396"
        preserveAspectRatio="none"
        aria-hidden
      >
        <line
          x1="0"
          y1="0"
          x2="330"
          y2="396"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 4"
          vectorEffect="non-scaling-stroke"
        />
        <line
          x1="330"
          y1="0"
          x2="0"
          y2="396"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 4"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <span className="absolute inset-0 flex items-center justify-center bg-paper/0">
        <span className="bg-paper px-[10px] font-sc text-(length:--text-cta) tracking-design">
          SOLD OUT
        </span>
      </span>
    </div>
  );
}

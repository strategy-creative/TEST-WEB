/**
 * MENU ICON
 * ─────────────────────────────────────────────────────────────
 * Three rules that fold into a true cross when the menu opens.
 *
 * Geometry is the 38 × 23 box from the Figma file. The maths matters,
 * so if you change the box size, change these with it:
 *
 *   closed  three rules at y = 1.25 / 11.5 / 21.75, full 38 width
 *   open    middle rule fades out; the outer two travel 10.25px to the
 *           centre line and rotate ±45°
 *
 * For the cross to sit at a real 45° it has to be as wide as it is
 * tall. The box is 23 tall, so each arm needs to be 23 × √2 ≈ 32.5 long
 * — hence scaleX(0.856), which is 32.5 / 38. Without that the arms stay
 * 38 long and the cross comes out squashed and lopsided.
 */

const W = 38;
const H = 23;
const CENTRE_Y = H / 2;
const TOP_Y = 1.25;
const BOTTOM_Y = H - 1.25;
const TRAVEL = CENTRE_Y - TOP_Y; // 10.25
const ARM_SCALE = (H * Math.SQRT2) / W; // 0.856

const base = {
  transformBox: "view-box" as const,
  transformOrigin: `${W / 2}px ${CENTRE_Y}px`,
  transition:
    "transform var(--duration-quick) var(--ease-out-expo), opacity 200ms linear",
};

export function MenuIcon({ open = false }: { open?: boolean }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width={W}
      height={H}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
      className="block overflow-visible"
    >
      {/* Top rule → the "\" arm */}
      <line
        x1="0"
        y1={TOP_Y}
        x2={W}
        y2={TOP_Y}
        style={{
          ...base,
          transform: open
            ? `rotate(45deg) translateY(${TRAVEL}px) scaleX(${ARM_SCALE})`
            : "none",
        }}
      />

      {/* Middle rule — no part in the cross, so it simply goes */}
      <line
        x1="0"
        y1={CENTRE_Y}
        x2={W}
        y2={CENTRE_Y}
        style={{
          ...base,
          opacity: open ? 0 : 1,
          transform: open ? `scaleX(${ARM_SCALE})` : "none",
        }}
      />

      {/* Bottom rule → the "/" arm */}
      <line
        x1="0"
        y1={BOTTOM_Y}
        x2={W}
        y2={BOTTOM_Y}
        style={{
          ...base,
          transform: open
            ? `rotate(-45deg) translateY(${-TRAVEL}px) scaleX(${ARM_SCALE})`
            : "none",
        }}
      />
    </svg>
  );
}

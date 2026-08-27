/**
 * DOT STRIP
 * ─────────────────────────────────────────────────────────────
 * The band of circles under the footer on every inner page, and
 * blended across the lower third of the home page hero.
 *
 * These are the exact coordinates from the Figma file (Group 1059),
 * inlined rather than loaded as a file so it can inherit `currentColor`
 * and take the difference blend on the dark hero. Do not redraw by
 * hand — if the pattern changes in Figma, re-export and replace the
 * DOTS list below.
 *
 * `blend` fills the circles white so that a `mix-blend-difference` on
 * an ANCESTOR inverts them against whatever is behind — on the home
 * page, the video. The blend itself belongs on that ancestor, not here:
 * see the note in src/app/page.tsx.
 */

const R = 27.7694;

// Three rows at y = 27.77 / 90.84 / 153.91, on a 63.07px column pitch.
const DOTS: Array<[number, number]> = [
  [27.7694, 27.7694],
  [216.978, 27.7694],
  [280.047, 27.7694],
  [469.256, 27.7694],
  [658.465, 27.7694],
  [847.674, 27.7694],
  [1036.88, 27.7694],
  [1099.95, 27.7694],
  [1352.23, 27.7694],

  [280.047, 90.8398],
  [406.187, 90.8388],
  [595.396, 90.8388],
  [658.465, 90.8388],
  [847.674, 90.8388],
  [1099.95, 90.8388],
  [1289.16, 90.8388],
  [1352.23, 90.8388],

  [27.7694, 153.908],
  [90.8388, 153.908],
  [216.978, 153.908],
  [595.396, 153.908],
  [784.605, 153.908],
  [847.674, 153.908],
  [1036.88, 153.908],
];

export function DotStrip({
  blend = false,
  className = "",
}: {
  blend?: boolean;
  /** Extra classes on the <svg>. Used to set a minimum width on phones. */
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 1380 182"
      className={`w-full ${className}`}
      fill={blend ? "#ffffff" : "currentColor"}
      aria-hidden
    >
      {DOTS.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={R} />
      ))}
    </svg>
  );
}

/**
 * The hamburger / close glyph. Two stacked rules that cross into an X
 * when `open` is true. Geometry matches the 38 × 20 box in the design.
 */
export function MenuIcon({ open = false }: { open?: boolean }) {
  return (
    <svg
      viewBox="0 0 38 20"
      width="38"
      height="20"
      fill="none"
      aria-hidden
      className="block"
    >
      <line
        x1="0"
        y1={open ? "10" : "6"}
        x2="38"
        y2={open ? "10" : "6"}
        stroke="currentColor"
        strokeWidth="1.5"
        style={{
          transformOrigin: "center",
          transform: open ? "rotate(20deg)" : "none",
          transition: "transform var(--duration-quick) var(--ease-out-expo)",
        }}
      />
      <line
        x1="0"
        y1={open ? "10" : "14"}
        x2="38"
        y2={open ? "10" : "14"}
        stroke="currentColor"
        strokeWidth="1.5"
        style={{
          transformOrigin: "center",
          transform: open ? "rotate(-20deg)" : "none",
          transition: "transform var(--duration-quick) var(--ease-out-expo)",
        }}
      />
    </svg>
  );
}

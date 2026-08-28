/**
 * KEYSTATIC ADMIN LAYOUT
 * ─────────────────────────────────────────────────────────────
 * The admin at /keystatic renders inside the site's root layout, so it
 * inherits the site's stylesheet whether we want it to or not.
 *
 * ⚠ `.admin-root` undoes the two rules that matter: the site-wide
 * uppercase rule and Fragment Mono. Without it the entire CMS renders
 * in shouty monospace and is genuinely hard to read. The class is
 * defined in globals.css — do not remove one without the other.
 */
export default function KeystaticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="admin-root">{children}</div>;
}

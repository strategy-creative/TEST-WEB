/**
 * GALLERY
 * ─────────────────────────────────────────────────────────────
 * The acts line at the top of the gallery page, and the image grid.
 *
 * TO ADD A PHOTO
 *   Drop the file in public/images/ and add a block to `galleryImages`.
 *   The 01/02/03 numbering is automatic — do not hand-number them.
 *
 * The grid alternates left / right and steps down the page. `width` and
 * `height` are the design sizes; they scale down proportionally on
 * smaller screens.
 */

export type Act = {
  name: string;
  /** One act is set in black as the emphasis. The rest are grey. */
  highlight?: boolean;
};

export const acts: Act[] = [
  { name: "OUR SOUND" },
  { name: "DISCO", highlight: true },
  { name: "Smoke & Dart" },
  { name: "CALEB JACKSON" },
  { name: "Interlude" },
  { name: "Gordoandteej" },
  { name: "Flatmate" },
];

export type GalleryImage = {
  src: string;
  alt: string;
  /** Design width in px. */
  width: number;
  /** Design height in px. */
  height: number;
  /** Which side of the column the image sits on. */
  align: "left" | "right";
  /** Optional left inset in px, to break the column's rhythm. */
  indent?: number;
};

export const galleryImages: GalleryImage[] = [
  {
    src: "/images/gallery-01.jpg",
    alt: "Silhouette under a single beam in the warehouse room",
    width: 330,
    height: 230,
    align: "left",
  },
  {
    src: "/images/gallery-02.jpg",
    alt: "Hands in the air, room washed in red",
    width: 330,
    height: 260,
    align: "right",
  },
  {
    src: "/images/gallery-03.jpg",
    alt: "Crowd in front of the LED wall",
    width: 330,
    height: 260,
    align: "left",
    indent: 67,
  },
  {
    src: "/images/gallery-04.jpg",
    alt: "Wide shot of the floor from the back of the room",
    width: 213,
    height: 193,
    align: "left",
  },
  {
    src: "/images/gallery-05.jpg",
    alt: "Long-exposure blur of dancers",
    width: 447,
    height: 386,
    align: "right",
  },
];

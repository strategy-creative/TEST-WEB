/**
 * GALLERY
 * ─────────────────────────────────────────────────────────────
 * The acts line at the top of the gallery page, and the photos.
 *
 * HOW THE PAGE WORKS
 *   The acts along the top are filters. One is always selected: it
 *   shows black, the rest grey, and they darken on hover. Clicking an
 *   act shows that act's photos, which rise into place one after
 *   another. Clicking a photo opens it in the large panel on the right.
 *
 * TO ADD A PHOTO
 *   1. Put the file in public/images/.
 *   2. Add a block to `galleryImages` below.
 *   3. List which acts it belongs to in `acts`. Names must match the
 *      `acts` list exactly.
 *   The 01/02/03 numbering is automatic — do not hand-number them.
 *
 * TO ADD AN ACT
 *   Add it to `acts`, then tag at least one photo with it. An act with
 *   no photos still appears, and shows a short "no photos yet" note.
 */

export type Act = {
  name: string;
  /**
   * The act selected when the page loads. Exactly one act should have
   * this. If none does, the first act is used.
   */
  default?: boolean;
};

export const acts: Act[] = [
  { name: "OUR SOUND" },
  { name: "DISCO", default: true },
  { name: "Smoke & Dart" },
  { name: "CALEB JACKSON" },
  { name: "Interlude" },
  { name: "Gordoandteej" },
  { name: "Flatmate" },
];

export type GalleryImage = {
  src: string;
  /**
   * Describes the photo. Used as the caption under the large panel and
   * read out to screen readers, so write it for a person.
   */
  alt: string;
  /** Design width in px. */
  width: number;
  /** Design height in px. */
  height: number;
  /** Which side of the column the photo sits on. */
  align: "left" | "right";
  /** Optional left inset in px, to break the column's rhythm. */
  indent?: number;
  /**
   * Which acts this photo belongs to. A photo can be in several — a
   * shot from a night can feature more than one act. Names must match
   * the `acts` list above exactly.
   */
  acts: string[];
};

export const galleryImages: GalleryImage[] = [
  {
    src: "/images/gallery-01.jpg",
    alt: "Silhouette under a single beam in the warehouse room",
    width: 330,
    height: 230,
    align: "left",
    acts: ["OUR SOUND", "DISCO"],
  },
  {
    src: "/images/gallery-02.jpg",
    alt: "Hands in the air, room washed in red",
    width: 330,
    height: 260,
    align: "right",
    acts: ["DISCO", "Smoke & Dart"],
  },
  {
    src: "/images/gallery-03.jpg",
    alt: "Crowd in front of the LED wall",
    width: 330,
    height: 260,
    align: "left",
    indent: 67,
    acts: ["DISCO", "CALEB JACKSON", "Interlude"],
  },
  {
    src: "/images/gallery-04.jpg",
    alt: "Wide shot of the floor from the back of the room",
    width: 213,
    height: 193,
    align: "left",
    acts: ["OUR SOUND", "Gordoandteej", "Flatmate"],
  },
  {
    src: "/images/gallery-05.jpg",
    alt: "Long-exposure blur of dancers",
    width: 447,
    height: 386,
    align: "right",
    acts: ["DISCO", "Smoke & Dart", "Flatmate"],
  },
];

/** The act shown when the page first loads. */
export function defaultAct(): string {
  return (acts.find((a) => a.default) ?? acts[0]).name;
}

/** Photos tagged with a given act, in the order they appear above. */
export function imagesForAct(act: string): GalleryImage[] {
  return galleryImages.filter((image) => image.acts.includes(act));
}

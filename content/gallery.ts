/**
 * GALLERY
 * ═════════════════════════════════════════════════════════════
 * ⚠ DO NOT EDIT PHOTOS OR ACTS IN THIS FILE.
 *
 * Both are edited in the admin at /keystatic — photos are JSON files
 * in content/gallery/, the acts list is content/acts.json. This file
 * reads them and turns the chosen "shape" into the pixel sizes the
 * stepped column is built from.
 *
 * ⚠ THE SHAPES ARE THE GUARDRAIL.
 * The admin offers four shapes rather than free width and height
 * boxes, so the stagger down the column always resolves to sizes the
 * layout was designed around. Adding a fifth shape here is fine;
 * letting anyone type arbitrary pixels is not — that is how the grid
 * loses its rhythm.
 */

import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { Act, GalleryImage, GalleryShape } from "./types";

export type { Act, GalleryImage, GalleryShape } from "./types";

/**
 * The four slots in the stepped column, in design pixels. These come
 * straight from the Figma frame — change them only alongside the
 * layout that renders them.
 */
const SHAPES: Record<GalleryShape, { width: number; height: number }> = {
  landscape: { width: 330, height: 230 },
  portrait: { width: 330, height: 260 },
  small: { width: 213, height: 193 },
  large: { width: 447, height: 386 },
};

/** How far an indented photo steps in, in px. */
const INDENT = 67;

const GALLERY_DIR = path.join(process.cwd(), "content", "gallery");
const ACTS_FILE = path.join(process.cwd(), "content", "acts.json");

function readActs(): Act[] {
  try {
    const raw = JSON.parse(fs.readFileSync(ACTS_FILE, "utf8"));
    return (raw.acts ?? []).map(
      (a: { name: string; isDefault?: boolean }): Act => ({
        name: a.name,
        default: a.isDefault === true,
      }),
    );
  } catch {
    return [];
  }
}

function readPhotos(): GalleryImage[] {
  let files: string[] = [];
  try {
    files = fs.readdirSync(GALLERY_DIR).filter((f) => f.endsWith(".json"));
  } catch {
    return [];
  }

  return files.map((file) => {
    const raw = JSON.parse(
      fs.readFileSync(path.join(GALLERY_DIR, file), "utf8"),
    );
    const shape = SHAPES[(raw.shape as GalleryShape) ?? "landscape"];

    return {
      src: raw.image,
      alt: raw.alt,
      width: shape.width,
      height: shape.height,
      align: raw.align === "right" ? "right" : "left",
      indent: raw.indent ? INDENT : undefined,
      acts: raw.acts ?? [],
    } satisfies GalleryImage;
  });
}

export const acts: Act[] = readActs();
export const galleryImages: GalleryImage[] = readPhotos();

/** The act shown when the page first loads. */
export function defaultAct(): string {
  return (acts.find((a) => a.default) ?? acts[0])?.name ?? "";
}

/** Photos tagged with a given act, in the order they appear above. */
export function imagesForAct(act: string): GalleryImage[] {
  return galleryImages.filter((image) => image.acts.includes(act));
}

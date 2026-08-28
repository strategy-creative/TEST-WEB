"use client";

/**
 * GALLERY
 * ─────────────────────────────────────────────────────────────
 * Holds the two pieces of state the gallery page needs — which act is
 * selected, and which photo is open in the panel.
 *
 * ⚠ It takes its data as PROPS rather than importing the content
 * module. content/gallery.ts reads the content folder off disk, which
 * only works on the server; importing it from a client component pulls
 * node:fs into the browser bundle and the build fails. The page reads
 * the content and hands it down.
 *
 * Choosing a new act moves the panel to that act's first photo, so the
 * panel is never left showing something that is no longer on screen.
 */

import { useMemo, useState } from "react";
import type { Act, GalleryImage } from "../../../content/types";
import { ActsLine } from "./ActsLine";
import { ImageGrid } from "./ImageGrid";

type GalleryProps = {
  acts: Act[];
  images: GalleryImage[];
  initialAct: string;
};

export function Gallery({ acts, images, initialAct }: GalleryProps) {
  const [act, setAct] = useState<string>(initialAct);

  const shown = useMemo(
    () => images.filter((image) => image.acts.includes(act)),
    [images, act],
  );

  const [selected, setSelected] = useState<GalleryImage | null>(
    () => images.find((i) => i.acts.includes(initialAct)) ?? null,
  );

  const chooseAct = (next: string) => {
    setAct(next);
    setSelected(images.find((i) => i.acts.includes(next)) ?? null);
  };

  return (
    <>
      <ActsLine acts={acts} selected={act} onSelect={chooseAct} />

      <div className="mt-[127px]">
        <ImageGrid
          act={act}
          images={shown}
          selected={selected}
          onSelect={setSelected}
        />
      </div>
    </>
  );
}

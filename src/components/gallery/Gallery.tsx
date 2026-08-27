"use client";

/**
 * GALLERY
 * ─────────────────────────────────────────────────────────────
 * Holds the two pieces of state the gallery page needs — which act is
 * selected, and which photo is open in the panel — and hands them to
 * the acts line and the grid.
 *
 * Choosing a new act moves the panel to that act's first photo, so the
 * panel is never left showing something that is no longer on screen.
 *
 * Everything shown here comes from content/gallery.ts.
 */

import { useMemo, useState } from "react";
import {
  defaultAct,
  imagesForAct,
  type GalleryImage,
} from "../../../content/gallery";
import { ActsLine } from "./ActsLine";
import { ImageGrid } from "./ImageGrid";

export function Gallery() {
  const [act, setAct] = useState<string>(defaultAct);

  const images = useMemo(() => imagesForAct(act), [act]);

  const [selected, setSelected] = useState<GalleryImage | null>(
    () => imagesForAct(defaultAct())[0] ?? null,
  );

  const chooseAct = (next: string) => {
    setAct(next);
    setSelected(imagesForAct(next)[0] ?? null);
  };

  return (
    <>
      <ActsLine selected={act} onSelect={chooseAct} />

      <div className="mt-[127px]">
        <ImageGrid
          act={act}
          images={images}
          selected={selected}
          onSelect={setSelected}
        />
      </div>
    </>
  );
}

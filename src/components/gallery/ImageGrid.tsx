/**
 * GALLERY IMAGE GRID
 * ─────────────────────────────────────────────────────────────
 * The stepped, offset column of photos with 01/02/03 numbering, plus
 * the empty detail panel on the right.
 *
 * Numbering is derived from position in content/gallery.ts — add a
 * photo anywhere and the numbers renumber themselves.
 *
 * The panel on the right is intentionally empty in the design. It is
 * where a caption, date or credit for the hovered image would go; wire
 * it up when there is copy for it.
 */

"use client";

import Image from "next/image";
import { useState } from "react";
import { galleryImages } from "../../../content/gallery";
import { Reveal } from "../motion/Reveal";

export function ImageGrid() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-[60px] lg:flex-row lg:items-start lg:justify-between">
      {/* Left: the stepped photo column */}
      <div className="flex w-full flex-col gap-[12px] lg:w-[680px]">
        {galleryImages.map((image, i) => {
          const number = String(i + 1).padStart(2, "0");
          const isRight = image.align === "right";

          return (
            <Reveal key={image.src} delay={0.05} distance={32}>
              <div
                className={`flex items-start gap-[20px] ${
                  isRight ? "justify-end" : "justify-start"
                }`}
                style={
                  image.indent
                    ? { paddingLeft: `min(${image.indent}px, 6vw)` }
                    : undefined
                }
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                {isRight ? (
                  <span className="mt-[2px] shrink-0 text-[23.985px] leading-none">
                    {number}
                  </span>
                ) : null}

                <div
                  className="relative shrink-0 overflow-hidden"
                  style={{
                    width: `min(${image.width}px, 68vw)`,
                    aspectRatio: `${image.width} / ${image.height}`,
                  }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 1024px) 68vw, 450px"
                    className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] hover:scale-[1.03]"
                  />
                </div>

                {!isRight ? (
                  <span className="mt-[2px] shrink-0 text-[23.985px] leading-none">
                    {number}
                  </span>
                ) : null}
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Right: detail panel */}
      <Reveal className="hidden lg:block">
        <div className="sticky top-[120px] flex size-[563px] items-end bg-field p-[24px]">
          {active !== null ? (
            <p className="font-sc text-(length:--text-caption) tracking-design text-ink">
              {String(active + 1).padStart(2, "0")} — {galleryImages[active].alt}
            </p>
          ) : null}
        </div>
      </Reveal>
    </div>
  );
}

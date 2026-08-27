"use client";

/**
 * GALLERY IMAGE GRID
 * ─────────────────────────────────────────────────────────────
 * The stepped column of photos on the left, and the large viewing panel
 * on the right.
 *
 * Clicking a photo loads it into the panel. The caption sits below the
 * panel, left-aligned with it.
 *
 * THE WAVE
 * When the act changes, the photos leave and the new set rises into
 * place one after another — a stagger of WAVE_STEP seconds per photo,
 * so it reads as a wave travelling down the column rather than
 * everything appearing at once. Turn it down, not off, if it feels
 * slow: below about 0.05 the effect disappears.
 */

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import type { GalleryImage } from "../../../content/gallery";

/** Seconds between each photo starting its rise. */
const WAVE_STEP = 0.08;

type ImageGridProps = {
  /** The act currently selected — used to key the wave animation. */
  act: string;
  images: GalleryImage[];
  selected: GalleryImage | null;
  onSelect: (image: GalleryImage) => void;
};

export function ImageGrid({ act, images, selected, onSelect }: ImageGridProps) {
  return (
    <div className="flex flex-col gap-[60px] lg:flex-row lg:items-start lg:justify-between">
      {/* ── Left: the stepped photo column ───────────────────── */}
      <div className="flex w-full flex-col gap-[12px] lg:w-[680px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={act}
            className="flex flex-col gap-[12px]"
            initial="hidden"
            animate="shown"
            exit="gone"
          >
            {images.length === 0 ? (
              <motion.p
                variants={{
                  hidden: { opacity: 0 },
                  shown: { opacity: 1 },
                  gone: { opacity: 0 },
                }}
                className="font-sc text-(length:--text-base) tracking-design text-muted"
              >
                No photos from this one yet.
              </motion.p>
            ) : null}

            {images.map((image, i) => {
              const number = String(i + 1).padStart(2, "0");
              const isRight = image.align === "right";
              const isActive = selected?.src === image.src;

              return (
                <motion.div
                  key={image.src}
                  variants={{
                    hidden: { opacity: 0, y: 44 },
                    shown: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.75,
                        delay: i * WAVE_STEP,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                    gone: {
                      opacity: 0,
                      y: -20,
                      transition: { duration: 0.3, ease: "easeIn" },
                    },
                  }}
                  className={`flex items-start gap-[20px] ${
                    isRight ? "justify-end" : "justify-start"
                  }`}
                  style={
                    image.indent
                      ? { paddingLeft: `min(${image.indent}px, 6vw)` }
                      : undefined
                  }
                >
                  {isRight ? (
                    <span
                      className={`mt-[2px] shrink-0 text-[23.985px] leading-none transition-colors duration-300 ${
                        isActive ? "text-ink" : "text-muted"
                      }`}
                    >
                      {number}
                    </span>
                  ) : null}

                  <button
                    type="button"
                    onClick={() => onSelect(image)}
                    aria-pressed={isActive}
                    aria-label={`View ${image.alt}`}
                    className="relative shrink-0 cursor-pointer overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                    style={{
                      width: `min(${image.width}px, 68vw)`,
                      aspectRatio: `${image.width} / ${image.height}`,
                    }}
                  >
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 68vw, 450px"
                      className={`object-cover transition-all duration-700 ease-[var(--ease-out-expo)] hover:scale-[1.03] ${
                        isActive ? "" : "opacity-80 hover:opacity-100"
                      }`}
                    />
                  </button>

                  {!isRight ? (
                    <span
                      className={`mt-[2px] shrink-0 text-[23.985px] leading-none transition-colors duration-300 ${
                        isActive ? "text-ink" : "text-muted"
                      }`}
                    >
                      {number}
                    </span>
                  ) : null}
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Right: the viewing panel, with its caption below ──── */}
      <div className="hidden lg:block">
        <div className="sticky top-[120px] w-[563px]">
          <div className="relative size-[563px] overflow-hidden bg-field">
            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div
                  key={selected.src}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image
                    src={selected.src}
                    alt={selected.alt}
                    fill
                    sizes="563px"
                    /* contain, so the whole photo is visible in the square */
                    className="object-contain"
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {/* Caption: below the panel, flush with its left edge */}
          <div className="mt-[16px] min-h-[34px] text-left">
            <AnimatePresence mode="wait">
              {selected ? (
                <motion.p
                  key={selected.src}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-[563px] font-sc text-(length:--text-caption) tracking-design text-ink"
                >
                  {String(
                    images.findIndex((i) => i.src === selected.src) + 1,
                  ).padStart(2, "0")}
                  {" — "}
                  {selected.alt}
                </motion.p>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

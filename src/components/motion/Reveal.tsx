"use client";

/**
 * REVEAL
 * ─────────────────────────────────────────────────────────────
 * The scroll animation. Wrap anything in <Reveal> and it fades and
 * rises into place the first time it enters the viewport.
 *
 *   <Reveal>            …content…  </Reveal>
 *   <Reveal delay={0.1}>…content…  </Reveal>   staggered
 *   <Reveal as="li">    …content…  </Reveal>   different element
 *
 * WHY IT IS A WRAPPER: motion lives in this one file. You can add,
 * remove and reorder content on any page without touching animation
 * code, and the animation cannot break because of a content change.
 *
 * TO TUNE THE FEEL: `distance` (how far it travels) and `duration`
 * below. To remove animation site-wide, make this component return
 * its children unchanged.
 */

import { motion } from "motion/react";
import type { ElementType } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds to wait before starting. Use to stagger a row. */
  delay?: number;
  /** Pixels travelled on the way in. */
  distance?: number;
  as?: ElementType;
};

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 24,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}

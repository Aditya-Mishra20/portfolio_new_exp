"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_STANDARD } from "@/lib/styles";

/**
 * Quiet single fade-in — one orchestrated system for section entrances,
 * honoring prefers-reduced-motion (reduced-motion reference site pattern).
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.3, delay, ease: EASE_STANDARD }}
    >
      {children}
    </motion.div>
  );
}

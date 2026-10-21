"use client";

import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

/**
 * Section container: horizontal padding, quiet `text-xl font-medium`
 * headings, justified intros; seams use the shadcn/radix Separator
 * rendered by page.tsx between sections.
 */
export function Section({
  id,
  title,
  children,
  actions,
  intro,
}: {
  id?: string;
  title?: string;
  children: ReactNode;
  actions?: ReactNode;
  intro?: string;
}) {
  return (
    <div id={id} className="relative scroll-mt-16 px-5 md:px-8 py-8 md:py-10">
      {title && (
        <Reveal>
          <div className="flex justify-between items-end">
            <h2 className="section-title font-heading">{title}</h2>
            {actions}
          </div>
          {intro && (
            <p className="text-sm text-foreground/60 mt-1 mb-6 font-light text-justify">{intro}</p>
          )}
        </Reveal>
      )}
      {children}
    </div>
  );
}

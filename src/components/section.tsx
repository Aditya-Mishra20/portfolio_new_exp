import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { SECTION_PAD } from "@/lib/styles";

/**
 * Section container: horizontal padding, quiet `.section-title` headings
 * (1.25rem / 500 via globals.css), justified intros; seams use the
 * shadcn/radix Separator rendered by page.tsx between sections.
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
    <div id={id} className={`relative scroll-mt-16 ${SECTION_PAD}`}>
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

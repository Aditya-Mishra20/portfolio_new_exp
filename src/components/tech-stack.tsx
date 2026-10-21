"use client";

import { techStack } from "@/content/site";
import { BrandIcon } from "@/components/brand-icons";
import { Reveal } from "@/components/reveal";

/**
 * Tech Stack — reference-site pattern:
 *   h2 text-base font-medium · category `p text-sm text-muted-foreground`
 *   chips = outbound links: rounded-full border bg-card + colored brand icon
 * Chips kept small per user feedback (px-2 py-0.5).
 */
export function TechStack() {
  const categories = Object.entries(techStack);
  return (
    <div id="tech-stack" className="relative scroll-mt-16 px-5 md:px-8 py-8 md:py-10">
      <Reveal>
        <h2 className="text-base font-medium text-foreground font-heading">Tech Stack</h2>
      </Reveal>
      <div className="mt-4 flex flex-col gap-5">
        {categories.map(([category, items], ci) => (
          <Reveal key={category} delay={ci * 0.04}>
            <div>
              <p className="text-sm text-muted-foreground">{category}</p>
              <ul className="mt-2 flex list-none flex-wrap items-center gap-1.5">
                {items.map((item) => (
                  <li key={item.name} className="flex">
                    <a
                      href={item.url} // TODO: official site per tool
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-border bg-card px-2 py-0.5 text-[11.5px] text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <BrandIcon name={item.name} slug={item.slug} className="h-3 w-3" />
                      {item.name}
                      <span className="sr-only"> (opens in new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

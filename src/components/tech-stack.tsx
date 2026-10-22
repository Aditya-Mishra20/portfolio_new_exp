import { ui, techStack } from "@/content/site";
import { BrandIcon } from "@/components/brand-icons";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { TECH_CHIP } from "@/lib/styles";

/**
 * Tech Stack — reference-site pattern: categorized rows of outbound chips.
 * Uses the shared Section (same heading/padding as every other section)
 * and the TECH_CHIP token so tags match the experience section by design.
 */
export function TechStack() {
  const categories = Object.entries(techStack);
  return (
    <Section id="tech-stack" title={ui.sections.techStack.title}>
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
                      className={TECH_CHIP}
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
    </Section>
  );
}

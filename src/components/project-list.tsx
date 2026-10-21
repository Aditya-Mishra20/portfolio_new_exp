"use client";

import { ArrowUpRight } from "lucide-react";
import { projects, socials, ui, type Project } from "@/content/site";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { LinkPreview } from "@/components/ui/link-preview";

/* ------------------------------------------------------------------ */
/* Gogula-style project index. The hover/click link lives on the TITLE  */
/* only. Hovering a title shows the Aceternity LinkPreview card above   */
/* it — cursor-tracked, with the project's preview art and a clickable  */
/* source/live caption strip. Placeholder art comes from p.imageSrc     */
/* (site.ts) or the shared fallback below (isStatic); flip LinkPreview  */
/* 's isStatic off once real URLs exist for live shots.                 */
/* ------------------------------------------------------------------ */

/** Neutral shared placeholder as a data URI — used when a project has no imageSrc */
/* TODO: real screenshots → public/projects/, set imageSrc per project in site.ts */
const PLACEHOLDER_ART = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200"><rect width="320" height="200" fill="#18181b"/><rect x="24" y="30" width="120" height="120" rx="10" fill="none" stroke="#71717a" stroke-width="1.5"/><circle cx="232" cy="64" r="38" fill="none" stroke="#71717a" stroke-width="1.5"/><path d="M180 168 L212 126 L254 168 Z" fill="none" stroke="#71717a" stroke-width="1.5"/><line x1="30" y1="180" x2="290" y2="180" stroke="#52525b"/></svg>`
)}`;

function hostOf(url?: string): string | null {
  if (!url) return null;
  try { return new URL(url).host; } catch { return null; }
}

function Row({ p, i }: { p: Project; i: number }) {
  const open = p.live ?? p.github;
  const host = hostOf(open);
  return (
    <Reveal delay={i * 0.04}>
      <div className="px-3 py-3.5 rounded-md border border-transparent hover:border-border hover:bg-muted/40 transition-colors duration-200">
        <div className="flex items-center gap-4 min-w-0">
          <span className="flex-1 min-w-0">
            {/* Hover + click live ONLY on the title (LinkPreview trigger) */}
            <LinkPreview
              url={open ?? "#"}
              isStatic
              imageSrc={p.imageSrc ?? PLACEHOLDER_ART}
              caption={host ?? undefined}
              githubUrl={p.github}
              width={280}
              height={175}
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground w-fit"
            >
              <span className="truncate">{p.title}</span>
              <ArrowUpRight className="size-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </LinkPreview>
            <span className="mt-1 block text-sm text-foreground/60 font-light truncate">
              {p.description}
            </span>
          </span>
        </div>
      </div>
    </Reveal>
  );
}

export function ProjectList() {
  return (
    <Section
      id="projects"
      title={ui.sections.projects.title}
      intro={ui.sections.projects.intro}
      actions={
        <a
          // derived from the single socials.github source in site.ts
          href={`${socials.github}?tab=repositories`}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-light text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
        >
          more <ArrowUpRight className="size-3" />
        </a>
      }
    >
      <div className="-mx-2">
        {projects.map((p, i) => (
          <Row key={p.title} p={p} i={i} />
        ))}
      </div>
    </Section>
  );
}

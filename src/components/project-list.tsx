"use client";

import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/content/site";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { LinkPreview } from "@/components/ui/link-preview";

/* ------------------------------------------------------------------ */
/* Gogula-style project index. The hover/click link lives on the TITLE  */
/* only. Hovering a title shows the Aceternity LinkPreview card above   */
/* it — cursor-tracked, with the project's preview art and a clickable  */
/* source/live caption strip. Placeholder art today (isStatic); flip    */
/* LinkPreview's isStatic off once real URLs exist for live shots.      */
/* ------------------------------------------------------------------ */

/** Inline placeholder preview art as a data URI — TODO: drop real PNGs into public/projects/ and set imageSrc to them. */
function placeholderArt(index: number): string {
  const svgs = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200"><rect width="320" height="200" fill="#18181b"/><rect x="24" y="30" width="120" height="120" rx="10" fill="none" stroke="#71717a" stroke-width="1.5"/><circle cx="232" cy="64" r="38" fill="none" stroke="#71717a" stroke-width="1.5"/><path d="M180 168 L212 126 L254 168 Z" fill="none" stroke="#71717a" stroke-width="1.5"/><line x1="30" y1="180" x2="290" y2="180" stroke="#52525b"/></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200"><rect width="320" height="200" fill="#18181b"/><rect x="28" y="32" width="264" height="42" rx="8" fill="none" stroke="#71717a" stroke-width="1.5"/><rect x="28" y="92" width="122" height="76" rx="8" fill="none" stroke="#71717a" stroke-width="1.5"/><rect x="170" y="92" width="122" height="76" rx="8" fill="none" stroke="#71717a" stroke-width="1.5"/><circle cx="48" cy="53" r="8" fill="#71717a"/><circle cx="72" cy="53" r="8" fill="none" stroke="#71717a" stroke-width="1.5"/></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200"><rect width="320" height="200" fill="#18181b"/><path d="M32 168 L112 64 L192 168 Z" fill="none" stroke="#71717a" stroke-width="1.5"/><rect x="222" y="44" width="70" height="70" rx="10" fill="none" stroke="#71717a" stroke-width="1.5"/><rect x="228" y="132" width="82" height="46" rx="8" fill="none" stroke="#71717a" stroke-width="1.5"/><circle cx="168" cy="44" r="6" fill="#71717a"/></svg>`,
  ];
  return `data:image/svg+xml,${encodeURIComponent(svgs[index % svgs.length])}`;
}

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
              imageSrc={placeholderArt(i)} // TODO: real screenshot → public/projects/<name>.png
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
      title="Projects"
      intro="Things I'm making and have shipped. Hover a title to peek at it."
      actions={
        <a
          href="https://github.com/your-handle?tab=repositories" // TODO: your repos
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

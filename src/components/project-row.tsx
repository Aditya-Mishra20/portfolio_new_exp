import { ArrowUpRight } from "lucide-react";
import { projectSlug, type Project } from "@/content/site";
import { Reveal } from "@/components/reveal";
import { LinkPreview } from "@/components/ui/link-preview";

/* ------------------------------------------------------------------ */
/* Shared project row — the ONE row UI used by the home Projects       */
/* section and the /projects listing page. Title hover shows the       */
/* LinkPreview card (art + caption strip); click navigates internally  */
/* to /projects/<slug> (same tab). Placeholder art comes from          */
/* p.imageSrc (site.ts) or the shared fallback below (isStatic); flip  */
/* LinkPreview 's isStatic off once real URLs exist for live shots.    */
/* ------------------------------------------------------------------ */

/** Neutral shared placeholder as a data URI — used when a project has no imageSrc */
/* TODO: real screenshots → public/projects/, set imageSrc per project in site.ts */
export const PLACEHOLDER_ART = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200"><rect width="320" height="200" fill="#18181b"/><rect x="24" y="30" width="120" height="120" rx="10" fill="none" stroke="#71717a" stroke-width="1.5"/><circle cx="232" cy="64" r="38" fill="none" stroke="#71717a" stroke-width="1.5"/><path d="M180 168 L212 126 L254 168 Z" fill="none" stroke="#71717a" stroke-width="1.5"/><line x1="30" y1="180" x2="290" y2="180" stroke="#52525b"/></svg>`
)}`;

function hostOf(url?: string): string | null {
  if (!url) return null;
  try { return new URL(url).host; } catch { return null; }
}

export function ProjectRow({ p, i }: { p: Project; i: number }) {
  // preview caption stays the real source host even though the trigger
  // now routes internally to the project's detail page
  const caption = hostOf(p.live ?? p.github);
  return (
    <Reveal delay={i * 0.04}>
      {/* no row-level hover chrome — activation lives on the title only:
          hover → title emphasizes + preview card; click → detail page */}
      <div className="px-3 py-3.5">
        <div className="flex items-center gap-4 min-w-0">
          <span className="flex-1 min-w-0">
            {/* Hover + click live ONLY on the title (LinkPreview trigger) */}
            <LinkPreview
              url={`/projects/${projectSlug(p.title)}`}
              internal
              liveUrl={p.live ?? p.github}
              isStatic
              imageSrc={p.imageSrc ?? PLACEHOLDER_ART}
              caption={caption ?? p.title}
              githubUrl={p.github}
              width={280}
              height={175}
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground w-fit hover:opacity-80 transition-opacity"
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

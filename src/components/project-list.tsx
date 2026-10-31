import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects, ui } from "@/content/site";
import { Section } from "@/components/section";
import { ProjectRow } from "@/components/project-row";

/* ------------------------------------------------------------------ */
/* Gogula-style project index on the home page. The row UI lives in    */
/* project-row.tsx so /projects replays it byte-for-byte. Titles       */
/* navigate to /projects/<slug>; hovering shows the preview card.      */
/* ------------------------------------------------------------------ */

export function ProjectList() {
  return (
    <Section
      id="projects"
      title={ui.sections.projects.title}
      intro={ui.sections.projects.intro}
      actions={
        <Link
          href="/projects"
          className="text-xs font-light text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
        >
          all projects <ArrowUpRight className="size-3" />
        </Link>
      }
    >
      <div className="-mx-2">
        {projects.map((p, i) => (
          <ProjectRow key={p.title} p={p} i={i} />
        ))}
      </div>
    </Section>
  );
}

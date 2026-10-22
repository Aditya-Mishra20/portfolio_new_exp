import type { Metadata } from "next";
import { profile, projects, ui } from "@/content/site";
import { ProjectRow } from "@/components/project-row";
import { Reveal } from "@/components/reveal";
import { PAGE_WRAPPER, SECTION_PAD } from "@/lib/styles";

/* /projects — full listing; replays the home Projects section's row UI
   through the shared ProjectRow (single implementation, two pages). */

export const metadata: Metadata = {
  title: `${ui.projectsPage.title} — ${profile.name}`,
};

export default function ProjectsPage() {
  return (
    <div className={PAGE_WRAPPER}>
      <div id="top" className={SECTION_PAD}>
        <Reveal>
          <div className="flex justify-between items-end">
            <h1 className="section-title font-heading">{ui.projectsPage.title}</h1>
          </div>
          <p className="text-sm text-foreground/60 mt-1 mb-6 font-light text-justify">
            {ui.projectsPage.intro}
          </p>
        </Reveal>
        {/* footer's own clearance handles the dock — no extra spacer here */}
        <div className="-mx-2">
          {projects.map((p, i) => (
            <ProjectRow key={p.title} p={p} i={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github as GithubIcon } from "lucide-react";
import {
  projects,
  projectSlug,
  techChipByName,
  ui,
  type Project,
} from "@/content/site";
import { BrandIcon } from "@/components/brand-icons";
import { Reveal } from "@/components/reveal";
import { SOCIAL_CHIP, TECH_CHIP, PAGE_WRAPPER, SECTION_PAD, PANEL_OUTER, PANEL_INNER } from "@/lib/styles";

/* /projects/[slug] — one project's full breakdown:
   feature box (empty TODO) → name + intro + GitHub/Live → stack chips
   (same UI as the tech-stack section) → detailed description bullets. */

export function generateStaticParams() {
  return projects.map((p) => ({ slug: projectSlug(p.title) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => projectSlug(x.title) === slug);
  if (!p) return {};
  return {
    title: `${p.title} — ${ui.projectsPage.title}`,
    description: p.description,
  };
}

function findProject(slug: string): Project | undefined {
  return projects.find((x) => projectSlug(x.title) === slug);
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = findProject(slug);
  if (!p) notFound();

  return (
    <div className={PAGE_WRAPPER}>
      <div id="top" className={SECTION_PAD}>
        {/* back to the listing */}
        <Link
          href="/projects"
          className="mb-6 inline-flex items-center gap-1 text-[13px] font-light text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3.5" /> Projects
        </Link>

        {/* FEATURE IMAGE/VIDEO — same inset-box language as the hero art.
            TODO: drop real cover art or a video into public/projects/ and
            render it here (img under PANEL_INNER); left empty for now. */}
        <div className={`relative w-full aspect-video ${PANEL_OUTER}`}>
          <div className={`h-full w-full relative bg-muted ${PANEL_INNER}`}>
            {/* TODO: feature image / video */}
          </div>
        </div>

        {/* name + one-time intro + links */}
        <h1 className="text-xl font-medium font-heading flex items-center gap-1.5 mt-8">
          {p.title}
        </h1>
        <p className="text-sm text-foreground/60 mt-1 font-light text-justify">
          {p.description}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {p.live && (
            <a href={p.live} target="_blank" rel="noreferrer" className={SOCIAL_CHIP}>
              <ArrowUpRight className="size-3.5" />
              {ui.projectDetail.liveLabel}
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          )}
          {p.github && (
            <a href={p.github} target="_blank" rel="noreferrer" className={SOCIAL_CHIP}>
              <GithubIcon className="size-3.5" />
              {ui.projectDetail.sourceLabel}
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          )}
        </div>

        {/* tech stack used — chip UI identical to the tech-stack section:
            BrandIcon + TECH_CHIP, outbound when the name exists in techStack */}
        <p className="text-sm text-muted-foreground mt-8">{ui.projectDetail.stackLabel}</p>
        <ul className="mt-2 flex list-none flex-wrap items-center gap-1.5">
          {p.tech.map((name) => {
            const chip = techChipByName(name);
            const chipClass = `${TECH_CHIP} ${chip.url ? "" : "cursor-default hover:text-muted-foreground"}`;
            return (
              <li key={name} className="flex">
                {chip.url ? (
                  <a href={chip.url} target="_blank" rel="noopener noreferrer" className={chipClass}>
                    <BrandIcon name={name} slug={chip.slug} className="h-3 w-3" />
                    {name}
                  </a>
                ) : (
                  <span className={chipClass}>
                    <BrandIcon name={name} className="h-3 w-3" />
                    {name}
                  </span>
                )}
              </li>
            );
          })}
        </ul>

        {/* detailed description — quiet bullet write-up */}
        {p.detailed && p.detailed.length > 0 && (
          <>
            <p className="text-sm text-muted-foreground mt-8">{ui.projectDetail.detailsLabel}</p>
            <ul className="mt-3 flex list-none flex-col gap-2.5">
              {p.detailed.map((line, li) => (
                <li key={li} className="flex gap-2.5 text-sm font-light text-foreground/70">
                  <span aria-hidden="true" className="text-muted-foreground/70 leading-5 shrink-0">
                    ·
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </>
        )}

        {/* footer's own clearance handles the dock — no extra spacer here */}
      </div>
    </div>
  );
}

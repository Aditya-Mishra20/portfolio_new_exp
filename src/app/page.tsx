import { Hero } from "@/components/hero";
import { ProjectList } from "@/components/project-list";
import { TechStack } from "@/components/tech-stack";
import { Experience } from "@/components/experience";
import { Education } from "@/components/education";
import { Contact } from "@/components/contact";
import { Separator } from "@/components/ui/separator";
import { PAGE_WRAPPER } from "@/lib/styles";

/**
 * No vertical frame lines (user removed them) — sections carry their own
 * horizontal padding; seams are the shadcn/radix Separator. No top navbar.
 */
export default function Home() {
  return (
    <div id="top" className={PAGE_WRAPPER}>
      <Hero />
      <Separator />
      <ProjectList />
      <Separator />
      <TechStack />
      <Separator />
      <Experience />
      <Separator />
      <Education />
      <Separator />
      <Contact />
    </div>
  );
}

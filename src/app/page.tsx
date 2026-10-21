"use client";

import { Hero } from "@/components/hero";
import { ProjectList } from "@/components/project-list";
import { TechStack } from "@/components/tech-stack";
import { Experience } from "@/components/experience";
import { Contact } from "@/components/contact";
import { Separator } from "@/components/ui/separator";

/**
 * No vertical frame lines (user removed them) — sections carry their own
 * horizontal padding; seams are the shadcn/radix Separator. No top navbar.
 */
export default function Home() {
  return (
    <div id="top" className="max-w-4xl mx-auto px-4 md:px-6">
      <Hero />
      <Separator />
      <ProjectList />
      <Separator />
      <TechStack />
      <Separator />
      <Experience />
      <Separator />
      <Contact />
    </div>
  );
}

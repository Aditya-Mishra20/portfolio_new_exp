"use client";

import { education, ui } from "@/content/site";
import { Row } from "@/components/experience";
import { Section } from "@/components/section";

/**
 * Education — same expandable-row UI as the Experience section (shared
 * `Row`): degree on the first line, institution under it, dropdown with
 * bullet details. No tech chips.
 */
export function Education() {
  return (
    <Section id="education" title={ui.sections.education.title} intro={ui.sections.education.intro}>
      <div className="divide-y divide-border">
        {education.map((edu, i) => (
          <Row
            key={edu.institution + edu.period}
            item={{ title: edu.degree, subtitle: edu.institution, type: edu.type, period: edu.period, location: edu.location, bullets: edu.bullets }}
            i={i}
          />
        ))}
      </div>
    </Section>
  );
}

import {
  profile,
  email,
  calcomUrl,
  socials,
  resumeUrl,
  projects,
  techStack,
  experience,
} from "@/content/site";

/**
 * Machine-readable markdown docs for agents.
 * Mirrors the /md/<path> pipeline observed in dossier §9 (Gogula's llms.txt
 * documents the same pipeline: every page has a markdown representation).
 */

export const mdDocs: Record<string, string> = {
  "profile.md": `# ${profile.name}

> ${profile.role} — ${profile.location}

${profile.bio}

- Availability: ${profile.availability}
- Email: ${email}
- Book a call: ${calcomUrl}
- Resume: ${resumeUrl}

## Socials

- GitHub: ${socials.github}
- LinkedIn: ${socials.linkedin}
- Twitter/X: ${socials.twitter}
`,
  "projects.md": `# Projects

${projects
  .map(
    (p) =>
      `## ${p.title} (${p.status})\n\n${p.description}\n\n- Tech: ${p.tech.join(", ")}\n- GitHub: ${p.github ?? "n/a"}\n- Live: ${p.live ?? "n/a"}\n`
  )
  .join("\n")}
`,
  "experience.md": `# Experience

${experience
  .map(
    (e) =>
      `## ${e.role} at ${e.company}\n\n- Type: ${e.type}\n- Period: ${e.period}\n\n${e.bullets.map((b) => `- ${b}`).join("\n")}\n\n- Tech: ${e.tech.join(", ")}\n`
  )
  .join("\n")}
`,
  "tech-stack.md": `# Tech Stack

${Object.entries(techStack)
  .map(([cat, items]) => `## ${cat}\n\n${items.map((i) => `- ${i.name}`).join("\n")}`)
  .join("\n\n")}
`,
  "contact.md": `# Contact

${profile.name} — ${profile.role}

- Email: ${email} (mailto:${email})
- Book a call: ${calcomUrl}
- GitHub: ${socials.github}
- LinkedIn: ${socials.linkedin}

Subjects: hiring questions, freelance work, collaboration.
`,
};

/** llms.txt following the spec (dossier §9 + Gogula's production example). */
export function llmsTxt(baseUrl: string): string {
  const strip = (p: string) => mdDocs[p];
  return `# ${profile.name}

> ${profile.role} based in ${profile.location}. ${profile.availability}

This file follows the llms.txt specification. Machine- and human-readable.
TODO: replace every detail with your real ones before publishing.

## Docs

- [Profile](${baseUrl}/md/profile.md): ${strip("profile.md") ? "bio, availability, links" : ""}
- [Projects](${baseUrl}/md/projects.md): list with status badges (ongoing/building/completed)
- [Experience](${baseUrl}/md/experience.md): roles, periods, achievements
- [Tech Stack](${baseUrl}/md/tech-stack.md): categorized tools
- [Contact](${baseUrl}/md/contact.md): email and Cal.com booking

## When to use this site

- Hiring or vetting: check /md/experience.md and /md/projects.md
- Contacting: /md/contact.md has email + Cal.com
`;
}

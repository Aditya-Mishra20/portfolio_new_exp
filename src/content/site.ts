/**
 * ALL CONTENT IN THIS FILE IS PLACEHOLDER.
 * TODO: Replace every string marked with `// TODO:` with your real
 * name, bio, projects, experience, and links before publishing.
 */

export type ProjectStatus = "ongoing" | "building" | "completed";

export const profile = {
  // TODO: your name
  name: "Your Name",
  // TODO: your title line
  role: "Full-Stack Developer",
  // TODO: one-paragraph intro
  bio: "I build clean, modern web products where design, functionality, and the smallest details matter. Focused on shipping things that are fast, accessible, and satisfying to use.",
  // TODO: your location
  location: "City, Country",
  availability: "Open to full-time roles and freelance projects.", // TODO
  // TODO: interactive placeholder — swap for your real name in the hero
  initials: "YN",
  // TODO: temporary unsplash portrait — replace with your own photo (drop into public/ and point here)
  avatarUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=320&q=80&auto=format&fit=crop",
};

export const email = "you@example.com"; // TODO
export const calcomUrl = "https://cal.com/your-handle/30min"; // TODO
export const resumeUrl = "/resume.pdf"; // TODO: drop your PDF into public/

export const socials = {
  // TODO: your handles
  github: "https://github.com/your-handle",
  linkedin: "https://www.linkedin.com/in/your-handle",
  twitter: "https://x.com/your-handle",
};

export type Project = {
  title: string;
  description: string;
  status: ProjectStatus;
  tech: string[];
  github?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    title: "Project Alpha",
    description:
      "Placeholder for your first project — a full-stack platform showcasing your primary strength.",
    status: "ongoing",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind"],
    github: "https://github.com/your-handle/alpha", // TODO
    live: "https://alpha.example.com", // TODO
  },
  {
    title: "Project Beta",
    description:
      "Placeholder project — a developer tool or library you built and maintain.",
    status: "building",
    tech: ["React", "Node.js", "Redis"],
    github: "https://github.com/your-handle/beta", // TODO
  },
  {
    title: "Project Gamma",
    description:
      "Placeholder project — something shipped and finished that you can demo.",
    status: "completed",
    tech: ["Next.js", "Drizzle", "Neon"],
    github: "https://github.com/your-handle/gamma", // TODO
    live: "https://gamma.example.com", // TODO
  },
];

/**
 * Tech stack — Ashish-style categories with outbound chips.
 * Each item: name, official-site URL (TODO: adjust), and an optional
 * simple-icons slug. Slugs absent from simple-icons fall back to a
 * lucide glyph in components/brand-icons.tsx.
 */
export const techStack: Record<string, { name: string; slug?: string; url: string }[]> = {
  // TODO: adjust categories, entries and URLs to your real stack
  Frontend: [
    { name: "TypeScript", slug: "typescript", url: "https://www.typescriptlang.org" },
    { name: "JavaScript", slug: "javascript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { name: "React", slug: "react", url: "https://react.dev" },
    { name: "Next.js", slug: "nextdotjs", url: "https://nextjs.org" },
    { name: "Angular", slug: "angular", url: "https://angular.dev" },
    { name: "Redux", slug: "redux", url: "https://redux.js.org" },
    { name: "Tailwind CSS", slug: "tailwindcss", url: "https://tailwindcss.com" },
    { name: "Bootstrap", slug: "bootstrap", url: "https://getbootstrap.com" },
    { name: "shadcn/ui", slug: "shadcnui", url: "https://ui.shadcn.com" },
    { name: "Radix UI", slug: "radixui", url: "https://www.radix-ui.com" },
    { name: "Motion", url: "https://motion.dev" }, // simple-icons lacks this brand — lucide fallback
  ],
  Backend: [
    { name: "Java", slug: "openjdk", url: "https://openjdk.org" },
    { name: "Spring Boot", slug: "springboot", url: "https://spring.io/projects/spring-boot" },
    { name: "Node.js", slug: "nodedotjs", url: "https://nodejs.org" },
    { name: "Bun", slug: "bun", url: "https://bun.sh" },
    { name: "Tomcat", slug: "apachetomcat", url: "https://tomcat.apache.org" },
    { name: "SQL", url: "https://en.wikipedia.org/wiki/SQL" }, // lucide fallback
    { name: "MySQL", slug: "mysql", url: "https://www.mysql.com" },
    { name: "MongoDB", slug: "mongodb", url: "https://www.mongodb.com" },
    { name: "Redis", slug: "redis", url: "https://redis.io" },
    { name: "AWS", url: "https://aws.amazon.com" }, // simple-icons brand removed — lucide fallback
    { name: "Docker", slug: "docker", url: "https://www.docker.com" },
    { name: "Git", slug: "git", url: "https://git-scm.com" },
    { name: "GitHub", slug: "github", url: "https://github.com" },
    { name: "Postman", slug: "postman", url: "https://www.postman.com" },
    { name: "DBeaver", slug: "dbeaver", url: "https://dbeaver.io" },
    { name: "MobaXterm", url: "https://mobaxterm.mobatek.net" }, // lucide fallback
  ],
  "AI & Tools": [
    { name: "Claude", slug: "claude", url: "https://claude.ai" },
    { name: "Cursor", slug: "cursor", url: "https://cursor.com" },
    { name: "ChatGPT", url: "https://chatgpt.com" }, // lucide fallback
    { name: "Gemini", slug: "googlegemini", url: "https://gemini.google.com" },
    { name: "Trae", slug: "trae", url: "https://www.trae.ai" },
    { name: "Notion", slug: "notion", url: "https://www.notion.com" },
  ],
  Design: [
    { name: "Figma", slug: "figma", url: "https://www.figma.com" },
    { name: "Photoshop", url: "https://www.adobe.com/products/photoshop.html" }, // lucide fallback
    { name: "Canva", url: "https://www.canva.com" }, // lucide fallback
  ],
};

export type ExperienceItem = {
  company: string;
  role: string;
  type: string;
  period: string;
  /** e.g. "New Delhi, India - Remote" — TODO: your role's location */
  location: string;
  bullets: string[];
  tech: string[];
};

export const experience: ExperienceItem[] = [
  {
    // TODO: most recent role
    company: "Company Name",
    role: "Full-Stack Developer",
    type: "Full-time",
    period: "2025 — Present",
    location: "Your City, India - Remote", // TODO: role location
    bullets: [
      "Placeholder achievement bullet — describe impact with numbers where possible.",
      "Placeholder achievement bullet — what you shipped and why it mattered.",
    ],
    tech: ["Next.js", "TypeScript", "PostgreSQL"],
  },
  {
    // TODO: earlier role
    company: "Previous Company",
    role: "Frontend Developer",
    type: "Internship",
    period: "2024 — 2025",
    location: "Your City, India - On-site", // TODO: role location
    bullets: [
      "Placeholder achievement bullet — your core contribution.",
    ],
    tech: ["React", "Tailwind CSS"],
  },
];

export const navSections = [
  { id: "projects", label: "Projects" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

/** Links shown in the top navbar + mobile menu — user cut this to just two. */
export const navLinks = [
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

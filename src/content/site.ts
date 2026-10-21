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

/** Single base URL — the one deployment target for metadata, sitemap, robots.
 * TODO: swap for your production domain (e.g. "https://you.dev"). */
export const SITE_URL = "http://localhost:3000";

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
  /** Hover-preview art: "/projects/<name>.png" from public/ — TODO: real screenshots.
   * Falls back to placeholder art when unset (never position-dependent). */
  imageSrc?: string;
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

/**
 * UI copy — every interface string in one place: section headers/intros,
 * button labels, chat strings, footer strips, and shared event names.
 * Data lives above this block; this is what the site *says*.
 */
export const ui = {
  /** Hero: lead-in printed between the CTAs and the social chips. */
  socialsLeadIn: "Check out my Socials.", // TODO
  cta: {
    bookCall: "Book a intro Call", // TODO (labels shared by hero + contact)
    sendEmail: "Send a Email", // TODO
  },
  sections: {
    projects: {
      title: "Projects",
      intro: "Things I'm making and have shipped. Hover a title to peek at it.",
    },
    techStack: { title: "Tech Stack" },
    experiences: {
      title: "Experiences",
      intro: "Where I've worked and what I did there. Click a role to expand it.",
    },
    contact: {
      title: "Contact",
      // rendered as `${profile.availability} ${introLead}`
      introLead: "The fastest way to reach me is a short call or email.",
    },
  },
  chat: {
    greeting: `Hi! I'm ${profile.name}'s README bot. Ask me anything about this portfolio — projects, stack, experience, contact.`,
    askLabel: "Ask me anything",
    /** /md routes the chat widget fetches to build its retrieval index — keep in sync
     * with content/markdown.ts, which owns the actual doc contents (server-only). */
    docRoutes: ["/md/profile.md", "/md/projects.md", "/md/experience.md", "/md/contact.md"],
  },
  /** Custom DOM events shared between dock pill, palette, and chat widget. */
  event: { openChat: "open-chat" },
  footer: {
    copyrightNote: "The source · All rights reserved", // TODO
    agentLinks: [
      // served by app robots.ts/sitemap.ts + the /llm.txt alias
      { label: "robots.txt", href: "/robots.txt" },
      { label: "sitemap.xml", href: "/sitemap.xml" },
      { label: "llm.txt", href: "/llm.txt" },
    ],
  },
} as const;

/**
 * Section anchors for the nav UIs — the dock's mobile menu and the Ctrl K
 * palette both read this one array (top navbar was removed).
 */
export const navSections = [
  { id: "projects", label: "Projects" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "experience", label: "Experiences" },
  { id: "contact", label: "Contact" },
];

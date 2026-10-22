/**
 * ALL CONTENT IN THIS FILE IS PLACEHOLDER.
 * TODO: Replace every string marked with `// TODO:` with your real
 * name, bio, projects, experience, and links before publishing.
 */

export type ProjectStatus = "ongoing" | "building" | "completed";

export const profile = {
  // TODO: your name
  name: "Your Name",
  // TODO: your title line (kept for metadata; hero cycles `roles` below)
  role: "AI Engineer",
  // TODO: hero title cycles through these (FlipWords)
  roles: ["AI Engineer", "Full Stack AI Engineer", "Software Developer", "AI Automation"],
  // TODO: one-paragraph intro
  bio: "I build clean, modern web products where design, functionality, and the smallest details matter. Focused on shipping things that are fast, accessible, and satisfying to use.",
  // TODO: your location (not shown in the hero — placement TBD)
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
  /** Detail-page bullet points ("/projects/<slug>") — TODO: real write-ups. */
  detailed?: string[];
};

/** One slug derivation (title → "project-alpha") — home rows, /projects,
 * detail pages, and sitemap all call this so URLs can never drift. */
export const projectSlug = (title: string) =>
  title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export const projects: Project[] = [
  {
    title: "Project Alpha",
    description:
      "Placeholder for your first project — a full-stack platform showcasing your primary strength.",
    status: "ongoing",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    github: "https://github.com/your-handle/alpha", // TODO
    live: "https://alpha.example.com", // TODO
    detailed: [
      // TODO: replace with the real project breakdown
      "Placeholder bullet — what the project does and who it serves.",
      "Placeholder bullet — the problem it solves and your approach.",
      "Placeholder bullet — architecture highlights worth mentioning.",
      "Placeholder bullet — an interesting technical challenge you handled.",
      "Placeholder bullet — measurable outcome (users, perf, uptime…).",
    ],
  },
  {
    title: "Project Beta",
    description:
      "Placeholder project — a developer tool or library you built and maintain.",
    status: "building",
    tech: ["React", "Node.js", "Redis"],
    github: "https://github.com/your-handle/beta", // TODO
    detailed: [
      // TODO: replace with the real project breakdown
      "Placeholder bullet — what the tool does and where it fits.",
      "Placeholder bullet — the design decisions behind it.",
      "Placeholder bullet — how it is tested and released.",
      "Placeholder bullet — adoption or usage notes.",
    ],
  },
  {
    title: "Project Gamma",
    description:
      "Placeholder project — something shipped and finished that you can demo.",
    status: "completed",
    tech: ["Next.js", "Drizzle", "Neon"],
    github: "https://github.com/your-handle/gamma", // TODO
    live: "https://gamma.example.com", // TODO
    detailed: [
      // TODO: replace with the real project breakdown
      "Placeholder bullet — the shipped scope of the product.",
      "Placeholder bullet — your role and key contributions.",
      "Placeholder bullet — lessons learned / what you'd do differently.",
      "Placeholder bullet — links to write-ups or demos.",
    ],
  },
];

/** Chip metadata lookup: project `tech` entries are plain names; this finds
 * the matching slug/URL already defined in techStack so project pages render
 * the exact same chip UI (brand icon + outbound link) where possible.
 * Unmatched names fall back to a non-linked lucide-glyph chip. */
export const techChipByName = (
  name: string
): { slug?: string; url?: string } => {
  for (const items of Object.values(techStack)) {
    const hit = items.find((t) => t.name.toLowerCase() === name.toLowerCase());
    if (hit) return { slug: hit.slug, url: hit.url };
  }
  return {};
};

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
    { name: "PostgreSQL", slug: "postgresql", url: "https://www.postgresql.org" },
    { name: "Drizzle", slug: "drizzle", url: "https://orm.drizzle.team" },
    { name: "Neon", slug: "neon", url: "https://neon.tech" },
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
    type: "Full-time",    /** Format: Mon YY — Mon YY (e.g. "Jun 25 — Aug 26"); use "Present" for current role */
    period: "Jun 25 — Present", // TODO
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
    period: "Mar 24 — Jun 25", // TODO (same Mon YY — Mon YY format)
    location: "Your City, India - On-site", // TODO: role location
    bullets: [
      "Placeholder achievement bullet — your core contribution.",
    ],
    tech: ["React", "Tailwind CSS"],
  },
];

/** Education drag-in. Renders like the experience dropdown rows:
 * degree on the first line, institution under it. */
export type EducationItem = {
  institution: string;
  /** e.g. "B.Tech, Computer Science" — the first visible line */
  degree: string;
  /** pill on the title line — e.g. "Bachelor's" / "Class XII" */
  type: string;
  /** same Mon YY — Mon YY format as experience */
  period: string;
  location: string;
  bullets: string[];
};

export const education: EducationItem[] = [
  {
    // TODO: most recent / highest qualification
    institution: "Your University", // TODO
    degree: "B.Tech, Computer Science",
    type: "Bachelor's",
    period: "Aug 21 — Jun 25", // TODO
    location: "Your City, India - On-site", // TODO
    bullets: [
      // TODO: real coursework, GPA, achievements
      "Placeholder bullet — relevant coursework and focus areas.",
      "Placeholder bullet — projects, GPA, or honors worth noting.",
      "Placeholder bullet — clubs, leadership, or activities.",
    ],
  },
  {
    // TODO: earlier qualification
    institution: "Your School", // TODO
    degree: "Class XII, Science Stream",
    type: "Higher Secondary",
    period: "Jun 19 — Jun 21", // TODO
    location: "Your City, India - On-site", // TODO
    bullets: [
      // TODO: real highlights
      "Placeholder bullet — stream, percentage, or board highlights.",
    ],
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
    education: {
      title: "Education", // TODO
      intro: "Where I studied and what I focused on. Click a degree to expand it.", // TODO
    },
  },
  /** /projects listing page (same row UI as the home section). */
  projectsPage: {
    title: "Projects",
    intro: "Everything I've built so far. Click a project for the full breakdown.", // TODO
  },
  /** /projects/[slug] detail page labels. */
  projectDetail: {
    stackLabel: "Tech Stack", // TODO
    detailsLabel: "Detailed Description", // TODO
    liveLabel: "Live", // TODO
    sourceLabel: "Source", // TODO
  },
  chat: {
    greeting: `Hi! I'm ${profile.name}'s README bot. Ask me anything about this portfolio — projects, stack, experience, contact.`,
    askLabel: "Ask me anything",
    /** Visible label on the dock's search trigger (aria-label stays `askLabel`
     * so screen readers announce intent; the kbd chips already show "Ctrl K"). */
    dockSearch: "Search",
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

import {
  siAngular, siApachetomcat, siBootstrap, siBun, siClaude, siCursor,
  siDbeaver, siDocker, siDrizzle, siFigma, siGit, siGithub, siGooglegemini,
  siJavascript, siMongodb, siMysql, siNeon, siNextdotjs, siNodedotjs,
  siNotion, siOpenjdk, siPostgresql, siPostman, siRadixui, siReact,
  siRedis, siRedux, siShadcnui, siSpringboot, siTailwindcss, siTrae,
  siTypescript, siX,
} from "simple-icons";
import { Cloud, Database, Palette, Image, Zap, Terminal } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Brand glyphs for tech chips. Syntax: verified `simple-icons` slugs render
 * true brand marks in their brand color (via si.hex); brands absent from
 * simple-icons (AWS, OpenAI, Adobe, Canva, MobaXterm, Motion, SQL) fall back
 * to a lucide glyph.
 */
type SiIcon = { title: string; hex: string; path: string };

/** X (Twitter) brand mark — hero socials use the real glyph (no lucide bird). */
export function XBrand({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d={siX.path} />
    </svg>
  );
}

const siMap: Record<string, SiIcon> = {
  typescript: siTypescript,
  javascript: siJavascript,
  react: siReact,
  nextdotjs: siNextdotjs,
  angular: siAngular,
  redux: siRedux,
  tailwindcss: siTailwindcss,
  bootstrap: siBootstrap,
  shadcnui: siShadcnui,
  radixui: siRadixui,
  openjdk: siOpenjdk,
  springboot: siSpringboot,
  nodedotjs: siNodedotjs,
  bun: siBun,
  apachetomcat: siApachetomcat,
  postgresql: siPostgresql,
  mysql: siMysql,
  mongodb: siMongodb,
  redis: siRedis,
  docker: siDocker,
  git: siGit,
  github: siGithub,
  postman: siPostman,
  dbeaver: siDbeaver,
  drizzle: siDrizzle,
  neon: siNeon,
  claude: siClaude,
  cursor: siCursor,
  googlegemini: siGooglegemini,
  trae: siTrae,
  notion: siNotion,
  figma: siFigma,
};

const fallbacks: Record<string, LucideIcon> = {
  AWS: Cloud,
  SQL: Database,
  ChatGPT: Zap,
  MobaXterm: Terminal,
  Photoshop: Image,
  Canva: Palette,
  Motion: Zap,
};

/** Display-name → simple-icons slug (covers stack lists written loosely). */
const nameToSlug: Record<string, string> = {
  TypeScript: "typescript",
  JavaScript: "javascript",
  React: "react",
  "Next.js": "nextdotjs",
  Angular: "angular",
  Redux: "redux",
  "Tailwind CSS": "tailwindcss",
  Tailwind: "tailwindcss",
  Bootstrap: "bootstrap",
  "shadcn/ui": "shadcnui",
  "Radix UI": "radixui",
  Java: "openjdk",
  "Spring Boot": "springboot",
  "Node.js": "nodedotjs",
  Bun: "bun",
  Tomcat: "apachetomcat",
  PostgreSQL: "postgresql",
  MySQL: "mysql",
  MongoDB: "mongodb",
  Redis: "redis",
  Docker: "docker",
  Git: "git",
  GitHub: "github",
  Postman: "postman",
  DBeaver: "dbeaver",
  Drizzle: "drizzle",
  Neon: "neon",
  Claude: "claude",
  Cursor: "cursor",
  Gemini: "googlegemini",
  Trae: "trae",
  Notion: "notion",
  Figma: "figma",
};

/** Perceptual luminance quickie — decides dark-mode fill flip. */
function lum(hex: string): number {
  const h = hex.replace("#", "");
  const v = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(v.slice(i, i + 2), 16) / 255);
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

export function BrandIcon({
  name,
  slug,
  colored = true,
  className,
}: {
  name: string;
  slug?: string;
  /** Use the brand's official hex color (default true). */
  colored?: boolean;
  className?: string;
}) {
  const si = slug ? siMap[slug] : siMap[nameToSlug[name]];
  if (si) {
    // brands whose hex is near-black are invisible on the dark background —
    // flip their fill to the light foreground in dark mode only
    const darkOnly = colored && lum(si.hex) < 0.28;
    return (
      <svg
        viewBox="0 0 24 24"
        fill={colored ? `#${si.hex}` : "currentColor"}
        aria-hidden="true"
        className={cn("h-3 w-3 shrink-0", darkOnly && "dark:[fill:#e4e4e7]", className)}
      >
        <path d={si.path} />
      </svg>
    );
  }
  const Fallback = fallbacks[name];
  return (
    <Fallback
      aria-hidden="true"
      className={cn("h-3 w-3 shrink-0 text-foreground/60", className)}
    />
  );
}

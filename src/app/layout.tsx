import type { Metadata } from "next";
import { DM_Sans, Outfit, Space_Grotesk } from "next/font/google";
import { Providers } from "@/components/providers";
import { Footer } from "@/components/footer";
import { DockPill } from "@/components/dock-pill";
import { CommandPalette } from "@/components/command-palette";
import { ChatWidget } from "@/components/chat-widget";
import { profile, SITE_URL } from "@/content/site";
import "./globals.css";

// Fonts per Ashutosh's stack (dossier §11 + live computed styles): DM Sans body,
// Outfit for headings, Space Grotesk for mono accents
const dm = DM_Sans({ subsets: ["latin"], variable: "--font-dm" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });

// Metadata copy lives in site.ts (profile) — only the URL was pending; it now
// derives from SITE_URL (TODO: set the production domain there)
export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: profile.bio,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.bio,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dm.variable} ${outfit.variable} ${grotesk.variable} font-sans`}>
        <Providers>
          <main>{children}</main>
          <Footer />
          <CommandPalette />
          <ChatWidget />
          <DockPill />
        </Providers>
      </body>
    </html>
  );
}

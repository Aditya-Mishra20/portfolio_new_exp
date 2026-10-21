"use client";

import { Github, Linkedin, Mail, Calendar, ArrowUpRight, Twitter } from "lucide-react";
import { email, calcomUrl, socials, profile } from "@/content/site";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { SolidCta } from "@/components/hero";

/** Contact — same quiet pattern: small heading, solid CTAs, icon chips. */
export function Contact() {
  return (
    <Section title="Contact" intro={`${profile.availability} The fastest way to reach me is a short call or email.`}>
      <Reveal>
        <div className="flex flex-wrap gap-2.5 items-center">
          <SolidCta href={calcomUrl} icon={Calendar}>
            Book a intro Call
          </SolidCta>
          <SolidCta href={`mailto:${email}`} icon={Mail}>
            Send a Email
          </SolidCta>
        </div>
        <div className="mt-4 flex gap-2">
          {[
            { href: socials.github, label: "GitHub", icon: Github },
            { href: socials.linkedin, label: "LinkedIn", icon: Linkedin },
            { href: socials.twitter, label: "X / Twitter", icon: Twitter },
          ].map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="inline-flex text-xs font-light items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-secondary hover:bg-secondary/60 text-secondary-foreground transition-all"
            >
              <Icon className="size-3.5" />
              {label}
              <ArrowUpRight className="size-3 opacity-50" />
            </a>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

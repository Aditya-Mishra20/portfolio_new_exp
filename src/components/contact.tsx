import { Github, Linkedin, Mail, Calendar, ArrowUpRight } from "lucide-react";
import { email, calcomUrl, socials, profile, ui } from "@/content/site";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { SolidCta } from "@/components/hero";
import { XBrand } from "@/components/brand-icons";
import { SOCIAL_CHIP } from "@/lib/styles";

/** Contact — same quiet pattern: small heading, solid CTAs, icon chips. */
export function Contact() {
  return (
    <Section id="contact" title={ui.sections.contact.title} intro={`${profile.availability} ${ui.sections.contact.introLead}`}>
      <Reveal>
        <div className="flex flex-wrap gap-2.5 items-center">
          <SolidCta href={calcomUrl} icon={<Calendar className="size-3.5 opacity-80" />}>
            {ui.cta.bookCall}
          </SolidCta>
          <SolidCta href={`mailto:${email}`} icon={<Mail className="size-3.5 opacity-80" />}>
            {ui.cta.sendEmail}
          </SolidCta>
        </div>
        <div className="mt-4 flex gap-2">
          {[
            { href: socials.github, label: "GitHub", icon: Github },
            { href: socials.linkedin, label: "LinkedIn", icon: Linkedin },
            { href: socials.twitter, label: "Twitter", icon: XBrand },
          ].map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className={SOCIAL_CHIP}
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

"use client";

import { Command } from "cmdk";
import * as Dialog from "@radix-ui/react-dialog";
import { useTheme } from "next-themes";
import {
  BookOpen,
  Copy,
  ExternalLink,
  Github,
  Home,
  Linkedin,
  Mail,
  Moon,
  Sun,
  TerminalSquare,
  Wrench,
  Briefcase,
  MessageCircle,
} from "lucide-react";
import { useEffect } from "react";
import { useCommandPalette, scrollToId } from "@/components/providers";
import { email, socials, calcomUrl, resumeUrl, navSections } from "@/content/site";

/**
 * Ctrl+K command palette — cmdk + Radix Dialog with global hotkey,
 * mirroring the architecture recovered in dossier §1.
 */
export function CommandPalette() {
  const { open, setOpen } = useCommandPalette();
  const { theme, setTheme } = useTheme();

  // global hotkey: (meta|ctrl)+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const go = (id: string) => {
    setOpen(false);
    // delay: Radix's dialog scroll-lock cleanup can reset scroll in the same tick
    setTimeout(() => {
      if (id === "top") window.scrollTo({ top: 0, behavior: "smooth" });
      else scrollToId(id);
    }, 80);
  };

  const external = (url: string) => {
    setOpen(false);
    window.open(url, "_blank");
  };

  const copyEmail = () => {
    navigator.clipboard?.writeText(email).catch(() => {});
    setOpen(false);
  };

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const Item = ({
    label,
    hint,
    onSelect,
    icon,
  }: {
    label: string;
    hint?: string;
    onSelect: () => void;
    icon: React.ReactNode;
  }) => (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
    >
      <span className="text-muted-foreground [&>svg]:size-4">{icon}</span>
      <span className="flex-1">{label}</span>
      {hint && <span className="font-mono text-xs text-muted-foreground">{hint}</span>}
    </Command.Item>
  );

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay data-cmdk-overlay />
        <Dialog.Content data-cmdk-content aria-describedby={undefined}>
          <Dialog.Title className="sr-only">Command palette</Dialog.Title>
          <Command label="Command palette" loop className="flex flex-col">
            <div className="flex items-center gap-2 border-b border-border px-4">
              <TerminalSquare className="size-4 text-muted-foreground" />
              <Command.Input
                autoFocus
                placeholder="Type a command or search..."
                className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                ESC
              </kbd>
            </div>
            <Command.List className="max-h-[min(360px,50vh)] overflow-y-auto p-2">
              <Command.Empty className="px-3 py-6 text-center text-sm text-muted-foreground">
                No results found.
              </Command.Empty>

              <Command.Group heading="Navigate" className="px-1 py-1 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground">
                <Item label="Home" hint="↵" icon={<Home />} onSelect={() => go("top")} />
                {navSections.map((s) => (
                  <Item
                    key={s.id}
                    label={s.label}
                    hint="↵"
                    icon={
                      s.id === "projects" ? <Wrench /> : s.id === "experience" ? <Briefcase /> : <BookOpen />
                    }
                    onSelect={() => go(s.id)}
                  />
                ))}
              </Command.Group>

              <Command.Group heading="Actions" className="px-1 py-1 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground">
                <Item label="Copy email" hint={email} icon={<Copy />} onSelect={copyEmail} />
                <Item label="Book a call" hint="cal.com" icon={<ExternalLink />} onSelect={() => external(calcomUrl)} />
                <Item label="Open GitHub" icon={<Github />} onSelect={() => external(socials.github)} />
                <Item label="Open LinkedIn" icon={<Linkedin />} onSelect={() => external(socials.linkedin)} />
                <Item label="Send email" hint={email} icon={<Mail />} onSelect={() => external(`mailto:${email}`)} />
                <Item label="Download resume" icon={<ExternalLink />} onSelect={() => external(resumeUrl)} />
                <Item
                  label="Toggle theme"
                  hint="Ctrl+K → T"
                  icon={theme === "dark" ? <Sun /> : <Moon />}
                  onSelect={() => {
                    toggleTheme();
                    setOpen(false);
                  }}
                />
              </Command.Group>

              <Command.Group heading="AI" className="px-1 py-1 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground">
                <Item
                  label="Ask my AI anything"
                  icon={<MessageCircle />}
                  onSelect={() => {
                    setOpen(false);
                    window.dispatchEvent(new CustomEvent("open-chat"));
                  }}
                />
              </Command.Group>
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

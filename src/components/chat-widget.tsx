"use client";

import { Send, X, Bot, User } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { profile } from "@/content/site";

/* ------------------------------------------------------------------ */
/* AI Q&A chat. Placeholder logic: it downloads the site's own /md     */
/* markdown docs and does local keyword-retrieval to compose answers.  */
/* TODO: swap the `answer()` function for a real LLM server action;    */
/* the retrieval index can then be reused as RAG context.              */
/* ------------------------------------------------------------------ */

const DOCS = ["/md/profile.md", "/md/projects.md", "/md/experience.md", "/md/contact.md"];

type Passage = { doc: string; text: string };

const STOPWORDS = new Set([
  "the", "a", "an", "is", "are", "was", "what", "who", "how", "your", "you",
  "i", "me", "my", "we", "and", "or", "of", "to", "in", "on", "for", "with",
  "do", "does", "tell", "about", "can", "hi", "hello", "hey",
]);

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOPWORDS.has(w));
}

async function buildIndex(): Promise<Passage[]> {
  const docs = await Promise.all(
    DOCS.map((d) =>
      fetch(d)
        .then((r) => (r.ok ? r.text() : ""))
        .catch(() => "")
    )
  );
  const passages: Passage[] = [];
  docs.forEach((text, i) => {
    if (!text) return;
    const doc = DOCS[i];
    // split into paragraph chunks by blank lines
    for (const para of text.split(/\n\s*\n/)) {
      const t = para.trim();
      if (t.length > 40) passages.push({ doc, text: t });
    }
  });
  return passages;
}

function answer(question: string, index: Passage[]): string {
  const q = tokenize(question);
  if (q.length === 0) return "Try asking about my projects, experience, or how to contact me.";
  const scored = index
    .map((p) => {
      const hay = tokenize(p.text);
      const set = new Set(hay);
      let score = 0;
      for (const w of q) {
        if (set.has(w)) score += 2;
        else if (hay.some((h) => h.startsWith(w.slice(0, 4)))) score += 1;
      }
      return { p, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);
  if (scored.length === 0) {
    return "I couldn't find that in my docs yet. Ask about me: e.g. \"what does this site cover?\", \"list projects\", \"how do I contact you?\"";
  }
  return scored
    .map((s) => s.p.text.replace(/\n/g, " ").slice(0, 320) + (s.p.text.length > 320 ? "…" : ""))
    .join("\n\n");
}

type Msg = { role: "user" | "bot"; text: string };

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "bot",
      text: `Hi! I'm ${profile.name}'s README bot. Ask me anything about this portfolio — projects, stack, experience, contact.`,
    },
  ]);
  const indexRef = useRef<Passage[] | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  /* ------------------------------------------------------------------ */
  /* The launcher lives in the dock pill (dock-pill.tsx dispatches       */
  /* "open-chat"); there is no standalone bottom-right button anymore.   */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const fn = () => setOpen((o) => !o);
    window.addEventListener("open-chat", fn);
    return () => window.removeEventListener("open-chat", fn);
  }, []);

  // preload the markdown index once per mount
  useEffect(() => {
    buildIndex().then((idx) => (indexRef.current = idx));
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [msgs, open]);

  const send = useCallback(async () => {
    const q = input.trim();
    if (!q || loading) return;
    setInput("");
    setMsgs((m) => [...m, { role: "user", text: q }]);
    setLoading(true);
    try {
      if (!indexRef.current) indexRef.current = await buildIndex();
      const a = answer(q, indexRef.current);
      await new Promise((r) => setTimeout(r, 350)); // placeholder "thinking" beat
      setMsgs((m) => [...m, { role: "bot", text: a }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading]);

  // click outside closes the chat — except clicks on the dock pill
  // itself (its 🤖 button owns toggling via the open-chat event)
  const panelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!open) return;
    const onClose = (e: PointerEvent) => {
      const target = e.target as Node;
      if (panelRef.current?.contains(target)) return;
      const dock = (target as Element | null)?.closest?.('nav[aria-label="Primary"]');
      if (dock) return; // pill toggles on its own
      setOpen(false);
    };
    document.addEventListener("pointerdown", onClose);
    return () => document.removeEventListener("pointerdown", onClose);
  }, [open]);

  return (
    <>
      {/* always-mounted probe of the real open state (survives AnimatePresence
          snapshots, which freeze exiting children's props) */}
      <div data-chat-open={open ? "true" : "false"} className="hidden" />
      {/* panel only — the launcher is the dock pill's 🤖 button */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            data-open={open ? "true" : "false"}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
            className="fixed bottom-40 right-5 sm:bottom-20 sm:right-6 z-40 flex max-h-[70vh] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-xl"
          >
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <Bot className="size-4 text-muted-foreground" />
              <span className="font-display text-sm font-semibold">Ask me anything</span>
              <span className="ml-auto font-mono text-[10px] text-muted-foreground">/md-powered</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="flex size-6 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
              >
                <X className="size-3.5" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={
                    m.role === "user"
                      ? "flex justify-end"
                      : "flex items-start gap-2"
                  }
                >
                  {m.role === "bot" && <Bot className="mt-0.5 size-4 shrink-0 text-muted-foreground" />}
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[85%] whitespace-pre-line rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground"
                        : "max-w-[85%] whitespace-pre-line rounded-lg bg-secondary px-3 py-2 text-sm text-secondary-foreground"
                    }
                  >
                    {m.text}
                  </div>
                  {m.role === "user" && <User className="mt-0.5 size-4 shrink-0 text-muted-foreground" />}
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Bot className="size-4 animate-pulse" />
                  <span className="text-xs">thinking…</span>
                </div>
              )}
            </div>

            <form
              className="flex items-center gap-2 border-t border-border p-3"
              onSubmit={(e) => {
                e.preventDefault();
                void send();
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g. What projects are you building?"
                className="h-9 flex-1 rounded-md border border-input bg-background px-3 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                aria-label="Send"
                className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Send className="size-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

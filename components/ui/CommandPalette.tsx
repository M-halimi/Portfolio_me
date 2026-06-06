"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Code2, FolderGit2, User, Briefcase, GraduationCap, Mail, FileText, Command } from "lucide-react";
import { projects, skills } from "@/lib/constants";

const sections = [
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "contact", label: "Contact", icon: Mail },
];

const actions = [
  { label: "Download CV", icon: FileText, action: () => window.open("/cv.pdf", "_blank") },
];

type Result = {
  type: "section" | "project" | "skill" | "action";
  label: string;
  subtitle?: string;
  icon: React.ElementType;
  action: () => void;
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
    setSelectedIndex(0);
  }, [open]);

  const scrollTo = (id: string) => {
    setOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const results: Result[] = [];
  const lower = query.toLowerCase();

  if (!query) {
    sections.forEach((s) => {
      results.push({ type: "section", label: s.label, icon: s.icon, action: () => scrollTo(s.id) });
    });
    actions.forEach((a) => {
      results.push({ type: "action", label: a.label, icon: a.icon, action: a.action });
    });
  } else {
    sections
      .filter((s) => s.label.toLowerCase().includes(lower))
      .forEach((s) => results.push({ type: "section", label: s.label, icon: s.icon, action: () => scrollTo(s.id) }));
    projects
      .filter((p) => p.title.toLowerCase().includes(lower) || p.tags.some((t) => t.toLowerCase().includes(lower)))
      .forEach((p) => results.push({ type: "project", label: p.title, subtitle: p.tags.join(", "), icon: FolderGit2, action: () => scrollTo("projects") }));
    skills
      .filter((s) => s.name.toLowerCase().includes(lower) || s.category.toLowerCase().includes(lower))
      .forEach((s) => results.push({ type: "skill", label: s.name, subtitle: `${s.proficiency} · ${s.years}`, icon: Code2, action: () => scrollTo("skills") }));
    actions
      .filter((a) => a.label.toLowerCase().includes(lower))
      .forEach((a) => results.push({ type: "action", label: a.label, icon: a.icon, action: a.action }));
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIndex((i) => Math.min(i + 1, results.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setSelectedIndex((i) => Math.max(i - 1, 0)); }
    if (e.key === "Enter" && results[selectedIndex]) { results[selectedIndex].action(); }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[9998] flex items-start justify-center pt-[15vh] px-4"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-bg2/90 backdrop-blur-xl border border-white/[0.08] shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 h-12 border-b border-white/[0.06]">
              <Search size={14} className="text-text2/60 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                onKeyDown={onKeyDown}
                placeholder="Search sections, projects, skills..."
                className="flex-1 bg-transparent text-sm text-text placeholder:text-text2/30 outline-none font-dm"
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] text-text2/40 border border-white/[0.06] font-dm">
                <Command size={10} />
                K
              </kbd>
            </div>

            <div className="max-h-[320px] overflow-y-auto py-2">
              {results.length === 0 && (
                <div className="px-4 py-8 text-center text-sm text-text2/40 font-dm">No results found</div>
              )}
              {results.map((r, i) => (
                <button
                  key={`${r.type}-${r.label}`}
                  onClick={r.action}
                  onMouseEnter={() => setSelectedIndex(i)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-100 ${
                    i === selectedIndex ? "bg-white/[0.06] text-white" : "text-text2 hover:text-text"
                  }`}
                >
                  <r.icon size={14} className="shrink-0 text-text2/60" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-dm truncate">{r.label}</div>
                    {r.subtitle && <div className="text-[10px] text-text2/40 font-dm truncate mt-0.5">{r.subtitle}</div>}
                  </div>
                  <ArrowRight size={12} className="shrink-0 text-text2/20" />
                </button>
              ))}
            </div>

            <div className="hidden sm:flex items-center gap-4 px-4 h-8 border-t border-white/[0.06] text-[10px] text-text2/30 font-dm">
              <span>↑↓ Navigate</span>
              <span>↵ Open</span>
              <span>Esc Close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
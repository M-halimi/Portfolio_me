"use client";
import { useState, useEffect } from "react";
import {
  User,
  Code2,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Mail,
  Menu,
  X,
} from "lucide-react";
import ScrollProgress from "@/components/ui/ScrollProgress";

const sections = [
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "contact", label: "Contact", icon: Mail },
];

const logoText = "Mohammed.Halimi";

export default function Navbar() {
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoChars, setLogoChars] = useState(0);
  const [logoDone, setLogoDone] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (logoDone) return;
    const timer = setTimeout(() => {
      if (logoChars < logoText.length) {
        setLogoChars((c) => c + 1);
      } else {
        setLogoDone(true);
      }
    }, 80);
    return () => clearTimeout(timer);
  }, [logoChars, logoDone]);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <ScrollProgress />
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo("hero")}
            className="font-syne font-bold text-lg tracking-tight text-white flex items-center gap-2"
          >
            <span className="w-2 h-4 bg-accent-cyan animate-blink" />
            <span className="font-dm text-sm tracking-wide">
              {logoText.slice(0, logoChars)}
              {!logoDone && <span className="animate-blink ml-px text-accent-cyan">█</span>}
            </span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {sections.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm transition-all duration-300 ${
                  active === id
                    ? "text-white border-b border-white"
                    : "text-text2 hover:text-text"
                } hover:tracking-[1px]`}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
            <a
              href="mailto:mohammed.halimi.dev@gmail.com"
              className="ml-4 bg-white text-bg text-sm font-medium px-5 py-2 border border-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:bg-white"
            >
              Hire Me
            </a>
          </div>

          <button
            className="md:hidden text-text2 hover:text-text"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-bg2">
            <div className="px-6 py-4 flex flex-col gap-1">
              {sections.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`flex items-center gap-3 px-3 py-3 text-sm transition-colors ${
                    active === id
                      ? "text-white bg-bg3 border-l-2 border-white"
                      : "text-text2 hover:text-text"
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
              <a
                href="mailto:mohammed.halimi.dev@gmail.com"
                className="mt-2 bg-white text-bg text-sm font-medium px-5 py-3 border border-white text-center hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              >
                Hire Me
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

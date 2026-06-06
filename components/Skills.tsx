"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, Code2, Braces, Atom, FileCode, Globe, Database, Server, GitBranch, Users2, Triangle, Wind, Zap } from "lucide-react";
import { skills, skillCategories, type SkillCategory } from "@/lib/constants";

const iconMap: Record<string, typeof Code2> = {
  "HTML & CSS": Code2,
  JavaScript: Braces,
  React: Atom,
  "Alpine.js": Triangle,
  "Tailwind CSS": Wind,
  PHP: FileCode,
  Laravel: Globe,
  MySQL: Database,
  MongoDB: Server,
  Livewire: Zap,
  "Git & GitHub": GitBranch,
  Agile: Users2,
};

function hexToRgb(hex: string) {
  const v = parseInt(hex.replace("#", ""), 16);
  return { r: (v >> 16) & 255, g: (v >> 8) & 255, b: v & 255 };
}

export default function Skills() {
  const [visible, setVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState<SkillCategory>("all");
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const filteredSkills = activeFilter === "all" ? skills : skills.filter((s) => s.category === activeFilter);

  return (
    <section id="skills" ref={ref} className="py-24 px-6 border-t border-border relative overflow-hidden"
      style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(56,189,248,0.04) 0%, transparent 70%)" }}>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-start gap-4 mb-8">
          <div className="w-1 h-12 bg-gradient-to-b from-accent-cyan to-accent-purple shrink-0" />
          <div>
            <div className="flex items-center gap-3">
              <h2 className="font-syne font-extrabold text-4xl sm:text-5xl text-white leading-none">Skills</h2>
              <BarChart3 size={22} className="text-accent-cyan/60 animate-float" />
            </div>
            <p className="text-sm text-text2 mt-2">Technologies I work with</p>
            <div className={`h-px bg-white mt-3 transition-all duration-700 ease-out ${visible ? "w-full" : "w-0"}`} />
          </div>
        </div>

        <div className="flex gap-2 mb-8" x-data>
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-4 py-2 text-xs font-medium transition-all duration-300 ${
                activeFilter === cat.id
                  ? "bg-white text-bg"
                  : "bg-transparent text-text2 border border-border hover:border-text hover:text-text"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="wait">
            {filteredSkills.map(({ name, level, years, gradient, proficiency }, i) => {
              const Icon = iconMap[name] || Code2;
              const { r, g, b } = hexToRgb(gradient[0]);
              return (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group relative bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm p-6 transition-all duration-300 hover:-translate-y-1"
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = `rgba(${r},${g},${b},0.4)`;
                    el.style.boxShadow = `0 0 24px rgba(${r},${g},${b},0.15)`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = "rgba(255,255,255,0.08)";
                    el.style.boxShadow = "none";
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `rgba(${r},${g},${b},0.15)` }}>
                      <Icon size={18} style={{ color: gradient[0] }} />
                    </div>
                    <span className="font-syne font-bold text-sm text-text2 group-hover:text-white transition-colors duration-300">{name}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-[1400ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                      style={{
                        width: visible ? `${level}%` : "0%",
                        background: `linear-gradient(to right, ${gradient[0]}, ${gradient[1]})`,
                        boxShadow: visible ? `0 0 8px ${gradient[0]}` : "none",
                      }} />
                  </div>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-[10px] font-dm uppercase tracking-wider" style={{ color: gradient[0] }}>{proficiency}</span>
                    <span className="text-[10px] text-text2/60 font-dm">{years}</span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

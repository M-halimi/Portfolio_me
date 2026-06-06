"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import GitHubIcon from "@/components/GitHubIcon";
import ProjectModal from "@/components/ui/ProjectModal";
import { projects } from "@/lib/constants";
import { staggerContainer, staggerItem } from "@/lib/animations";
import type { Project } from "@/lib/constants";

export default function Projects() {
  const [inView, setInView] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={ref} className="py-24 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-2">
            <h2 className="font-syne font-bold text-3xl text-white">Selected Work</h2>
            <span className="text-[10px] font-dm text-text2 border border-border px-2 py-0.5">
              {String(projects.length).padStart(2, "0")}
            </span>
          </div>
          <div className="w-12 h-px bg-border" />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-6"
        >
          {projects.map((p) => (
            <motion.div
              key={p.num}
              variants={staggerItem}
              className="group relative border border-border pt-0 transition-all duration-500 hover:-translate-y-1.5 hover:bg-bg3 overflow-hidden cursor-pointer"
              onClick={() => setSelected(p)}
            >
              <div
                className="h-[3px] w-full transition-all duration-500 group-hover:shadow-lg"
                style={{
                  background: `linear-gradient(to right, ${p.gradient[0]}, ${p.gradient[1]})`,
                  boxShadow: `0 0 20px ${p.gradient[0]}40`,
                }}
              />

              <div className="p-6 relative">
                <div
                  className="absolute top-4 right-6 font-syne font-bold leading-none pointer-events-none select-none transition-opacity duration-500 group-hover:opacity-20"
                  style={{ fontSize: "72px", color: p.gradient[0], opacity: 0.06 }}
                >
                  {p.num}
                </div>

                <div className="flex items-center justify-between mb-4 relative z-10">
                  <h3 className="font-syne font-bold text-lg text-white">{p.title}</h3>
                  <div className="flex gap-2">
                    {p.github && (
                      <a
                        href={p.github}
                        onClick={(e) => e.stopPropagation()}
                        className="text-text2 hover:text-white transition-colors"
                        aria-label="GitHub repository"
                      >
                        <GitHubIcon size={16} />
                      </a>
                    )}
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-text2 hover:text-white transition-colors"
                        aria-label="Live demo"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-text2 text-sm leading-relaxed mb-4 relative z-10">{p.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-6 relative z-10">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] text-text2 border border-border px-2 py-0.5 font-dm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="relative z-10">
                  <span className="inline-flex items-center gap-1 text-xs text-text2 group-hover:text-white transition-colors duration-300 font-dm">
                    View Project
                    <ArrowRight
                      size={12}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <a
            href="https://github.com/M-halimi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border text-text2 text-sm px-6 py-3 transition-all duration-300 hover:border-text hover:text-text font-dm"
          >
            <GitHubIcon size={16} />
            View All on GitHub
          </a>
        </motion.div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
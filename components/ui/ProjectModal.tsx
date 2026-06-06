"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import GitHubIcon from "@/components/GitHubIcon";
import type { Project } from "@/lib/constants";

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-bg2 border border-white/[0.08] shadow-2xl max-h-[80vh] overflow-y-auto"
          >
            <div
              className="h-1 w-full"
              style={{
                background: `linear-gradient(to right, ${project.gradient[0]}, ${project.gradient[1]})`,
              }}
            />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center border border-white/[0.08] text-text2 hover:text-white hover:border-white/20 transition-all duration-200"
              aria-label="Close"
            >
              <X size={14} />
            </button>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-[10px] font-dm font-medium px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: `${project.gradient[0]}15`,
                    color: project.gradient[0],
                  }}
                >
                  {project.num}
                </span>
              </div>
              <h3 className="font-syne font-bold text-xl text-white mb-4">{project.title}</h3>

              <p className="text-text2 text-sm leading-relaxed mb-6 font-dm">{project.description}</p>

              {project.caseStudy && (
                <div className="space-y-5 mb-6">
                  <div>
                    <h4 className="text-[10px] text-text2/50 uppercase tracking-wider font-dm mb-1.5">Challenge</h4>
                    <p className="text-sm text-text2 leading-relaxed font-dm">{project.caseStudy.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] text-text2/50 uppercase tracking-wider font-dm mb-1.5">Solution</h4>
                    <p className="text-sm text-text2 leading-relaxed font-dm">{project.caseStudy.solution}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] text-text2/50 uppercase tracking-wider font-dm mb-1.5">Results</h4>
                    <p className="text-sm text-accent-green leading-relaxed font-dm">{project.caseStudy.results}</p>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] text-text2 border border-border px-2 py-0.5 font-dm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 pt-4 border-t border-border">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-text2 hover:text-white transition-colors font-dm"
                  >
                    <GitHubIcon size={14} />
                    View Code
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-text2 hover:text-white transition-colors font-dm"
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
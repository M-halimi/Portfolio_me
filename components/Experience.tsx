"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { experiences } from "@/lib/constants";
import { staggerContainer, staggerItem } from "@/lib/animations";

const borderColors = ["#06b6d4", "#8b5cf6", "#ec4899"];

export default function Experience() {
  const [inView, setInView] = useState(false);
  const [activeDots, setActiveDots] = useState<number[]>([]);
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
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    experiences.forEach((_, i) => {
      setTimeout(() => setActiveDots((prev) => [...prev, i]), i * 300);
    });
  }, [inView]);

  return (
    <section id="experience" ref={ref} className="py-24 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <h2 className="font-syne font-bold text-3xl text-white mb-2">Experience</h2>
          <div className="w-12 h-px bg-border mb-12" />
        </motion.div>

        <div className="relative pl-8">
          <div className="absolute left-[3px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-accent-cyan via-accent-purple to-transparent" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-0"
          >
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="relative pb-12 last:pb-0"
              >
                <div className="absolute -left-[21px] top-0 z-10">
                  <div
                    className={`w-3 h-3 rounded-full border-2 transition-all duration-500 ${
                      activeDots.includes(i) ? "border-accent-cyan bg-bg" : "border-border bg-bg"
                    }`}
                  />
                  {activeDots.includes(i) && (
                    <div className="absolute inset-0 w-3 h-3 rounded-full border border-accent-cyan animate-ripple" />
                  )}
                </div>

                <div
                  className="relative border-l-2 pl-6 pt-0 pb-6 pr-4 transition-all duration-300 hover:bg-bg3 group"
                  style={{ borderLeftColor: borderColors[i] }}
                >
                  <div className="flex items-start justify-between mb-1">
                    <div className="text-[10px] text-text2 uppercase tracking-wider font-dm">{exp.period}</div>
                    <span
                      className="text-[10px] font-dm px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: `${borderColors[i]}15`,
                        color: borderColors[i],
                      }}
                    >
                      {exp.duration}
                    </span>
                  </div>
                  <h3 className="font-syne font-bold text-lg text-white mb-1">{exp.title}</h3>
                  <div className="text-xs text-text2/80 mb-3 font-dm">{exp.role}</div>
                  <p className="text-text2 text-sm leading-relaxed mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] text-text2 border border-border px-2 py-0.5 font-dm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
  },
};

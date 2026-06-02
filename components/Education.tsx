"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react";
import { education } from "@/lib/constants";
import { staggerContainer, staggerItem } from "@/lib/animations";

export default function Education() {
  const [inView, setInView] = useState(false);
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

  const toVersionTag = (period: string) => {
    return "v" + period.replace(" — ", "-").replace(/\s/g, "");
  };

  return (
    <section id="education" ref={ref} className="py-24 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className="font-syne font-bold text-3xl text-white mb-2">Education</h2>
          <div className="w-12 h-px bg-border mb-12" />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-6"
        >
          {education.map((e) => (
            <motion.div
              key={e.title}
              variants={staggerItem}
              className="group relative border border-border p-6 transition-all duration-300 hover:border-text2 hover:bg-bg3 overflow-hidden"
            >
              <GraduationCap
                size={80}
                className="absolute -bottom-4 -right-4 text-white/[0.03] pointer-events-none"
              />

              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-mono font-medium text-accent-green bg-accent-green/10 px-2 py-0.5 rounded">
                  {toVersionTag(e.period)}
                </span>
              </div>

              <h3 className="font-syne font-bold text-lg text-white mb-1 relative z-10">{e.title}</h3>
              <div className="text-xs text-accent-cyan/80 mb-3 font-dm relative z-10">{e.subtitle}</div>

              <div className="flex items-center gap-1.5 text-xs text-text2 mb-4 font-dm relative z-10">
                <MapPin size={12} className="text-accent-orange" />
                {e.institution}
              </div>

              <div className="flex flex-wrap gap-1.5 relative z-10">
                {e.skillsLearned.map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] text-text2 border border-border px-2 py-0.5 font-dm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

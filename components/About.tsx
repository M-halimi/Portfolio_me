"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, CircleDot } from "lucide-react";
import GitHubIcon from "@/components/GitHubIcon";
import TerminalWindow from "@/components/ui/TerminalWindow";
import { buildTicker } from "@/lib/constants";
import { fadeUp } from "@/lib/animations";

export default function About() {
  const [inView, setInView] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);
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
    const interval = setInterval(() => {
      setTickerIndex((i) => (i + 1) % buildTicker.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section id="about" ref={ref} className="relative py-24 px-6 border-t border-border overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-12"
        >
          <div className="relative">
            <div
              className="absolute -top-10 -left-6 font-syne font-bold leading-none pointer-events-none select-none"
              style={{ fontSize: "120px", color: "rgba(255,255,255,0.02)" }}
            >
              &lt; DEV /&gt;
            </div>
            <div className="relative z-10">
              <h2 className="font-syne font-bold text-3xl text-white mb-6">About Me</h2>
              <p className="text-text2 text-sm leading-relaxed mb-4">
                I started coding because I wanted to build things that actually help people. What began with tinkering on PHP scripts
                turned into a full-stack journey across Laravel, React, and the modern web ecosystem. Based in F&egrave;s, Morocco,
                I&apos;ve grown from building my first CRUD app to shipping production systems for real businesses.
              </p>
              <p className="text-text2 text-sm leading-relaxed mb-4">
                What drives me? Taking a messy problem — whether it&apos;s chaotic inventory tracking or a manual intern workflow —
                and turning it into a clean, automated solution that people genuinely enjoy using. I believe great code isn&apos;t
                just functional; it&apos;s invisible — the kind that lets users focus on their work, not the tool.
              </p>
              <div className="flex items-center gap-2 text-xs text-text2 font-dm mt-6">
                <span className="text-text2/60">Currently building:</span>
                <span className="text-accent-cyan font-medium transition-all duration-300">
                  {buildTicker[tickerIndex]}
                </span>
                <span className="w-1.5 h-3 bg-accent-cyan animate-blink" />
              </div>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InfoCard icon={<MapPin size={16} className="text-accent-cyan mt-0.5 shrink-0" />} label="Location" value="Fès, Morocco" />
              <InfoCard icon={<Mail size={16} className="text-accent-blue mt-0.5 shrink-0" />} label="Email" value="mohammed.halimi.dev@gmail.com" />
              <InfoCard icon={<Phone size={16} className="text-accent-green mt-0.5 shrink-0" />} label="Phone" value="+212 625 945 061" />
              <InfoCard icon={<GitHubIcon size={16} className="text-text2 mt-0.5 shrink-0" />} label="GitHub" value="@M-halimi" />
              <InfoCard icon={<CircleDot size={16} className="text-accent-green mt-0.5 shrink-0" />} label="Status" value="Available for work" highlight />
            </div>
            <TerminalWindow inView={inView} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function InfoCard({ icon, label, value, highlight = false }: { icon: React.ReactNode; label: string; value: string; highlight?: boolean }) {
  return (
    <div className="border border-border p-4 flex items-start gap-3 transition-all duration-300 hover:border-text2 hover:bg-bg3">
      {icon}
      <div>
        <div className="text-[10px] text-text2 uppercase tracking-wider">{label}</div>
        <div className={`text-sm mt-0.5 ${highlight ? "text-accent-green" : "text-text"}`}>{value}</div>
      </div>
    </div>
  );
}

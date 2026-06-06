"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, ChevronRight, Sparkles } from "lucide-react";

const faqs = [
  { q: "What technologies do you work with?", a: "I specialize in Laravel, React, Alpine.js, Tailwind CSS, MySQL, and the PHP ecosystem. I also work with Livewire, Filament, and modern JavaScript." },
  { q: "What kind of projects have you built?", a: "I've built inventory management systems, intern portals, personnel rotation platforms, and client websites for solar energy and agricultural consulting firms." },
  { q: "Are you available for freelance work?", a: "Yes, I'm currently available for freelance projects and full-time opportunities. I'm based in Fès, Morocco and work remotely." },
  { q: "How can I contact you?", a: "You can email me at mohammed.halimi.dev@gmail.com, call +212 625 945 061, or use the contact form on this page." },
  { q: "Do you have experience with client projects?", a: "Yes, I've worked on several client projects including a solar energy platform (Tecas), a multilingual WordPress site, and an agricultural consulting platform (New Horizons Agri)." },
  { q: "What is your experience level?", a: "I have 3+ years of experience as a full-stack developer, including professional experience at Digiton agency where I worked on production web applications." },
];

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-20 right-6 z-[9997] w-10 h-10 flex items-center justify-center border border-white/[0.08] bg-bg2/80 backdrop-blur-xl text-text2 hover:text-accent-cyan hover:border-accent-cyan/30 transition-all duration-300"
        aria-label="Ask about me"
      >
        {open ? <X size={14} /> : <MessageCircle size={14} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="fixed bottom-[7.5rem] right-6 z-[9997] w-[320px] max-w-[calc(100vw-2rem)] bg-bg2/80 backdrop-blur-xl border border-white/[0.08] shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 h-10 border-b border-white/[0.06]">
              <Sparkles size={12} className="text-accent-cyan" />
              <span className="text-xs text-text font-dm">Ask about Mohammed</span>
            </div>

            <div className="max-h-[320px] overflow-y-auto py-1">
              {faqs.map((faq, i) => (
                <div key={i}>
                  <button
                    onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-left transition-colors duration-100 hover:bg-white/[0.04]"
                  >
                    <ChevronRight
                      size={10}
                      className={`shrink-0 text-text2/40 transition-transform duration-200 ${
                        activeIndex === i ? "rotate-90" : ""
                      }`}
                    />
                    <span className="text-xs text-text2 font-dm leading-relaxed">{faq.q}</span>
                  </button>
                  <AnimatePresence>
                    {activeIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="px-4 pb-3 pt-0 text-[11px] text-text2/70 font-dm leading-relaxed border-b border-white/[0.04]">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className="px-4 h-8 flex items-center border-t border-white/[0.06]">
              <span className="text-[9px] text-text2/30 font-dm">Click a question to see the answer</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, Check } from "lucide-react";
import { fadeUp } from "@/lib/animations";

const contacts = [
  { cmd: "call", value: "+212 625 945 061", href: "tel:+212625945061" },
  { cmd: "mail", value: "mohammed.halimi.dev@gmail.com", href: "mailto:mohammed.halimi.dev@gmail.com" },
  { cmd: "locate", value: "Fès, Morocco", href: "#" },
  { cmd: "open", value: "github.com/M-halimi", href: "https://github.com/M-halimi", external: true },
];

export default function Contact() {
  const [inView, setInView] = useState(false);
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      setFormState("sent");
      form.reset();
    } catch {
      setFormState("idle");
    }
  };

  return (
    <section id="contact" ref={ref} className="relative py-24 px-6 border-t border-border overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-16"
        >
          <div>
            <h2 className="font-syne font-bold text-4xl mb-4 leading-tight">
              <span className="text-white">Let&apos;s Build</span>
              <br />
              <span className="bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
                Something
              </span>
              <br />
              <span className="text-white">Together.</span>
            </h2>
            <p className="text-text2 text-sm leading-relaxed mb-8 font-dm">
              Whether you have a project in mind, a collaboration idea, or just want to say hello — I&apos;d love to hear
              from you.
            </p>
            <a
              href="mailto:mohammed.halimi.dev@gmail.com"
              className="inline-flex items-center gap-2 bg-white text-bg text-sm font-medium px-6 py-3 border border-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            >
              Send Email <Send size={14} />
            </a>

            <form
              name="contact"
              method="POST"
              data-netlify="true"
              onSubmit={handleSubmit}
              className="mt-8 space-y-4"
            >
              <input type="hidden" name="form-name" value="contact" />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                  className="w-full bg-transparent border border-border px-4 py-3 text-sm text-text placeholder:text-text2/40 font-dm outline-none transition-all duration-300 focus:border-accent-cyan focus:shadow-[0_0_12px_rgba(6,182,212,0.1)]"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  required
                  className="w-full bg-transparent border border-border px-4 py-3 text-sm text-text placeholder:text-text2/40 font-dm outline-none transition-all duration-300 focus:border-accent-cyan focus:shadow-[0_0_12px_rgba(6,182,212,0.1)]"
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="w-full bg-transparent border border-border px-4 py-3 text-sm text-text placeholder:text-text2/40 font-dm outline-none transition-all duration-300 focus:border-accent-cyan focus:shadow-[0_0_12px_rgba(6,182,212,0.1)]"
              />
              <textarea
                name="message"
                placeholder="Your message"
                rows={4}
                required
                className="w-full bg-transparent border border-border px-4 py-3 text-sm text-text placeholder:text-text2/40 font-dm outline-none resize-none transition-all duration-300 focus:border-accent-cyan focus:shadow-[0_0_12px_rgba(6,182,212,0.1)]"
              />
              <button
                type="submit"
                disabled={formState !== "idle"}
                className={`inline-flex items-center gap-2 text-sm font-medium px-6 py-3 transition-all duration-300 ${
                  formState === "sent"
                    ? "bg-accent-green text-white border border-accent-green"
                    : "border border-border text-text hover:bg-white hover:text-bg hover:border-white"
                }`}
              >
                {formState === "idle" && <>Send Message <Send size={14} /></>}
                {formState === "sending" && <>Sending...</>}
                {formState === "sent" && <><Check size={14} /> Message sent!</>}
              </button>
            </form>

            <div className="mt-4 flex items-center gap-2 text-[10px] text-text2/60 font-dm">
              <span className="text-accent-orange">⚡</span>
              Usually responds within 24h
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {contacts.map((item) => (
              <a
                key={item.cmd}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-3 px-5 py-3.5 transition-all duration-300 hover:bg-accent-green/[0.04] font-dm"
              >
                <span className="text-accent-green font-mono text-sm shrink-0">$</span>
                <span className="text-text2 font-mono text-sm">{item.cmd}</span>
                <span className="text-white font-mono text-sm group-hover:text-accent-green transition-colors">
                  {item.value}
                </span>
              </a>
            ))}

            <div className="relative mt-8 h-[120px] border border-border rounded-lg overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)`,
                  backgroundSize: "20px 20px",
                }}
              />
              <div className="absolute top-1/2 left-[48%] -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-3 h-3 bg-accent-green rounded-full animate-ping absolute inset-0 opacity-50" />
                  <div className="w-3 h-3 bg-accent-green rounded-full relative" />
                </div>
              </div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] text-text2/40 font-dm">
                Fès, Morocco
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

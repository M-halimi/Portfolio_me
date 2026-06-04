"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Mail, Phone } from "lucide-react";
import Image from "next/image";
import GitHubIcon from "@/components/GitHubIcon";
import TypedText from "@/components/ui/TypedText";
import CodeEditor from "@/components/ui/CodeEditor";
import { typedRoles } from "@/lib/constants";
import { letterContainer, letterItem } from "@/lib/animations";

const nameChars = "Mohammed".split("");
const lastNameChars = "Halimi".split("");

export default function Hero() {
  const [avatarSrc] = useState("/mohadev.png");
  // const [avatarSrc, setAvatarSrc] = useState("/mohadev.png");

  const fileRef = useRef<HTMLInputElement>(null);
  const [hoveredName, setHoveredName] = useState(false);

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setAvatarSrc(URL.createObjectURL(file));
  //   }
  // };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-16 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="relative">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-green animate-pulse-dot block" />
              <span className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-accent-green animate-ping opacity-30" />
            </div>
            <span className="text-[10px] font-medium text-text2 uppercase tracking-[0.2em]">
              Available for Work
            </span>
          </div>

          <motion.h1
            className="font-syne font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight text-white mb-3"
            onMouseEnter={() => setHoveredName(true)}
            onMouseLeave={() => setHoveredName(false)}
          >
            <motion.span
              className="flex"
              variants={letterContainer}
              initial="hidden"
              animate="visible"
            >
              {nameChars.map((ch, i) => (
                <motion.span
                  key={i}
                  variants={letterItem}
                  className={`inline-block transition-colors duration-300 ${
                    hoveredName ? "text-accent-cyan" : "text-white"
                  }`}
                  style={{ transitionDelay: hoveredName ? `${i * 30}ms` : "0ms" }}
                >
                  {ch}
                </motion.span>
              ))}
            </motion.span>
            <motion.span
              className="flex"
              variants={letterContainer}
              initial="hidden"
              animate="visible"
            >
              {lastNameChars.map((ch, i) => (
                <motion.span
                  key={i}
                  variants={letterItem}
                  className={`inline-block transition-colors duration-300 ${
                    hoveredName ? "text-accent-cyan" : "text-white"
                  }`}
                  style={{ transitionDelay: hoveredName ? `${(i + nameChars.length) * 30}ms` : "0ms" }}
                >
                  {ch}
                </motion.span>
              ))}
            </motion.span>
          </motion.h1>

          <div className="font-dm text-accent-cyan text-base mb-4 h-6">
            <TypedText strings={typedRoles} typeSpeed={60} backSpeed={30} loop />
          </div>

          <p className="text-text2 text-sm leading-relaxed mb-8 max-w-md font-dm">
            Passionné par le développement web, je conçois des applications modernes et performantes avec Laravel, React et
            écosystème PHP. Basé à Fès, Maroc.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-white text-bg text-sm font-medium px-6 py-3 border border-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              View Projects <ArrowDown size={14} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-border text-text text-sm font-medium px-6 py-3 transition-all duration-300 hover:bg-white hover:text-bg hover:border-white"
            >
              Get In Touch <ArrowRight size={14} />
            </a>
          </div>

          <div className="flex items-center gap-5">
            {[
              { icon: <GitHubIcon size={20} />, label: "GitHub", href: "https://github.com/M-halimi" },
              { icon: <Mail size={20} />, label: "Email", href: "mailto:mohammed.halimi.dev@gmail.com" },
              { icon: <Phone size={20} />, label: "Phone", href: "tel:+212625945061" },
            ].map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group relative text-text2 hover:text-white transition-colors"
                aria-label={label}
              >
                {icon}
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-bg3 border border-border text-[10px] text-text2 px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {label}
                </span>
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.7 }}
          className="flex flex-col items-center relative"
        >
          <div className="relative mb-8">
            <CodeEditor />
            <div className="absolute -bottom-6 -left-6 z-20">
              <div className="relative">
                <svg className="absolute inset-0 w-[130px] h-[130px] -top-1 -left-1 animate-spin-slow" viewBox="0 0 130 130" fill="none">
                  <circle cx="65" cy="65" r="62" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="4 4" />
                </svg>
                <svg className="absolute inset-0 w-[120px] h-[120px] top-[4px] left-[4px] animate-spin-reverse" viewBox="0 0 120 120" fill="none">
                  <circle cx="60" cy="60" r="57" stroke="#06b6d4" strokeWidth="1" strokeDasharray="2 4" />
                </svg>
                <label className="relative block w-[110px] h-[110px] rounded-full overflow-hidden border-2 border-border cursor-pointer group">
                  <Image src={avatarSrc} alt="Mohammed Halimi" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" priority />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 text-[10px] text-white font-medium transition-opacity">Change</span>
                  </div>
                  <input ref={fileRef} type="file" accept="image/*"  className="hidden" /> 
                  {/* chnager manually image of website */}
                  {/* onChange={handleFileChange} */}
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <div className="border border-border px-4 py-2.5 text-center">
              <div className="font-syne font-bold text-lg text-white">3+</div>
              <div className="text-[10px] text-text2 uppercase tracking-wider mt-0.5">Years</div>
            </div>
            <div className="border border-border px-4 py-2.5 text-center">
              <div className="font-syne font-bold text-lg text-white">10+</div>
              <div className="text-[10px] text-text2 uppercase tracking-wider mt-0.5">Technologies</div>
            </div>
          </div>

          <div className="absolute -top-4 -right-4 animate-float" style={{ animationDelay: "0s" }}>
            <svg viewBox="0 0 48 48" className="w-8 h-8 text-accent-cyan/70" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="24" cy="24" r="10" /><ellipse cx="24" cy="24" rx="20" ry="8" /><ellipse cx="24" cy="24" rx="8" ry="20" />
            </svg>
          </div>
          <div className="absolute top-12 -left-8 animate-float" style={{ animationDelay: "1s" }}>
            <span className="font-syne font-bold text-sm text-accent-orange/70">Laravel</span>
          </div>
          <div className="absolute bottom-20 -right-10 animate-float" style={{ animationDelay: "0.5s" }}>
            <span className="font-syne font-bold text-sm text-accent-purple/70">PHP</span>
          </div>
          <div className="absolute bottom-32 -left-6 animate-float" style={{ animationDelay: "1.5s" }}>
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-accent-green/70" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div className="absolute top-1/2 -right-14 animate-float" style={{ animationDelay: "2s" }}>
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-accent-orange/70" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

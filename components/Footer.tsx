"use client";
import { useEffect, useState } from "react";
import { Mail, Phone, ArrowUp } from "lucide-react";
import GitHubIcon from "@/components/GitHubIcon";
import LinkedInIcon from "@/components/LinkedInIcon";

export default function Footer() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
      setShowBackToTop(scrollTop > 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const circumference = 2 * Math.PI * 14;

  return (
    <>
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 w-10 h-10 flex items-center justify-center transition-all duration-300 ${
          showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Back to top"
      >
        <svg className="absolute inset-0 w-10 h-10 -rotate-90">
          <circle
            cx="20"
            cy="20"
            r="14"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="2"
          />
          <circle
            cx="20"
            cy="20"
            r="14"
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="2"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - scrollProgress)}
            strokeLinecap="round"
            className="transition-all duration-150"
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
        <ArrowUp size={14} className="text-text2 relative z-10" />
      </button>

      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11px] text-text2 font-dm">
            &copy; {new Date().getFullYear()} Mohammed Halimi.
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/M-halimi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text2 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <GitHubIcon size={16} />
            </a>
            <a
              href="https://linkedin.com/in/m-halimi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text2 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedInIcon size={16} />
            </a>
            <a
              href="mailto:mohammed.halimi.dev@gmail.com"
              className="text-text2 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
            <a
              href="tel:+212625945061"
              className="text-text2 hover:text-white transition-colors"
              aria-label="Phone"
            >
              <Phone size={16} />
            </a>
          </div>
          <div className="text-[11px] text-text2/60 font-dm text-center sm:text-right">
            Designed & Built by Mohammed Halimi
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> · </span>
            Next.js · Tailwind · Alpine.js
          </div>
        </div>
      </footer>
    </>
  );
}

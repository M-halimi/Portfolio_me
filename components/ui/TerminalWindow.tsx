"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { terminalInfo } from "@/lib/constants";

interface TerminalWindowProps {
  inView: boolean;
}

export default function TerminalWindow({ inView }: TerminalWindowProps) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);

  useEffect(() => {
    if (!inView) {
      setVisibleLines([]);
      return;
    }
    for (let i = 0; i < terminalInfo.length; i++) {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
      }, i * 600);
    }
  }, [inView]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
      className="bg-black border border-[#1a1a2e] rounded-lg overflow-hidden mt-6"
    >
      <div className="flex items-center gap-2 px-4 py-2 bg-black/50 border-b border-[#1a1a2e]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        <span className="text-[10px] text-[#8b949e] ml-2 font-dm">terminal</span>
      </div>
      <div className="px-4 py-3 font-dm text-xs space-y-1.5">
        {terminalInfo.map((item, i) => (
          <div key={i} className={visibleLines.includes(i) ? "block" : "hidden"}>
            <div className="text-accent-green">
              <span className="text-accent-green/70">$</span> {item.command}
            </div>
            <div className="text-white/80 pl-4">
              &gt; {item.output}
            </div>
          </div>
        ))}
        {visibleLines.length === terminalInfo.length && (
          <div className="inline-block w-2 h-3 bg-accent-green animate-blink ml-1" />
        )}
      </div>
    </motion.div>
  );
}

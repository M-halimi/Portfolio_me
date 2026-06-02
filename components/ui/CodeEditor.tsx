"use client";
import { motion } from "framer-motion";

const codeLines = [
  { text: "import { Developer } from '@/mohammed'", color: "text-white/70" },
  { text: "", color: "" },
  { text: "const Mohammed = () => {", color: "text-white/70" },
  { text: "  const skills = ['React', 'Laravel', 'MySQL']", color: "text-accent-green" },
  { text: "  const location = 'Fès, Morocco 🇲🇦'", color: "text-accent-green" },
  { text: "", color: "" },
  { text: "  return (", color: "text-white/70" },
  { text: "    <Developer", color: "text-accent-cyan" },
  { text: "      available={true}", color: "text-accent-purple" },
  { text: '      passion="Building things"', color: "text-accent-green" },
  { text: "    />", color: "text-accent-cyan" },
  { text: "  )", color: "text-white/70" },
  { text: "}", color: "text-white/70" },
];

export default function CodeEditor() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.4 }}
      className="bg-[#0d1117] border border-[#30363d] rounded-lg overflow-hidden shadow-2xl w-full max-w-[420px]"
    >
      <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-[#30363d]">
        <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
        <span className="text-xs text-[#8b949e] ml-2 font-dm">portfolio.tsx</span>
      </div>
      <div className="px-4 py-4 font-dm text-xs leading-relaxed">
        {codeLines.map((line, i) => (
          <div key={i} className={`${line.color || ""} whitespace-pre`}>
            {line.text}
            {i === codeLines.length - 1 && (
              <span className="inline-block w-2 h-4 bg-accent-cyan ml-0.5 animate-blink" />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

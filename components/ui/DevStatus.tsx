"use client";
import { devStatus } from "@/lib/constants";
import { Code2, BookOpen, Briefcase } from "lucide-react";

export default function DevStatus() {
  return (
    <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-2">
      <div className="group relative">
        <div className="w-8 h-8 flex items-center justify-center border border-white/[0.06] bg-bg2/60 backdrop-blur-sm text-text2/60 hover:text-accent-cyan hover:border-accent-cyan/30 transition-all duration-300 cursor-default">
          <Code2 size={12} />
        </div>
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-bg2/90 backdrop-blur-xl border border-white/[0.08] px-3 py-2 whitespace-nowrap">
            <div className="text-[9px] text-text2/40 uppercase tracking-wider font-dm">Building</div>
            <div className="text-[11px] text-text font-dm mt-0.5">{devStatus.building}</div>
          </div>
        </div>
      </div>

      <div className="group relative">
        <div className="w-8 h-8 flex items-center justify-center border border-white/[0.06] bg-bg2/60 backdrop-blur-sm text-text2/60 hover:text-accent-purple hover:border-accent-purple/30 transition-all duration-300 cursor-default">
          <BookOpen size={12} />
        </div>
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-bg2/90 backdrop-blur-xl border border-white/[0.08] px-3 py-2 whitespace-nowrap">
            <div className="text-[9px] text-text2/40 uppercase tracking-wider font-dm">Learning</div>
            <div className="text-[11px] text-text font-dm mt-0.5">{devStatus.learning}</div>
          </div>
        </div>
      </div>

      <div className="group relative">
        <div className="w-8 h-8 flex items-center justify-center border border-white/[0.06] bg-bg2/60 backdrop-blur-sm text-accent-green/60 hover:text-accent-green hover:border-accent-green/30 transition-all duration-300 cursor-default">
          <Briefcase size={12} />
        </div>
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-bg2/90 backdrop-blur-xl border border-white/[0.08] px-3 py-2 whitespace-nowrap">
            <div className="text-[9px] text-text2/40 uppercase tracking-wider font-dm">Available</div>
            <div className="text-[11px] text-accent-green font-dm mt-0.5">Freelance & Open to Work</div>
          </div>
        </div>
      </div>
    </div>
  );
}
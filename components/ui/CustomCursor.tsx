"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 768) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMouse = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      dotX = lerp(dotX, mouseX, 0.15);
      dotY = lerp(dotY, mouseY, 0.15);
      ringX = lerp(ringX, mouseX, 0.08);
      ringY = lerp(ringY, mouseY, 0.08);

      dot.style.transform = `translate(${dotX - 3}px, ${dotY - 3}px)`;
      ring.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;

      requestAnimationFrame(animate);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a, button, [role='button'], input, select, textarea, label");
      const isText = target.closest("p, h1, h2, h3, h4, h5, h6, span, li");

      if (isInteractive) {
        dot.style.width = "0";
        dot.style.height = "0";
        ring.style.width = "48px";
        ring.style.height = "48px";
        ring.style.backgroundColor = "rgba(255,255,255,0.06)";
        ring.style.borderColor = "rgba(255,255,255,0.3)";
      } else if (isText) {
        ring.style.width = "40px";
        ring.style.height = "4px";
        ring.style.borderRadius = "2px";
        ring.style.backgroundColor = "transparent";
        ring.style.borderColor = "rgba(255,255,255,0.15)";
      } else {
        resetCursor();
      }
    };

    const resetCursor = () => {
      dot.style.width = "6px";
      dot.style.height = "6px";
      ring.style.width = "32px";
      ring.style.height = "32px";
      ring.style.borderRadius = "50%";
      ring.style.backgroundColor = "transparent";
      ring.style.borderColor = "rgba(255,255,255,0.2)";
    };

    document.addEventListener("mousemove", onMouse);
    document.addEventListener("mouseover", handleHover);

    animate();

    return () => {
      document.removeEventListener("mousemove", onMouse);
      document.removeEventListener("mouseover", handleHover);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[6px] h-[6px] bg-white rounded-full pointer-events-none z-[99999]"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-[32px] h-[32px] border border-white/20 rounded-full pointer-events-none z-[99999] transition-[width,height,background,border-color] duration-200"
        style={{ willChange: "transform" }}
      />
    </>
  );
}

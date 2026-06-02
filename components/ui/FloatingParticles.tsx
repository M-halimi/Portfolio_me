"use client";
import { useEffect, useRef } from "react";
import { floatingParticles } from "@/lib/constants";

interface Particle {
  el: HTMLSpanElement;
  x: number;
  y: number;
  speed: number;
  size: number;
}

export default function FloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const particles: Particle[] = [];
    const count = 28;

    for (let i = 0; i < count; i++) {
      const span = document.createElement("span");
      span.textContent = floatingParticles[i % floatingParticles.length];
      span.style.position = "absolute";
      span.style.fontSize = `${10 + Math.random() * 4}px`;
      span.style.color = "rgba(255,255,255,0.04)";
      span.style.fontFamily = "var(--font-dm), monospace";
      span.style.pointerEvents = "none";
      span.style.userSelect = "none";
      span.style.willChange = "transform";

      const x = Math.random() * 100;
      const y = Math.random() * 100;
      span.style.left = `${x}%`;
      span.style.top = `${y}%`;

      container.appendChild(span);

      const speed = 15 + Math.random() * 15;
      particles.push({ el: span, x, y, speed, size: parseFloat(span.style.fontSize) });
    }

    let animationId: number;
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = (time - startTime) / 1000;
      for (const p of particles) {
        const t = (elapsed / p.speed + p.x * 0.1) % 1;
        const yOffset = Math.sin(t * Math.PI * 2) * 30;
        p.el.style.transform = `translateY(${yOffset}px)`;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      for (const p of particles) {
        container.removeChild(p.el);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
    />
  );
}

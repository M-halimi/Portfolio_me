"use client";
import { useRef, type ReactNode, type MouseEvent } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

export default function MagneticButton({ children, className = "", href, target, rel, onClick }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  };

  if (href) {
    return (
      <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className="inline-block transition-transform duration-200 ease-out">
        <a href={href} target={target} rel={rel} onClick={onClick} className={className}>
          {children}
        </a>
      </div>
    );
  }

  return (
    <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className="inline-block transition-transform duration-200 ease-out">
      <button onClick={onClick} className={className}>
        {children}
      </button>
    </div>
  );
}
"use client";
import { useEffect, useRef } from "react";
import Typed from "typed.js";

interface TypedTextProps {
  strings: string[];
  typeSpeed?: number;
  backSpeed?: number;
  loop?: boolean;
  className?: string;
}

export default function TypedText({
  strings,
  typeSpeed = 60,
  backSpeed = 30,
  loop = true,
  className = "",
}: TypedTextProps) {
  const elRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!elRef.current) return;
    const typed = new Typed(elRef.current, {
      strings,
      typeSpeed,
      backSpeed,
      loop,
      backDelay: 1500,
    });
    return () => typed.destroy();
  }, [strings, typeSpeed, backSpeed, loop]);

  return <span ref={elRef} className={className} />;
}

"use client";

import { useEffect } from "react";

export default function AlpineInit() {
  useEffect(() => {
    import("alpinejs").then((mod) => {
      mod.Alpine.start();
    });
  }, []);
  return null;
}

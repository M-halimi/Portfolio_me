import type { Metadata } from "next";
import { Syne, DM_Mono } from "next/font/google";
import "./globals.css";
import AlpineInit from "@/components/AlpineInit";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohammed Halimi — Full-Stack Developer",
  description:
    "Portfolio of Mohammed Halimi, Full-Stack Developer based in Fès, Morocco.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmMono.variable}`}>
      <body className="antialiased bg-bg text-text font-dm">
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <svg className="fixed inset-0 pointer-events-none z-[1] w-full h-full opacity-[0.025]">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
        <div
          className="fixed left-0 right-0 h-[1px] pointer-events-none z-[9999] animate-scan-line"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.3), transparent)",
          }}
        />
        <AlpineInit />
        {children}
      </body>
    </html>
  );
}

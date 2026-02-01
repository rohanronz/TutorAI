"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 top-0 z-50 flex justify-center px-6 py-6 transition-all duration-300 pointer-events-none"
    >
      <div 
        className={`flex items-center justify-between w-full max-w-5xl px-6 py-3 rounded-full transition-all duration-500 pointer-events-auto ${
          scrolled
            ? "bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)]"
            : "bg-transparent border border-transparent"
        }`}
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-black tracking-tighter text-white transition-transform hover:scale-105 active:scale-95"
        >
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[var(--accent)] to-[#a78bfa] flex items-center justify-center">
            <div className="h-3 w-3 rounded-full bg-white shadow-sm" />
          </div>
          Tutor AI
        </Link>
        
        <nav className="hidden md:flex items-center gap-8" aria-label="Main">
          {["Features", "How it works", "Impact"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm font-medium text-[var(--muted)] transition-colors hover:text-white"
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/artifacts"
            className="text-sm font-medium text-[var(--muted)] transition-colors hover:text-white"
          >
            Reports & Slides
          </Link>
          <Link
            href="/tutor"
            className="rounded-full bg-white px-5 py-2 text-sm font-bold text-black transition-all hover:bg-white/90 hover:scale-105 active:scale-95 shadow-lg shadow-white/5"
          >
            Get started
          </Link>
        </div>
      </div>
    </motion.header>
  );
}

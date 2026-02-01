"use client";

import Link from "next/link";
import { LoadingLink } from "./LoadingLink";
import Image from "next/image";
import { motion } from "motion/react";
import homescreenImage from "@/assets/homescreen.png";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden px-6 pt-32 pb-20 md:px-10 md:pt-44 flex flex-col items-center">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute top-[-10%] left-[-10%] h-[40rem] w-[40rem] rounded-full bg-[var(--accent)]/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[40rem] w-[40rem] rounded-full bg-[#3b82f6]/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-[var(--container-max)] text-center flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8 flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-1.5 text-sm font-medium text-[var(--accent)] backdrop-blur-md"
        >
          <span className="flex h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" />
          New: Generative UI Components
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          The next generation of
          <br />
          <span className="bg-gradient-to-r from-[var(--accent)] via-[#a78bfa] to-[#f472b6] bg-clip-text text-transparent">
            interactive AI
          </span>
        </motion.h2>

        {/* Subhead */}
        <motion.p
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mx-auto mt-8 max-w-2xl text-lg text-[var(--muted)] sm:text-xl leading-relaxed"
        >
          Move beyond text. Tutor AI enables your AI to generate rich, interactive UIs 
          in real-time. Built for teams who demand a premium experience.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row"
        >
          <LoadingLink
            href="/tutor"
            className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-[var(--accent)] px-10 text-base font-semibold text-white transition-all hover:bg-[var(--accent-hover)] hover:shadow-[0_0_32px_rgba(139,92,246,0.5)] active:scale-95 disabled:pointer-events-none disabled:opacity-90"
          >
            <span className="relative z-10">Get started for free</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
          </LoadingLink>
          <Link
            href="#features"
            className="inline-flex h-14 items-center justify-center rounded-full border border-white/10 bg-white/5 px-10 text-base font-semibold text-white backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10 active:scale-95"
          >
            Explore features
          </Link>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 w-full max-w-5xl px-4"
        >
          <div className="glass-panel relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-white/10 p-2 shadow-2xl">
            <Image
              src={homescreenImage}
              alt="Tutor AI interface"
              fill
              className="object-cover rounded-2xl"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { LoadingLink } from "./LoadingLink";
import { motion } from "motion/react";

export function CtaSection() {
  return (
    <section
      id="get-started"
      className="relative px-6 py-32 md:px-10"
    >
      <div className="mx-auto max-w-[var(--container-max)]">
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.03] px-8 py-16 text-center backdrop-blur-sm sm:px-12"
          >
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[var(--muted)]">
            Bring an interactive chatbot to your product in minutes.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
            <LoadingLink
              href="/tutor"
              className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-[var(--accent)] px-10 text-base font-semibold text-white transition-all hover:bg-[var(--accent-hover)] hover:shadow-[0_0_32px_rgba(139,92,246,0.5)] active:scale-95 disabled:pointer-events-none disabled:opacity-90"
            >
              <span className="relative z-10">Get started for free</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            </LoadingLink>
            <Link
              href="/artifacts"
              className="inline-flex h-14 items-center justify-center rounded-full border border-white/10 bg-white/5 px-10 text-base font-semibold text-white backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10 active:scale-95"
            >
              Create reports & slides
            </Link>
            <Link
              href="#features"
              className="inline-flex h-14 items-center justify-center rounded-full border border-white/10 bg-white/5 px-10 text-base font-semibold text-white backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10 active:scale-95"
            >
              Explore features
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

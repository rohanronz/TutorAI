"use client";

import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    title: "Connect your data",
    description: "Link your existing data sources or APIs in minutes with our pre-built connectors.",
    visual: (
      <div className="flex gap-2 items-center justify-center h-full">
        <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
          <svg className="w-6 h-6 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
        </div>
        <div className="w-8 h-px bg-gradient-to-r from-white/10 to-[var(--accent)]/50" />
        <div className="h-12 w-12 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
        </div>
      </div>
    )
  },
  {
    number: "02",
    title: "Configure behavior",
    description: "Define how your AI should interact and which UI components it should use.",
    visual: (
      <div className="flex flex-col gap-2 p-4 h-full justify-center">
        <div className="h-2 w-full rounded-full bg-white/5" />
        <div className="h-2 w-3/4 rounded-full bg-[var(--accent)]/30" />
        <div className="h-2 w-1/2 rounded-full bg-white/5" />
      </div>
    )
  },
  {
    number: "03",
    title: "Deploy & scale",
    description: "Embed the chat in your app with a single line of code and watch it scale.",
    visual: (
      <div className="relative h-full flex items-center justify-center">
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[#a78bfa] flex items-center justify-center shadow-lg shadow-[var(--accent)]/20">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
    )
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative px-6 py-32 md:px-10 overflow-hidden">
      <div className="mx-auto max-w-[var(--container-max)]">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          <div className="md:w-1/3 sticky top-32">
            <motion.h2
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
            >
              How it <span className="text-[var(--accent)]">works</span>
            </motion.h2>
            <motion.p
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-6 text-lg text-[var(--muted)]"
            >
              From integration to interaction in three simple steps. 
              Built for developers who value speed and quality.
            </motion.p>
          </div>

          <div className="flex-1 flex flex-col gap-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative flex flex-col md:flex-row gap-8 rounded-3xl border border-white/5 bg-white/[0.01] p-8 transition-all hover:bg-white/[0.03]"
            >
                <div className="flex-1">
                  <span className="text-5xl font-black text-white/5 transition-colors group-hover:text-[var(--accent)]/10">
                    {step.number}
                  </span>
                  <h3 className="mt-2 text-2xl font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-lg text-[var(--muted)] leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="md:w-48 h-32 rounded-2xl bg-black/40 border border-white/5 overflow-hidden">
                  {step.visual}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "motion/react";

const testimonials = [
  {
    quote: "Tutor AI has completely changed how we think about AI interfaces. The generative UI is a game changer.",
    author: "Sarah Chen",
    role: "Head of Product at Flow",
    avatar: "SC"
  },
  {
    quote: "The easiest SDK we've ever integrated. We went from idea to production in less than a week.",
    author: "Marcus Thorne",
    role: "CTO at Nexus",
    avatar: "MT"
  },
];

export function SocialProof() {
  return (
    <section id="social-proof" className="relative px-6 py-32 md:px-10 bg-white/[0.01]">
      <div className="mx-auto max-w-[var(--container-max)]">
        <div className="flex flex-col items-center text-center mb-20">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Trusted by the <span className="text-[var(--accent)]">best</span>
          </motion.h2>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
          >
            <div className="text-2xl font-black tracking-tighter text-white">TECHFLOW</div>
            <div className="text-2xl font-black tracking-tighter text-white">QUANTUM</div>
            <div className="text-2xl font-black tracking-tighter text-white">VELOCITY</div>
            <div className="text-2xl font-black tracking-tighter text-white">ORBIT</div>
          </motion.div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-panel relative rounded-3xl p-10"
            >
              <div className="absolute top-8 right-10 text-6xl font-serif text-white/5">"</div>
              <p className="relative z-10 text-xl text-white/90 leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-[var(--accent)]/20 border border-[var(--accent)]/30 flex items-center justify-center text-[var(--accent)] font-bold">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-bold text-white">{t.author}</div>
                  <div className="text-sm text-[var(--muted)]">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

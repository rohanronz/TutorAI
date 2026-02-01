"use client";

import { motion } from "motion/react";

const useCases = [
  {
    title: "Customer Support",
    description: "Automate complex support queries with interactive forms and real-time data lookups.",
    metric: "40% faster resolution",
  },
  {
    title: "Sales Enablement",
    description: "Engage leads with dynamic product demos and interactive ROI calculators.",
    metric: "25% higher conversion",
  },
  {
    title: "Data Analysis",
    description: "Let users query complex datasets and receive interactive charts and tables.",
    metric: "10x user engagement",
  },
];

export function UseCases() {
  return (
    <section id="impact" className="relative px-6 py-32 md:px-10 overflow-hidden">
      <div className="mx-auto max-w-[var(--container-max)]">
        <div className="mb-20">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Built for <span className="text-[var(--accent)]">impact</span>
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 max-w-2xl text-lg text-[var(--muted)]"
          >
            Tutor AI is powering the next generation of AI-driven companies. 
            See how teams are using interactive AI to transform their business.
          </motion.p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {useCases.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-3xl border border-white/5 bg-white/[0.02] p-8 transition-all hover:bg-white/[0.04]"
            >
              <div className="text-sm font-bold uppercase tracking-widest text-[var(--accent)] mb-4">
                {item.metric}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {item.title}
              </h3>
              <p className="text-lg text-[var(--muted)] leading-relaxed">
                {item.description}
              </p>
              
              <div className="mt-8 flex items-center gap-2 text-white font-semibold group-hover:text-[var(--accent)] transition-colors cursor-pointer">
                Learn more
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

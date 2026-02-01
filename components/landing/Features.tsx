"use client";

import Image from "next/image";
import { motion } from "motion/react";
import graphImage from "@/assets/linegraph.png";

const features = [
  {
    title: "Generative UI Components",
    description:
      "Move beyond text. Your AI can now render forms, charts, and data tables directly in the chat.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    className: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Real-time Streaming",
    description: "Ultra-low latency responses that stream in as they're generated.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Smart Context",
    description: "Built-in memory and thread management for complex conversations.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    className: "md:col-span-1 md:row-span-1",
  }
];

export function Features() {
  return (
    <section id="features" className="relative px-6 py-32 md:px-10">
      <div className="mx-auto max-w-[var(--container-max)]">
        <div className="mb-20 text-center">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Capabilities that define
            <br />
            <span className="text-[var(--accent)]">the future</span>
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-[var(--muted)]"
          >
            We've built the most powerful SDK for generative AI interfaces. 
            Everything you need to ship a premium experience.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-8 transition-all hover:border-white/10 hover:bg-white/[0.04] ${feature.className}`}
            >
              {/* Glow Effect */}
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--accent)]/5 blur-[80px] transition-opacity opacity-0 group-hover:opacity-100" />
              
              <div className="relative z-10 flex h-full flex-col">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 transition-transform group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="mt-6 text-2xl font-bold text-white">
                  {feature.title}
                </h3>
                <p className="mt-3 text-lg text-[var(--muted)] leading-relaxed">
                  {feature.description}
                </p>
                
                {feature.className.includes("md:row-span-2") && (
                  <div className="mt-6 flex-1 relative min-h-[180px] overflow-hidden rounded-2xl p-0">
                    <Image
                      src={graphImage}
                      alt="Generative UI components example"
                      fill
                      className="object-fill rounded-2xl"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

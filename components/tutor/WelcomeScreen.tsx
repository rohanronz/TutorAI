"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface WelcomeScreenProps {
  onSubmit: (message: string) => void;
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

export function WelcomeScreen({ onSubmit }: WelcomeScreenProps) {
  const [message, setMessage] = useState("");
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSubmit(message.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start pt-[18vh] px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute top-[20%] left-[50%] -translate-x-1/2 h-[30rem] w-[30rem] rounded-full bg-[var(--accent)]/10 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center">
        {/* Glowing Orb Avatar */}
        <div className="relative mb-4 h-24 w-24 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-purple-500/20 blur-2xl"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative h-12 w-12 rounded-full bg-gradient-to-b from-purple-400 to-purple-600 shadow-[0_0_40px_rgba(168,85,247,0.4)] flex items-center justify-center"
          >
            <div className="h-8 w-8 rounded-full bg-white/10 blur-sm" />
          </motion.div>
        </div>

        {/* Greeting */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl font-bold text-center text-white mb-3 tracking-tight"
        >
          {greeting}
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-xl md:text-2xl font-medium text-center mb-10 tracking-tight"
        >
          <span className="text-white/40">How Can I </span>
          <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Assist You Today?
          </span>
        </motion.p>

        {/* Input Container */}
        <motion.form
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onSubmit={handleSubmit}
          className="w-full max-w-2xl"
        >
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
            <div className="relative glass-panel rounded-3xl p-4 w-full bg-white/[0.03] border-white/10 flex flex-col gap-4">
              {/* Top: Input Row */}
              <div className="flex items-center gap-4 px-2">
                <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-purple-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <input
                  id="welcome-message-input"
                  name="message"
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/20 text-lg font-light"
                  autoFocus
                />
              </div>

              {/* Bottom: Actions Row */}
              <div className="flex items-center justify-between px-1">
                <div className="flex flex-wrap gap-2">
                  {[
                    { icon: "💡", label: "Explain a concept" },
                    { icon: "📊", label: "Help with math" },
                    { icon: "📝", label: "Write an essay" },
                  ].map((action) => (
                    <button
                      key={action.label}
                      type="button"
                      onClick={() => setMessage(action.label)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all text-xs font-medium text-white/40 hover:text-white"
                    >
                      <span>{action.icon}</span>
                      <span>{action.label}</span>
                    </button>
                  ))}
                </div>
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-600 hover:bg-purple-500 disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] group/btn"
                >
                  <svg
                    className="w-5 h-5 text-white transform group-hover/btn:translate-x-0.5 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </motion.form>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import Link from "next/link";
import { C1Component, ThemeProvider } from "@thesysai/genui-sdk";
import { themePresets } from "@crayonai/react-ui";
import { motion, AnimatePresence } from "motion/react";
import { WelcomeScreen } from "@/components/tutor/WelcomeScreen";
import "@crayonai/react-ui/styles/index.css";

// Wrapper component that absorbs ThemeProvider's extra props
function ThemeWrapper({ children, disableThemeProvider, ...rest }: { children: ReactNode; disableThemeProvider?: boolean; [key: string]: unknown }) {
  return <div className="contents" {...rest}>{children}</div>;
}

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type PersistedState = {
  hasStarted: boolean;
  messages: Message[];
  threadId: string;
};

const STORAGE_KEY = "ai-tutor-chat-state";

export default function TutorPage() {
  const [hasStarted, setHasStarted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const shouldAutoScrollRef = useRef(true);
  const threadIdRef = useRef(crypto.randomUUID());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const streamingIdRef = useRef<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const latestContentRef = useRef("");
  const rafIdRef = useRef<number | null>(null);

  const isNearBottom = () => {
    const container = scrollContainerRef.current;
    if (!container) return true;
    const threshold = 100; // pixels from bottom
    return container.scrollHeight - container.scrollTop - container.clientHeight < threshold;
  };

  const handleScroll = () => {
    shouldAutoScrollRef.current = isNearBottom();
  };

  useEffect(() => {
    // Load persisted state from localStorage
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed: PersistedState = JSON.parse(saved);
        setHasStarted(parsed.hasStarted);
        setMessages(parsed.messages);
        threadIdRef.current = parsed.threadId;
      } catch (e) {
        console.error("Failed to parse saved state:", e);
      }
    }
    setMounted(true);
  }, []);

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  // Auto-scroll to bottom only if user is near bottom
  useEffect(() => {
    if (shouldAutoScrollRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, streamingContent]);

  // Persist state to localStorage when it changes
  useEffect(() => {
    if (!mounted) return;
    const stateToSave: PersistedState = {
      hasStarted,
      messages,
      threadId: threadIdRef.current,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  }, [hasStarted, messages, mounted]);

  // Send message to API and stream response
  const sendMessage = async (content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    shouldAutoScrollRef.current = true;
    setStreamingContent("");
    streamingIdRef.current = crypto.randomUUID();

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: { role: "user", content, id: userMessage.id },
          threadId: threadIdRef.current,
          responseId: crypto.randomUUID(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("No reader available");
      }

      const decoder = new TextDecoder();
      let fullResponse = "";

      // Function to update state aligned with render cycle
      const scheduleUpdate = () => {
        if (rafIdRef.current === null) {
          rafIdRef.current = requestAnimationFrame(() => {
            setStreamingContent(latestContentRef.current);
            rafIdRef.current = null;
          });
        }
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        fullResponse += chunk;
        latestContentRef.current = fullResponse;
        scheduleUpdate();
      }

      // Final update to ensure last content is rendered
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      setStreamingContent(fullResponse);

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: fullResponse,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setStreamingContent("");
      streamingIdRef.current = null;
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFirstMessage = (message: string) => {
    setHasStarted(true);
    // Send the message after a brief delay for animation
    setTimeout(() => sendMessage(message), 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input.trim());
      setInput("");
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setStreamingContent("");
    threadIdRef.current = crypto.randomUUID();
    setHasStarted(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  if (!mounted) return null;

  return (
    <ThemeProvider
      theme={themePresets.carbon.theme}
      darkTheme={themePresets.carbon.darkTheme}
      mode="dark"
    >
      <ThemeWrapper>
        <div className="fixed inset-0 overflow-hidden bg-[#0a0a0a] flex">
          <AnimatePresence mode="wait">
          {!hasStarted ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full"
            >
              <WelcomeScreen onSubmit={handleFirstMessage} />
            </motion.div>
          ) : (
            <div className="flex h-full w-full overflow-hidden">
              {/* Sidebar */}
              <motion.div
                initial={false}
                animate={{ 
                  width: isSidebarOpen ? 260 : 0,
                  opacity: isSidebarOpen ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="bg-[#0f0f0f] border-r border-white/10 flex flex-col overflow-hidden"
              >
                <div className="p-4 flex flex-col h-full w-[260px]">
                  <button
                    onClick={handleNewChat}
                    className="flex items-center gap-2 w-full px-3 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-sm text-white mb-6"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    New Chat
                  </button>

                  <div className="flex-1 overflow-y-auto">
                    <h3 className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-4 px-2">History</h3>
                    <div className="space-y-1">
                      {messages.filter(m => m.role === "user").slice(-10).reverse().map((msg, i) => (
                        <div 
                          key={i}
                          className="px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer text-sm text-white/60 hover:text-white truncate transition-colors"
                        >
                          {msg.content}
                        </div>
                      ))}
                      {messages.length === 0 && (
                        <div className="px-3 py-2 text-sm text-white/20 italic">
                          No history yet
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                key="chat"
                initial={{ opacity: 0, scale: 1.02, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 flex flex-col min-w-0 overflow-hidden"
              >
                {/* Chat Header */}
                <div className="border-b border-white/10 p-4 md:px-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                      className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/60 hover:text-white"
                      title={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                      </svg>
                    </div>
                    <span className="text-white font-medium">AI Tutor</span>
                  </div>
                  <Link
                    href="/artifacts"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors"
                  >
                    Try artifacts
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>

                {/* Content Area Wrapper */}
                <div className="flex-1 overflow-hidden">
                  {/* Messages Area */}
                  <div 
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="h-full overflow-y-auto p-4 md:p-6"
                  >
                    <div className="max-w-4xl mx-auto space-y-6 pb-15 tutor-c1-context">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`${
                              msg.role === "user"
                                ? "max-w-[85%] bg-purple-600/20 border border-purple-500/30 rounded-2xl px-4 py-3"
                                : "w-full"
                            }`}
                          >
                            {msg.role === "assistant" ? (
                              <div className="w-full">
                                <C1Component c1Response={msg.content} isStreaming={false} />
                              </div>
                            ) : (
                              <p className="text-white">{msg.content}</p>
                            )}
                          </div>
                        </div>
                      ))}

                      {/* Streaming response */}
                      {streamingContent && streamingIdRef.current && (
                        <div key={streamingIdRef.current} className="flex justify-start">
                          <div className="w-full">
                            <C1Component c1Response={streamingContent} isStreaming={true} />
                          </div>
                        </div>
                      )}

                      {/* Loading indicator */}
                      {isLoading && !streamingContent && (
                        <div className="flex justify-start">
                          <div className="flex items-center gap-2 text-white/60 px-4 py-3">
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                            <span>Thinking...</span>
                          </div>
                        </div>
                      )}

                      <div ref={messagesEndRef} />
                    </div>
                  </div>
                </div>

                {/* Fixed Input Area */}
                <div className={`fixed bottom-0 right-0 ${isSidebarOpen ? 'left-[260px]' : 'left-0'} p-4 md:p-6 pointer-events-none z-10 transition-all duration-300`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent pointer-events-none" />
                  <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative pointer-events-auto">
                    <div className="flex items-center gap-3 bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl shadow-black/50">
                      <input
                        id="chat-input"
                        name="message"
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        disabled={isLoading}
                        className="flex-1 bg-transparent px-4 py-3 text-white placeholder-white/30 focus:outline-none disabled:opacity-50"
                      />
                      <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="flex-shrink-0 h-12 w-12 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-300"
                      >
                        <svg
                          className="w-5 h-5 text-white"
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
                  </form>
                </div>
              </motion.div>
            </div>
          )}
          </AnimatePresence>
        </div>
      </ThemeWrapper>
    </ThemeProvider>
  );
}

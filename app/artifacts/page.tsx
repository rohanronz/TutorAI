"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { C1Component, ThemeProvider } from "@thesysai/genui-sdk";
import { themePresets } from "@crayonai/react-ui";
import "@crayonai/react-ui/styles/index.css";

type ArtifactType = "report" | "slides";

export default function ArtifactsPage() {
  const [c1Response, setC1Response] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [artifactType, setArtifactType] = useState<ArtifactType>("slides");
  const [prompt, setPrompt] = useState("");
  const [editPrompt, setEditPrompt] = useState("");
  const [artifactId, setArtifactId] = useState<string | null>(null);

  const handleExportPdf = useCallback(
    async ({
      exportParams,
      title,
    }: {
      exportParams: string;
      title: string;
    }) => {
      try {
        const response = await fetch("/api/export-pdf", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ exportParams }),
        });

        if (!response.ok) {
          throw new Error("Failed to download PDF.");
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        const filename = (title || "artifact").replace(/\.pdf$/i, "");
        a.download = `${filename}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      } catch (error) {
        console.error("Export failed:", error);
      }
    },
    []
  );

  const generateArtifact = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setC1Response("");
    const id = crypto.randomUUID();
    setArtifactId(id);

    try {
      const response = await fetch("/api/artifact/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt.trim(),
          artifactType,
          artifactId: id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate artifact");
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("No reader available");
      }

      const decoder = new TextDecoder();
      let accumulatedResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        accumulatedResponse += chunk;
        setC1Response(accumulatedResponse);
      }
    } catch (error) {
      console.error("Error generating artifact:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyEdit = async () => {
    if (!editPrompt.trim() || !c1Response || !artifactId) return;

    setIsEditing(true);

    try {
      const response = await fetch("/api/artifact/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          existingContent: c1Response,
          editPrompt: editPrompt.trim(),
          artifactType,
          artifactId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to edit artifact");
      }

      const data = (await response.json()) as { content: string };
      setC1Response(data.content);
      setEditPrompt("");
    } catch (error) {
      console.error("Error editing artifact:", error);
    } finally {
      setIsEditing(false);
    }
  };

  const promptPlaceholder =
    artifactType === "slides"
      ? "Describe the presentation you want to create... e.g., 'Create a presentation about the benefits of renewable energy'"
      : "Describe the report you want to create... e.g., 'Create a report analyzing Q4 market trends'";

  return (
    <ThemeProvider
      theme={themePresets.carbon.theme}
      darkTheme={themePresets.carbon.darkTheme}
      mode="dark"
    >
      <div className="fixed inset-0 flex flex-col overflow-hidden bg-[#0a0a0a] text-white">
        {/* Back link */}
        <div className="absolute left-4 top-4 z-10 md:left-6 md:top-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </Link>
        </div>

        <main className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-2xl px-4 pt-20 pb-12 md:px-6">
          {/* Hero header */}
          <div className="mb-10 text-center">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Create with AI
            </h1>
            <p className="mt-2 text-base text-white/70 md:text-lg">
              Generate beautiful reports and presentations instantly
            </p>
          </div>

          {/* Input section - glass panel with purple glow */}
          <section className="mt-6 mb-8 rounded-3xl border border-purple-500/30 bg-white/[0.03] p-6 shadow-[0_0_24px_rgba(139,92,246,0.15)] backdrop-blur-xl md:p-8">
            <div className="mt-2 mb-8 flex gap-3">
              <button
                type="button"
                onClick={() => setArtifactType("slides")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium capitalize transition-all ${
                  artifactType === "slides"
                    ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="14"
                    rx="2"
                    strokeWidth={2}
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9h18M3 13h18"
                  />
                </svg>
                Slides
              </button>
              <button
                type="button"
                onClick={() => setArtifactType("report")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium capitalize transition-all ${
                  artifactType === "report"
                    ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Report
              </button>
            </div>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={promptPlaceholder}
              rows={4}
              disabled={isLoading}
              className="mb-6 w-full resize-none rounded-xl border border-purple-500/20 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/50 disabled:opacity-50"
            />

            <button
              type="button"
              onClick={generateArtifact}
              disabled={!prompt.trim() || isLoading}
              className="mb-2 flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-3 text-base font-semibold text-white transition-colors hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                "Generating..."
              ) : (
                <>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {artifactType === "slides"
                    ? "Generate Slides"
                    : "Generate Report"}
                </>
              )}
            </button>
          </section>

          {/* Output section */}
          {(c1Response || isLoading) && (
            <section className="mt-6 mb-8">
              <div className="artifacts-output overflow-y-auto overscroll-behavior-contain rounded-3xl border border-purple-500/30 bg-white/[0.03] p-6 shadow-[0_0_24px_rgba(139,92,246,0.15)] backdrop-blur-xl max-h-[75vh]">
                <C1Component
                  c1Response={c1Response}
                  isStreaming={isLoading}
                  exportAsPdf={handleExportPdf}
                />
              </div>
            </section>
          )}

          {/* Edit section */}
          {c1Response && !isLoading && (
            <section className="rounded-3xl border border-purple-500/30 bg-white/[0.03] p-6 shadow-[0_0_24px_rgba(139,92,246,0.15)] backdrop-blur-xl">
              <h2 className="mb-3 text-sm font-medium text-white/80">
                Edit artifact
              </h2>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={editPrompt}
                  onChange={(e) => setEditPrompt(e.target.value)}
                  placeholder="Describe the changes you want..."
                  disabled={isEditing}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/50 disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={applyEdit}
                  disabled={!editPrompt.trim() || isEditing}
                  className="rounded-xl bg-white/10 px-6 py-3 font-medium text-white transition-colors hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isEditing ? "Applying..." : "Apply Edit"}
                </button>
              </div>
            </section>
          )}
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

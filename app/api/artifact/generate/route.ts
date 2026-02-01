import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { transformStream } from "@crayonai/stream";

const DEFAULT_SYSTEM_PROMPTS = {
  report:
    "Generate a professional business report with clear sections, data visualizations where appropriate, and actionable insights.",
  slides:
    "Generate a presentation with a clear structure, compelling visuals, and speaker notes where helpful.",
} as const;

export async function POST(req: NextRequest) {
  const { prompt, artifactType, systemPrompt, artifactId } = (await req.json()) as {
    prompt: string;
    artifactType: "report" | "slides";
    systemPrompt?: string;
    artifactId?: string;
  };

  const id = artifactId ?? crypto.randomUUID();
  const resolvedSystemPrompt =
    systemPrompt ?? DEFAULT_SYSTEM_PROMPTS[artifactType];

  const client = new OpenAI({
    baseURL: "https://api.thesys.dev/v1/artifact",
    apiKey: process.env.THESYS_API_KEY,
  });

  const messages: Array<{ role: "system" | "user"; content: string }> = [
    { role: "system", content: resolvedSystemPrompt },
    { role: "user", content: prompt },
  ];

  const llmStream = await client.chat.completions.create({
    model: "c1/artifact/v-20251030",
    messages,
    stream: true,
    // @ts-expect-error - metadata is valid for C1 Artifact API
    metadata: {
      thesys: JSON.stringify({
        c1_artifact_type: artifactType,
        id,
      }),
    },
  });

  const responseStream = transformStream(
    llmStream,
    (chunk) => chunk.choices[0]?.delta?.content ?? "",
    {}
  ) as ReadableStream<string>;

  const response = new NextResponse(responseStream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Artifact-Id": id,
    },
  });

  return response;
}

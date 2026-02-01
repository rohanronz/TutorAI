import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  const { existingContent, editPrompt, artifactType, artifactId } =
    (await req.json()) as {
      existingContent: string;
      editPrompt: string;
      artifactType: "report" | "slides";
      artifactId: string;
    };

  const client = new OpenAI({
    baseURL: "https://api.thesys.dev/v1/artifact",
    apiKey: process.env.THESYS_API_KEY,
  });

  const completion = await client.chat.completions.create({
    model: "c1/artifact/v-20251030",
    messages: [
      { role: "assistant", content: existingContent },
      { role: "user", content: editPrompt },
    ],
    // @ts-expect-error - metadata is valid for C1 Artifact API
    metadata: {
      thesys: JSON.stringify({
        c1_artifact_type: artifactType,
        id: artifactId,
      }),
    },
  });

  const content = completion.choices[0]?.message?.content ?? "";

  return NextResponse.json({ content });
}

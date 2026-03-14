import { NextRequest, NextResponse } from "next/server";
import { generateTopicExplanation } from "@/lib/aiClient";

export async function POST(request: NextRequest) {
  let requestBody: unknown;

  try {
    requestBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const body = requestBody as { topic?: unknown };
  const topic = typeof body.topic === "string" ? body.topic.trim() : "";

  if (!topic) {
    return NextResponse.json({ error: "Please enter a topic to continue." }, { status: 400 });
  }

  if (topic.length > 160) {
    return NextResponse.json({ error: "Please keep the topic under 160 characters." }, { status: 400 });
  }

  try {
    const result = await generateTopicExplanation(topic);

    return NextResponse.json({
      explanation: result.explanation
    });
  } catch (error) {
    console.error("Explain API error:", error);

    return NextResponse.json(
      {
        error: "We could not generate the explanation right now. Please check your API key or model and try again."
      },
      { status: 500 }
    );
  }
}
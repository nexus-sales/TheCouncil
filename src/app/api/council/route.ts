import { readFileSync } from "fs";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";
import { openai, DEFAULT_MODEL, DEFAULT_TEMPERATURE } from "@/lib/openai";
import { buildUserPrompt, buildCouncilResult } from "@/core/council";
import type { CouncilResult, DecisionInput } from "@/core/types";

function loadSystemPrompt(): string {
  const promptPath = join(process.cwd(), "src/core/council-prompt.md");
  return readFileSync(promptPath, "utf-8");
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as DecisionInput;

    if (!body.question || body.question.trim().length === 0) {
      return NextResponse.json(
        { error: "A decision question is required." },
        { status: 400 }
      );
    }

    const systemPrompt = loadSystemPrompt();
    const input: DecisionInput = {
      ...body,
      question: body.question.trim(),
      context: body.context?.trim(),
      options: body.options?.filter((option) => option.trim() !== ""),
      mode: body.mode ?? "decision",
      stakes: body.stakes ?? "medium",
      locale: body.locale === "en" ? "en" : "es",
    };
    const userPrompt = buildUserPrompt(input);

    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      temperature: DEFAULT_TEMPERATURE,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error("The model returned an empty response.");
    }

    const raw = JSON.parse(content) as Partial<CouncilResult>;
    const result = buildCouncilResult(input, raw);

    return NextResponse.json(result);
  } catch (err) {
    console.error("[Council API Error]", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}

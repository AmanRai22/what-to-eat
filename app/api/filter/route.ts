import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Candidate = { name: string; cuisine?: string; tags: string[] };

type Body = {
  mode: "eatOut" | "orderIn" | "cook";
  hint: string;
  candidates: Candidate[];
};

const SYSTEM_PROMPT = `You are a filter. Given a list of options with tags and a user hint, return a JSON array of the names of options that best match the hint, ranked best-first. Return at most 5. Output ONLY a JSON array of strings — no prose, no markdown fences.`;

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const { hint, candidates } = body;
  if (!hint || !Array.isArray(candidates) || candidates.length === 0) {
    return NextResponse.json({ error: "missing hint or candidates" }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "ANTHROPIC_API_KEY not set" }, { status: 500 });
  }

  const client = new Anthropic({ apiKey });

  const userMessage = [
    `Hint: ${hint}`,
    `Options:`,
    ...candidates.map((c) =>
      `- ${c.name}${c.cuisine ? ` (${c.cuisine})` : ""} — tags: ${c.tags.join(", ")}`,
    ),
    ``,
    `Return a JSON array of names (strings) that best match the hint, best-first, max 5.`,
  ].join("\n");

  try {
    const resp = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 256,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    });

    const text = resp.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();

    const cleaned = text.replace(/^```(?:json)?\s*|\s*```$/g, "").trim();
    let parsed: unknown;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      const m = cleaned.match(/\[[\s\S]*\]/);
      if (!m) throw new Error("no json array in response");
      parsed = JSON.parse(m[0]);
    }

    if (!Array.isArray(parsed)) {
      return NextResponse.json({ error: "model did not return array" }, { status: 502 });
    }

    const allowed = new Set(candidates.map((c) => c.name));
    const names = parsed
      .filter((x): x is string => typeof x === "string")
      .filter((n) => allowed.has(n))
      .slice(0, 5);

    return NextResponse.json({ names });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}

import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  const { textRequest } = await req.json();

  if (!textRequest) {
    return NextResponse.json({ error: "нет данных" });
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const completions = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "user", content: textRequest },
        { role: "system", content: "Отвечай только на русском языке." },
      ],
    });

    const reply = completions.choices[0].message.content || "нет ответа :(";
    return NextResponse.json({ text: reply });
  } catch (e) {
    return NextResponse.json({ error: e });
  }
}

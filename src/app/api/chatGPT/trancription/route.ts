import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  const formData = await req.formData();
  const audioBlob = formData.get("audio") as Blob;

  if (!audioBlob) {
    return NextResponse.json({
      error: "неверный или отсутствует blob файл",
      status: 400,
    });
  }

  const arrayBuffer = await audioBlob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const file = new File([buffer], "recording.wav", { type: "audio/wav" });

  try {
    const trancription = await openai.audio.transcriptions.create({
      file: file,
      model: "whisper-1",
      language: "ru"
    });

    return NextResponse.json({ text: trancription.text });
  } catch (e) {
    return NextResponse.json({ error: `ошибка - ${e}` });
  }
}

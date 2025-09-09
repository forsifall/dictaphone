import { NextResponse } from "next/server";
import OpenAI from "openai";

console.log("API route вообще вызван?");

export async function POST(req: Request) {
  console.log("API route вызван!");
  const formData = await req.formData();
  const audioBlob = formData.get("audio") as Blob;

  console.log("FormData keys:", [...formData.keys()]);
  console.log("AudioBlob size:", audioBlob?.size);

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

  const trancription = await openai.audio.transcriptions.create({
    file: file,
    model: "whisper-1",
  });

  return NextResponse.json({ text: trancription.text });
}

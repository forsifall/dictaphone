import { NextResponse } from "next/server";


console.log("API route вообще вызван?");

export async function POST(req: Request) {

    const data = req.body;

  return NextResponse.json({ data: data });
}

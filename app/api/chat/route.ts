import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = "https://spacy-i2uu320jsk.limechat.ai";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const upstream = await fetch(`${API_BASE_URL}/chat/agent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await upstream.json();

  return NextResponse.json(data, { status: upstream.status });
}

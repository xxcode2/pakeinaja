import { NextResponse } from "next/server";
import { handleUpload } from "@vercel/blob/client";
import { isAuthed } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req) {
  if (!isAuthed()) {
    return NextResponse.json({ error: "Tidak diizinkan." }, { status: 401 });
  }

  const body = await req.json();

  try {
    const jsonResponse = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
        addRandomSuffix: true,
        maximumSizeInBytes: 15 * 1024 * 1024,
      }),
      onUploadCompleted: async () => {},
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { isAuthed } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req) {
  if (!isAuthed()) {
    return NextResponse.json({ error: "Tidak diizinkan." }, { status: 401 });
  }

  const form = await req.formData();
  const files = form.getAll("files");

  if (!files.length) {
    return NextResponse.json({ error: "Tidak ada file." }, { status: 400 });
  }

  const uploads = [];
  for (const file of files) {
    if (!(file instanceof File)) continue;
    const ext = file.name.split(".").pop() || "jpg";
    const key = `produk/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const blob = await put(key, file, {
      access: "public",
      contentType: file.type || "image/jpeg",
    });
    uploads.push(blob.url);
  }

  return NextResponse.json({ urls: uploads });
}

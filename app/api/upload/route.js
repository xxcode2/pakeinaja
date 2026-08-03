import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { isAuthed } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req) {
  // Ensure Blob token is configured
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error("[api/upload] BLOB_READ_WRITE_TOKEN env var not set");
    return NextResponse.json(
      { error: "Server misconfiguration: Blob storage not configured (missing BLOB_READ_WRITE_TOKEN)" },
      { status: 500 }
    );
  }

  if (!isAuthed()) {
    return NextResponse.json({ error: "Tidak diizinkan." }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "File tidak valid." }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Tipe file tidak didukung. Gunakan JPG, PNG, WebP, atau GIF." }, { status: 400 });
    }

    // Validate file size (15MB)
    const maxSize = 15 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: "Ukuran file maksimal 15MB." }, { status: 400 });
    }

    // Generate unique filename with random suffix
    const randomSuffix = Math.random().toString(36).substring(2, 10);
    const ext = file.name.split(".").pop() || "jpg";
    const pathname = `${randomSuffix}.${ext}`;

    // Upload directly to Vercel Blob from server (no CORS issues)
    const blob = await put(pathname, file, {
      access: "public",
      addRandomSuffix: false,
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[api/upload] Upload error:", error);
    return NextResponse.json({ error: msg || "Upload gagal." }, { status: 500 });
  }
}
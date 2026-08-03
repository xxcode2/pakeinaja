import { NextResponse } from "next/server";
import { getAllProducts, createProduct } from "@/lib/kv";
import { isAuthed } from "@/lib/auth";

export async function GET() {
  try {
    const products = await getAllProducts();
    return NextResponse.json({ products });
  } catch (e) {
    console.error("[api/products] GET error:", e);
    return NextResponse.json({ products: [] });
  }
}

export async function POST(req) {
  try {
    // auth
    let authed = false;
    try {
      authed = await isAuthed();
    } catch (e) {
      console.error("[api/products] isAuthed error:", e);
    }
    if (!authed) {
      return NextResponse.json({ error: "Tidak diizinkan." }, { status: 401 });
    }

    // parse body safely
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Body tidak valid JSON." }, { status: 400 });
    }

    if (!body.name || !body.price) {
      return NextResponse.json(
        { error: "Nama dan harga wajib diisi." },
        { status: 400 }
      );
    }

    const product = await createProduct(body);
    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    const msg = error?.message ?? String(error);
    console.error("[api/products] POST error:", error);
    return NextResponse.json({ error: msg || "Gagal membuat produk." }, { status: 500 });
  }
}
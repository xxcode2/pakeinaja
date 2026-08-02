import { NextResponse } from "next/server";
import { getAllProducts, createProduct } from "@/lib/kv";
import { isAuthed } from "@/lib/auth";

export async function GET() {
  const products = await getAllProducts();
  return NextResponse.json({ products });
}

export async function POST(req) {
  if (!isAuthed()) {
    return NextResponse.json({ error: "Tidak diizinkan." }, { status: 401 });
  }

  const body = await req.json();

  if (!body.name || !body.price) {
    return NextResponse.json(
      { error: "Nama dan harga wajib diisi." },
      { status: 400 }
    );
  }

  const product = await createProduct(body);
  return NextResponse.json({ product }, { status: 201 });
}

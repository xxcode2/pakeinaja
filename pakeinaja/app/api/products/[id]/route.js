import { NextResponse } from "next/server";
import { getProduct, updateProduct, deleteProduct } from "@/lib/kv";
import { isAuthed } from "@/lib/auth";

export async function GET(req, { params }) {
  const product = await getProduct(params.id);
  if (!product) {
    return NextResponse.json({ error: "Produk tidak ditemukan." }, { status: 404 });
  }
  return NextResponse.json({ product });
}

export async function PATCH(req, { params }) {
  if (!isAuthed()) {
    return NextResponse.json({ error: "Tidak diizinkan." }, { status: 401 });
  }
  const patch = await req.json();
  const product = await updateProduct(params.id, patch);
  if (!product) {
    return NextResponse.json({ error: "Produk tidak ditemukan." }, { status: 404 });
  }
  return NextResponse.json({ product });
}

export async function DELETE(req, { params }) {
  if (!isAuthed()) {
    return NextResponse.json({ error: "Tidak diizinkan." }, { status: 401 });
  }
  const ok = await deleteProduct(params.id);
  if (!ok) {
    return NextResponse.json({ error: "Produk tidak ditemukan." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}

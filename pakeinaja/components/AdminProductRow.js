"use client";

import { useState } from "react";
import Image from "next/image";
import { formatRupiah } from "@/lib/whatsapp";

export default function AdminProductRow({ product, onChange, onEdit }) {
  const [busy, setBusy] = useState(false);

  async function toggleSold() {
    setBusy(true);
    const res = await fetch(`/api/products/${product.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sold: !product.sold }),
    });
    const data = await res.json();
    setBusy(false);
    if (res.ok) onChange(data.product);
  }

  async function handleDelete() {
    if (!confirm(`Hapus "${product.name}"? Tidak bisa dibatalkan.`)) return;
    setBusy(true);
    const res = await fetch(`/api/products/${product.id}`, { method: "DELETE" });
    setBusy(false);
    if (res.ok) onChange(null, product.id);
  }

  return (
    <div className="flex items-center gap-3 rounded-tag border border-bone-200/10 bg-pine-900 p-3">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-tag bg-pine-800">
        {product.photos?.[0] && (
          <Image src={product.photos[0]} alt="" fill className="object-cover" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-sm font-medium text-bone-100">
          {product.name}
        </p>
        <p className="font-mono text-xs text-mustard-400">{formatRupiah(product.price)}</p>
      </div>

      <button
        onClick={toggleSold}
        disabled={busy}
        className={`rounded-tag px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors ${
          product.sold
            ? "bg-brick-500/20 text-brick-500"
            : "bg-sage-500/20 text-sage-400"
        }`}
      >
        {product.sold ? "Sold" : "Tersedia"}
      </button>

      <button
        onClick={() => onEdit(product)}
        className="font-mono text-[11px] uppercase tracking-wider text-bone-200/50 hover:text-bone-100"
      >
        edit
      </button>

      <button
        onClick={handleDelete}
        disabled={busy}
        className="font-mono text-[11px] uppercase tracking-wider text-bone-200/50 hover:text-brick-500"
      >
        hapus
      </button>
    </div>
  );
}

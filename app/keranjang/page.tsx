"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Link from "next/link";
import { ShoppingBag, Plus, Minus, Trash2, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  photo?: string;
  qty: number;
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("pakeinaja_cart");
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        setItems([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("pakeinaja_cart", JSON.stringify(items));
  }, [items]);

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  function updateQty(id: string, delta: number) {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i))
        .filter((i) => i.qty > 0)
    );
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function formatRupiah(n: number) {
    return n.toLocaleString("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 });
  }

  return (
    <main className="min-h-screen">
      <Header />
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex items-center gap-4">
          <Link href="/" className="p-2 rounded-xl text-[var(--color-text-muted)] hover:text-[var(--color-brand)] hover:bg-[var(--color-bg-hover)] transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="font-display text-3xl font-bold text-[var(--color-text-primary)]">Keranjang</h1>
            <p className="text-[var(--color-text-muted)]">{count} item{count !== 1 ? "s" : ""}</p>
          </div>
        </motion.div>

        {items.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
            <ShoppingBag className="mx-auto h-16 w-16 text-[var(--color-text-muted)]/30" />
            <h2 className="mt-4 font-display text-xl font-semibold text-[var(--color-text-primary)]">Keranjang kosong</h2>
            <p className="mt-2 text-[var(--color-text-secondary)]">Belum ada cardigan di keranjang.</p>
            <Link
              href="#koleksi"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-brand)] px-6 py-3 font-display text-base font-medium text-[var(--color-text-inverse)] hover:bg-[var(--color-brand-hover)] transition-colors"
            >
              <ShoppingBag className="h-5 w-5" />
              Mulai Belanja
            </Link>
          </motion.div>
        ) : (
          <>
            <div className="space-y-4">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-4 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] p-4 shadow-sm"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-[var(--color-bg-elevated)]">
                    {item.photo ? (
                      <img src={item.photo} alt={item.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <ShoppingBag className="h-8 w-8 text-[var(--color-text-muted)]/30" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-base font-semibold text-[var(--color-text-primary)] truncate">{item.name}</h3>
                    <p className="mt-1 font-mono text-sm text-[var(--color-brand)]">{formatRupiah(item.price)}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] hover:bg-[var(--color-bg-hover)] transition-colors"
                        aria-label="Kurangi"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-10 text-center font-mono text-sm text-[var(--color-text-primary)]">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] hover:bg-[var(--color-bg-hover)] transition-colors"
                        aria-label="Tambah"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg border border-transparent text-[var(--color-text-muted)] hover:border-[var(--color-error)] hover:text-[var(--color-error)] hover:bg-[var(--color-error)]/10 transition-colors"
                        aria-label="Hapus"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] p-6 shadow-sm">
              <div className="flex justify-between text-[var(--color-text-secondary)]">
                <span>Subtotal</span>
                <span>{formatRupiah(total)}</span>
              </div>
              <div className="mt-2 flex justify-between text-[var(--color-text-muted)] text-sm">
                <span>Ongkir</span>
                <span>Dihitung di checkout</span>
              </div>
              <div className="mt-4 border-t border-[var(--color-border)] pt-4 flex justify-between font-display text-lg font-bold text-[var(--color-text-primary)]">
                <span>Total</span>
                <span>{formatRupiah(total)}</span>
              </div>
              <button
                className="mt-6 w-full rounded-xl bg-[var(--color-brand)] py-3.5 font-display text-base font-medium text-[var(--color-text-inverse)] hover:bg-[var(--color-brand-hover)] transition-colors"
              >
                Lanjut ke WhatsApp
              </button>
            </motion.div>
          </>
        )}
      </section>
    </main>
  );
}
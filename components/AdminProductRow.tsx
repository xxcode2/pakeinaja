"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { formatRupiah } from "@/lib/whatsapp";
import { Edit, Trash2, Eye, Tag, Truck, CheckCircle, XCircle, MoreVertical } from "lucide-react";
import { useToast } from "@/components/Toast";

interface AdminProductRowProps {
  product: {
    id: string;
    name: string;
    price: number;
    photos: string[];
    sold: boolean;
    createdAt: number;
  };
  onChange: (updated: any, deletedId?: string) => void;
  onEdit: (product: any) => void;
  onDelete: (id: string) => void;
  index?: number;
}

export default function AdminProductRow({ product, onChange, onEdit, onDelete, index = 0 }: AdminProductRowProps) {
  const { showToast } = useToast();
  const [busy, setBusy] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  async function toggleSold() {
    setBusy("toggle");
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sold: !product.sold }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mengubah status");
      onChange(data.product);
      showToast({
        type: "success",
        title: product.sold ? "Ditandai tersedia" : "Ditandai terjual",
        message: `"${product.name}" berhasil diperbarui`,
      });
    } catch (err: any) {
      showToast({ type: "error", title: "Gagal", message: err.message });
    } finally {
      setBusy(null);
    }
  }

  async function handleDelete() {
    setBusy("delete");
    try {
      const res = await fetch(`/api/products/${product.id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menghapus");
      onChange(null, product.id);
      showToast({ type: "success", title: "Produk dihapus", message: `"${product.name}" berhasil dihapus` });
    } catch (err: any) {
      showToast({ type: "error", title: "Gagal menghapus", message: err.message });
    } finally {
      setBusy(null);
    }
  }

  const statusConfig = product.sold
    ? { label: "Terjual", bg: "bg-[var(--color-accent-terracotta)]/15", text: "text-[var(--color-accent-terracotta)]", border: "border-[var(--color-accent-terracotta)]/30", icon: XCircle }
    : { label: "Tersedia", bg: "bg-[var(--color-success)]/15", text: "text-[var(--color-success)]", border: "border-[var(--color-success)]/30", icon: CheckCircle };

  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className="border-b border-[var(--color-border)] hover:bg-[var(--color-bg-hover)]/50 transition-colors"
    >
      <td className="px-4 py-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 20 }}
          className="flex items-center gap-3"
        >
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border)]">
            {product.photos?.[0] ? (
              <Image src={product.photos[0]} alt="" fill className="object-cover" sizes="48px" />
            ) : (
              <Tag className="mx-auto my-auto h-6 w-6 text-[var(--color-text-muted)]/30" />
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate font-display text-sm font-medium text-[var(--color-text-primary)]">
              {product.name}
            </p>
            <p className="font-mono text-xs text-[var(--color-brand)]">{formatRupiah(product.price)}</p>
          </div>
        </motion.div>
      </td>

      <td className="px-4 py-4 hidden sm:table-cell">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-xs uppercase tracking-wider ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
        >
          <statusConfig.icon className="h-3 w-3" />
          {statusConfig.label}
        </motion.span>
      </td>

      <td className="px-4 py-4 hidden md:table-cell">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1 rounded-full bg-[var(--color-bg-elevated)] px-2.5 py-1 font-mono text-xs text-[var(--color-text-muted)]"
        >
          <Truck className="h-3 w-3" />
          {product.photos?.length || 0} foto
        </motion.span>
      </td>

      <td className="px-4 py-4 hidden lg:table-cell">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1"
        >
          <span className="font-mono text-xs text-[var(--color-text-muted)]">
            {new Date(product.createdAt).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}
          </span>
        </motion.div>
      </td>

      <td className="px-4 py-4 text-right">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center justify-end gap-1"
        >
          {/* Action Menu */}
          <div className="relative">
            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-xl text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] transition-all duration-200"
              aria-label="Opsi lain"
              aria-expanded={menuOpen}
            >
              <MoreVertical className="h-5 w-5" />
            </motion.button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute right-0 top-full mt-2 z-20 min-w-[160px] rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-[var(--shadow-xl)] overflow-hidden"
                  role="menu"
                >
                  <button
                    onClick={() => { onEdit(product); setMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 font-mono text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-brand)] transition-colors"
                    role="menuitem"
                  >
                    <Edit className="h-4 w-4" />
                    Edit Produk
                  </button>
                  <button
                    onClick={() => { onDelete(product.id); setMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 font-mono text-sm text-[var(--color-error)] hover:bg-[var(--color-error)]/10 transition-colors"
                    role="menuitem"
                  >
                    <Trash2 className="h-4 w-4" />
                    Hapus Produk
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Actions */}
          <motion.button
            onClick={toggleSold}
            disabled={busy !== null}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-2 rounded-xl transition-all duration-200 ${
              product.sold
                ? "text-[var(--color-accent-terracotta)] hover:bg-[var(--color-accent-terracotta)]/10"
                : "text-[var(--color-success)] hover:bg-[var(--color-success)]/10"
            } ${busy === "toggle" ? "opacity-50 cursor-wait" : ""}`}
            aria-label={product.sold ? "Tandai tersedia" : "Tandai terjual"}
            aria-busy={busy === "toggle"}
          >
            {product.sold ? (
              <XCircle className="h-5 w-5" />
            ) : (
              <CheckCircle className="h-5 w-5" />
            )}
            {busy === "toggle" && <motion.div className="absolute h-5 w-5 animate-spin" />}
          </motion.button>

          <motion.button
            onClick={() => onEdit(product)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-xl text-[var(--color-text-muted)] hover:text-[var(--color-brand)] hover:bg-[var(--color-bg-hover)] transition-all duration-200"
            aria-label="Edit produk"
          >
            <Edit className="h-5 w-5" />
          </motion.button>

          <motion.button
            onClick={() => onDelete(product.id)}
            disabled={busy !== null}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-xl text-[var(--color-text-muted)] hover:text-[var(--color-error)] hover:bg-[var(--color-error)]/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Hapus produk"
            aria-busy={busy === "delete"}
          >
            <Trash2 className="h-5 w-5" />
            {busy === "delete" && <motion.div className="absolute h-5 w-5 animate-spin" />}
          </motion.button>
        </motion.div>
      </td>
    </motion.tr>
  );
}
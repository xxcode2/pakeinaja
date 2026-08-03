"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import AdminProductForm from "@/components/AdminProductForm";
import AdminProductRow from "@/components/AdminProductRow";
import ExportButton from "@/components/ExportButton";
import { useToast } from "@/components/Toast";
import { Plus, LogOut, Download, Search, Filter, ChevronDown, ChevronUp, MoreVertical, Edit, Trash2, Eye, Tag, Truck, RefreshCw } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const { showToast } = useToast();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "available" | "sold">("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "name" | "price-asc" | "price-desc">("newest");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => setProducts(data.products || []))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = products
    .filter((p) => {
      if (statusFilter === "available") return !p.sold;
      if (statusFilter === "sold") return p.sold;
      return true;
    })
    .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case "oldest": return a.createdAt - b.createdAt;
        case "name": return a.name.localeCompare(b.name);
        case "price-asc": return a.price - b.price;
        case "price-desc": return b.price - a.price;
        default: return b.createdAt - a.createdAt;
      }
    });

  function handleChange(updated: any, deletedId?: string) {
    if (deletedId) {
      setProducts((prev) => prev.filter((p) => p.id !== deletedId));
      return;
    }
    setProducts((prev) => {
      const exists = prev.some((p) => p.id === updated.id);
      return exists
        ? prev.map((p) => (p.id === updated.id ? updated : p))
        : [updated, ...prev];
    });
  }

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(product: any) {
    setEditing(product);
    setFormOpen(true);
  }

  function handleSaved(product: any) {
    handleChange(product);
    setFormOpen(false);
    showToast({
      type: editing ? "success" : "success",
      title: editing ? "Produk diperbarui" : "Produk ditambahkan",
      message: `"${product.name}" berhasil disimpan`,
    });
  }

  async function handleDelete(id: string) {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menghapus");

      setProducts((prev) => prev.filter((p) => p.id !== id));
      setDeleteConfirm(null);
      showToast({ type: "success", title: "Produk dihapus", message: `"${product.name}" berhasil dihapus` });
    } catch (err: any) {
      showToast({ type: "error", title: "Gagal menghapus", message: err.message });
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const available = products.filter((p) => !p.sold).length;
  const sold = products.filter((p) => p.sold).length;

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Header */}
      <header className="sticky top-0 z-[var(--z-sticky)] bg-[var(--color-bg)]/90 backdrop-blur-sm border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-brand)] to-[var(--color-brand-dark)]"
              >
                <Tag className="h-5 w-5 text-[var(--color-text-inverse)]" />
              </motion.div>
              <div>
                <h1 className="font-display text-xl font-bold text-[var(--color-text-primary)]">Kelola Produk</h1>
                <p className="font-mono text-xs text-[var(--color-text-muted)]">
                  {products.length} total · {available} tersedia · {sold} terjual
                </p>
              </div>
            </div>
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-4 py-2 font-mono text-sm text-[var(--color-text-secondary)] hover:border-[var(--color-brand)]/50 hover:text-[var(--color-brand)] transition-all duration-200"
            >
              <LogOut className="h-4 w-4" />
              Keluar
            </motion.button>
          </div>
        </div>
      </header>

      {/* Toolbar */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)]/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari nama produk..."
                  className="w-full h-10 pl-10 pr-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-all"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-[var(--color-text-muted)]" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                  className="h-10 px-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-primary)] font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-all cursor-pointer"
                >
                  <option value="all">Semua Status</option>
                  <option value="available">Tersedia</option>
                  <option value="sold">Terjual</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="h-10 px-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-primary)] font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-all cursor-pointer"
                >
                  <option value="newest">Terbaru</option>
                  <option value="oldest">Terlama</option>
                  <option value="name">Nama A-Z</option>
                  <option value="price-asc">Harga Terendah</option>
                  <option value="price-desc">Harga Tertinggi</option>
                </select>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <ExportButton products={products} />
              <motion.button
                onClick={openCreate}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 rounded-xl bg-[var(--color-brand)] px-5 py-2.5 font-display text-sm font-medium text-[var(--color-text-inverse)] shadow-[var(--shadow-md)] hover:bg-[var(--color-brand-hover)] hover:shadow-[var(--shadow-lg)] transition-all duration-200"
              >
                <Plus className="h-4 w-4" />
                Tambah Produk
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Table */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center h-64"
            >
              <div className="text-center">
                <RefreshCw className="mx-auto mb-3 h-10 w-10 animate-spin text-[var(--color-brand)]" />
                <p className="font-mono text-sm text-[var(--color-text-muted)]">Memuat produk...</p>
              </div>
            </motion.div>
          ) : filteredProducts.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-16"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-brand)]/10 text-[var(--color-brand)]"
              >
                <Tag className="h-8 w-8" />
              </motion.div>
              <h3 className="font-display text-xl font-semibold text-[var(--color-text-primary)]">
                Tidak ada produk
              </h3>
              <p className="mt-2 text-[var(--color-text-muted)]">
                {searchQuery
                  ? `Tidak ada produk dengan kata kunci "${searchQuery}"`
                  : statusFilter !== "all"
                  ? `Tidak ada produk dengan status ${statusFilter === "available" ? "Tersedia" : "Terjual"}`
                  : "Belum ada produk ditambahkan. Klik tombol 'Tambah Produk' untuk memulai."
                }
              </p>
              {(searchQuery || statusFilter !== "all") && (
                <motion.button
                  onClick={() => { setSearchQuery(""); setStatusFilter("all"); }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[var(--color-brand)] px-5 py-2.5 font-mono text-sm font-medium text-[var(--color-text-inverse)] hover:bg-[var(--color-brand-hover)] transition-colors"
                >
                  <RefreshCw className="h-4 w-4" />
                  Reset Filter
                </motion.button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="table"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="overflow-hidden rounded-xl border border-[var(--color-border)]"
            >
              <div className="overflow-x-auto">
                <table className="w-full" role="table">
                  <thead>
                    <tr className="bg-[var(--color-bg-elevated)] border-b border-[var(--color-border)]">
                      <th className="px-4 py-3 text-left font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)]">Produk</th>
                      <th className="px-4 py-3 text-left font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)] hidden sm:table-cell">Harga</th>
                      <th className="px-4 py-3 text-left font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)] hidden md:table-cell">Status</th>
                      <th className="px-4 py-3 text-left font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)] hidden lg:table-cell">Foto</th>
                      <th className="px-4 py-3 text-right font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)]">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product, index) => (
                      <AdminProductRow
                        key={product.id}
                        product={product}
                        onChange={handleChange}
                        onEdit={openEdit}
                        onDelete={handleDelete}
                        index={index}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Modal Form */}
      <AnimatePresence>
        {formOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[var(--z-modal-backdrop)] bg-black/60 backdrop-blur-sm"
            onClick={() => setFormOpen(false)}
            aria-hidden="true"
          />
        )}
        {formOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="form-title"
          >
            <AdminProductForm
              initial={editing}
              onClose={() => setFormOpen(false)}
              onSaved={handleSaved}
            />
          </motion.div>
        )}

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {deleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[var(--z-modal-backdrop)] bg-black/60 backdrop-blur-sm"
              onClick={() => setDeleteConfirm(null)}
              aria-hidden="true"
            />
          )}
          {deleteConfirm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[var(--z-modal)] w-full max-w-md bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-[var(--radius-xl)] p-6 shadow-[var(--shadow-xl)]"
              onClick={(e) => e.stopPropagation()}
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="delete-title"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-error)]/15 text-[var(--color-error)]"
              >
                <Trash2 className="h-6 w-6" />
              </motion.div>
              <h3 id="delete-title" className="text-center font-display text-lg font-semibold text-[var(--color-text-primary)]">
                Hapus produk?
              </h3>
              <p className="mt-2 text-center text-[var(--color-text-secondary)]">
                Yakin ingin menghapus <strong className="text-[var(--color-text-primary)]">"{products.find(p => p.id === deleteConfirm)?.name}"</strong>? Tindakan ini tidak bisa dibatalkan.
              </p>
              <div className="mt-6 flex gap-3">
                <motion.button
                  onClick={() => setDeleteConfirm(null)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] py-2.5 font-mono text-sm font-medium text-[var(--color-text-secondary)] hover:border-[var(--color-brand)]/50 hover:text-[var(--color-brand)] transition-all duration-200"
                >
                  Batal
                </motion.button>
                <motion.button
                  onClick={() => handleDelete(deleteConfirm)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 rounded-xl bg-[var(--color-error)] py-2.5 font-display text-sm font-medium text-white hover:bg-[var(--color-error)]/90 transition-colors"
                >
                  Hapus Sekarang
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </AnimatePresence>
    </div>
  );
}
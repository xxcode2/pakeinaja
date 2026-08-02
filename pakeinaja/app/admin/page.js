"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminProductForm from "@/components/AdminProductForm";
import AdminProductRow from "@/components/AdminProductRow";
import ExportButton from "@/components/ExportButton";

export default function AdminDashboard() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => setProducts(data.products || []))
      .finally(() => setLoading(false));
  }, []);

  function handleChange(updated, deletedId) {
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

  function openEdit(product) {
    setEditing(product);
    setFormOpen(true);
  }

  function handleSaved(product) {
    handleChange(product);
    setFormOpen(false);
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const available = products.filter((p) => !p.sold).length;

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-bold text-bone-50">
            Kelola produk
          </h1>
          <p className="font-mono text-xs text-bone-200/40">
            {products.length} produk · {available} tersedia
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="font-mono text-[11px] uppercase tracking-wider text-bone-200/40 hover:text-bone-200"
        >
          keluar
        </button>
      </div>

      <div className="mt-5 flex gap-2">
        <button
          onClick={openCreate}
          className="rounded-tag bg-mustard-500 px-4 py-2 font-display text-sm font-medium text-pine-950 hover:bg-mustard-400"
        >
          + Tambah produk
        </button>
        <ExportButton products={products} />
      </div>

      <div className="mt-6 space-y-2">
        {loading ? (
          <p className="font-mono text-xs text-bone-200/40">Memuat...</p>
        ) : products.length === 0 ? (
          <p className="font-mono text-xs text-bone-200/40">
            Belum ada produk. Klik &quot;Tambah produk&quot; buat mulai.
          </p>
        ) : (
          products.map((p) => (
            <AdminProductRow key={p.id} product={p} onChange={handleChange} onEdit={openEdit} />
          ))
        )}
      </div>

      {formOpen && (
        <AdminProductForm
          initial={editing}
          onClose={() => setFormOpen(false)}
          onSaved={handleSaved}
        />
      )}
    </main>
  );
}

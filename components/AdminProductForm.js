"use client";

import { useState } from "react";
import Image from "next/image";

export default function AdminProductForm({ initial, onClose, onSaved }) {
  const isEdit = Boolean(initial);
  const [name, setName] = useState(initial?.name || "");
  const [price, setPrice] = useState(initial?.price || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [photos, setPhotos] = useState(initial?.photos || []);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleFiles(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    setError("");

    const uploaded = [];
    try {
      for (let i = 0; i < files.length; i++) {
        setUploadProgress(`Mengunggah foto ${i + 1} dari ${files.length}...`);
        const formData = new FormData();
        formData.append("file", files[i]);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload gagal.");

        uploaded.push(data.url);
      }
      setPhotos((prev) => [...prev, ...uploaded]);
    } catch (err) {
      setError(
        uploaded.length
          ? `Sebagian foto gagal diunggah: ${err.message}`
          : err.message || "Upload gagal."
      );
      if (uploaded.length) setPhotos((prev) => [...prev, ...uploaded]);
    } finally {
      setUploading(false);
      setUploadProgress("");
      e.target.value = "";
    }
  }

  function removePhoto(url) {
    setPhotos((prev) => prev.filter((p) => p !== url));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !price) {
      setError("Nama dan harga wajib diisi.");
      return;
    }
    setSaving(true);
    setError("");

    const payload = { name, price: Number(price), description, photos };

    try {
      const res = await fetch(
        isEdit ? `/api/products/${initial.id}` : "/api/products",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menyimpan.");
      onSaved(data.product);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-pine-950/90 p-4">
      <form
        onSubmit={handleSubmit}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-tag border border-bone-200/15 bg-pine-900 p-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-bone-50">
            {isEdit ? "Edit produk" : "Tambah produk"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="font-mono text-xs text-bone-200/40 hover:text-bone-200"
          >
            tutup
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <label className="font-mono text-xs uppercase tracking-wider text-bone-200/50">
              Nama cardigan
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Cardigan Rajut Oversize"
              className="mt-1 w-full rounded-tag border border-bone-200/15 bg-pine-950 px-3 py-2 text-sm text-bone-100 placeholder:text-bone-200/30 focus:outline-none focus:ring-1 focus:ring-mustard-500"
            />
          </div>

          <div>
            <label className="font-mono text-xs uppercase tracking-wider text-bone-200/50">
              Harga (Rp)
            </label>
            <input
              type="number"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="150000"
              className="mt-1 w-full rounded-tag border border-bone-200/15 bg-pine-950 px-3 py-2 text-sm text-bone-100 placeholder:text-bone-200/30 focus:outline-none focus:ring-1 focus:ring-mustard-500"
            />
          </div>

          <div>
            <label className="font-mono text-xs uppercase tracking-wider text-bone-200/50">
              Deskripsi
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Bahan, ukuran, warna, kondisi, dll."
              className="mt-1 w-full rounded-tag border border-bone-200/15 bg-pine-950 px-3 py-2 text-sm text-bone-100 placeholder:text-bone-200/30 focus:outline-none focus:ring-1 focus:ring-mustard-500"
            />
          </div>

          <div>
            <label className="font-mono text-xs uppercase tracking-wider text-bone-200/50">
              Foto
            </label>

            {photos.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {photos.map((url) => (
                  <div key={url} className="relative h-16 w-16 overflow-hidden rounded-tag border border-bone-200/15">
                    <Image src={url} alt="" fill className="object-cover" />
                    <button
                      type="button"
                      onClick={() => removePhoto(url)}
                      className="absolute top-1 right-1 rounded-full bg-pine-950/80 p-1 text-bone-100 hover:bg-mustard-500 transition-colors"
                      aria-label="Hapus foto"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              multiple
              onChange={handleFiles}
              disabled={uploading}
              className="mt-2 w-full text-sm text-bone-200/70 file:mr-3 file:rounded-tag file:border-bone-200/15 file:bg-pine-950 file:px-3 file:py-1 file:text-xs file:font-mono hover:file:bg-mustard-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {uploadProgress && (
              <p className="mt-1 text-xs text-mustard-500">{uploadProgress}</p>
            )}
            {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
            <p className="mt-1 text-xs text-bone-200/40">
              Maks 15MB per foto. Format: JPG, PNG, WebP, GIF.
            </p>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-tag bg-mustard-500 px-4 py-2 text-sm font-bold text-pine-950 hover:bg-mustard-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Menyimpan..." : isEdit ? "Simpan perubahan" : "Tambah produk"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="flex-1 rounded-tag border border-bone-200/15 bg-pine-950 px-4 py-2 text-sm font-medium text-bone-100 hover:border-mustard-500 disabled:opacity-50"
            >
              Batal
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
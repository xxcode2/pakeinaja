"use client";

export default function ExportButton({ products }) {
  async function handleExport() {
    const XLSX = await import("xlsx");

    const rows = products.map((p) => ({
      Nama: p.name,
      Harga: p.price,
      Status: p.sold ? "Terjual" : "Tersedia",
      "Jumlah Foto": p.photos?.length || 0,
      Deskripsi: p.description || "",
      "Dibuat Pada": new Date(p.createdAt).toLocaleString("id-ID"),
    }));

    const sheet = XLSX.utils.json_to_sheet(rows);
    sheet["!cols"] = [
      { wch: 28 },
      { wch: 14 },
      { wch: 12 },
      { wch: 10 },
      { wch: 40 },
      { wch: 20 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, "Produk");

    const today = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(wb, `pakeinaja-produk-${today}.xlsx`);
  }

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={!products.length}
      className="rounded-tag border border-sage-500/40 px-4 py-2 font-mono text-xs uppercase tracking-wider text-sage-400 transition-colors hover:bg-sage-500/10 disabled:cursor-not-allowed disabled:opacity-30"
    >
      Export .xlsx
    </button>
  );
}

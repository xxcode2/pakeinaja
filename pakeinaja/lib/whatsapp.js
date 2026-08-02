export function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(number || 0);
}

export function buildWaLink({ productName, price, url }) {
  const number = process.env.NEXT_PUBLIC_WA_NUMBER;
  const lines = [
    `Halo PAKEINAJA, saya mau tanya soal produk ini:`,
    `*${productName}*`,
    price ? `Harga: ${formatRupiah(price)}` : null,
    url || null,
    `Masih ada stoknya, kak?`,
  ].filter(Boolean);
  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${number}?text=${text}`;
}

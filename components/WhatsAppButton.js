"use client";

import { formatRupiah, buildWaLink } from "@/lib/whatsapp";

export default function WhatsAppButton({ product, siteUrl }) {
  const waLink = buildWaLink({
    productName: product.name,
    price: product.price,
    url: siteUrl ? `${siteUrl}/produk/${product.id}` : undefined,
  });

  if (product.sold) {
    return (
      <a
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-tag px-5 py-3 font-display text-sm font-medium cursor-not-allowed bg-pine-800 text-bone-200/30"
      >
        Sudah terjual
      </a>
    );
  }

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-8 flex w-full items-center justify-center gap-2 rounded-tag px-5 py-3 font-display text-sm font-medium bg-sage-500 text-pine-950 hover:bg-sage-400 transition-colors sm:w-auto sm:px-8"
    >
      Tanya via WhatsApp
    </a>
  );
}
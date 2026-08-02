import Image from "next/image";
import Link from "next/link";
import { formatRupiah } from "@/lib/whatsapp";

export default function ProductCard({ product }) {
  const cover = product.photos?.[0];

  return (
    <Link
      href={`/produk/${product.id}`}
      className="hang-tag group block rounded-tag bg-pine-900 stitch-border p-3 pt-5 transition-transform hover:-translate-y-1"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-tag bg-pine-800">
        {cover ? (
          <Image
            src={cover}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover transition-all duration-300 ${
              product.sold ? "grayscale opacity-60" : "group-hover:scale-105"
            }`}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-bone-200/40 font-mono text-xs">
            belum ada foto
          </div>
        )}

        {product.sold && (
          <span className="tag-rotate absolute left-2 top-2 rounded-tag bg-brick-500 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-bone-50 shadow">
            Sold
          </span>
        )}
      </div>

      <div className="mt-3 space-y-1">
        <h3 className="font-display text-sm font-medium leading-snug text-bone-100 line-clamp-2">
          {product.name}
        </h3>
        <p className="font-mono text-sm text-mustard-400">
          {formatRupiah(product.price)}
        </p>
      </div>
    </Link>
  );
}

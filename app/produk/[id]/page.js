import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Gallery from "@/components/Gallery";
import { getProduct } from "@/lib/kv";
import { formatRupiah, buildWaLink } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);
  if (!product) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const waLink = buildWaLink({
    productName: product.name,
    price: product.price,
    url: siteUrl ? `${siteUrl}/produk/${product.id}` : undefined,
  });

  return (
    <main>
      <Header />
      <section className="mx-auto grid max-w-5xl gap-8 px-4 py-8 sm:px-6 md:grid-cols-2 md:gap-12 md:py-14">
        <Gallery photos={product.photos} name={product.name} sold={product.sold} />

        <div>
          <h1 className="font-display text-2xl font-bold text-bone-50 sm:text-3xl">
            {product.name}
          </h1>
          <p className="mt-2 font-mono text-xl text-mustard-500">
            {formatRupiah(product.price)}
          </p>

          {product.sold && (
            <p className="mt-3 inline-block rounded-tag bg-brick-500/15 px-3 py-1 font-mono text-xs uppercase tracking-wider text-brick-500">
              Barang sudah terjual
            </p>
          )}

          {product.description && (
            <p className="mt-6 whitespace-pre-line font-body text-sm leading-relaxed text-bone-200/70">
              {product.description}
            </p>
          )}

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-8 flex w-full items-center justify-center gap-2 rounded-tag px-5 py-3 font-display text-sm font-medium transition-colors sm:w-auto sm:px-8 ${
              product.sold
                ? "cursor-not-allowed bg-pine-800 text-bone-200/30"
                : "bg-sage-500 text-pine-950 hover:bg-sage-400"
            }`}
            onClick={(e) => product.sold && e.preventDefault()}
          >
            {product.sold ? "Sudah terjual" : "Tanya via WhatsApp"}
          </a>
        </div>
      </section>
    </main>
  );
}

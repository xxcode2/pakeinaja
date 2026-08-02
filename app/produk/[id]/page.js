import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Gallery from "@/components/Gallery";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getProduct } from "@/lib/kv";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);
  if (!product) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

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
            Rp{product.price.toLocaleString("id-ID")}
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

          <WhatsAppButton product={product} siteUrl={siteUrl} />
        </div>
      </section>
    </main>
  );
}
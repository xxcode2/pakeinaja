import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import { getAllProducts } from "@/lib/kv";

export const dynamic = "force-dynamic";

const brand = process.env.NEXT_PUBLIC_BRAND_NAME || "PAKEINAJA";

export default async function HomePage() {
  const products = await getAllProducts();
  const available = products.filter((p) => !p.sold).length;

  return (
    <main>
      <Header />

      <section className="mx-auto max-w-6xl px-4 pb-6 pt-10 sm:px-6 sm:pt-14">
        <p className="font-mono text-xs uppercase tracking-widest text-sage-400">
          {available} cardigan siap dipake sekarang
        </p>
        <h1 className="mt-3 max-w-xl font-display text-3xl font-bold leading-tight text-bone-50 sm:text-5xl">
          Pake in aja,
          <br />
          <span className="text-mustard-500">gausah pikir lama.</span>
        </h1>
        <p className="mt-4 max-w-md font-body text-sm text-bone-200/60">
          Klik cardigan yang kamu suka, lihat semua fotonya, terus tinggal chat
          WhatsApp buat pastiin stok &amp; ukurannya.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <ProductGrid products={products} />
      </section>
    </main>
  );
}

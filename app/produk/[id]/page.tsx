import { notFound } from "next/navigation";
import { getProduct } from "@/lib/kv";
import ProductContent from "@/components/ProductContent";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let product = null;
  try {
    product = await getProduct(id);
  } catch (e) {
    console.error("[product] getProduct failed:", e);
  }
  if (!product) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const brand = process.env.NEXT_PUBLIC_BRAND_NAME || "PAKEINAJA";

  return <ProductContent product={product} siteUrl={siteUrl} brand={brand} />;
}
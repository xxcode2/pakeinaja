import { getAllProducts } from "@/lib/kv";
import HomeContent from "@/components/HomeContent";

export const dynamic = "force-dynamic";

const brand = process.env.NEXT_PUBLIC_BRAND_NAME || "PAKEINAJA";

export default async function HomePage() {
  let products: Array<{
    id: string;
    name: string;
    price: number;
    photos: string[];
    sold: boolean;
    createdAt: number;
  }> = [];

  try {
    products = await getAllProducts();
  } catch (e) {
    console.error("[home] getAllProducts failed:", e);
    products = [];
  }

  return <HomeContent products={products} brand={brand} />;
}
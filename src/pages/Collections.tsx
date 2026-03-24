import { useParams } from "react-router-dom";
import CollectionGrid from "@/components/CollectionGrid";
import { products } from "@/lib/products";

const categoryLabels: Record<string, string> = {
  kurtis: "Kurtis",
  "silk-sets": "Silk Sets",
  "cotton-specials": "Cotton Specials",
  "new-arrivals": "New Arrivals",
};

export default function Collections() {
  const { type } = useParams<{ type: string }>();
  const filtered = type
    ? products.filter((p) => p.category === type)
    : products;
  const title = type ? categoryLabels[type] || "Collection" : "All Collections";

  return (
    <main className="pt-16 md:pt-20">
      <CollectionGrid products={filtered} title={title} subtitle="Kothari Creation" />
    </main>
  );
}

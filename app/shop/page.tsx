import { Metadata } from "next";
import { products } from "@/data/products";
import { ShopFilters } from "@/components/ShopFilters";

export const metadata: Metadata = {
  title: "Shop — Botanical, Natural History & Heritage Prints",
  description:
    "Browse the full Archive & Bloom catalogue: botanical, natural history, architecture, and scientific prints from public-domain collections. Filter by category, color tone and size.",
};

export default function ShopPage() {
  return (
    <section className="max-w-8xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
      <header className="max-w-2xl mb-14">
        <p className="eyebrow mb-4">The catalogue</p>
        <h1 className="font-serif text-5xl lg:text-6xl text-umber leading-[1.05]">
          Every print, gathered into one room.
        </h1>
        <p className="mt-6 text-stone font-sans font-light leading-relaxed">
          A small, slowly-growing selection of plates restored from public
          archives. Filter by category, colour tone or size — or simply scroll.
        </p>
      </header>

      <ShopFilters products={products} />
    </section>
  );
}

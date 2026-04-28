import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/types";

interface Props {
  eyebrow: string;
  title: string;
  description: string;
  products: Product[];
}

export function CollectionPage({ eyebrow, title, description, products }: Props) {
  return (
    <section className="max-w-8xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
      <header className="max-w-2xl mb-14">
        <p className="eyebrow mb-4">{eyebrow}</p>
        <h1 className="font-serif text-5xl lg:text-6xl text-umber leading-[1.05]">
          {title}
        </h1>
        <p className="mt-6 text-stone font-sans font-light leading-relaxed">
          {description}
        </p>
      </header>

      {products.length === 0 ? (
        <p className="font-serif italic text-stone text-lg py-20">
          This collection is being curated. Check back soon.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}

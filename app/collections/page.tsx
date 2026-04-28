import Link from "next/link";
import type { Metadata } from "next";
import { products } from "@/data/products";
import { PlaceholderArt } from "@/components/PlaceholderArt";

export const metadata: Metadata = {
  title: "Collections — Botanical, Natural History & Heritage",
  description:
    "Browse Archive & Bloom by collection: botanical plates, natural history studies, architectural prints and curated gallery wall sets.",
};

const COLLECTIONS = [
  {
    slug: "botanical",
    title: "Botanical Prints",
    description: "Plates from nineteenth-century botanical surveys — soft, considered, calm.",
    sample: products.find((p) => p.category === "Botanical Prints"),
  },
  {
    slug: "natural-history",
    title: "Natural History",
    description: "Birds, butterflies, shells, fish — the quiet field studies.",
    sample: products.find((p) => p.category === "Natural History"),
  },
  {
    slug: "architecture",
    title: "Architecture & Places",
    description: "Old city plans, elevations, and travel studies.",
    sample: products.find((p) => p.category === "Architecture & Places"),
  },
  {
    slug: "scientific",
    title: "Scientific & Curious",
    description: "Anatomical studies, celestial charts, encyclopaedic plates.",
    sample: products.find((p) => p.category === "Scientific & Curious"),
  },
  {
    slug: "gallery-walls",
    title: "Gallery Wall Sets",
    description: "Sets of two, three, four or six prints, balanced for tone.",
    sample: products.find((p) => p.isGalleryWall),
  },
];

export default function CollectionsPage() {
  return (
    <section className="max-w-8xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
      <header className="max-w-2xl mb-16">
        <p className="eyebrow mb-4">All collections</p>
        <h1 className="font-serif text-5xl lg:text-6xl text-umber leading-[1.05]">
          A quieter way to browse.
        </h1>
        <p className="mt-6 text-stone font-sans font-light leading-relaxed">
          The catalogue, organised the way we think about it ourselves —
          by mood and motif rather than by trend.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-14">
        {COLLECTIONS.map((c) => (
          <Link
            key={c.slug}
            href={`/collections/${c.slug}`}
            className="group block"
          >
            <div className="aspect-[5/4] bg-cream overflow-hidden">
              {c.sample && (
                <PlaceholderArt
                  config={c.sample.placeholder}
                  className="w-full h-full transition-transform duration-700 group-hover:scale-[1.02]"
                  poster={false}
                />
              )}
            </div>
            <div className="mt-6">
              <h2 className="font-serif text-3xl text-umber group-hover:text-botanical transition-colors">
                {c.title}
              </h2>
              <p className="mt-2 text-stone font-sans font-light">{c.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

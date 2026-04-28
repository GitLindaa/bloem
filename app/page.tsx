import Link from "next/link";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { TrustBlocks } from "@/components/TrustBlocks";
import { PlaceholderArt } from "@/components/PlaceholderArt";

export default function HomePage() {
  const botanical = products.filter((p) => p.category === "Botanical Prints").slice(0, 4);
  const galleryWalls = products.filter((p) => p.isGalleryWall).slice(0, 3);
  const newlyRestored = [...products].slice(0, 4);

  return (
    <>
      {/* ============================== HERO ============================== */}
      <section className="relative overflow-hidden">
        <div className="max-w-8xl mx-auto px-6 lg:px-10 pt-20 pb-24 lg:pt-32 lg:pb-32 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7 reveal">
            <p className="eyebrow mb-6">A small, considered catalogue</p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-umber leading-[1.05] tracking-tight">
              Curated heritage prints
              <br />
              for <span className="italic text-botanical">quiet,</span>
              <br />
              timeless interiors.
            </h1>
            <p className="mt-8 max-w-xl text-lg text-stone leading-relaxed font-sans font-light">
              Botanical, natural history and archival illustrations carefully
              selected from public-domain collections and printed on premium
              paper.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/shop" className="btn-primary">
                Explore the collection
              </Link>
              <Link href="/collections/gallery-walls" className="btn-secondary">
                View gallery wall sets
              </Link>
            </div>
          </div>

          {/* Hero illustration — layered placeholder plates */}
          <div className="lg:col-span-5 relative h-[420px] sm:h-[520px] reveal reveal-delay-1">
            <div className="absolute top-0 left-0 w-[58%] h-[80%] shadow-[0_20px_60px_-30px_rgba(58,46,34,0.4)] rotate-[-2deg]">
              <PlaceholderArt
                config={{ motif: "fern", background: "olive-tint" }}
                className="w-full h-full"
              />
            </div>
            <div className="absolute top-[10%] right-0 w-[55%] h-[78%] shadow-[0_20px_60px_-30px_rgba(58,46,34,0.4)] rotate-[3deg]">
              <PlaceholderArt
                config={{ motif: "butterfly", background: "blue-tint" }}
                className="w-full h-full"
              />
            </div>
            <div className="absolute bottom-0 left-[18%] w-[50%] h-[72%] shadow-[0_20px_60px_-30px_rgba(58,46,34,0.4)] rotate-[-1deg]">
              <PlaceholderArt
                config={{ motif: "rose", background: "cream" }}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================== BRAND STATEMENT ============================== */}
      <section className="bg-cream border-y border-umber/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 py-24 text-center">
          <p className="eyebrow mb-6">From forgotten archives to modern walls</p>
          <p className="font-serif text-2xl sm:text-3xl text-umber leading-[1.4] italic">
            “Each image is chosen for composition, atmosphere, historical
            character and how quietly it lives on a wall — never for novelty,
            never for noise.”
          </p>
          <div className="divider w-24 mx-auto mt-10" />
          <p className="mt-8 text-sm text-stone tracking-widest uppercase font-sans">
            The Archive &amp; Bloom curators
          </p>
        </div>
      </section>

      {/* ============================== BOTANICAL FEATURED ============================== */}
      <CollectionStrip
        eyebrow="Featured collection"
        title="Botanical Prints"
        description="A selection of plates drawn from nineteenth-century botanical surveys — soft compositions, considered colour, calm enough to live with for years."
        ctaHref="/collections/botanical"
        ctaLabel="See all botanicals"
        products={botanical}
      />

      {/* ============================== GALLERY WALL SETS ============================== */}
      <CollectionStrip
        eyebrow="Hang as a set"
        title="Gallery Wall Sets"
        description="Two, three, four or six prints, balanced for tone rather than subject — ready to hang as one quiet field."
        ctaHref="/collections/gallery-walls"
        ctaLabel="View all sets"
        products={galleryWalls}
        background="parchment"
      />

      {/* ============================== NEWLY RESTORED ============================== */}
      <CollectionStrip
        eyebrow="Recent additions"
        title="Newly Restored"
        description="The latest works gathered into the catalogue — gently restored from public-domain originals and prepared for print."
        ctaHref="/shop?sort=newest"
        ctaLabel="See what's new"
        products={newlyRestored}
      />

      {/* ============================== TRUST ============================== */}
      <TrustBlocks />

      {/* ============================== ABOUT TEASER ============================== */}
      <section className="max-w-8xl mx-auto px-6 lg:px-10 py-24 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <div className="aspect-square shadow-[0_20px_60px_-30px_rgba(58,46,34,0.4)]">
            <PlaceholderArt
              config={{ motif: "shell", background: "ivory" }}
              className="w-full h-full"
              poster={false}
            />
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <p className="eyebrow mb-6">Our approach</p>
          <h2 className="font-serif text-4xl sm:text-5xl text-umber leading-[1.1]">
            Public-domain treasures, gently restored.
          </h2>
          <p className="mt-6 text-stone leading-relaxed font-sans font-light">
            We spend our weeks reading through botanical surveys, museum
            archives and old natural-history libraries — looking for plates
            that would feel at home on a wall today. Each is reviewed for
            commercial-use eligibility, restored only where the paper has
            faded, and printed on premium archival stock.
          </p>
          <p className="mt-4 text-stone leading-relaxed font-sans font-light">
            We don't print everything we find. Most of what we love stays in
            the archive.
          </p>
          <Link href="/about" className="btn-ghost mt-8">
            Read more about Archive &amp; Bloom →
          </Link>
        </div>
      </section>
    </>
  );
}

// ---------------------------------------------------------------------
// CollectionStrip — reusable featured-collection section
// ---------------------------------------------------------------------

function CollectionStrip({
  eyebrow,
  title,
  description,
  ctaHref,
  ctaLabel,
  products,
  background,
}: {
  eyebrow: string;
  title: string;
  description: string;
  ctaHref: string;
  ctaLabel: string;
  products: typeof import("@/data/products").products;
  background?: "parchment";
}) {
  return (
    <section className={background === "parchment" ? "bg-parchment/40" : ""}>
      <div className="max-w-8xl mx-auto px-6 lg:px-10 py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <p className="eyebrow mb-4">{eyebrow}</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-umber leading-[1.1]">
              {title}
            </h2>
            <p className="mt-4 text-stone font-sans font-light">{description}</p>
          </div>
          <Link href={ctaHref} className="btn-ghost shrink-0">
            {ctaLabel} →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

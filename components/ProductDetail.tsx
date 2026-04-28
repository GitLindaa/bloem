"use client";

import { useState } from "react";
import Link from "next/link";
import type { PaperType, Product } from "@/lib/types";
import { useCart } from "./CartProvider";
import { formatPrice, paperLabel, paperSurcharge, productImageUrl, sizeLabel } from "@/lib/utils";
import { PlaceholderArt } from "./PlaceholderArt";

interface Props {
  product: Product;
  related: Product[];
}

export function ProductDetail({ product, related }: Props) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0].size);
  const [selectedPaper, setSelectedPaper] = useState<PaperType>("matte-archival");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const variant = product.sizes.find((s) => s.size === selectedSize) ?? product.sizes[0];
  const total = variant.price + paperSurcharge(selectedPaper);

  const { addLine } = useCart();

  const handleAddToCart = () => {
    addLine({
      productId: product.id,
      size: selectedSize,
      paper: selectedPaper,
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <article className="max-w-8xl mx-auto px-6 lg:px-10 py-12 lg:py-16">
      {/* Breadcrumb */}
      <nav className="mb-10 text-xs tracking-widest uppercase text-stone font-sans">
        <Link href="/shop" className="hover:text-umber">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-umber">{product.category}</span>
      </nav>

      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
        {/* IMAGE */}
        <div className="lg:col-span-7 lg:sticky lg:top-28 lg:self-start">
          <div className="aspect-[4/5] shadow-[0_30px_80px_-40px_rgba(58,46,34,0.4)]">
            {(() => {
              const imageSrc = productImageUrl(product, 1600);
              return imageSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageSrc}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <PlaceholderArt config={product.placeholder} className="w-full h-full" />
              );
            })()}
          </div>
          <p className="mt-4 text-xs text-stone tracking-widest uppercase font-sans text-center">
            {product.year} · {product.sourceInstitution.split("(")[0].trim()}
          </p>
        </div>

        {/* DETAILS */}
        <div className="lg:col-span-5">
          <p className="eyebrow mb-3">{product.collection}</p>
          <h1 className="font-serif text-4xl lg:text-5xl text-umber leading-[1.1]">
            {product.title}
          </h1>
          <p className="mt-6 font-serif italic text-lg text-botanical leading-relaxed">
            {product.poeticBlurb}
          </p>
          <p className="mt-6 text-stone leading-relaxed font-sans font-light">
            {product.shortDescription}
          </p>

          <div className="divider mt-10" />

          {/* SIZE */}
          <div className="mt-8">
            <h3 className="eyebrow mb-3">Size</h3>
            <div className="grid grid-cols-2 gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s.size}
                  onClick={() => setSelectedSize(s.size)}
                  className={`px-4 py-3 text-left text-sm font-sans border transition-colors ${
                    selectedSize === s.size
                      ? "border-umber bg-umber/5 text-umber"
                      : "border-umber/20 text-stone hover:border-umber/50"
                  }`}
                >
                  <div className="tracking-wide">{sizeLabel(s.size)}</div>
                  <div className="text-xs mt-0.5 text-stone">{formatPrice(s.price)}</div>
                </button>
              ))}
            </div>
          </div>

          {/* PAPER */}
          <div className="mt-8">
            <h3 className="eyebrow mb-3">Paper</h3>
            <div className="grid grid-cols-2 gap-2">
              {(["matte-archival", "premium-textured"] as PaperType[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedPaper(p)}
                  className={`px-4 py-3 text-left text-sm font-sans border transition-colors ${
                    selectedPaper === p
                      ? "border-umber bg-umber/5 text-umber"
                      : "border-umber/20 text-stone hover:border-umber/50"
                  }`}
                >
                  <div className="tracking-wide">{paperLabel(p)}</div>
                  <div className="text-xs mt-0.5 text-stone">
                    {paperSurcharge(p) > 0
                      ? `+ ${formatPrice(paperSurcharge(p))}`
                      : "Included"}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY + ADD */}
          <div className="mt-10 flex items-end gap-4">
            <div>
              <h3 className="eyebrow mb-3">Quantity</h3>
              <div className="flex items-center border border-umber/20">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-umber hover:bg-umber/5"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="px-4 py-3 font-sans text-sm tabular-nums">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-umber hover:bg-umber/5"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
            <button onClick={handleAddToCart} className="btn-primary flex-1">
              {added ? "Added to cart ✓" : `Add to cart · ${formatPrice(total * quantity)}`}
            </button>
          </div>

          <p className="mt-4 text-xs text-stone tracking-wide font-sans">
            Printed on demand. Ships within Europe in 5–8 working days.
          </p>

          {/* DISCLOSURES */}
          <div className="mt-12 space-y-4">
            <Disclosure title="Why we selected this piece">
              <p className="text-stone leading-relaxed font-sans font-light">
                {product.whyWeSelected}
              </p>
            </Disclosure>

            <Disclosure title="Historical context">
              <p className="text-stone leading-relaxed font-sans font-light">
                {product.historicalContext}
              </p>
            </Disclosure>

            <Disclosure title="Source &amp; licensing">
              <dl className="grid grid-cols-[max-content_1fr] gap-x-6 gap-y-2 text-sm text-stone font-sans">
                <dt className="text-umber tracking-wide">Source</dt>
                <dd>{product.sourceInstitution}</dd>
                <dt className="text-umber tracking-wide">Original creator</dt>
                <dd>{product.creator}</dd>
                <dt className="text-umber tracking-wide">Date</dt>
                <dd>{product.year}</dd>
                <dt className="text-umber tracking-wide">Licence</dt>
                <dd>{product.license}</dd>
                <dt className="text-umber tracking-wide">Commercial use</dt>
                <dd>{product.commercialUseAllowed ? "Allowed" : "Not allowed"}</dd>
                <dt className="text-umber tracking-wide">Editing</dt>
                <dd>{product.editingAllowed ? "Allowed" : "Not allowed"}</dd>
                <dt className="text-umber tracking-wide">Attribution</dt>
                <dd>{product.attributionRequired ? "Required" : "Not required"}</dd>
              </dl>
              <p className="mt-4 text-xs text-stone leading-relaxed font-sans italic">
                Each print is sold as a physical reproduction. Buyers do not
                acquire exclusive rights to the underlying image. See our{" "}
                <Link href="/licensing" className="underline underline-offset-2 hover:text-umber">
                  sourcing &amp; licensing page
                </Link>{" "}
                for our full approach.
              </p>
            </Disclosure>
          </div>
        </div>
      </div>

      {/* PAIRS WITH */}
      {related.length > 0 && (
        <section className="mt-32 border-t border-umber/10 pt-16">
          <p className="eyebrow mb-3">Pairs well with</p>
          <h2 className="font-serif text-3xl text-umber mb-10">
            Other quiet pieces from the catalogue
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {related.map((p) => (
              <Link key={p.id} href={`/product/${p.slug}`} className="group">
                <div className="aspect-[4/5] bg-cream overflow-hidden">
                  <PlaceholderArt
                    config={p.placeholder}
                    className="w-full h-full transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
                <p className="font-serif text-umber mt-3 group-hover:text-botanical transition-colors">
                  {p.title}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

// ---------------------------------------------------------------------
// Disclosure — small accessible details/summary block
// ---------------------------------------------------------------------

function Disclosure({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
  return (
    <details className="group border-b border-umber/10 pb-4">
      <summary className="cursor-pointer flex items-center justify-between py-2 text-umber font-serif text-base list-none [&::-webkit-details-marker]:hidden">
        <span>{title}</span>
        <span className="text-stone group-open:rotate-45 transition-transform duration-300 text-xl leading-none">
          +
        </span>
      </summary>
      <div className="mt-3 pl-1">{children}</div>
    </details>
  );
}

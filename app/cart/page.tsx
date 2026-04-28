"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { products } from "@/data/products";
import { formatPrice, paperLabel, paperSurcharge, productImageUrl, sizeLabel } from "@/lib/utils";
import { PlaceholderArt } from "@/components/PlaceholderArt";

export default function CartPage() {
  const { lines, updateQuantity, removeLine } = useCart();

  const enriched = lines
    .map((l) => {
      const product = products.find((p) => p.id === l.productId);
      if (!product) return null;
      const variant = product.sizes.find((s) => s.size === l.size);
      if (!variant) return null;
      const unit = variant.price + paperSurcharge(l.paper);
      return { line: l, product, variant, unit, lineTotal: unit * l.quantity };
    })
    .filter(<T,>(v: T | null): v is T => v !== null);

  const subtotal = enriched.reduce((s, e) => s + e.lineTotal, 0);

  return (
    <section className="max-w-5xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
      <p className="eyebrow mb-4">Your cart</p>
      <h1 className="font-serif text-5xl text-umber leading-[1.05]">
        A few prints, gathered together.
      </h1>

      {enriched.length === 0 ? (
        <div className="mt-16 text-center py-20 border-y border-umber/10">
          <p className="font-serif italic text-2xl text-stone">
            Your cart is quiet for now.
          </p>
          <Link href="/shop" className="btn-primary mt-8">
            Browse the catalogue
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid lg:grid-cols-12 gap-12">
          {/* LINES */}
          <div className="lg:col-span-8 space-y-6">
            {enriched.map(({ line, product, variant, unit, lineTotal }) => (
              <div
                key={`${line.productId}-${line.size}-${line.paper}`}
                className="flex gap-5 pb-6 border-b border-umber/10"
              >
                <Link
                  href={`/product/${product.slug}`}
                  className="block shrink-0 w-24 sm:w-32 aspect-[4/5] bg-cream"
                >
                  {(() => {
                    const imageSrc = productImageUrl(product, 400);
                    return imageSrc ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={imageSrc}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <PlaceholderArt config={product.placeholder} className="w-full h-full" />
                    );
                  })()}
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/product/${product.slug}`}
                    className="font-serif text-xl text-umber hover:text-botanical transition-colors"
                  >
                    {product.title}
                  </Link>
                  <p className="text-sm text-stone mt-1 font-sans">
                    {sizeLabel(line.size)} · {paperLabel(line.paper)}
                  </p>
                  <p className="text-sm text-stone mt-0.5 font-sans">
                    {formatPrice(unit)} each
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center border border-umber/20 text-sm">
                      <button
                        onClick={() =>
                          updateQuantity(line.productId, line.size, line.paper, line.quantity - 1)
                        }
                        className="px-3 py-1.5 text-umber hover:bg-umber/5"
                      >
                        −
                      </button>
                      <span className="px-3 py-1.5 tabular-nums">{line.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(line.productId, line.size, line.paper, line.quantity + 1)
                        }
                        className="px-3 py-1.5 text-umber hover:bg-umber/5"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-serif text-lg text-umber">{formatPrice(lineTotal)}</span>
                      <button
                        onClick={() => removeLine(line.productId, line.size, line.paper)}
                        className="text-xs text-stone hover:text-umber underline underline-offset-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <div className="bg-cream p-8 border border-umber/10">
              <h2 className="font-serif text-2xl text-umber mb-6">Summary</h2>
              <div className="flex justify-between text-sm font-sans text-stone mb-2">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm font-sans text-stone mb-6">
                <span>Shipping</span>
                <span className="italic">Calculated at checkout</span>
              </div>
              <div className="divider mb-6" />
              <div className="flex justify-between font-serif text-xl text-umber">
                <span>Total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <Link href="/checkout" className="btn-primary w-full mt-8">
                Proceed to checkout
              </Link>
              <p className="text-xs text-stone tracking-wide mt-4 text-center font-sans">
                Each print is produced on demand. Ships within Europe.
              </p>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}

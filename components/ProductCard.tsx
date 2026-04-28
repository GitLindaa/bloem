import Link from "next/link";
import type { Product } from "@/lib/types";
import { PlaceholderArt } from "./PlaceholderArt";
import { formatPrice, productImageUrl } from "@/lib/utils";

interface Props {
  product: Product;
  /** Show the smallest variant price as "from €..." */
  compact?: boolean;
}

export function ProductCard({ product, compact = false }: Props) {
  const minPrice = Math.min(...product.sizes.map((s) => s.price));
  const imageSrc = productImageUrl(product, 800);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block"
    >
      <div className="relative overflow-hidden bg-cream rounded-sm">
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt={product.title}
            loading="lazy"
            className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="aspect-[4/5] transition-transform duration-700 group-hover:scale-[1.01]">
            <PlaceholderArt config={product.placeholder} className="w-full h-full" />
          </div>
        )}

        {product.isGalleryWall && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-ivory/80 backdrop-blur-sm text-[10px] tracking-widest uppercase text-umber font-sans">
            Set of {product.galleryWallPieceCount}
          </div>
        )}
      </div>

      <div className={compact ? "mt-3" : "mt-4"}>
        <p className="text-[10px] tracking-widest uppercase text-stone font-sans mb-1">
          {product.collection}
        </p>
        <h3 className="font-serif text-umber text-lg leading-tight group-hover:text-botanical transition-colors duration-300">
          {product.title}
        </h3>
        <p className="text-sm text-stone mt-1 font-sans">
          From {formatPrice(minPrice)}
        </p>
      </div>
    </Link>
  );
}

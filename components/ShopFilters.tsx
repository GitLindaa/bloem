"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "./ProductCard";
import type { Category, ColorTone, PrintSize, Product } from "@/lib/types";

interface Props {
  products: Product[];
}

const CATEGORIES: Category[] = [
  "Botanical Prints",
  "Natural History",
  "Architecture & Places",
  "Scientific & Curious",
  "Gallery Wall Sets",
];

const COLOR_TONES: { value: ColorTone; label: string }[] = [
  { value: "green", label: "Green" },
  { value: "cream", label: "Cream" },
  { value: "warm-neutral", label: "Warm neutral" },
  { value: "blue", label: "Blue" },
  { value: "monochrome", label: "Monochrome" },
];

const SIZES: PrintSize[] = ["A5", "A4", "A3", "30x40", "50x70"];

type SortKey = "newest" | "bestsellers" | "calm" | "gallery";

export function ShopFilters({ products }: Props) {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [activeTone, setActiveTone] = useState<ColorTone | null>(null);
  const [activeSize, setActiveSize] = useState<PrintSize | null>(null);
  const [sort, setSort] = useState<SortKey>("newest");

  const filtered = useMemo(() => {
    let result = products.filter((p) => p.approvedForSale);
    if (activeCategory) result = result.filter((p) => p.category === activeCategory);
    if (activeTone) result = result.filter((p) => p.colorTone.includes(activeTone));
    if (activeSize) result = result.filter((p) => p.sizes.some((s) => s.size === activeSize));

    // Sort heuristics — placeholder logic until real signals exist.
    switch (sort) {
      case "newest":
        // Reverse the array as a stand-in for "most recently added".
        result = [...result].reverse();
        break;
      case "bestsellers":
        // Stand-in: sort by lowest minimum price.
        result = [...result].sort(
          (a, b) =>
            Math.min(...a.sizes.map((s) => s.price)) -
            Math.min(...b.sizes.map((s) => s.price))
        );
        break;
      case "calm":
        result = result.filter((p) =>
          p.colorTone.some((t) => t === "cream" || t === "warm-neutral" || t === "monochrome")
        );
        break;
      case "gallery":
        result = result.filter((p) => p.isGalleryWall);
        break;
    }
    return result;
  }, [products, activeCategory, activeTone, activeSize, sort]);

  const anyFilterActive = activeCategory || activeTone || activeSize || sort !== "newest";

  return (
    <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
      {/* SIDEBAR */}
      <aside className="lg:col-span-3 lg:sticky lg:top-28 lg:self-start space-y-8 text-sm">
        <FilterGroup
          title="Category"
          items={CATEGORIES.map((c) => ({ value: c, label: c }))}
          active={activeCategory}
          onSelect={(v) => setActiveCategory(v === activeCategory ? null : (v as Category))}
        />
        <FilterGroup
          title="Color tone"
          items={COLOR_TONES}
          active={activeTone}
          onSelect={(v) => setActiveTone(v === activeTone ? null : (v as ColorTone))}
        />
        <FilterGroup
          title="Size"
          items={SIZES.map((s) => ({ value: s, label: s }))}
          active={activeSize}
          onSelect={(v) => setActiveSize(v === activeSize ? null : (v as PrintSize))}
        />

        {anyFilterActive && (
          <button
            onClick={() => {
              setActiveCategory(null);
              setActiveTone(null);
              setActiveSize(null);
              setSort("newest");
            }}
            className="btn-ghost text-xs"
          >
            Clear all filters
          </button>
        )}
      </aside>

      {/* GRID */}
      <div className="lg:col-span-9">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8 pb-4 border-b border-umber/10">
          <p className="text-sm font-sans text-stone tracking-wide">
            {filtered.length} {filtered.length === 1 ? "print" : "prints"}
          </p>
          <div className="flex items-center gap-2 text-sm">
            <label htmlFor="sort" className="text-stone tracking-wide">
              Sort by
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="bg-transparent border border-umber/20 px-3 py-1.5 text-umber font-sans tracking-wide focus:outline-none focus:border-umber"
            >
              <option value="newest">Newest</option>
              <option value="bestsellers">Bestsellers</option>
              <option value="calm">Calm interiors</option>
              <option value="gallery">Gallery-wall friendly</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="font-serif italic text-stone text-lg py-20 text-center">
            No prints match the current filters.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// FilterGroup
// ---------------------------------------------------------------------

function FilterGroup<T extends string>({
  title,
  items,
  active,
  onSelect,
}: {
  title: string;
  items: { value: T; label: string }[];
  active: T | null;
  onSelect: (value: T) => void;
}) {
  return (
    <div>
      <h3 className="eyebrow mb-3">{title}</h3>
      <ul className="space-y-1.5">
        {items.map((item) => {
          const isActive = active === item.value;
          return (
            <li key={item.value}>
              <button
                onClick={() => onSelect(item.value)}
                className={`text-left w-full font-sans text-sm tracking-wide transition-colors ${
                  isActive
                    ? "text-umber underline underline-offset-4 decoration-botanical decoration-2"
                    : "text-stone hover:text-umber"
                }`}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

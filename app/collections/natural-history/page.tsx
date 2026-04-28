import type { Metadata } from "next";
import { products } from "@/data/products";
import { CollectionPage } from "@/components/CollectionPage";

export const metadata: Metadata = {
  title: "Natural History Prints — Heritage Wall Art",
  description:
    "Birds, butterflies, shells and fish from historical natural-history surveys, restored from public-domain originals.",
  keywords: [
    "natural history posters",
    "vintage scientific illustrations",
    "ornithology print",
    "butterfly print",
  ],
};

export default function NaturalHistoryCollectionPage() {
  return (
    <CollectionPage
      eyebrow="Field studies"
      title="Natural History"
      description="Birds, butterflies, shells, fish — drawn with the patience of naturalists who carried these books into the field."
      products={products.filter(
        (p) => p.category === "Natural History" && p.approvedForSale
      )}
    />
  );
}

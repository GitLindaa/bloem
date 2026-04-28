import type { Metadata } from "next";
import { products } from "@/data/products";
import { CollectionPage } from "@/components/CollectionPage";

export const metadata: Metadata = {
  title: "Architecture & Places — Historical Maps & Elevations",
  description:
    "Old city plans, architectural elevations and travel studies — heritage prints for thoughtful interiors.",
  keywords: [
    "vintage map print",
    "historical city plan",
    "architecture print",
    "european cities print",
  ],
};

export default function ArchitectureCollectionPage() {
  return (
    <CollectionPage
      eyebrow="Quiet cities"
      title="Architecture &amp; Places"
      description="Old city plans, building elevations and travel studies — quiet drawings of places drawn slowly, on paper, before photographs took over."
      products={products.filter(
        (p) => p.category === "Architecture & Places" && p.approvedForSale
      )}
    />
  );
}

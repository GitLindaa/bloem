import type { Metadata } from "next";
import { products } from "@/data/products";
import { CollectionPage } from "@/components/CollectionPage";

export const metadata: Metadata = {
  title: "Gallery Wall Sets — Curated Print Sets",
  description:
    "Curated sets of two, three, four or six heritage prints, balanced for tone — ready to hang as a single quiet field on the wall.",
  keywords: [
    "gallery wall botanical prints",
    "gallery wall set",
    "curated print set",
    "wall art set",
  ],
};

export default function GalleryWallsCollectionPage() {
  return (
    <CollectionPage
      eyebrow="Hang as a set"
      title="Gallery Wall Sets"
      description="Two, three, four or six prints, gathered into balanced sets. We compose for tone rather than subject — so the wall reads as one quiet field."
      products={products.filter((p) => p.isGalleryWall && p.approvedForSale)}
    />
  );
}

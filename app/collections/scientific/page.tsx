import type { Metadata } from "next";
import { products } from "@/data/products";
import { CollectionPage } from "@/components/CollectionPage";

export const metadata: Metadata = {
  title: "Scientific & Curious — Anatomical & Celestial Prints",
  description:
    "Anatomical studies, celestial charts and encyclopaedic plates from the long history of scientific illustration.",
  keywords: [
    "anatomical print",
    "celestial chart",
    "vintage scientific illustration",
    "encyclopaedia plate",
  ],
};

export default function ScientificCollectionPage() {
  return (
    <CollectionPage
      eyebrow="Quiet diagrams"
      title="Scientific &amp; Curious"
      description="Anatomical studies, celestial charts and encyclopaedic plates — the patient end of scientific illustration."
      products={products.filter(
        (p) => p.category === "Scientific & Curious" && p.approvedForSale
      )}
    />
  );
}

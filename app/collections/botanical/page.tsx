import type { Metadata } from "next";
import { products } from "@/data/products";
import { CollectionPage } from "@/components/CollectionPage";

export const metadata: Metadata = {
  title: "Botanical Prints — Archival Plates",
  description:
    "Botanical illustrations from nineteenth-century surveys, restored from public-domain sources and printed on premium paper.",
  keywords: [
    "botanical prints",
    "vintage botanical wall art",
    "botanical illustration",
    "public domain botanical",
  ],
};

export default function BotanicalCollectionPage() {
  return (
    <CollectionPage
      eyebrow="Quiet botanicals"
      title="Botanical Prints"
      description="Plates from nineteenth-century botanical surveys — flowers, ferns, herbs, fruit and trees, restored gently from the originals and printed on premium paper."
      products={products.filter(
        (p) => p.category === "Botanical Prints" && p.approvedForSale
      )}
    />
  );
}

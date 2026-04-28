import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getProductBySlug,
  getRelatedProducts,
  products,
} from "@/data/products";
import { ProductDetail } from "@/components/ProductDetail";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Print not found" };
  return {
    title: product.title,
    description: product.shortDescription,
    openGraph: {
      title: product.title,
      description: product.shortDescription,
      type: "website",
    },
    keywords: [...product.tags, product.category, "public domain print", "heritage wall art"],
  };
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product || !product.approvedForSale) notFound();

  const related = getRelatedProducts(product.pairsWith);

  return <ProductDetail product={product} related={related} />;
}

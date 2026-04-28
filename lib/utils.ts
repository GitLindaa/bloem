import type { PaperType, PrintSize, Product } from "./types";

export function formatPrice(eur: number): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(eur);
}

export function paperLabel(paper: PaperType): string {
  return paper === "matte-archival" ? "Matte archival" : "Premium textured";
}

export function paperSurcharge(paper: PaperType): number {
  // Premium textured paper costs slightly more.
  return paper === "premium-textured" ? 6 : 0;
}

export function sizeLabel(size: PrintSize): string {
  switch (size) {
    case "A5":
      return "A5 — 14.8 × 21 cm";
    case "A4":
      return "A4 — 21 × 29.7 cm";
    case "A3":
      return "A3 — 29.7 × 42 cm";
    case "30x40":
      return "30 × 40 cm";
    case "50x70":
      return "50 × 70 cm";
  }
}

export function classNames(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/**
 * Build a Rijksmuseum IIIF image URL at a specific long-edge size.
 * Uses the Micrio-hosted IIIF Image API endpoint (the same one that
 * powers rijksmuseum.nl).
 *
 * @param iiifId  The short alphanumeric image ID (e.g. "sbaXO")
 * @param width   Long-edge pixel size — typical values: 400 (thumb),
 *                800 (card), 1600 (product page), 2400 (zoom)
 *
 * @example
 *   rijksmuseumImageUrl("sbaXO", 1600)
 *   // → "https://iiif.micr.io/sbaXO/full/1600,/0/default.jpg"
 */
export function rijksmuseumImageUrl(iiifId: string, width: number): string {
  return `https://iiif.micr.io/${iiifId}/full/${width},/0/default.jpg`;
}

/**
 * Resolve the right image URL for a product, picking the best available
 * source. Priority: explicit imageUrl (local file) → Rijksmuseum IIIF
 * (loaded at the requested width). Returns null if neither is set, in
 * which case the caller should fall back to the SVG placeholder.
 */
export function productImageUrl(
  product: Pick<Product, "imageUrl" | "rijksmuseumIIIFId">,
  width: number
): string | null {
  if (product.imageUrl) return product.imageUrl;
  if (product.rijksmuseumIIIFId) {
    return rijksmuseumImageUrl(product.rijksmuseumIIIFId, width);
  }
  return null;
}

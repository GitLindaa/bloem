// =====================================================================
// Domain types — Archive & Bloom
// Designed for a curated public-domain print shop.
// Every product carries explicit licensing metadata; nothing is sold
// unless commercial use is verified.
// =====================================================================

export type Category =
  | "Botanical Prints"
  | "Natural History"
  | "Architecture & Places"
  | "Scientific & Curious"
  | "Gallery Wall Sets";

export type ColorTone =
  | "green"
  | "cream"
  | "warm-neutral"
  | "blue"
  | "monochrome";

export type LicenseType =
  | "Public Domain"
  | "CC0"
  | "CC BY"
  | "CC BY-SA"
  | "Other (commercial allowed)"
  | "Needs review";

export type PaperType = "matte-archival" | "premium-textured";

export type PrintSize = "A5" | "A4" | "A3" | "30x40" | "50x70";

export interface Variant {
  size: PrintSize;
  price: number; // EUR
  sku: string;
  /** Identifier the print-on-demand provider uses (Printful, Gelato, etc.) */
  printProviderId?: string;
}

export interface PlaceholderArtConfig {
  /** Which placeholder illustration to render in the absence of a real image. */
  motif: "leaf" | "rose" | "fern" | "bird" | "butterfly" | "shell" | "fish" | "map" | "anatomy" | "celestial";
  /** Subtle background tint, picked from the palette. */
  background: "ivory" | "cream" | "parchment" | "olive-tint" | "blue-tint";
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: Category;
  collection: string;
  shortDescription: string;
  historicalContext: string;
  whyWeSelected: string;
  poeticBlurb: string;

  // Licensing — every field required for review workflow
  sourceInstitution: string;
  sourceUrl: string;
  creator: string;
  year: string;
  license: LicenseType;
  commercialUseAllowed: boolean;
  editingAllowed: boolean;
  attributionRequired: boolean;
  imageQualityStatus: "high" | "medium" | "needs-restoration";
  approvedForSale: boolean;
  notes?: string;

  // Imagery
  imageUrl?: string; // when a real file is in /public/images
  /**
   * Rijksmuseum IIIF image ID (the short alphanumeric code from iiif.micr.io
   * URLs, e.g. "sbaXO"). When set, the site will load the image directly
   * from the Rijksmuseum's image server at the requested size — no upload
   * to /public/images needed. See docs/IMAGE-SOURCING-WORKFLOW.md.
   */
  rijksmuseumIIIFId?: string;
  placeholder: PlaceholderArtConfig;

  // Discovery
  colorTone: ColorTone[];
  tags: string[];

  // Variants
  sizes: Variant[];

  // Curation
  pairsWith: string[]; // product ids
  isGalleryWall?: boolean;
  galleryWallPieceCount?: 2 | 3 | 4 | 6;
}

export interface CartLine {
  productId: string;
  size: PrintSize;
  paper: PaperType;
  quantity: number;
}

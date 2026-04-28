import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// =====================================================================
// Fonts — distinctive serif + warm sans, loaded via next/font
// =====================================================================

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

// =====================================================================
// SEO — homepage default; per-page metadata overrides
// =====================================================================

export const metadata: Metadata = {
  metadataBase: new URL("https://archiveandbloom.com"),
  title: {
    default: "Archive & Bloom — Curated Heritage Prints",
    template: "%s · Archive & Bloom",
  },
  description:
    "Curated botanical, natural-history and archival illustrations selected from public-domain collections and printed on premium paper for quiet, timeless interiors.",
  keywords: [
    "botanical prints",
    "vintage botanical wall art",
    "public domain prints",
    "heritage wall art",
    "museum style prints",
    "natural history posters",
    "vintage scientific illustrations",
    "gallery wall botanical prints",
  ],
  openGraph: {
    title: "Archive & Bloom — Curated Heritage Prints",
    description:
      "Botanical, natural history and archival illustrations carefully selected from public-domain collections and printed on premium paper.",
    type: "website",
    locale: "en_GB",
    siteName: "Archive & Bloom",
  },
  twitter: {
    card: "summary_large_image",
    title: "Archive & Bloom",
    description:
      "Curated heritage prints for quiet, timeless interiors.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

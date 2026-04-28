# Archive & Bloom

> Curated heritage prints for quiet, timeless interiors.

A premium e-commerce site for a curated public-domain print shop, focused on botanical, natural-history, architectural, and scientific illustrations sourced from museum archives.

Built with **Next.js 14 (App Router)**, **React 18**, **TypeScript**, and **Tailwind CSS**.

---

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev

# 3. Open the site
open http://localhost:3000
```

The MVP runs entirely on local data — no database, no API keys, no environment variables required.

### Other commands

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

---

## Project structure

```
archive-and-bloom/
├── app/                       # Next.js App Router pages
│   ├── layout.tsx             # Root layout (fonts, header, footer, cart provider, SEO)
│   ├── page.tsx               # Homepage
│   ├── globals.css            # Tailwind + paper-grain texture + button utilities
│   ├── shop/                  # Full shop with filters
│   ├── product/[slug]/        # Dynamic product pages
│   ├── collections/           # Collection index + 5 category pages
│   ├── about/                 # About / brand story
│   ├── licensing/             # Sourcing & licensing explainer
│   ├── cart/                  # Cart page
│   └── checkout/              # Placeholder checkout
├── components/
│   ├── Header.tsx             # Sticky header with cart counter
│   ├── Footer.tsx
│   ├── CartProvider.tsx       # React Context cart, persisted to localStorage
│   ├── ProductCard.tsx
│   ├── ProductDetail.tsx      # Product page client logic (size, paper, qty)
│   ├── PlaceholderArt.tsx     # SVG illustrations standing in for real prints
│   ├── ShopFilters.tsx        # Category / colour / size / sort filters
│   ├── CollectionPage.tsx     # Shared renderer for collection routes
│   └── TrustBlocks.tsx
├── data/
│   └── products.ts            # All product data (16 sample products)
├── lib/
│   ├── types.ts               # Product, CartLine, Variant, licensing fields
│   └── utils.ts               # formatPrice, paperLabel, sizeLabel, etc.
├── public/images/             # Drop your real product images here
├── docs/
│   └── IMAGE-SOURCING-WORKFLOW.md   # The 10-step curation workflow
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## How to add a new product

1. **Source the image properly first.** Read `docs/IMAGE-SOURCING-WORKFLOW.md` and follow all ten steps. The licensing fields on the product record are not optional — they are the brand promise.
2. Add an entry to `data/products.ts` following the `Product` type defined in `lib/types.ts`.
3. Set `approvedForSale: true` **only after** all licensing fields are filled in and verified. Unapproved products are automatically hidden from the shop.

A minimum product entry looks like this:

```ts
{
  id: 'botanical-rose-007',
  slug: 'soft-rose-curtis-botanical',
  title: 'Soft Rose, Curtis Botanical Magazine',
  category: 'Botanical Prints',
  collection: 'Quiet Botanicals',
  shortDescription: 'A delicate plate from an early 19th-century botanical study.',
  description: 'Originally published in 1812 …',
  whyWeSelected: 'Selected for its quiet composition and soft palette.',
  historicalContext: 'Drawn by Sydenham Edwards for Curtis\'s Botanical Magazine …',
  // licensing
  sourceInstitution: 'Biodiversity Heritage Library',
  sourceUrl: 'https://www.biodiversitylibrary.org/item/...',
  creator: 'Sydenham Edwards',
  year: 'c. 1812',
  license: 'Public Domain',
  commercialUseAllowed: true,
  editingAllowed: true,
  attributionRequired: false,
  notes: 'Original published 1812; out of copyright in EU and US.',
  imageQualityStatus: 'restored',
  approvedForSale: true,
  // display
  imageUrl: '/images/botanical-rose-curtis-1812.jpg',
  colorTone: ['cream', 'green'],
  sizes: [
    { size: 'A4', basePrice: 29 },
    { size: 'A3', basePrice: 39 },
    { size: '50x70', basePrice: 59 },
  ],
  isNewlyRestored: false,
  isBestseller: false,
}
```

For gallery-wall sets, also add `setSize: 3` (or 2, 4, 6) and any preview-tile metadata.

---

## How to replace placeholder images with real prints

The MVP ships with SVG botanical illustrations rendered by `components/PlaceholderArt.tsx`. To swap one in for a real print:

1. Save the prepared web file (≈2400 px on the long edge, JPEG q85, sRGB) to `/public/images/`.
2. On the product record, set `imageUrl: '/images/your-file-name.jpg'`.
3. The product card and product detail page will automatically use the real image instead of the placeholder.

You can mix real and placeholder products freely while building out the catalogue.

---

## Deploying to Vercel

```bash
# 1. Push to GitHub
git init && git add . && git commit -m "Archive & Bloom MVP"
git remote add origin <your-repo>
git push

# 2. Import the repo on vercel.com → "New Project"
#    No environment variables needed for the MVP.
#    Vercel auto-detects Next.js.
```

The build is fully static apart from the cart, which lives in `localStorage` on the client.

---

## Next steps for production

The MVP is intentionally simple. Two integrations are needed before going live:

### 1. Print-on-demand provider

Create a `/lib/print-provider.ts` adapter that wraps your provider's API. The product variants in `data/products.ts` already include `size` and `paper` fields — extend the `Variant` type with `printProviderSku` and `printProviderProductId` to map shop variants to provider variants.

Recommended providers (Europe-friendly):

- **Gelato** — strong European print network, REST API.
- **Prodigi** — UK-based, broad paper choice.
- **Cloudprinter** — distributed European printing.
- **Printful** — well-documented, but US-centric for fine-art paper.

The order flow at production time:

```
Customer checkout
   → Stripe / Mollie payment
   → On payment success, POST order to print provider
   → Store provider order ID + status on the order
   → Webhook from provider updates order status
```

### 2. Payments

A Next.js route handler at `/app/api/checkout/route.ts` should create a payment session.

- **Mollie** is the natural choice for a Dutch/European boutique (iDEAL, Bancontact, SEPA).
- **Stripe** if you also want strong international card support.

The current `/checkout` page is a clearly-labelled placeholder — it is the only piece of the front-end that needs to be replaced when you wire up payments.

### 3. Real images

Work through `docs/IMAGE-SOURCING-WORKFLOW.md` for each new print. **Default to the Rijksmuseum** — their open-access programme combines unambiguous public-domain declarations, very high-resolution scans, and excellent metadata, which together make them the cleanest single source for this catalogue. Use other institutions (Met, Smithsonian, BHL, Wellcome, LoC, NYPL) where the Rijksmuseum doesn't hold what you need. Never download from aggregators like Rawpixel that re-host public-domain works under their own terms — always go back to the source institution.

Keep the catalogue small and considered — that is the whole positioning of the brand.

---

## Design system

| | |
|---|---|
| Heading font | Cormorant Garamond (serif) |
| Body font | DM Sans (sans-serif) |
| Ivory | `#F5F0E4` |
| Cream | `#FAF6EC` |
| Parchment | `#EDE6D3` |
| Umber | `#3A2E22` |
| Charcoal | `#221C16` |
| Olive | `#7A8260` |
| Botanical green | `#5C6B4A` |
| Rust accent | `#9C5B3D` |
| Stone | `#8B8275` |

The palette and fonts are defined in `tailwind.config.ts` and `app/layout.tsx`. Adjust there to retheme the whole shop.

---

## Brand voice

Words to use: *curated, archival, heritage, restored, timeless, collected, quiet interiors, public domain.*

Words to avoid: *AI generated, cheap posters, instant wall art, trendy, viral, sale, limited time, hurry.*

Keep copy editorial and unhurried — this is a museum shop, not a marketplace.

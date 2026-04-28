# Image Sourcing Workflow

This document describes the curation process for adding new prints to **Archive & Bloom**. Every image on the shop must pass through this workflow before it can be marked `approvedForSale: true`.

The shop is built on a single principle: *if there is any doubt about commercial-use eligibility, the image is not sold.*

A second rule that flows from the first: **always download from the original institution, never from an aggregator.** If you find a work on a third-party site (Rawpixel, Wikimedia, Europeana), trace it back to the source institution (Rijksmuseum, Met, BHL, Wellcome) and download it there. The institutional version has the cleanest licence, the highest resolution, and the most reliable metadata.

---

## Trusted sources

These institutions have clear, well-documented open-access programmes. Most works released through them are public domain or CC0, but **always verify the licence on the individual item page** — exceptions exist within every collection.

### Primary source — start here

**Rijksmuseum** (rijksmuseum.nl) is the best single source for what Archive & Bloom is doing, and should be the default first stop. Reasons:

- Rights status is unambiguous and stated per object on the object page (typically "Public Domain").
- Resolutions are extraordinarily high — often hundreds of megapixels — easily enough for 70×100 prints with margin.
- Metadata is exemplary: artist, year, materials, dimensions, original inventory number. Drop it straight into the product record.
- Botanical, natural-history, and decorative-arts holdings are enormous and beautifully scanned.

Workflow on Rijksmuseum: open the object page (e.g. `https://www.rijksmuseum.nl/en/collection/object/...`), confirm the rights statement reads "Public Domain", click *Download* to get the highest-resolution version, and copy the object-page URL into `sourceUrl`. That's it.

### Other trusted institutions

| Source | Notes |
|---|---|
| **The Met Open Access** (metmuseum.org) | Filter for "Open Access" / CC0. Reliable. |
| **Smithsonian Open Access** (si.edu) | Filter explicitly for CC0. Strong natural-history holdings. |
| **Biodiversity Heritage Library** (biodiversitylibrary.org) | The richest source for botanical and natural-history plates from older volumes Rijksmuseum doesn't hold. Check the per-volume rights statement. |
| **Wellcome Collection** (wellcomecollection.org) | Filter for "Public Domain" or "CC0". Strong scientific and anatomical material. |
| **Library of Congress** (loc.gov) | Use the rights advisory carefully — "No known restrictions" is *not the same* as a clear public-domain mark. |
| **New York Public Library Digital Collections** (digitalcollections.nypl.org) | Filter for "Public Domain". |

### Sources that require **per-item** verification

These platforms aggregate from many institutions and do **not** offer a uniform licence. You must check the licence of every single item.

- **Europeana** — licence varies per institution.
- **Wikimedia Commons** — only use if the file page explicitly states public domain or a licence that allows commercial use (CC0, CC BY, CC BY-SA). Reject anything marked "non-commercial" (NC) or "no derivatives" (ND).

### Never use

- **Rawpixel** — they aggregate genuinely public-domain works but layer their own Terms of Service on top, restricting how their hosted versions may be used. A work in the public domain remains in the public domain — but if you download it from Rawpixel, you have agreed to their terms. Rule: if you find something interesting on Rawpixel, identify the original institution (Rijksmuseum, Met, Smithsonian, BHL) and download it from there. Never from Rawpixel itself.
- **Pinterest, Tumblr, Etsy, eBay, generic Google image results, stock-photo previews, museum images flagged "for personal use only", anything without a clearly stated licence.**

---

## The 10-step workflow

### 1. Search a trusted source
Start with the curated list above. Search by motif (rose, fern, butterfly, harbour map) or by archive volume (e.g. *Köhler's Medizinal-Pflanzen*, *Curtis's Botanical Magazine*, *Histoire Naturelle*).

### 2. Check the licence — on the item page itself
Do not rely on the source's general policy. Open the specific item and locate the rights statement. Acceptable licences:

- Public Domain / Public Domain Mark 1.0
- CC0
- CC BY (attribution required — note this for the product record)
- Other licence with **explicit commercial-use permission**

If the rights statement is "No known copyright restrictions", "Educational use only", "Rights unclear", or anything ambiguous → **stop and reject**.

### 3. Get the image — prefer IIIF over download

For Rijksmuseum works, **do not download**. Instead, find the IIIF image ID and store it in the product record. The site will then load the image directly from the Rijksmuseum's image server, at exactly the size each page needs. Faster for the visitor, no upload to maintain, no copy of the original on your server.

**How to find a Rijksmuseum IIIF image ID:**

1. Open the object page on rijksmuseum.nl
2. Right-click on the artwork image and choose *Inspect* (or open browser DevTools, F12)
3. Look in the HTML for an `<img>` tag with a `src` like `https://iiif.micr.io/{ID}/...` — the part where `{ID}` is, that's the alphanumeric code you need (typically 5–6 characters, e.g. `sbaXO`, `Gfuby`)
4. Easier alternative: scroll down on the object page to "Discover more" — those thumbnails also use IIIF URLs in the same format. Click View Source (`⌘U` on Mac) on the page and search for `iiif.micr.io` to find the IDs.

For non-Rijksmuseum sources (Met, BHL, Wellcome, etc.) — download the highest resolution as a fallback. Most major institutions also offer IIIF, but the workflow varies; for a small catalogue the convenience isn't always worth the per-source learning curve.

### 4. Record the source URL
Save the **direct, permanent URL** to the item page (not the search results page). This is the URL that will be stored in `sourceUrl` and shown to the customer if they ask.

### 5. Record creator and year
Note the original artist or illustrator (or "Unknown"), and the year or approximate period (e.g. `c. 1812`, `1880s`, `late 19th century`). Both fields go into the product record.

### 6. Confirm commercial-use eligibility
For each item, write down a one-line justification, e.g. *"Public Domain Mark 1.0, Rijksmuseum, original work published 1812 → out of copyright in EU and US."*
This justification lives in the product's `notes` field and protects you if a question is ever raised.

### 7. Restoration — usually not needed for IIIF
When loading directly from the Rijksmuseum's IIIF server you get the institution's restored, colour-corrected scan. No further work needed. If you have downloaded a file from another source, restoration rules apply: subtle adjustments only — removing foxing, evening out paper tone, cropping margins, gentle dust removal, mild contrast. Not acceptable: changing colours, adding elements, AI upscaling that hallucinates detail, removing the artist's signature.

### 8. Add the product record
Edit `/data/products.ts` and add a new entry following the `Product` type in `/lib/types.ts`. Required licensing fields:

```ts
{
  id: 'botanical-ruysch-001',
  slug: 'ruysch-flowers-marble-tabletop',
  title: 'Still Life with Flowers on a Marble Tabletop',
  // ...
  sourceInstitution: 'Rijksmuseum',
  sourceUrl: 'https://www.rijksmuseum.nl/en/collection/object/...',
  creator: 'Rachel Ruysch',
  year: '1716',
  license: 'Public Domain',
  commercialUseAllowed: true,
  editingAllowed: true,
  attributionRequired: false,
  notes: 'Rijksmuseum SK-A-2338. Public Domain Mark 1.0.',
  imageQualityStatus: 'high',
  approvedForSale: true,

  // Imagery — pick ONE of these two:
  rijksmuseumIIIFId: 'sbaXO',     // ← preferred for Rijksmuseum
  // imageUrl: '/images/...jpg',  // ← only if you've uploaded a file

  // ...
}
```

### 9. Final review before publishing
Before pushing the change, verify:

- [ ] Licence checked on the item page (not just the source homepage)
- [ ] `commercialUseAllowed: true`
- [ ] `sourceUrl` points to a permanent, working item page
- [ ] **Either** `rijksmuseumIIIFId` is set (for Rijksmuseum works) **or** `imageUrl` points to a file in `/public/images/`
- [ ] If `attributionRequired: true`, the attribution string appears on the product page
- [ ] `approvedForSale: true` — only set this **after** all of the above pass

If any item fails, set `approvedForSale: false` and add a reason to `notes`. The shop filters out unapproved items automatically.

---

## Why we prefer IIIF for Rijksmuseum works

The Rijksmuseum runs a IIIF-compliant image server (via Micrio). When the site loads a Rijksmuseum image through `rijksmuseumIIIFId`, what actually happens:

- The `<img>` tag points directly to `https://iiif.micr.io/{ID}/full/1600,/0/default.jpg`
- The Rijksmuseum's server resizes the image on the fly to 1600 pixels long edge
- Cloudflare caches the response on its CDN, so visitors after the first load get it instantly
- Different pages request different sizes — 800 px for shop cards, 1600 px for product pages, 400 px for cart thumbnails — so each visitor only downloads what they actually see

Result: no images stored in your repo, no upload step, every visit is fast, and the source is always the institution's own, authoritative scan. This is what IIIF was built for and the Rijksmuseum actively encourages this kind of use.

---

## When in doubt

Reject the image. The catalogue is small and considered by design — one questionable plate is not worth the risk to the brand. There are tens of thousands of beautiful, clearly-licensed alternatives in the trusted sources above.

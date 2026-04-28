import type { Product } from "@/lib/types";

// =====================================================================
// PLACEHOLDER PRODUCT DATA — Archive & Bloom
// ---------------------------------------------------------------------
// Each entry follows the full licensing schema so the curation workflow
// is visible from day one. Source institutions, creators and years
// listed below are illustrative starting points — VERIFY each item per
// the workflow in /docs/IMAGE-SOURCING-WORKFLOW.md before shipping
// real prints. Replace `placeholder` with `imageUrl` once you have
// confirmed a public-domain or commercial-use file.
// =====================================================================

export const products: Product[] = [
  // ---------------- BOTANICAL PRINTS ----------------
  {
    id: "botanical-rose-001",
    slug: "ruysch-flowers-marble-tabletop-1716",
    title: "Still Life with Flowers on a Marble Tabletop",
    category: "Botanical Prints",
    collection: "Dutch Masters",
    shortDescription:
      "Rachel Ruysch's celebrated floral still life — over ten species of flowers and a quiet teeming of insects, painted with extraordinary precision in 1716.",
    historicalContext:
      "Rachel Ruysch (1664–1750) was among the most celebrated painters of floral still lifes in Europe. The bouquet brings together species that bloom in different seasons — an arrangement impossible in nature, only on canvas. Her father was a botanist, and her studies of live and prepared flowers gave her work a precision few of her contemporaries matched. She continued painting professionally into her eighties.",
    whyWeSelected:
      "We chose this for the long, slow looking it rewards. There is no centre — the eye drifts from petal to insect to falling stem and back. It hangs beautifully in rooms that are not in a hurry.",
    poeticBlurb:
      "Ten species in a vase that never existed, painted with three centuries of patience.",
    sourceInstitution: "Rijksmuseum",
    sourceUrl:
      "https://www.rijksmuseum.nl/en/collection/object/Still-Life-with-Flowers-on-a-Marble-Tabletop--570d1419506e38cb3916f640fe5a2328",
    creator: "Rachel Ruysch",
    year: "1716",
    license: "Public Domain",
    commercialUseAllowed: true,
    editingAllowed: true,
    attributionRequired: false,
    notes:
      "Rijksmuseum object SK-A-2338. Public Domain Mark 1.0, declared by the institution. Original is oil on canvas, 48.5 × 39.5 cm.",
    imageQualityStatus: "high",
    approvedForSale: true,
    imageUrl: undefined,
    rijksmuseumIIIFId: "sbaXO",
    placeholder: { motif: "rose", background: "cream" },
    colorTone: ["warm-neutral", "cream"],
    tags: ["ruysch", "still life", "flowers", "dutch masters", "rijksmuseum"],
    sizes: [
      { size: "A5", price: 19, sku: "ARB-RUY-001-A5" },
      { size: "A4", price: 29, sku: "ARB-RUY-001-A4" },
      { size: "A3", price: 39, sku: "ARB-RUY-001-A3" },
      { size: "30x40", price: 45, sku: "ARB-RUY-001-3040" },
      { size: "50x70", price: 69, sku: "ARB-RUY-001-5070" },
    ],
    pairsWith: ["botanical-fern-002", "botanical-herb-003"],
  },
  {
    id: "botanical-fern-002",
    slug: "de-heem-flowers-glass-vase",
    title: "Still Life with Flowers in a Glass Vase",
    category: "Botanical Prints",
    collection: "Dutch Masters",
    shortDescription:
      "Jan Davidsz. de Heem's pronkstilleven — flowers in a glass vase on a stone ledge, painted on copper between 1650 and 1683.",
    historicalContext:
      "Jan Davidsz. de Heem (1606–1684) moved from Utrecht to Antwerp in 1636, where Flemish masters drew him toward grand display still lifes — pronkstillevens — and elaborate festoons. The work shows his characteristic Flemish abundance, layered against careful Dutch precision learned from his early teacher Balthasar van der Ast. Painted on copper, which gave him the smooth surface for his finest detail.",
    whyWeSelected:
      "For the warmth of it. The vase glows; the petals fall through three centuries of varnish without losing colour. A few insects, a few rose hips, the suggestion that this exact moment was watched and held.",
    poeticBlurb:
      "Flemish abundance, Dutch patience, on a small sheet of copper.",
    sourceInstitution: "Rijksmuseum",
    sourceUrl:
      "https://www.rijksmuseum.nl/en/collection/object/Still-Life-with-Flowers-in-a-Glass-Vase--9f1ca72cf761e1764fe22a5516b46ecc",
    creator: "Jan Davidsz. de Heem",
    year: "1650–1683",
    license: "Public Domain",
    commercialUseAllowed: true,
    editingAllowed: true,
    attributionRequired: false,
    notes:
      "Rijksmuseum object SK-C-214 (on loan from the City of Amsterdam, A. van der Hoop Bequest). Public Domain Mark 1.0. Original is oil on copper, 54.5 × 36.5 cm.",
    imageQualityStatus: "high",
    approvedForSale: true,
    imageUrl: undefined,
    rijksmuseumIIIFId: "Gfuby",
    placeholder: { motif: "rose", background: "cream" },
    colorTone: ["warm-neutral", "cream"],
    tags: ["de heem", "still life", "flowers", "dutch masters", "rijksmuseum"],
    sizes: [
      { size: "A4", price: 29, sku: "ARB-HEEM-002-A4" },
      { size: "A3", price: 39, sku: "ARB-HEEM-002-A3" },
      { size: "50x70", price: 69, sku: "ARB-HEEM-002-5070" },
    ],
    pairsWith: ["botanical-rose-001", "botanical-herb-003"],
  },
  {
    id: "botanical-herb-003",
    slug: "marrel-vase-flowers-frog-1634",
    title: "Still Life with a Vase of Flowers and a Dead Frog",
    category: "Botanical Prints",
    collection: "Dutch Masters",
    shortDescription:
      "Jacob Marrel's early masterwork — striped tulips at their fullest, a small dead frog on the table, painted in Utrecht in 1634.",
    historicalContext:
      "Jacob Marrel (1613–1681) specialised in tulip portraits during the years of the Dutch tulip mania, when single bulbs sold for the price of a house. The most prized blooms — the whimsically streaked red-and-white and red-and-yellow tulips — anchor this composition, painted when he was about twenty. The dead frog at the right is a quiet reminder, in the language of the seventeenth century, that the same nature that produces these bouquets also takes them apart.",
    whyWeSelected:
      "For the contrast. The flowers are jewel-bright; the frog is matter-of-fact. It is the painting equivalent of leaving the seasons honest — beauty and ending in the same frame, no apology, no sentimentality.",
    poeticBlurb:
      "Tulip mania, painted by a twenty-year-old who knew the flowers wouldn't last either.",
    sourceInstitution: "Rijksmuseum",
    sourceUrl:
      "https://www.rijksmuseum.nl/en/collection/object/Still-Life-with-a-Vase-of-Flowers-and-a-Dead-Frog--1d9349268559bf1a7f761eb6397f0922",
    creator: "Jacob Marrel",
    year: "1634",
    license: "Public Domain",
    commercialUseAllowed: true,
    editingAllowed: true,
    attributionRequired: false,
    notes:
      "Rijksmuseum object SK-A-772 (gift of H.W. Mesdag, 1883). Public Domain Mark 1.0. Original is oil on panel, 40.3 × 31 cm.",
    imageQualityStatus: "high",
    approvedForSale: true,
    imageUrl: undefined,
    // TODO: vul Rijksmuseum IIIF ID in (zie docs/IMAGE-SOURCING-WORKFLOW.md
    // voor instructies). Tot die tijd valt dit product terug op de SVG placeholder.
    rijksmuseumIIIFId: undefined,
    placeholder: { motif: "rose", background: "cream" },
    colorTone: ["warm-neutral", "monochrome"],
    tags: ["marrel", "still life", "tulips", "vanitas", "dutch masters", "rijksmuseum"],
    sizes: [
      { size: "A5", price: 19, sku: "ARB-MARR-003-A5" },
      { size: "A4", price: 29, sku: "ARB-MARR-003-A4" },
      { size: "A3", price: 39, sku: "ARB-MARR-003-A3" },
    ],
    pairsWith: ["botanical-rose-001", "botanical-fern-002"],
  },
  {
    id: "botanical-fruit-004",
    slug: "pear-and-quince-plate",
    title: "Pear and Quince Plate",
    category: "Botanical Prints",
    collection: "Orchard Plates",
    shortDescription:
      "A pomological study of orchard fruit in soft autumn tones.",
    historicalContext:
      "Pomological studies were once produced as government-funded surveys of fruit varieties; their careful colouring still feels generous a century later.",
    whyWeSelected:
      "The colour temperature is unusual — warm, but never sweet — and the composition holds together at any size.",
    poeticBlurb:
      "Fruit drawn slowly, the way it ripens.",
    sourceInstitution: "U.S. Department of Agriculture Pomological Watercolor Collection (placeholder)",
    sourceUrl: "https://usdawatercolors.nal.usda.gov/",
    creator: "Unknown watercolourist",
    year: "c. 1905",
    license: "Public Domain",
    commercialUseAllowed: true,
    editingAllowed: true,
    attributionRequired: false,
    imageQualityStatus: "high",
    approvedForSale: true,
    placeholder: { motif: "leaf", background: "parchment" },
    colorTone: ["warm-neutral", "cream"],
    tags: ["fruit", "pear", "quince", "orchard"],
    sizes: [
      { size: "A4", price: 29, sku: "ARB-FRUIT-004-A4" },
      { size: "A3", price: 39, sku: "ARB-FRUIT-004-A3" },
      { size: "30x40", price: 45, sku: "ARB-FRUIT-004-3040" },
    ],
    pairsWith: ["botanical-herb-003"],
  },
  {
    id: "botanical-tree-005",
    slug: "old-oak-silhouette",
    title: "Old Oak Silhouette",
    category: "Botanical Prints",
    collection: "Slow Trees",
    shortDescription:
      "A solitary oak rendered as a near-monochrome silhouette study.",
    historicalContext:
      "From a nineteenth-century tree census project — part botany, part topography — that catalogued individual trees as landmarks of the land.",
    whyWeSelected:
      "We love prints that work as nearly-graphic shapes from across a room. This is one of those.",
    poeticBlurb:
      "A single tree, holding the field.",
    sourceInstitution: "New York Public Library Digital Collections (placeholder)",
    sourceUrl: "https://digitalcollections.nypl.org/",
    creator: "Unknown",
    year: "c. 1890",
    license: "Public Domain",
    commercialUseAllowed: true,
    editingAllowed: true,
    attributionRequired: false,
    imageQualityStatus: "high",
    approvedForSale: true,
    placeholder: { motif: "leaf", background: "ivory" },
    colorTone: ["monochrome", "warm-neutral"],
    tags: ["tree", "oak", "silhouette"],
    sizes: [
      { size: "A4", price: 29, sku: "ARB-OAK-005-A4" },
      { size: "A3", price: 39, sku: "ARB-OAK-005-A3" },
      { size: "50x70", price: 69, sku: "ARB-OAK-005-5070" },
    ],
    pairsWith: ["arch-map-009"],
  },

  // ---------------- NATURAL HISTORY ----------------
  {
    id: "natural-butterfly-006",
    slug: "blue-morpho-butterfly-plate",
    title: "Blue Morpho Butterfly Plate",
    category: "Natural History",
    collection: "Coastal Naturalist",
    shortDescription:
      "A natural-history study of a single butterfly with cool, considered colour.",
    historicalContext:
      "Butterfly plates from the great natural history surveys were designed to be both reference and reverence — accurate to the millimetre, and quietly devotional.",
    whyWeSelected:
      "It carries blue without ever feeling cold; rare in a print of this period.",
    poeticBlurb:
      "Wings, paused mid-page.",
    sourceInstitution: "The Met Open Access (placeholder)",
    sourceUrl: "https://www.metmuseum.org/art/collection",
    creator: "Unknown",
    year: "c. 1870",
    license: "CC0",
    commercialUseAllowed: true,
    editingAllowed: true,
    attributionRequired: false,
    imageQualityStatus: "high",
    approvedForSale: true,
    placeholder: { motif: "butterfly", background: "blue-tint" },
    colorTone: ["blue", "cream"],
    tags: ["butterfly", "insect", "naturalist"],
    sizes: [
      { size: "A4", price: 29, sku: "ARB-BTFLY-006-A4" },
      { size: "A3", price: 39, sku: "ARB-BTFLY-006-A3" },
      { size: "30x40", price: 45, sku: "ARB-BTFLY-006-3040" },
    ],
    pairsWith: ["natural-shell-008", "natural-bird-007"],
  },
  {
    id: "natural-bird-007",
    slug: "study-of-a-songbird",
    title: "Study of a Songbird",
    category: "Natural History",
    collection: "Field Notes",
    shortDescription:
      "A small bird, drawn with restraint, perched on the simplest of branches.",
    historicalContext:
      "Drawn in the lineage of ornithological field studies — books designed for naturalists carrying them through woods, not for galleries.",
    whyWeSelected:
      "A print that survives at small sizes; it works above a desk as well as on a wall.",
    poeticBlurb:
      "One bird, one branch, one quiet morning.",
    sourceInstitution: "Biodiversity Heritage Library (placeholder)",
    sourceUrl: "https://www.biodiversitylibrary.org/",
    creator: "Unknown",
    year: "c. 1860",
    license: "Public Domain",
    commercialUseAllowed: true,
    editingAllowed: true,
    attributionRequired: false,
    imageQualityStatus: "high",
    approvedForSale: true,
    placeholder: { motif: "bird", background: "cream" },
    colorTone: ["warm-neutral", "cream"],
    tags: ["bird", "ornithology"],
    sizes: [
      { size: "A5", price: 19, sku: "ARB-BIRD-007-A5" },
      { size: "A4", price: 29, sku: "ARB-BIRD-007-A4" },
      { size: "A3", price: 39, sku: "ARB-BIRD-007-A3" },
    ],
    pairsWith: ["natural-butterfly-006"],
  },
  {
    id: "natural-shell-008",
    slug: "spiral-shell-study",
    title: "Spiral Shell Study",
    category: "Natural History",
    collection: "Coastal Naturalist",
    shortDescription:
      "A single shell, drawn as an exercise in geometry and patience.",
    historicalContext:
      "Conchology — the study of shells — was a quietly serious science, and its plates remain among the most beautifully composed natural-history images.",
    whyWeSelected:
      "The spiral does the heavy lifting; we kept it mostly empty around it.",
    poeticBlurb:
      "Geometry the sea worked out first.",
    sourceInstitution: "Rijksmuseum (placeholder)",
    sourceUrl: "https://www.rijksmuseum.nl/en/rijksstudio",
    creator: "Unknown",
    year: "c. 1840",
    license: "Public Domain",
    commercialUseAllowed: true,
    editingAllowed: true,
    attributionRequired: false,
    imageQualityStatus: "high",
    approvedForSale: true,
    placeholder: { motif: "shell", background: "ivory" },
    colorTone: ["cream", "warm-neutral"],
    tags: ["shell", "coastal", "spiral"],
    sizes: [
      { size: "A4", price: 29, sku: "ARB-SHELL-008-A4" },
      { size: "A3", price: 39, sku: "ARB-SHELL-008-A3" },
      { size: "50x70", price: 69, sku: "ARB-SHELL-008-5070" },
    ],
    pairsWith: ["natural-butterfly-006", "natural-fish-014"],
  },
  {
    id: "natural-fish-014",
    slug: "atlantic-fish-plate",
    title: "Atlantic Fish Plate",
    category: "Natural History",
    collection: "Coastal Naturalist",
    shortDescription:
      "A single fish drawn in soft greys and faded blues.",
    historicalContext:
      "Ichthyological plates from coastal surveys were often hand-coloured one print at a time, which is why no two surviving copies look quite the same.",
    whyWeSelected:
      "Calm, almost graphic, and surprisingly well-suited to bedrooms.",
    poeticBlurb:
      "A fish, drawn in the colour of weather.",
    sourceInstitution: "Library of Congress (placeholder)",
    sourceUrl: "https://www.loc.gov/free-to-use/",
    creator: "Unknown",
    year: "c. 1870",
    license: "Public Domain",
    commercialUseAllowed: true,
    editingAllowed: true,
    attributionRequired: false,
    imageQualityStatus: "medium",
    approvedForSale: true,
    placeholder: { motif: "fish", background: "blue-tint" },
    colorTone: ["blue", "monochrome"],
    tags: ["fish", "coastal", "atlantic"],
    sizes: [
      { size: "A4", price: 29, sku: "ARB-FISH-014-A4" },
      { size: "A3", price: 39, sku: "ARB-FISH-014-A3" },
    ],
    pairsWith: ["natural-shell-008"],
  },

  // ---------------- ARCHITECTURE & PLACES ----------------
  {
    id: "arch-map-009",
    slug: "old-amsterdam-city-plan",
    title: "Old Amsterdam City Plan",
    category: "Architecture & Places",
    collection: "Quiet Cities",
    shortDescription:
      "A historical city plan rendered in archival ink tones.",
    historicalContext:
      "Seventeenth- and eighteenth-century Dutch cartography is famously precise; this plan belongs to that tradition of cities mapped with both pride and patience.",
    whyWeSelected:
      "City maps are personal; this one is restrained enough to live with for a long time.",
    poeticBlurb:
      "A city, folded onto a page.",
    sourceInstitution: "Rijksmuseum (placeholder)",
    sourceUrl: "https://www.rijksmuseum.nl/en/rijksstudio",
    creator: "Unknown",
    year: "c. 1750",
    license: "Public Domain",
    commercialUseAllowed: true,
    editingAllowed: true,
    attributionRequired: false,
    imageQualityStatus: "high",
    approvedForSale: true,
    placeholder: { motif: "map", background: "parchment" },
    colorTone: ["warm-neutral", "cream", "monochrome"],
    tags: ["map", "amsterdam", "city", "cartography"],
    sizes: [
      { size: "A4", price: 29, sku: "ARB-MAP-009-A4" },
      { size: "A3", price: 39, sku: "ARB-MAP-009-A3" },
      { size: "30x40", price: 45, sku: "ARB-MAP-009-3040" },
      { size: "50x70", price: 69, sku: "ARB-MAP-009-5070" },
    ],
    pairsWith: ["botanical-tree-005"],
  },
  {
    id: "arch-building-010",
    slug: "european-arcade-elevation",
    title: "European Arcade Elevation",
    category: "Architecture & Places",
    collection: "Quiet Cities",
    shortDescription:
      "A measured architectural elevation in soft umber and ivory.",
    historicalContext:
      "Drawn in the long tradition of the architectural pattern book — a way of teaching proportion to readers who would never visit the building in person.",
    whyWeSelected:
      "It reads almost as a portrait of a façade. We loved that.",
    poeticBlurb:
      "Stone, drawn in the language of paper.",
    sourceInstitution: "Library of Congress (placeholder)",
    sourceUrl: "https://www.loc.gov/free-to-use/",
    creator: "Unknown",
    year: "c. 1830",
    license: "Public Domain",
    commercialUseAllowed: true,
    editingAllowed: true,
    attributionRequired: false,
    imageQualityStatus: "high",
    approvedForSale: true,
    placeholder: { motif: "map", background: "ivory" },
    colorTone: ["warm-neutral", "monochrome"],
    tags: ["architecture", "arcade", "europe"],
    sizes: [
      { size: "A3", price: 39, sku: "ARB-ARCH-010-A3" },
      { size: "30x40", price: 45, sku: "ARB-ARCH-010-3040" },
      { size: "50x70", price: 69, sku: "ARB-ARCH-010-5070" },
    ],
    pairsWith: ["arch-map-009"],
  },

  // ---------------- SCIENTIFIC & CURIOUS ----------------
  {
    id: "sci-anatomy-011",
    slug: "study-of-the-hand",
    title: "Study of the Hand",
    category: "Scientific & Curious",
    collection: "Quiet Diagrams",
    shortDescription:
      "An anatomical study drawn with the restraint of a teaching plate.",
    historicalContext:
      "Anatomical illustration in the eighteenth and nineteenth centuries served as both science and meditation; the best plates show the hand of the maker as well as the hand depicted.",
    whyWeSelected:
      "We wanted something quiet but unsentimental; this carries the weight of a serious print.",
    poeticBlurb:
      "An old language, written in lines.",
    sourceInstitution: "Wellcome Collection (placeholder)",
    sourceUrl: "https://wellcomecollection.org/",
    creator: "Unknown",
    year: "c. 1810",
    license: "Public Domain",
    commercialUseAllowed: true,
    editingAllowed: true,
    attributionRequired: false,
    imageQualityStatus: "high",
    approvedForSale: true,
    placeholder: { motif: "anatomy", background: "parchment" },
    colorTone: ["warm-neutral", "monochrome"],
    tags: ["anatomy", "scientific", "diagram"],
    sizes: [
      { size: "A4", price: 29, sku: "ARB-ANAT-011-A4" },
      { size: "A3", price: 39, sku: "ARB-ANAT-011-A3" },
    ],
    pairsWith: ["sci-celestial-012"],
  },
  {
    id: "sci-celestial-012",
    slug: "celestial-chart-northern-sky",
    title: "Celestial Chart — Northern Sky",
    category: "Scientific & Curious",
    collection: "Quiet Diagrams",
    shortDescription:
      "A nineteenth-century star chart in deep ink and old paper tones.",
    historicalContext:
      "Star charts were among the first widely-printed scientific diagrams; each generation slightly redrew the same skies for the next.",
    whyWeSelected:
      "It is dense without being busy — a hard balance to find on paper.",
    poeticBlurb:
      "The same sky, redrawn for another century.",
    sourceInstitution: "Library of Congress (placeholder)",
    sourceUrl: "https://www.loc.gov/free-to-use/",
    creator: "Unknown",
    year: "c. 1860",
    license: "Public Domain",
    commercialUseAllowed: true,
    editingAllowed: true,
    attributionRequired: false,
    imageQualityStatus: "high",
    approvedForSale: true,
    placeholder: { motif: "celestial", background: "ivory" },
    colorTone: ["monochrome", "warm-neutral"],
    tags: ["celestial", "astronomy", "chart"],
    sizes: [
      { size: "A3", price: 39, sku: "ARB-CEL-012-A3" },
      { size: "30x40", price: 45, sku: "ARB-CEL-012-3040" },
      { size: "50x70", price: 69, sku: "ARB-CEL-012-5070" },
    ],
    pairsWith: ["sci-anatomy-011"],
  },

  // ---------------- GALLERY WALL SETS ----------------
  {
    id: "gw-soft-botanical-set",
    slug: "soft-botanical-set",
    title: "Soft Botanical Set — Three Prints",
    category: "Gallery Wall Sets",
    collection: "Gallery Wall Sets",
    shortDescription:
      "A trio of botanicals in cream and faded green, composed to hang as a set.",
    historicalContext:
      "Curated from three separate nineteenth-century botanical surveys; the set is balanced for tone rather than species, which is why it works on a single wall.",
    whyWeSelected:
      "Three prints we kept reaching for in the same room — so we offered them together.",
    poeticBlurb:
      "Three quiet botanicals, made to hang as one.",
    sourceInstitution: "Various — see individual prints",
    sourceUrl: "https://www.biodiversitylibrary.org/",
    creator: "Various",
    year: "c. 1820 – 1890",
    license: "Public Domain",
    commercialUseAllowed: true,
    editingAllowed: true,
    attributionRequired: false,
    imageQualityStatus: "high",
    approvedForSale: true,
    placeholder: { motif: "leaf", background: "cream" },
    colorTone: ["green", "cream"],
    tags: ["gallery-wall", "set", "botanical"],
    sizes: [
      { size: "A4", price: 79, sku: "ARB-GW-SOFTBOT-A4" },
      { size: "A3", price: 109, sku: "ARB-GW-SOFTBOT-A3" },
    ],
    pairsWith: [],
    isGalleryWall: true,
    galleryWallPieceCount: 3,
  },
  {
    id: "gw-greenhouse-study-set",
    slug: "greenhouse-study-set",
    title: "Greenhouse Study Set — Four Prints",
    category: "Gallery Wall Sets",
    collection: "Gallery Wall Sets",
    shortDescription:
      "Four fern and frond plates, balanced as a calm green-leaning grid.",
    historicalContext:
      "Drawn from the long Victorian fascination with ferns; the set is composed to read as a single quiet field.",
    whyWeSelected:
      "Greens that don't compete with each other — rare.",
    poeticBlurb:
      "Four panels of green, holding their breath.",
    sourceInstitution: "Smithsonian Open Access (placeholder)",
    sourceUrl: "https://www.si.edu/openaccess",
    creator: "Various",
    year: "c. 1850 – 1880",
    license: "CC0",
    commercialUseAllowed: true,
    editingAllowed: true,
    attributionRequired: false,
    imageQualityStatus: "high",
    approvedForSale: true,
    placeholder: { motif: "fern", background: "olive-tint" },
    colorTone: ["green"],
    tags: ["gallery-wall", "set", "fern", "greenhouse"],
    sizes: [
      { size: "A4", price: 99, sku: "ARB-GW-GREEN-A4" },
      { size: "A3", price: 139, sku: "ARB-GW-GREEN-A3" },
    ],
    pairsWith: [],
    isGalleryWall: true,
    galleryWallPieceCount: 4,
  },
  {
    id: "gw-coastal-naturalist-set",
    slug: "coastal-naturalist-set",
    title: "Coastal Naturalist Set — Two Prints",
    category: "Gallery Wall Sets",
    collection: "Gallery Wall Sets",
    shortDescription:
      "A shell and a butterfly, paired for tone rather than subject.",
    historicalContext:
      "A small set drawn from two separate coastal surveys; neither piece dominates.",
    whyWeSelected:
      "Two prints that talk to each other in a low voice.",
    poeticBlurb:
      "Sea-paper and wing-paper, side by side.",
    sourceInstitution: "Various — see individual prints",
    sourceUrl: "https://www.metmuseum.org/art/collection",
    creator: "Various",
    year: "c. 1840 – 1870",
    license: "Public Domain",
    commercialUseAllowed: true,
    editingAllowed: true,
    attributionRequired: false,
    imageQualityStatus: "high",
    approvedForSale: true,
    placeholder: { motif: "shell", background: "blue-tint" },
    colorTone: ["blue", "cream"],
    tags: ["gallery-wall", "set", "coastal"],
    sizes: [
      { size: "A4", price: 55, sku: "ARB-GW-COAST-A4" },
      { size: "A3", price: 79, sku: "ARB-GW-COAST-A3" },
    ],
    pairsWith: [],
    isGalleryWall: true,
    galleryWallPieceCount: 2,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string) {
  return products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase() && p.approvedForSale
  );
}

export function getApprovedProducts() {
  return products.filter((p) => p.approvedForSale);
}

export function getRelatedProducts(ids: string[]) {
  return products.filter((p) => ids.includes(p.id));
}

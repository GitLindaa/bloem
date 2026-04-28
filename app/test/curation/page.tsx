"use client";

import { useEffect, useState } from "react";
import { rijksmuseumImageUrl } from "@/lib/utils";

/**
 * Curation test page — not in main navigation.
 * Visit at /test/curation to evaluate candidate works for Archive & Bloom.
 *
 * Click "Auto-load all" to fetch every IIIF ID via a public CORS proxy.
 * Falls back to manual paste if the proxy is unavailable for a particular
 * work.
 *
 * IDs and verdicts are saved in localStorage — survives a page refresh.
 */

interface Candidate {
  slug: string; // unique key for storage
  title: string;
  artist?: string;
  year?: string;
  sourceUrl: string;
  category: string;
  notes?: string;
}

const CANDIDATES: Candidate[] = [
  {
    slug: "lilacs",
    title: "Branch of Purple Lilacs",
    artist: "Maria Geertruida Barbiers-Snabilié",
    year: "1786–1838",
    sourceUrl: "https://www.rijksmuseum.nl/en/collection/object/Branch-of-Purple-Lilacs--06aa8d2792557339723ea054c1441141",
    category: "Botanical drawing",
  },
  {
    slug: "still-life-glass",
    title: "Still Life with Flowers in a Glass",
    sourceUrl: "https://www.rijksmuseum.nl/en/collection/object/Still-Life-with-Flowers-in-a-Glass--f2b3ace6c6f1123b08be0472d18c34d0",
    category: "Still life",
  },
  {
    slug: "still-life-flowers",
    title: "Still Life with Flowers",
    sourceUrl: "https://www.rijksmuseum.nl/en/collection/object/Still-Life-with-Flowers--54e9fdb51274f68e38c108e91e1cf12b",
    category: "Still life",
  },
  {
    slug: "tritonia",
    title: "Tritonia Crocata (Flame Freesia)",
    sourceUrl: "https://www.rijksmuseum.nl/en/collection/object/Tritonia-Crocata-Flame-Freesia--1df31996c72b619658ff262731b29c3f",
    category: "Botanical study",
  },
  {
    slug: "bouquet",
    title: "Bouquet",
    sourceUrl: "https://www.rijksmuseum.nl/en/collection/object/Bouquet--480a41fe481f60489f3f9e2d705a71a6",
    category: "Still life",
  },
  {
    slug: "greek-vase-spring",
    title: "Still Life with Flowers in a Greek Vase — Allegory of Spring",
    sourceUrl: "https://www.rijksmuseum.nl/en/collection/object/Still-Life-with-Flowers-in-a-Greek-Vase-Allegory-of-Spring--b9521a6e593eb8164cbcdfd6a8d8bddc",
    category: "Still life",
  },
  {
    slug: "floral-still-life",
    title: "Floral Still Life",
    sourceUrl: "https://www.rijksmuseum.nl/en/collection/object/Floral-Still-Life--4f29a348a5c2cbd63b4fcbd8be6762d3",
    category: "Still life",
  },
  {
    slug: "papavers",
    title: "Drie papavers, twee vlinders, een vlieg en een libelle",
    sourceUrl: "https://www.rijksmuseum.nl/en/collection/object/Drie-papavers-twee-vlinders-een-vlieg-en-een-libelle--d00d116d404ac351b65d8574656123b9",
    category: "Botanical drawing",
  },
  {
    slug: "tulip-1",
    title: "Tulip",
    sourceUrl: "https://www.rijksmuseum.nl/en/collection/object/Tulip--08c556fcb6db1cb24934df957148b60e",
    category: "Botanical study",
  },
  {
    slug: "tulip-2",
    title: "Tulp",
    sourceUrl: "https://www.rijksmuseum.nl/en/collection/object/Tulp--8c4ff9f491024f9f7fbab8c10164a9f0",
    category: "Botanical study",
  },
  {
    slug: "lotus",
    title: "Bloeiende lotusbloemen",
    sourceUrl: "https://www.rijksmuseum.nl/en/collection/object/Bloeiende-lotusbloemen--5d4fec90f382a9bb16077847568c414d",
    category: "Botanical drawing",
  },
  {
    slug: "gallic-rose",
    title: "Gallic Rose (Rosa gallica L. Versicolor)",
    sourceUrl: "https://www.rijksmuseum.nl/en/collection/object/Gallic-Rose-Rosa-gallica-L-Versicolor--ca1e40bfd20956458dacdeb6ea9e6399",
    category: "Botanical study",
  },
  {
    slug: "dahlias",
    title: "Dahlias",
    sourceUrl: "https://www.rijksmuseum.nl/en/collection/object/Dahlias--ea3f5f00eb1e3a7b33831a2730feb2dd",
    category: "Botanical study",
  },
  {
    slug: "rode-bloem",
    title: "Rode bloem",
    sourceUrl: "https://www.rijksmuseum.nl/en/collection/object/Rode-bloem--9d6e374a4aea746bd7fa03f3ac8134b8",
    category: "Botanical drawing",
  },
  {
    slug: "red-rose",
    title: "Red Rose",
    sourceUrl: "https://www.rijksmuseum.nl/en/collection/object/Red-Rose--1d42a3a1560ee8e50c4fbc1235838a17",
    category: "Botanical study",
  },
  {
    slug: "zonnebloem",
    title: "Zonnebloem, rups en twee vlinders",
    sourceUrl: "https://www.rijksmuseum.nl/en/collection/object/Zonnebloem-rups-en-twee-vlinders--a026855294afe1aecdce6f5a0c6938c3",
    category: "Botanical drawing",
  },
  {
    slug: "blauwe-druiven",
    title: "Tros blauwe druiven",
    sourceUrl: "https://www.rijksmuseum.nl/en/collection/object/Tros-blauwe-druiven--90826751cc04f04cea7d293e6f54c582",
    category: "Botanical drawing",
  },
  {
    slug: "goldfish",
    title: "Twee sluierstaart-goudvissen",
    sourceUrl: "https://www.rijksmuseum.nl/en/collection/object/Twee-sluierstaart-goudvissen--616c3a4c85d5295421b7223c5305d091",
    category: "Natural history",
  },
  {
    slug: "white-currants",
    title: "Sprig of White Currants with Insects",
    sourceUrl: "https://www.rijksmuseum.nl/en/collection/object/Sprig-of-White-Currants-with-Insects--75123495e9fea66aaa874f654878bb04",
    category: "Botanical drawing",
    notes: "Same work as the /test/effects page",
  },
];

type Verdict = "unset" | "keep" | "maybe" | "skip";
type FetchStatus = "idle" | "loading" | "found" | "notfound" | "error";

const STORAGE_KEY = "ab-curation-test-v2";

interface SavedState {
  ids: Record<string, string>;
  verdicts: Record<string, Verdict>;
}

function loadState(): SavedState {
  if (typeof window === "undefined") return { ids: {}, verdicts: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ids: {}, verdicts: {} };
    return JSON.parse(raw);
  } catch {
    return { ids: {}, verdicts: {} };
  }
}

function saveState(state: SavedState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/**
 * Fetch a Rijksmuseum object page through a public CORS proxy and extract
 * the IIIF image ID. Returns null if the page doesn't reference iiif.micr.io.
 *
 * The proxy is corsproxy.io — free, no key, generous limits. If it ever
 * stops working, alternatives: api.allorigins.win, cors-anywhere.herokuapp.com.
 */
async function fetchIIIFId(sourceUrl: string): Promise<string | null> {
  const proxyUrl = `https://corsproxy.io/?url=${encodeURIComponent(sourceUrl)}`;
  const response = await fetch(proxyUrl);
  if (!response.ok) throw new Error(`Proxy returned ${response.status}`);
  const html = await response.text();
  // Match iiif.micr.io/XXXXXX where the ID is alphanumeric, typically 5-6 chars
  const match = html.match(/iiif\.micr\.io\/([A-Za-z0-9]+)/);
  return match ? match[1] : null;
}

export default function CurationTestPage() {
  const [ids, setIds] = useState<Record<string, string>>({});
  const [verdicts, setVerdicts] = useState<Record<string, Verdict>>({});
  const [status, setStatus] = useState<Record<string, FetchStatus>>({});
  const [hydrated, setHydrated] = useState(false);
  const [autoLoading, setAutoLoading] = useState(false);

  useEffect(() => {
    const s = loadState();
    setIds(s.ids);
    setVerdicts(s.verdicts);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveState({ ids, verdicts });
  }, [ids, verdicts, hydrated]);

  const setId = (slug: string, value: string) =>
    setIds((prev) => ({ ...prev, [slug]: value.trim() }));

  const setVerdict = (slug: string, v: Verdict) =>
    setVerdicts((prev) => ({ ...prev, [slug]: v }));

  const fetchOne = async (c: Candidate) => {
    setStatus((s) => ({ ...s, [c.slug]: "loading" }));
    try {
      const id = await fetchIIIFId(c.sourceUrl);
      if (id) {
        setIds((prev) => ({ ...prev, [c.slug]: id }));
        setStatus((s) => ({ ...s, [c.slug]: "found" }));
      } else {
        setStatus((s) => ({ ...s, [c.slug]: "notfound" }));
      }
    } catch (e) {
      setStatus((s) => ({ ...s, [c.slug]: "error" }));
    }
  };

  const autoLoadAll = async () => {
    setAutoLoading(true);
    // Batch into small groups so we don't hammer the proxy
    const BATCH = 3;
    for (let i = 0; i < CANDIDATES.length; i += BATCH) {
      const slice = CANDIDATES.slice(i, i + BATCH);
      await Promise.all(slice.map(fetchOne));
    }
    setAutoLoading(false);
  };

  const counts = {
    total: CANDIDATES.length,
    filled: CANDIDATES.filter((c) => ids[c.slug]).length,
    keep: CANDIDATES.filter((c) => verdicts[c.slug] === "keep").length,
    maybe: CANDIDATES.filter((c) => verdicts[c.slug] === "maybe").length,
    skip: CANDIDATES.filter((c) => verdicts[c.slug] === "skip").length,
  };

  const exportText = () => {
    const lines = CANDIDATES.map((c) => {
      const v = verdicts[c.slug] ?? "unset";
      const id = ids[c.slug] || "(no id)";
      return `${v.toUpperCase().padEnd(6)} | ${id.padEnd(8)} | ${c.title}`;
    }).join("\n");
    navigator.clipboard.writeText(lines);
    alert("Verdict list copied to clipboard.");
  };

  const reset = () => {
    if (!confirm("Clear all IDs and verdicts?")) return;
    setIds({});
    setVerdicts({});
    setStatus({});
  };

  return (
    <main className="bg-ivory min-h-screen pb-32">
      {/* Sticky header with progress */}
      <header className="sticky top-0 z-20 bg-ivory/95 backdrop-blur border-b border-umber/10 px-6 lg:px-10 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-umber font-sans">
          <strong className="font-serif text-2xl">Curation test</strong>
          <span className="text-stone">
            {counts.filled} of {counts.total} loaded
          </span>
          <span className="text-botanical">✓ keep: {counts.keep}</span>
          <span className="text-rust">~ maybe: {counts.maybe}</span>
          <span className="text-stone">✗ skip: {counts.skip}</span>
          <div className="ml-auto flex gap-2">
            <button
              onClick={autoLoadAll}
              disabled={autoLoading}
              className="btn-primary text-xs disabled:opacity-50"
            >
              {autoLoading ? "Loading…" : "Auto-load all"}
            </button>
            <button onClick={exportText} className="btn-ghost text-xs">
              Copy verdicts
            </button>
            <button onClick={reset} className="btn-ghost text-xs">
              Reset
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <p className="eyebrow mb-3">Internal — not for visitors</p>
        <h1 className="font-serif text-5xl text-umber leading-[1.05] mb-4">
          Candidates from the Rijksmuseum.
        </h1>
        <p className="text-stone max-w-2xl leading-relaxed">
          Click <strong className="text-umber">Auto-load all</strong> in the
          header to fetch every image automatically. If a few don&apos;t work,
          you can still paste IDs manually (open the source link, view source
          with <kbd>⌘U</kbd>, search for{" "}
          <code className="text-umber">iiif.micr.io</code>). Mark each work as
          keep / maybe / skip — your inputs save automatically.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 mt-12">
          {CANDIDATES.map((c) => {
            const id = ids[c.slug];
            const verdict = verdicts[c.slug] ?? "unset";
            const stat = status[c.slug] ?? "idle";
            const imageUrl = id ? rijksmuseumImageUrl(id, 800) : null;

            return (
              <article
                key={c.slug}
                className={`flex flex-col gap-3 ${
                  verdict === "skip" ? "opacity-40" : ""
                }`}
              >
                <div className="aspect-[4/5] bg-cream border border-umber/10 flex items-center justify-center overflow-hidden relative">
                  {imageUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={imageUrl}
                      alt={c.title}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-xs uppercase tracking-widest text-stone font-sans">
                      {stat === "loading"
                        ? "Loading…"
                        : stat === "error"
                          ? "Proxy error"
                          : stat === "notfound"
                            ? "No IIIF found"
                            : "Auto-load or paste id"}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <h2 className="font-serif text-lg text-umber leading-tight">
                    {c.title}
                  </h2>
                  {(c.artist || c.year) && (
                    <p className="text-xs text-stone font-sans">
                      {[c.artist, c.year].filter(Boolean).join(" · ")}
                    </p>
                  )}
                  <p className="text-xs text-stone font-sans uppercase tracking-widest">
                    {c.category}
                  </p>
                  {c.notes && (
                    <p className="text-xs text-rust font-sans italic">
                      {c.notes}
                    </p>
                  )}

                  <div className="flex gap-2 items-center pt-2">
                    <input
                      type="text"
                      value={id ?? ""}
                      onChange={(e) => setId(c.slug, e.target.value)}
                      placeholder="IIIF id"
                      className="flex-1 px-3 py-1.5 text-sm border border-umber/20 bg-white font-mono"
                    />
                    <button
                      onClick={() => fetchOne(c)}
                      disabled={stat === "loading"}
                      className="text-xs px-2 py-1.5 border border-umber/20 hover:bg-cream font-sans whitespace-nowrap disabled:opacity-50"
                      title="Try fetching this one again"
                    >
                      {stat === "loading" ? "…" : "↻"}
                    </button>
                    <a
                      href={c.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs underline text-stone hover:text-umber whitespace-nowrap font-sans"
                    >
                      Open ↗
                    </a>
                  </div>

                  <div className="flex gap-1.5 pt-1">
                    <VerdictButton
                      active={verdict === "keep"}
                      onClick={() =>
                        setVerdict(c.slug, verdict === "keep" ? "unset" : "keep")
                      }
                      color="botanical"
                      label="Keep"
                    />
                    <VerdictButton
                      active={verdict === "maybe"}
                      onClick={() =>
                        setVerdict(
                          c.slug,
                          verdict === "maybe" ? "unset" : "maybe"
                        )
                      }
                      color="rust"
                      label="Maybe"
                    />
                    <VerdictButton
                      active={verdict === "skip"}
                      onClick={() =>
                        setVerdict(c.slug, verdict === "skip" ? "unset" : "skip")
                      }
                      color="stone"
                      label="Skip"
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}

function VerdictButton({
  active,
  onClick,
  color,
  label,
}: {
  active: boolean;
  onClick: () => void;
  color: "botanical" | "rust" | "stone";
  label: string;
}) {
  const colorMap = {
    botanical: active
      ? "bg-botanical text-ivory border-botanical"
      : "border-botanical/30 text-botanical hover:bg-botanical/10",
    rust: active
      ? "bg-rust text-ivory border-rust"
      : "border-rust/30 text-rust hover:bg-rust/10",
    stone: active
      ? "bg-stone text-ivory border-stone"
      : "border-stone/30 text-stone hover:bg-stone/10",
  };
  return (
    <button
      onClick={onClick}
      className={`flex-1 text-xs uppercase tracking-widest font-sans px-2 py-1.5 border transition-colors ${colorMap[color]}`}
    >
      {label}
    </button>
  );
}

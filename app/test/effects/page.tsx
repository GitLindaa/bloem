"use client";

import { useState } from "react";
import { rijksmuseumImageUrl } from "@/lib/utils";

/**
 * Effects test page — sister-brand prototype.
 *
 * Two switchers: which work (painting vs line drawing), and which effect.
 * Some effects are designed for paintings, some for line drawings — the UI
 * makes that clear.
 */

interface TestWork {
  key: string;
  label: string;
  iiifId: string; // empty string = unknown, falls back to Ruysch
  type: "painting" | "drawing";
  source: string;
}

const WORKS: TestWork[] = [
  {
    key: "ruysch",
    label: "Ruysch — flowers (painting)",
    iiifId: "sbaXO",
    type: "painting",
    source:
      "https://www.rijksmuseum.nl/en/collection/object/Still-Life-with-Flowers-on-a-Marble-Tabletop--570d1419506e38cb3916f640fe5a2328",
  },
  {
    key: "de-heem",
    label: "De Heem — glass vase (painting)",
    iiifId: "Gfuby",
    type: "painting",
    source:
      "https://www.rijksmuseum.nl/en/collection/object/Still-Life-with-Flowers-in-a-Glass-Vase--9f1ca72cf761e1764fe22a5516b46ecc",
  },
  {
    key: "white-currants",
    label: "White currants (drawing)",
    iiifId: "", // paste once known via curation page
    type: "drawing",
    source:
      "https://www.rijksmuseum.nl/en/collection/object/Sprig-of-White-Currants-with-Insects--75123495e9fea66aaa874f654878bb04",
  },
  {
    key: "lilacs",
    label: "Purple Lilacs (drawing)",
    iiifId: "", // paste once known
    type: "drawing",
    source:
      "https://www.rijksmuseum.nl/en/collection/object/Branch-of-Purple-Lilacs--06aa8d2792557339723ea054c1441141",
  },
];

type EffectKey =
  | "none"
  | "soft-vintage"
  | "spotlight"
  | "indigo-wash"
  | "outline"
  | "outline-tinted"
  | "outline-orange"
  | "black-white";

interface EffectDef {
  key: EffectKey;
  label: string;
  description: string;
  /** Which work type is this designed for? */
  bestFor: "painting" | "drawing" | "any";
}

const EFFECTS: EffectDef[] = [
  {
    key: "none",
    label: "Original (no effect)",
    description: "The work as it is — your reference point.",
    bestFor: "any",
  },
  {
    key: "soft-vintage",
    label: "Soft vintage",
    description: "Lifted blacks, warm tone, slight fade — old-paper feel.",
    bestFor: "painting",
  },
  {
    key: "spotlight",
    label: "Spotlight",
    description: "Desaturated edges with one circular area kept in colour.",
    bestFor: "painting",
  },
  {
    key: "indigo-wash",
    label: "Indigo wash",
    description: "Two-tone in cream + deep blue. Cyanotype-like.",
    bestFor: "any",
  },
  {
    key: "black-white",
    label: "Black & white",
    description: "Pure desaturation with a contrast control.",
    bestFor: "any",
  },
  {
    key: "outline",
    label: "Outline",
    description: "Inverted high-contrast — works on line drawings, fails on paintings.",
    bestFor: "drawing",
  },
  {
    key: "outline-tinted",
    label: "Outline on coloured ground",
    description: "Outline + soft background tint. For drawings only.",
    bestFor: "drawing",
  },
  {
    key: "outline-orange",
    label: "Orange line accent",
    description: "Subtle orange-tinted outline — sharp, modern.",
    bestFor: "drawing",
  },
];

const DEFAULTS: Record<EffectKey, { intensity: number; hue: number }> = {
  none: { intensity: 0, hue: 0 },
  "soft-vintage": { intensity: 50, hue: 30 },
  spotlight: { intensity: 80, hue: 0 },
  "indigo-wash": { intensity: 75, hue: 220 },
  "black-white": { intensity: 50, hue: 0 },
  outline: { intensity: 60, hue: 0 },
  "outline-tinted": { intensity: 55, hue: 200 },
  "outline-orange": { intensity: 65, hue: 25 },
};

export default function EffectsTestPage() {
  const [workKey, setWorkKey] = useState<string>("ruysch");
  const [selectedEffect, setSelectedEffect] = useState<EffectKey>("soft-vintage");
  const [intensity, setIntensity] = useState(DEFAULTS["soft-vintage"].intensity);
  const [hue, setHue] = useState(DEFAULTS["soft-vintage"].hue);
  const [paperPreview, setPaperPreview] = useState(true);
  const [holding, setHolding] = useState(false);

  const work = WORKS.find((w) => w.key === workKey) ?? WORKS[0];
  const activeId = work.iiifId || "sbaXO"; // Ruysch fallback
  const imageUrl = rijksmuseumImageUrl(activeId, 1200);

  const handleEffectChange = (k: EffectKey) => {
    setSelectedEffect(k);
    setIntensity(DEFAULTS[k].intensity);
    setHue(DEFAULTS[k].hue);
  };

  const isOutline =
    selectedEffect === "outline" ||
    selectedEffect === "outline-tinted" ||
    selectedEffect === "outline-orange";

  const showHueSlider =
    selectedEffect === "indigo-wash" || selectedEffect === "outline-tinted";

  return (
    <main className="bg-ivory min-h-screen pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <p className="eyebrow mb-3">Internal sandbox — sister-brand prototype</p>
        <h1 className="font-serif text-5xl text-umber leading-[1.05] mb-4">
          Treatments, by work and effect.
        </h1>
        <p className="text-stone max-w-2xl leading-relaxed">
          Switch between a painting and a line drawing in the dropdown below.
          Some effects work beautifully on one and fail on the other — the UI
          flags the mismatch but lets you try anyway.
        </p>

        {/* Work picker */}
        <div className="mt-6 flex flex-wrap gap-3 items-center text-sm font-sans">
          <label htmlFor="work-picker" className="text-umber">
            Work:
          </label>
          <select
            id="work-picker"
            value={workKey}
            onChange={(e) => setWorkKey(e.target.value)}
            className="px-3 py-1.5 border border-umber/20 bg-white"
          >
            {WORKS.map((w) => (
              <option key={w.key} value={w.key}>
                {w.label}
                {!w.iiifId ? " — fallback (no IIIF id yet)" : ""}
              </option>
            ))}
          </select>
          <a
            href={work.source}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-stone hover:text-umber"
          >
            Source ↗
          </a>
        </div>

        {!work.iiifId && (
          <p className="mt-3 text-xs text-rust font-sans italic">
            This work has no IIIF id pasted yet — showing Ruysch as fallback.
            Use the /test/curation page to fetch missing IDs.
          </p>
        )}

        <div className="grid lg:grid-cols-12 gap-10 mt-10">
          {/* CANVAS */}
          <div className="lg:col-span-7 lg:sticky lg:top-10 lg:self-start">
            <div
              className={`relative aspect-[4/5] overflow-hidden ${
                paperPreview ? "bg-cream paper-grain shadow-2xl" : "bg-charcoal"
              }`}
            >
              <EffectCanvas
                imageUrl={imageUrl}
                effect={holding ? "none" : selectedEffect}
                intensity={intensity}
                hue={hue}
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-stone font-sans">
                <input
                  type="checkbox"
                  checked={paperPreview}
                  onChange={(e) => setPaperPreview(e.target.checked)}
                />
                Show with paper-textured background
              </label>

              {selectedEffect !== "none" && (
                <button
                  onMouseDown={() => setHolding(true)}
                  onMouseUp={() => setHolding(false)}
                  onMouseLeave={() => setHolding(false)}
                  onTouchStart={() => setHolding(true)}
                  onTouchEnd={() => setHolding(false)}
                  className={`text-xs uppercase tracking-widest font-sans px-3 py-1.5 border transition-colors select-none ${
                    holding
                      ? "bg-umber text-ivory border-umber"
                      : "border-umber/30 text-umber hover:bg-cream"
                  }`}
                  title="Hold to see the original work"
                >
                  {holding ? "Showing original" : "Hold to compare"}
                </button>
              )}
            </div>

            {/* Mismatch warning */}
            {isOutline && work.type === "painting" && (
              <p className="mt-3 text-xs text-rust font-sans italic">
                Outline treatments are designed for line drawings — on
                paintings they tend to look muddy. Switch to a drawing in the
                picker above.
              </p>
            )}
          </div>

          {/* CONTROLS */}
          <div className="lg:col-span-5 space-y-10">
            <section>
              <p className="eyebrow mb-3">Effect</p>
              <div className="grid grid-cols-1 gap-2">
                {EFFECTS.map((e) => {
                  const matchesWork =
                    e.bestFor === "any" || e.bestFor === work.type;
                  return (
                    <button
                      key={e.key}
                      onClick={() => handleEffectChange(e.key)}
                      className={`text-left p-3 border transition-colors ${
                        selectedEffect === e.key
                          ? "bg-umber text-ivory border-umber"
                          : matchesWork
                            ? "bg-cream border-umber/20 text-umber hover:border-umber"
                            : "bg-cream/50 border-umber/10 text-stone hover:border-umber/30"
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <div className="font-serif text-base leading-tight">
                          {e.label}
                        </div>
                        {!matchesWork && (
                          <span
                            className={`text-[10px] uppercase tracking-widest font-sans ${
                              selectedEffect === e.key
                                ? "text-ivory/60"
                                : "text-rust/70"
                            }`}
                          >
                            for {e.bestFor}s
                          </span>
                        )}
                      </div>
                      <div
                        className={`text-[11px] mt-1 leading-snug font-sans ${
                          selectedEffect === e.key
                            ? "text-ivory/70"
                            : "text-stone"
                        }`}
                      >
                        {e.description}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            <section>
              <p className="eyebrow mb-3">Sliders</p>
              <div className="space-y-5">
                <SliderRow
                  label="Intensity"
                  value={intensity}
                  onChange={setIntensity}
                  min={0}
                  max={100}
                  unit="%"
                />
                {showHueSlider && (
                  <SliderRow
                    label="Hue"
                    value={hue}
                    onChange={setHue}
                    min={0}
                    max={360}
                    unit="°"
                  />
                )}
              </div>
            </section>

            <div className="text-xs text-stone font-sans pt-6 border-t border-umber/10">
              <strong className="font-semibold">Note.</strong> All effects
              are pure CSS — instant in the browser, no server processing.
              For a real product the chosen treatment would need to be baked
              into the file sent to the printer.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function SliderRow({
  label,
  value,
  onChange,
  min,
  max,
  unit,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  unit: string;
}) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1.5 text-sm font-sans">
        <span className="text-umber">{label}</span>
        <span className="text-stone tabular-nums">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-umber"
      />
    </div>
  );
}

function EffectCanvas({
  imageUrl,
  effect,
  intensity,
  hue,
}: {
  imageUrl: string;
  effect: EffectKey;
  intensity: number;
  hue: number;
}) {
  const i = intensity / 100;

  let imgStyle: React.CSSProperties = {};
  let overlayElement: React.ReactNode = null;
  let backgroundOverride: string | undefined;

  switch (effect) {
    case "indigo-wash": {
      imgStyle = {
        filter: `grayscale(1) contrast(${1 + i * 0.4}) brightness(${1 + i * 0.1})`,
      };
      overlayElement = (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: `hsl(${hue}, ${50 + i * 40}%, ${50 - i * 10}%)`,
            mixBlendMode: "multiply",
            opacity: 0.5 + i * 0.4,
          }}
        />
      );
      break;
    }

    case "spotlight": {
      imgStyle = { filter: `saturate(${0.2 - i * 0.15})` };
      overlayElement = (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={imageUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            WebkitMaskImage: `radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${
              15 + i * 25
            }%, rgba(0,0,0,0) ${30 + i * 30}%)`,
            maskImage: `radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${
              15 + i * 25
            }%, rgba(0,0,0,0) ${30 + i * 30}%)`,
          }}
        />
      );
      break;
    }

    case "soft-vintage": {
      imgStyle = {
        filter: `sepia(${i * 0.5}) contrast(${1 - i * 0.15}) brightness(${
          1 + i * 0.05
        }) saturate(${1 - i * 0.3})`,
      };
      overlayElement = (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(58,46,34,0.25) 100%)",
            opacity: 0.3 + i * 0.4,
          }}
        />
      );
      break;
    }

    case "black-white": {
      imgStyle = {
        filter: `grayscale(1) contrast(${0.8 + i * 0.8}) brightness(${
          1 + i * 0.05
        })`,
      };
      break;
    }

    case "outline": {
      imgStyle = {
        filter: `grayscale(1) invert(1) brightness(${0.8 + i * 0.4}) contrast(${
          2 + i * 4
        })`,
      };
      break;
    }

    case "outline-tinted": {
      // Show inverted line drawing on a soft coloured background.
      // Background colour driven by hue slider.
      backgroundOverride = `hsl(${hue}, 25%, 88%)`;
      imgStyle = {
        filter: `grayscale(1) invert(1) brightness(${0.8 + i * 0.4}) contrast(${
          2 + i * 4
        })`,
        mixBlendMode: "multiply",
      };
      break;
    }

    case "outline-orange": {
      // Inverted line + warm orange wash via hue-rotate trick on the inverted image.
      imgStyle = {
        filter: `grayscale(1) invert(1) brightness(${
          0.85 + i * 0.3
        }) contrast(${2 + i * 4}) sepia(1) hue-rotate(-25deg) saturate(${
          2 + i * 2
        })`,
      };
      break;
    }
  }

  return (
    <div
      className="absolute inset-0"
      style={backgroundOverride ? { backgroundColor: backgroundOverride } : {}}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={imgStyle}
      />
      {overlayElement}
    </div>
  );
}

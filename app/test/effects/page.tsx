"use client";

import { useState } from "react";
import { rijksmuseumImageUrl } from "@/lib/utils";

/**
 * Effects test page — not in main navigation, not for Archive & Bloom.
 * Visit at /test/effects to preview six visual treatments that could be
 * the basis for a separate, more playful sister-brand later.
 *
 * The image used is the Sprig of White Currants with Insects — a pale
 * drawing where colour shifts read clearly.
 *
 * To swap in a different work, change WORK_IIIF_ID below.
 */

// White currants with insects — paste the IIIF id here once you have it.
// Until then, the page falls back to a placeholder demo image.
const WORK_IIIF_ID = ""; // e.g. "abcdef"
const WORK_TITLE = "Sprig of White Currants with Insects";
const WORK_SOURCE_URL =
  "https://www.rijksmuseum.nl/en/collection/object/Sprig-of-White-Currants-with-Insects--75123495e9fea66aaa874f654878bb04";

// Fallback demo: Ruysch (we know this one works). Used if you haven't
// pasted the white-currants ID yet.
const FALLBACK_IIIF_ID = "sbaXO";

type EffectKey =
  | "duotone-magenta"
  | "duotone-yellow"
  | "duotone-blue"
  | "outline"
  | "single-bloom"
  | "soft-vintage";

interface EffectDef {
  key: EffectKey;
  label: string;
  description: string;
}

const EFFECTS: EffectDef[] = [
  {
    key: "duotone-magenta",
    label: "Magenta wash",
    description: "Two-tone treatment in cream + magenta. Print-mijn-stad style.",
  },
  {
    key: "duotone-yellow",
    label: "Saffron wash",
    description: "Two-tone in cream + ochre. Warm, retro-poster feel.",
  },
  {
    key: "duotone-blue",
    label: "Indigo wash",
    description: "Two-tone in cream + deep blue. Cyanotype-like.",
  },
  {
    key: "outline",
    label: "Edge outline",
    description: "Inverted high-contrast — turns the work into a line drawing.",
  },
  {
    key: "single-bloom",
    label: "Spotlight",
    description: "Desaturated background with one circular area kept in colour.",
  },
  {
    key: "soft-vintage",
    label: "Soft vintage",
    description: "Lifted blacks, warm tone, slight fade — old-paper feel.",
  },
];

// Per-effect default slider values
const DEFAULTS: Record<EffectKey, { intensity: number; hue: number }> = {
  "duotone-magenta": { intensity: 75, hue: 320 },
  "duotone-yellow": { intensity: 75, hue: 45 },
  "duotone-blue": { intensity: 75, hue: 220 },
  outline: { intensity: 60, hue: 0 },
  "single-bloom": { intensity: 80, hue: 0 },
  "soft-vintage": { intensity: 50, hue: 30 },
};

export default function EffectsTestPage() {
  const [selectedEffect, setSelectedEffect] = useState<EffectKey>(
    "duotone-magenta"
  );
  const [intensity, setIntensity] = useState(
    DEFAULTS["duotone-magenta"].intensity
  );
  const [hue, setHue] = useState(DEFAULTS["duotone-magenta"].hue);
  const [paperPreview, setPaperPreview] = useState(true);

  const activeId = WORK_IIIF_ID || FALLBACK_IIIF_ID;
  const imageUrl = rijksmuseumImageUrl(activeId, 1200);

  const handleEffectChange = (k: EffectKey) => {
    setSelectedEffect(k);
    setIntensity(DEFAULTS[k].intensity);
    setHue(DEFAULTS[k].hue);
  };

  return (
    <main className="bg-ivory min-h-screen pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <p className="eyebrow mb-3">Internal sandbox — sister-brand prototype</p>
        <h1 className="font-serif text-5xl text-umber leading-[1.05] mb-4">
          Six ways to treat one work.
        </h1>
        <p className="text-stone max-w-2xl leading-relaxed">
          Six purely-CSS treatments applied to{" "}
          <em>{WORK_TITLE}</em>. Two control styles: preset chips (one click,
          curated values) and sliders (free play). Nothing here is for Archive
          &amp; Bloom — this is a rough sketch for a possible second, more
          playful brand.{" "}
          <a
            href={WORK_SOURCE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-umber"
          >
            Source ↗
          </a>
        </p>

        {!WORK_IIIF_ID && (
          <p className="mt-4 text-xs text-rust font-sans italic">
            Showing fallback work (Ruysch) until you paste the white-currants
            IIIF ID into <code>WORK_IIIF_ID</code> in this file.
          </p>
        )}

        <div className="grid lg:grid-cols-12 gap-10 mt-12">
          {/* CANVAS */}
          <div className="lg:col-span-7 lg:sticky lg:top-10 lg:self-start">
            <div
              className={`relative aspect-[4/5] overflow-hidden ${
                paperPreview ? "bg-cream paper-grain shadow-2xl" : "bg-charcoal"
              }`}
            >
              <EffectCanvas
                imageUrl={imageUrl}
                effect={selectedEffect}
                intensity={intensity}
                hue={hue}
              />
            </div>

            <label className="mt-4 flex items-center gap-2 text-sm text-stone font-sans">
              <input
                type="checkbox"
                checked={paperPreview}
                onChange={(e) => setPaperPreview(e.target.checked)}
              />
              Show with paper-textured background
            </label>
          </div>

          {/* CONTROLS */}
          <div className="lg:col-span-5 space-y-10">
            {/* Style 1: preset chips */}
            <section>
              <p className="eyebrow mb-3">Control style A — preset chips</p>
              <p className="text-xs text-stone mb-4 font-sans">
                One click, curated values. Easiest for a customer who just
                wants something nice.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {EFFECTS.map((e) => (
                  <button
                    key={e.key}
                    onClick={() => handleEffectChange(e.key)}
                    className={`text-left p-3 border transition-colors ${
                      selectedEffect === e.key
                        ? "bg-umber text-ivory border-umber"
                        : "bg-cream border-umber/20 text-umber hover:border-umber"
                    }`}
                  >
                    <div className="font-serif text-base leading-tight">
                      {e.label}
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
                ))}
              </div>
            </section>

            {/* Style 2: sliders */}
            <section>
              <p className="eyebrow mb-3">Control style B — sliders</p>
              <p className="text-xs text-stone mb-4 font-sans">
                Free play with intensity and (for duotones) hue. For customers
                who want to tinker.
              </p>

              <div className="space-y-5">
                <SliderRow
                  label="Intensity"
                  value={intensity}
                  onChange={setIntensity}
                  min={0}
                  max={100}
                  unit="%"
                />
                {selectedEffect.startsWith("duotone") && (
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
              <strong className="font-semibold">Note.</strong> All effects are
              pure CSS — no image processing on the server, instant feedback,
              works on any device. The print would, of course, need a baked
              version of the chosen effect rendered as the actual file sent to
              the print provider.
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

/**
 * The actual visual effects. All implemented with CSS `filter` and
 * `mix-blend-mode` — no canvas, no image processing.
 */
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
  const i = intensity / 100; // 0..1

  // Base image styling per effect
  let imgStyle: React.CSSProperties = {};
  let overlayElement: React.ReactNode = null;

  switch (effect) {
    case "duotone-magenta":
    case "duotone-yellow":
    case "duotone-blue": {
      // Convert image to grayscale, then overlay coloured layer with multiply
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

    case "outline": {
      imgStyle = {
        filter: `grayscale(1) invert(1) brightness(${0.8 + i * 0.4}) contrast(${
          2 + i * 4
        })`,
      };
      break;
    }

    case "single-bloom": {
      imgStyle = {
        filter: `saturate(${0.2 - i * 0.15})`,
      };
      // Spotlight overlay: a circular mask in the centre that "punches through"
      // by showing a second copy of the image in full colour.
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
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt={WORK_TITLE}
        className="absolute inset-0 w-full h-full object-cover"
        style={imgStyle}
      />
      {overlayElement}
    </>
  );
}

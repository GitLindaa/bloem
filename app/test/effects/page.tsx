"use client";

import { useState } from "react";
import { rijksmuseumImageUrl } from "@/lib/utils";

/**
 * Effects test page — sister-brand prototype.
 * Three treatments only — soft vintage, spotlight, indigo wash.
 * (Magenta, saffron and outline have been retired based on first review.)
 */

const WORK_IIIF_ID = ""; // paste the white-currants IIIF id once known
const WORK_TITLE = "Sprig of White Currants with Insects";
const WORK_SOURCE_URL =
  "https://www.rijksmuseum.nl/en/collection/object/Sprig-of-White-Currants-with-Insects--75123495e9fea66aaa874f654878bb04";

const FALLBACK_IIIF_ID = "sbaXO"; // Ruysch — known to work

type EffectKey = "soft-vintage" | "spotlight" | "indigo-wash";

interface EffectDef {
  key: EffectKey;
  label: string;
  description: string;
}

const EFFECTS: EffectDef[] = [
  {
    key: "soft-vintage",
    label: "Soft vintage",
    description: "Lifted blacks, warm tone, slight fade — old-paper feel.",
  },
  {
    key: "spotlight",
    label: "Spotlight",
    description: "Desaturated background with one circular area kept in colour.",
  },
  {
    key: "indigo-wash",
    label: "Indigo wash",
    description: "Two-tone in cream + deep blue. Cyanotype-like.",
  },
];

const DEFAULTS: Record<EffectKey, { intensity: number; hue: number }> = {
  "soft-vintage": { intensity: 50, hue: 30 },
  spotlight: { intensity: 80, hue: 0 },
  "indigo-wash": { intensity: 75, hue: 220 },
};

export default function EffectsTestPage() {
  const [selectedEffect, setSelectedEffect] = useState<EffectKey>("soft-vintage");
  const [intensity, setIntensity] = useState(DEFAULTS["soft-vintage"].intensity);
  const [hue, setHue] = useState(DEFAULTS["soft-vintage"].hue);
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
          Three treatments worth keeping.
        </h1>
        <p className="text-stone max-w-2xl leading-relaxed">
          Trimmed down to the three effects that felt right for{" "}
          <em>{WORK_TITLE}</em>. Two control styles to compare: preset chips
          (one click) and sliders (free play).{" "}
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
            Showing fallback work (Ruysch) until the white-currants IIIF ID is
            pasted into <code>WORK_IIIF_ID</code> in this file.
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
            <section>
              <p className="eyebrow mb-3">Control style A — preset chips</p>
              <p className="text-xs text-stone mb-4 font-sans">
                One click, curated values. Easiest for a customer who just
                wants something nice.
              </p>
              <div className="grid grid-cols-1 gap-2">
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

            <section>
              <p className="eyebrow mb-3">Control style B — sliders</p>
              <p className="text-xs text-stone mb-4 font-sans">
                Free play with intensity and (for indigo) hue. For customers
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
                {selectedEffect === "indigo-wash" && (
                  <SliderRow
                    label="Hue"
                    value={hue}
                    onChange={setHue}
                    min={180}
                    max={260}
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

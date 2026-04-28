import type { PlaceholderArtConfig } from "@/lib/types";

// =====================================================================
// PlaceholderArt — botanical SVG illustrations used in place of real
// imagery while the catalogue is being assembled. Replace with real
// public-domain images via the workflow in /docs/IMAGE-SOURCING-WORKFLOW.md
// =====================================================================

const BACKGROUNDS: Record<PlaceholderArtConfig["background"], string> = {
  ivory: "#F5F0E4",
  cream: "#FAF6EC",
  parchment: "#EDE6D3",
  "olive-tint": "#E4E5D2",
  "blue-tint": "#DCE2E2",
};

const INK = "#3A2E22";
const SOFT_INK = "#6B5A48";
const ACCENT = "#5C6B4A";

interface Props {
  config: PlaceholderArtConfig;
  className?: string;
  /** When true, render at a wider portrait ratio suitable for product cards. */
  poster?: boolean;
}

export function PlaceholderArt({ config, className, poster = true }: Props) {
  const bg = BACKGROUNDS[config.background];
  const viewBox = poster ? "0 0 400 540" : "0 0 400 400";

  return (
    <svg
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Placeholder botanical illustration"
    >
      <defs>
        <pattern id={`grain-${config.motif}-${config.background}`} width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="4" height="4" fill={bg} />
          <circle cx="1" cy="1" r="0.3" fill="#000" opacity="0.04" />
          <circle cx="3" cy="3" r="0.3" fill="#000" opacity="0.03" />
        </pattern>
      </defs>

      {/* Background */}
      <rect width="400" height={poster ? 540 : 400} fill={`url(#grain-${config.motif}-${config.background})`} />

      {/* Inner plate margin — like an old botanical book */}
      <rect
        x="22"
        y="22"
        width="356"
        height={poster ? 496 : 356}
        fill="none"
        stroke={INK}
        strokeWidth="0.5"
        opacity="0.3"
      />
      <rect
        x="28"
        y="28"
        width="344"
        height={poster ? 484 : 344}
        fill="none"
        stroke={INK}
        strokeWidth="0.3"
        opacity="0.2"
      />

      {/* Motif */}
      <g transform={poster ? "translate(0, 30)" : "translate(0, 0)"}>
        {renderMotif(config.motif)}
      </g>

      {/* Plate caption line */}
      <g opacity="0.4">
        <line x1="120" y1={poster ? 470 : 350} x2="280" y2={poster ? 470 : 350} stroke={INK} strokeWidth="0.4" />
        <text
          x="200"
          y={poster ? 490 : 370}
          fontSize="10"
          textAnchor="middle"
          fontFamily="serif"
          fontStyle="italic"
          fill={INK}
          letterSpacing="0.1em"
        >
          Plate
        </text>
      </g>
    </svg>
  );
}

function renderMotif(motif: PlaceholderArtConfig["motif"]) {
  switch (motif) {
    case "rose":
      return <RoseMotif />;
    case "fern":
      return <FernMotif />;
    case "leaf":
      return <LeafMotif />;
    case "bird":
      return <BirdMotif />;
    case "butterfly":
      return <ButterflyMotif />;
    case "shell":
      return <ShellMotif />;
    case "fish":
      return <FishMotif />;
    case "map":
      return <MapMotif />;
    case "anatomy":
      return <AnatomyMotif />;
    case "celestial":
      return <CelestialMotif />;
  }
}

// ---- individual motifs ----

function RoseMotif() {
  return (
    <g transform="translate(200, 220)" stroke={INK} fill="none" strokeWidth="1.2" strokeLinecap="round">
      {/* Stem */}
      <path d="M 0 80 Q -10 140 5 200" />
      {/* Leaves */}
      <path d="M 5 130 Q 30 120 40 100 Q 25 110 5 130 Z" fill={ACCENT} fillOpacity="0.18" />
      <path d="M -5 160 Q -30 155 -40 135 Q -25 145 -5 160 Z" fill={ACCENT} fillOpacity="0.18" />
      {/* Bloom — layered petals */}
      <g>
        <ellipse cx="0" cy="40" rx="45" ry="38" fill="#fff" fillOpacity="0.4" />
        <path d="M -40 30 Q -20 0 0 10 Q 20 0 40 30 Q 30 60 0 60 Q -30 60 -40 30 Z" fill={SOFT_INK} fillOpacity="0.08" />
        <path d="M -25 25 Q -10 5 0 18 Q 10 5 25 25 Q 18 45 0 45 Q -18 45 -25 25 Z" fill={SOFT_INK} fillOpacity="0.12" />
        <path d="M -12 22 Q -5 12 0 20 Q 5 12 12 22 Q 8 32 0 32 Q -8 32 -12 22 Z" />
        <ellipse cx="0" cy="28" rx="3" ry="4" fill={INK} fillOpacity="0.4" />
      </g>
      {/* Bud above */}
      <g transform="translate(-30, -20)">
        <ellipse cx="0" cy="0" rx="8" ry="14" fill={SOFT_INK} fillOpacity="0.1" />
        <path d="M -8 0 Q 0 -16 8 0 Q 0 14 -8 0 Z" />
        <path d="M -2 8 Q 0 30 6 50" />
      </g>
    </g>
  );
}

function FernMotif() {
  return (
    <g transform="translate(200, 240)" stroke={ACCENT} fill="none" strokeWidth="1.1" strokeLinecap="round">
      {/* Central stem */}
      <path d="M 0 -180 Q 5 0 0 180" stroke={INK} />
      {/* Fronds */}
      {Array.from({ length: 18 }).map((_, i) => {
        const t = (i - 8.5) / 9; // -1..1
        const y = t * 170;
        const span = 90 * (1 - Math.abs(t) * 0.6);
        return (
          <g key={i} transform={`translate(0, ${y})`}>
            <path d={`M 0 0 Q ${span / 2} -8 ${span} ${i % 2 === 0 ? -10 : 10}`} />
            <path d={`M 0 0 Q ${-span / 2} -8 ${-span} ${i % 2 === 0 ? -10 : 10}`} />
            {/* Tiny leaflets */}
            {Array.from({ length: 5 }).map((_, j) => {
              const f = (j + 1) / 6;
              return (
                <g key={j}>
                  <path d={`M ${span * f} ${i % 2 === 0 ? -6 : 6} q 4 -4 8 -2`} strokeWidth="0.7" />
                  <path d={`M ${-span * f} ${i % 2 === 0 ? -6 : 6} q -4 -4 -8 -2`} strokeWidth="0.7" />
                </g>
              );
            })}
          </g>
        );
      })}
    </g>
  );
}

function LeafMotif() {
  return (
    <g transform="translate(200, 230)" stroke={INK} fill="none" strokeWidth="1.1" strokeLinecap="round">
      {/* Branch */}
      <path d="M 0 200 Q -5 50 10 -160" />
      {/* Leaves alternating */}
      {Array.from({ length: 10 }).map((_, i) => {
        const y = 180 - i * 38;
        const side = i % 2 === 0 ? 1 : -1;
        return (
          <g key={i} transform={`translate(${side * 5}, ${y})`}>
            <path
              d={`M 0 0 q ${side * 70} -10 ${side * 100} -30 q ${side * -20} 30 ${side * -100} 30 Z`}
              fill={ACCENT}
              fillOpacity="0.14"
            />
            <path d={`M 0 0 q ${side * 60} -8 ${side * 100} -28`} strokeWidth="0.6" />
          </g>
        );
      })}
    </g>
  );
}

function BirdMotif() {
  return (
    <g transform="translate(200, 230)" stroke={INK} fill="none" strokeWidth="1.1" strokeLinecap="round">
      {/* Branch */}
      <path d="M -180 60 Q 0 90 180 50" />
      <path d="M 80 55 Q 100 70 130 75" strokeWidth="0.6" />
      {/* Bird body */}
      <g transform="translate(0, 0)">
        <path d="M -60 0 Q -40 -40 20 -30 Q 70 -20 80 10 Q 60 30 -10 30 Q -50 30 -60 0 Z" fill={SOFT_INK} fillOpacity="0.1" />
        {/* Head */}
        <circle cx="60" cy="-25" r="18" fill={SOFT_INK} fillOpacity="0.15" />
        <circle cx="60" cy="-25" r="18" />
        {/* Eye */}
        <circle cx="65" cy="-28" r="1.6" fill={INK} />
        {/* Beak */}
        <path d="M 78 -22 L 92 -20 L 78 -16 Z" fill={INK} fillOpacity="0.6" />
        {/* Wing */}
        <path d="M -10 -10 Q 10 -30 40 -10 Q 20 0 -10 -10 Z" fill={ACCENT} fillOpacity="0.2" />
        <path d="M -10 -10 Q 10 -30 40 -10 Q 20 0 -10 -10 Z" />
        {/* Tail */}
        <path d="M -60 0 L -100 -10 L -90 5 L -100 15 L -60 10" />
        {/* Feet */}
        <path d="M 0 30 L 0 60 M -8 60 L 8 60 M -2 30 L -2 60 M -10 60 L 6 60" strokeWidth="0.7" />
      </g>
    </g>
  );
}

function ButterflyMotif() {
  return (
    <g transform="translate(200, 240)" stroke={INK} fill="none" strokeWidth="1.1" strokeLinecap="round">
      {/* Body */}
      <ellipse cx="0" cy="0" rx="3" ry="60" fill={INK} fillOpacity="0.7" />
      {/* Antennae */}
      <path d="M -2 -55 Q -10 -80 -20 -88" />
      <path d="M 2 -55 Q 10 -80 20 -88" />
      <circle cx="-20" cy="-88" r="1.5" fill={INK} />
      <circle cx="20" cy="-88" r="1.5" fill={INK} />
      {/* Upper wings */}
      <path d="M -3 -40 Q -100 -80 -130 -30 Q -110 0 -3 -10 Z" fill="#5A6F80" fillOpacity="0.18" />
      <path d="M 3 -40 Q 100 -80 130 -30 Q 110 0 3 -10 Z" fill="#5A6F80" fillOpacity="0.18" />
      <path d="M -3 -40 Q -100 -80 -130 -30 Q -110 0 -3 -10 Z" />
      <path d="M 3 -40 Q 100 -80 130 -30 Q 110 0 3 -10 Z" />
      {/* Lower wings */}
      <path d="M -3 0 Q -90 30 -100 70 Q -60 80 -3 30 Z" fill="#5A6F80" fillOpacity="0.14" />
      <path d="M 3 0 Q 90 30 100 70 Q 60 80 3 30 Z" fill="#5A6F80" fillOpacity="0.14" />
      <path d="M -3 0 Q -90 30 -100 70 Q -60 80 -3 30 Z" />
      <path d="M 3 0 Q 90 30 100 70 Q 60 80 3 30 Z" />
      {/* Wing details */}
      <circle cx="-70" cy="-30" r="6" fill={INK} fillOpacity="0.15" />
      <circle cx="70" cy="-30" r="6" fill={INK} fillOpacity="0.15" />
      <circle cx="-50" cy="40" r="3" fill={INK} fillOpacity="0.15" />
      <circle cx="50" cy="40" r="3" fill={INK} fillOpacity="0.15" />
      <path d="M -100 -30 Q -80 -20 -50 -25" strokeWidth="0.6" />
      <path d="M 100 -30 Q 80 -20 50 -25" strokeWidth="0.6" />
    </g>
  );
}

function ShellMotif() {
  return (
    <g transform="translate(200, 230)" stroke={INK} fill="none" strokeWidth="1.1" strokeLinecap="round">
      <g>
        {/* Spiral */}
        {Array.from({ length: 8 }).map((_, i) => {
          const r = 18 + i * 14;
          return (
            <ellipse
              key={i}
              cx={i * 4}
              cy={-i * 2}
              rx={r}
              ry={r * 0.78}
              transform={`rotate(${i * 4} ${i * 4} ${-i * 2})`}
              opacity={0.6 - i * 0.05}
            />
          );
        })}
        {/* Shell base — more solid */}
        <ellipse cx="0" cy="0" rx="120" ry="95" fill={SOFT_INK} fillOpacity="0.06" />
        <ellipse cx="0" cy="0" rx="120" ry="95" />
        {/* Aperture */}
        <ellipse cx="-60" cy="20" rx="40" ry="60" transform="rotate(-25 -60 20)" fill={SOFT_INK} fillOpacity="0.18" />
        <ellipse cx="-60" cy="20" rx="40" ry="60" transform="rotate(-25 -60 20)" />
        {/* Ridge details */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI;
          return (
            <line
              key={i}
              x1={Math.cos(a) * 30}
              y1={-Math.abs(Math.sin(a)) * 30}
              x2={Math.cos(a) * 110}
              y2={-Math.abs(Math.sin(a)) * 80}
              strokeWidth="0.5"
              opacity="0.5"
            />
          );
        })}
      </g>
    </g>
  );
}

function FishMotif() {
  return (
    <g transform="translate(200, 230)" stroke={INK} fill="none" strokeWidth="1.1" strokeLinecap="round">
      {/* Body */}
      <path d="M -130 0 Q -80 -55 60 -45 Q 130 -30 145 0 Q 130 30 60 45 Q -80 55 -130 0 Z" fill="#5A6F80" fillOpacity="0.12" />
      <path d="M -130 0 Q -80 -55 60 -45 Q 130 -30 145 0 Q 130 30 60 45 Q -80 55 -130 0 Z" />
      {/* Tail */}
      <path d="M 130 -10 L 175 -40 L 165 0 L 175 40 L 130 10 Z" fill="#5A6F80" fillOpacity="0.18" />
      <path d="M 130 -10 L 175 -40 L 165 0 L 175 40 L 130 10 Z" />
      {/* Eye */}
      <circle cx="-90" cy="-12" r="8" />
      <circle cx="-90" cy="-12" r="3" fill={INK} />
      {/* Gill */}
      <path d="M -65 -25 Q -55 0 -65 25" />
      {/* Fins */}
      <path d="M -10 -45 Q 15 -75 50 -50" />
      <path d="M -10 45 Q 15 75 50 50" />
      {/* Scale lines */}
      {Array.from({ length: 5 }).map((_, i) => (
        <path
          key={i}
          d={`M ${-40 + i * 30} -30 Q ${-20 + i * 30} 0 ${-40 + i * 30} 30`}
          strokeWidth="0.5"
          opacity="0.4"
        />
      ))}
    </g>
  );
}

function MapMotif() {
  return (
    <g transform="translate(200, 230)" stroke={INK} fill="none" strokeWidth="0.6" strokeLinecap="round">
      {/* Compass rose top right */}
      <g transform="translate(110, -150)" opacity="0.8">
        <circle r="22" />
        <circle r="14" />
        <path d="M 0 -22 L 4 0 L 0 22 L -4 0 Z" fill={INK} fillOpacity="0.4" />
        <path d="M -22 0 L 0 -4 L 22 0 L 0 4 Z" fill={INK} fillOpacity="0.2" />
        <text y="-28" textAnchor="middle" fontSize="8" fontFamily="serif" fill={INK}>N</text>
      </g>
      {/* River — irregular curve */}
      <path d="M -160 -100 Q -100 -80 -80 -40 Q -60 0 -100 40 Q -130 80 -100 140" strokeWidth="1.5" stroke="#5A6F80" />
      {/* Roads — grid that bends */}
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={`h${i}`} x1="-180" x2="180" y1={-120 + i * 30} y2={-120 + i * 30} strokeWidth="0.4" opacity="0.45" />
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <line key={`v${i}`} y1="-160" y2="160" x1={-180 + i * 40} x2={-160 + i * 40} strokeWidth="0.4" opacity="0.45" />
      ))}
      {/* Buildings — small filled rectangles */}
      {[
        [-40, -50, 12, 8],
        [-20, -40, 10, 8],
        [10, -20, 14, 10],
        [40, -10, 8, 12],
        [-50, 20, 10, 14],
        [20, 40, 16, 8],
        [60, 50, 10, 10],
        [-100, 80, 12, 10],
        [80, 90, 8, 14],
      ].map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill={INK} fillOpacity="0.45" stroke="none" />
      ))}
      {/* Cartouche / title rectangle */}
      <rect x="-160" y="120" width="120" height="38" strokeWidth="0.7" />
      <text x="-100" y="142" textAnchor="middle" fontSize="10" fontFamily="serif" fontStyle="italic" fill={INK}>
        Plan
      </text>
      <text x="-100" y="154" textAnchor="middle" fontSize="7" fontFamily="serif" fill={INK} opacity="0.7">
        of the City
      </text>
    </g>
  );
}

function AnatomyMotif() {
  return (
    <g transform="translate(200, 240)" stroke={INK} fill="none" strokeWidth="1" strokeLinecap="round">
      {/* Hand outline */}
      <g transform="translate(-20, -100)">
        {/* Palm */}
        <path d="M -40 100 Q -50 60 -45 30 Q -40 0 -20 -5 Q -5 -10 5 -5 Q 25 0 35 30 Q 40 70 30 110 Q 20 150 -10 155 Q -35 145 -40 100 Z" fill={SOFT_INK} fillOpacity="0.06" />
        {/* Fingers */}
        <path d="M -30 -5 Q -38 -50 -28 -70 Q -22 -78 -16 -76 Q -10 -70 -14 -50 Q -16 -25 -16 -8" />
        <path d="M -10 -10 Q -10 -65 -2 -90 Q 5 -98 10 -94 Q 14 -85 12 -65 Q 10 -35 6 -12" />
        <path d="M 10 -8 Q 18 -55 28 -75 Q 36 -82 40 -78 Q 42 -68 36 -50 Q 30 -30 24 -10" />
        <path d="M 25 0 Q 35 -30 48 -45 Q 56 -50 58 -42 Q 56 -30 48 -18 Q 40 -8 32 5" />
        {/* Thumb */}
        <path d="M -40 30 Q -65 35 -75 25 Q -78 18 -68 10 Q -55 5 -45 12" />
        {/* Reference numerals */}
        <text x="-22" y="-45" fontSize="9" fontFamily="serif" fontStyle="italic" fill={INK} opacity="0.5">i</text>
        <text x="0" y="-65" fontSize="9" fontFamily="serif" fontStyle="italic" fill={INK} opacity="0.5">ii</text>
        <text x="22" y="-50" fontSize="9" fontFamily="serif" fontStyle="italic" fill={INK} opacity="0.5">iii</text>
        <text x="42" y="-30" fontSize="9" fontFamily="serif" fontStyle="italic" fill={INK} opacity="0.5">iv</text>
      </g>
      {/* Faint reference lines */}
      <line x1="-60" y1="-50" x2="-150" y2="-50" strokeWidth="0.3" opacity="0.4" />
      <line x1="40" y1="0" x2="150" y2="0" strokeWidth="0.3" opacity="0.4" />
    </g>
  );
}

function CelestialMotif() {
  return (
    <g transform="translate(200, 240)" stroke={INK} fill="none" strokeWidth="0.6" strokeLinecap="round">
      {/* Outer ring */}
      <circle r="180" />
      <circle r="170" strokeWidth="0.3" />
      {/* Inner ring */}
      <circle r="150" strokeWidth="0.3" />
      {/* Cardinal divisions */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const x1 = Math.cos(a) * 150;
        const y1 = Math.sin(a) * 150;
        const x2 = Math.cos(a) * 180;
        const y2 = Math.sin(a) * 180;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="0.5" />;
      })}
      {/* Stars — randomized but seeded */}
      {[
        [20, -30, 2.5],
        [-40, -50, 1.8],
        [60, 10, 2],
        [-70, 30, 1.4],
        [10, 60, 1.8],
        [-20, -90, 2.2],
        [80, -60, 1.6],
        [-100, -10, 1.4],
        [50, 80, 1.8],
        [-50, 100, 2],
        [110, 40, 1.4],
        [-110, 70, 1.6],
        [30, 100, 1.4],
        [0, 0, 3],
      ].map(([x, y, r], i) => (
        <g key={i}>
          <circle cx={x as number} cy={y as number} r={r as number} fill={INK} stroke="none" />
          <line
            x1={(x as number) - (r as number) * 2}
            y1={y as number}
            x2={(x as number) + (r as number) * 2}
            y2={y as number}
            strokeWidth="0.3"
          />
          <line
            x1={x as number}
            y1={(y as number) - (r as number) * 2}
            x2={x as number}
            y2={(y as number) + (r as number) * 2}
            strokeWidth="0.3"
          />
        </g>
      ))}
      {/* Constellation lines connecting some stars */}
      <path d="M 20 -30 L -40 -50 L -20 -90 L 80 -60" strokeWidth="0.3" opacity="0.6" />
      <path d="M 60 10 L 50 80 L -50 100" strokeWidth="0.3" opacity="0.6" />
      {/* Center crosshair */}
      <line x1="-10" y1="0" x2="10" y2="0" strokeWidth="0.4" />
      <line x1="0" y1="-10" x2="0" y2="10" strokeWidth="0.4" />
    </g>
  );
}

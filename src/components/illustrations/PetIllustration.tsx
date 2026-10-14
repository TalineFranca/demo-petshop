import type { Species } from "@/data/pets";
import { clamp } from "@/lib/utils";

/*
  O mascote desenhado em SVG. Um único desenho com variações:
  espécie, para onde os olhos olham, boca, pelagem e extras do banho.
  Coordenadas pensadas para o viewBox "0 -40 300 360".
*/

export type PetCoat = "short" | "long" | "tangled";
export type PetExtras = { bow?: boolean; perfume?: boolean; shine?: boolean };

export type PetFigureProps = {
  species: Species;
  /** Direção do olhar, de -1 a 1 em cada eixo */
  look?: { x: number; y: number };
  mouth?: "smile" | "open";
  coat?: PetCoat;
  extras?: PetExtras;
  /** Piscar e abanar o rabo (desligado por CSS com prefers-reduced-motion) */
  animated?: boolean;
};

const INK = "#26221c";
const PINK = "#e8857a";

const palettes: Record<Species, { fur: string; dark: string; light: string; inner: string; bow: string }> = {
  dog: { fur: "#c0623f", dark: "#8f3f24", light: "#fbf6ea", inner: PINK, bow: "#e0a91f" },
  cat: { fur: "#e0a91f", dark: "#a8740c", light: "#fbf6ea", inner: PINK, bow: "#c0623f" },
  other: { fur: "#f7f0e2", dark: "#d8c29c", light: "#ffffff", inner: PINK, bow: "#4b5a2a" },
};

const coats: Record<PetCoat, { amp: number; lobes: number; noise: number }> = {
  short: { amp: 0.014, lobes: 5, noise: 0.008 },
  long: { amp: 0.05, lobes: 19, noise: 0.012 },
  tangled: { amp: 0.06, lobes: 11, noise: 0.05 },
};

/** Contorno "à mão": elipse com ondulação, suavizada com curvas quadráticas */
function blobPath(cx: number, cy: number, rx: number, ry: number, coat: PetCoat, phase: number) {
  const { amp, lobes, noise } = coats[coat];
  const steps = 72;
  const pts: Array<[number, number]> = [];
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const k = 1 + amp * Math.sin(lobes * t + phase) + noise * Math.sin(7 * t + phase * 3) + noise * 0.7 * Math.sin(13 * t);
    pts.push([cx + rx * k * Math.cos(t), cy + ry * k * Math.sin(t)]);
  }
  const f = (p: [number, number]) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
  const mid = (a: [number, number], b: [number, number]): [number, number] => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  let d = `M${f(mid(pts[steps - 1], pts[0]))}`;
  for (let i = 0; i < steps; i++) d += `Q${f(pts[i])} ${f(mid(pts[i], pts[(i + 1) % steps]))}`;
  return `${d}Z`;
}

/** Desenha os filhos e o espelho horizontal deles (orelhas, bigodes…) */
function Mirror({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <g transform="translate(300 0) scale(-1 1)">{children}</g>
    </>
  );
}

function Tail({ species, color, animated }: { species: Species; color: string; animated: boolean }) {
  if (species === "other") {
    return <circle cx="226" cy="286" r="18" fill="#ffffff" stroke={INK} strokeWidth="4" />;
  }
  const d =
    species === "dog"
      ? "M210 262 C 244 252, 260 226, 252 194"
      : "M208 288 C 270 292, 286 232, 256 202 C 246 192, 250 176, 264 172";
  return (
    <g className={animated && species === "dog" ? "wag" : undefined}>
      <path d={d} stroke={INK} strokeWidth="19" fill="none" strokeLinecap="round" />
      <path d={d} stroke={color} strokeWidth="11" fill="none" strokeLinecap="round" />
    </g>
  );
}

export function PetFigure({
  species,
  look = { x: 0, y: 0 },
  mouth = "smile",
  coat = "short",
  extras = {},
  animated = false,
}: PetFigureProps) {
  const p = palettes[species];
  const head = blobPath(150, 140, 80, 70, coat, 0.4);
  const body = blobPath(150, 250, 74, 60, coat, 1.3);
  const px = clamp(look.x, -1, 1) * 7;
  const py = clamp(look.y, -1, 1) * 6;

  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <Tail species={species} color={p.fur} animated={animated} />

      {/* corpo + barriga + patas */}
      <path d={body} fill={p.fur} stroke={INK} strokeWidth="4" />
      <ellipse cx="150" cy="262" rx="38" ry="36" fill={species === "other" ? "#efe4cc" : p.light} />
      <Mirror>
        <ellipse cx="116" cy="304" rx="23" ry="13" fill={p.fur} stroke={INK} strokeWidth="4" />
        <path d="M110 298 v8 M122 298 v8" stroke={INK} strokeWidth="2.5" />
      </Mirror>

      {/* orelhas que ficam atrás da cabeça */}
      {species === "cat" && (
        <Mirror>
          <path d="M86 112 L78 32 L140 76 Z" fill={p.fur} stroke={INK} strokeWidth="4" />
          <path d="M94 100 L89 54 L124 78 Z" fill={p.inner} />
        </Mirror>
      )}
      {species === "other" && (
        <Mirror>
          <g transform="rotate(-14 112 80)">
            <ellipse cx="112" cy="26" rx="22" ry="64" fill={p.fur} stroke={INK} strokeWidth="4" />
            <ellipse cx="112" cy="32" rx="10" ry="44" fill={p.inner} />
          </g>
        </Mirror>
      )}

      {/* cabeça */}
      <path d={head} fill={p.fur} stroke={INK} strokeWidth="4" />

      {species === "dog" && (
        <>
          <ellipse cx="184" cy="124" rx="28" ry="26" fill={p.light} />
          <Mirror>
            <path
              d="M96 86 C 62 82, 42 140, 58 184 C 68 210, 100 198, 106 150 C 108 120, 108 96, 96 86 Z"
              fill={p.dark}
              stroke={INK}
              strokeWidth="4"
            />
          </Mirror>
        </>
      )}
      {species === "cat" && <path d="M138 76 l6 18 M150 72 v20 M162 76 l-6 18" stroke={p.dark} strokeWidth="5" />}

      {/* bochechas */}
      <Mirror>
        <ellipse cx="98" cy="162" rx="12" ry="7" fill={PINK} opacity="0.45" />
      </Mirror>

      {/* olhos: as pupilas seguem `look` */}
      <g className={animated ? "blink" : undefined}>
        {[118, 182].map((cx) => (
          <g key={cx}>
            <ellipse cx={cx} cy="128" rx="17" ry="19" fill="#ffffff" stroke={INK} strokeWidth="3.5" />
            <g style={{ transform: `translate(${px}px, ${py}px)`, transition: "transform 120ms ease-out" }}>
              <circle cx={cx} cy="129" r="9.5" fill={INK} />
              <circle cx={cx + 3} cy="125" r="3" fill="#ffffff" />
            </g>
          </g>
        ))}
      </g>

      {/* focinho */}
      {species === "dog" && (
        <>
          <ellipse cx="150" cy="172" rx="42" ry="30" fill={p.light} stroke={INK} strokeWidth="3.5" />
          {mouth === "open" ? (
            <>
              <path d="M126 176 Q150 220 174 176 Z" fill="#5a1f12" stroke={INK} strokeWidth="3.5" />
              <path d="M140 190 Q150 212 160 190 Z" fill={PINK} />
            </>
          ) : (
            <path d="M150 166 v10 M128 176 q11 12 22 0 q11 12 22 0" stroke={INK} strokeWidth="3.5" fill="none" />
          )}
          <path d="M135 153 q15 -9 30 0 q-2 13 -15 15 q-13 -2 -15 -15Z" fill={INK} />
        </>
      )}
      {species === "cat" && (
        <>
          <Mirror>
            <path d="M116 164 L74 156 M116 172 L72 175 M118 180 L80 193" stroke={INK} strokeWidth="2.5" />
          </Mirror>
          {mouth === "open" ? (
            <path d="M136 172 Q150 200 164 172 Z" fill="#5a1f12" stroke={INK} strokeWidth="3.5" />
          ) : (
            <path d="M150 166 v6 M136 175 q7 8 14 -3 q7 11 14 3" stroke={INK} strokeWidth="3.5" fill="none" />
          )}
          <path d="M141 156 h18 l-9 10 Z" fill={PINK} stroke={INK} strokeWidth="3" />
        </>
      )}
      {species === "other" && (
        <>
          <Mirror>
            <path d="M120 168 L86 162 M120 174 L88 180" stroke={INK} strokeWidth="2" />
          </Mirror>
          {mouth === "open" ? (
            <ellipse cx="150" cy="182" rx="11" ry="13" fill="#5a1f12" stroke={INK} strokeWidth="3.5" />
          ) : (
            <>
              <path d="M150 164 v8 M138 174 q12 6 12 -2 q0 8 12 2" stroke={INK} strokeWidth="3.5" fill="none" />
              <path d="M143 176 h14 v11 q-7 3 -14 0 Z M150 176 v12" fill="#ffffff" stroke={INK} strokeWidth="2.5" />
            </>
          )}
          <path d="M143 158 q7 -6 14 0 q-7 8 -14 0Z" fill={PINK} stroke={INK} strokeWidth="2.5" />
        </>
      )}

      {/* extras do simulador */}
      {extras.shine && (
        <g fill="none" stroke="#ffffff" strokeWidth="5" opacity="0.85">
          <path d="M96 98 q8 -18 28 -24" />
          <path d="M102 232 q4 -14 16 -20" />
          <path d="M196 92 q6 4 8 12" strokeWidth="4" />
        </g>
      )}
      {extras.perfume && (
        <g>
          {[
            [56, 72, 1],
            [248, 58, 0.8],
            [256, 176, 0.7],
            [44, 214, 0.6],
          ].map(([x, y, s]) => (
            <path
              key={`${x}-${y}`}
              transform={`translate(${x} ${y}) scale(${s})`}
              d="M0 -14 Q2 -2 14 0 Q2 2 0 14 Q-2 2 -14 0 Q-2 -2 0 -14Z"
              fill="#e0a91f"
              stroke={INK}
              strokeWidth="2.5"
            />
          ))}
          <path d="M30 150 q8 -8 0 -16 q-8 -8 0 -16 M272 120 q8 -8 0 -16 q-8 -8 0 -16" stroke="#8a9660" strokeWidth="3" fill="none" />
        </g>
      )}
      {extras.bow && (
        <g transform={`translate(${species === "other" ? 186 : 206} ${species === "other" ? 82 : 78}) rotate(18)`}>
          <path d="M0 0 L-28 -17 Q-33 0 -28 17 Z" fill={p.bow} stroke={INK} strokeWidth="3.5" />
          <path d="M0 0 L28 -17 Q33 0 28 17 Z" fill={p.bow} stroke={INK} strokeWidth="3.5" />
          <circle r="8" fill={p.bow} stroke={INK} strokeWidth="3.5" />
        </g>
      )}
    </g>
  );
}

export function PetIllustration({
  title,
  className,
  ...figure
}: PetFigureProps & { title?: string; className?: string }) {
  return (
    <svg
      viewBox="0 -40 300 360"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      overflow="visible"
    >
      {title && <title>{title}</title>}
      <PetFigure {...figure} />
    </svg>
  );
}

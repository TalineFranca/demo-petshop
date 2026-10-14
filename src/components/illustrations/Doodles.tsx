import { cn } from "@/lib/utils";

/*
  Rabiscos, carimbos e decorações em SVG. Todos decorativos (aria-hidden)
  e usam currentColor, então a cor vem da classe de texto de quem usa.
*/

type DoodleProps = { className?: string; style?: React.CSSProperties };

export function Arrow({ className, style }: DoodleProps) {
  return (
    <svg viewBox="0 0 120 80" fill="none" className={className} style={style} aria-hidden>
      <path
        d="M6 12 C 30 4, 58 10, 70 30 C 80 46, 84 58, 104 66"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M88 64 L105 67 L98 52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Squiggle({ className, style }: DoodleProps) {
  return (
    <svg viewBox="0 0 200 18" fill="none" preserveAspectRatio="none" className={className} style={style} aria-hidden>
      <path
        d="M3 11 C 20 3, 30 16, 48 9 S 78 4, 96 10 S 128 16, 146 8 S 180 5, 197 10"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ScribbleCircle({ className, style }: DoodleProps) {
  return (
    <svg viewBox="0 0 200 90" fill="none" preserveAspectRatio="none" className={className} style={style} aria-hidden>
      <path
        d="M120 8 C 60 2, 8 18, 10 46 C 12 76, 90 88, 150 78 C 196 70, 200 30, 160 14 C 130 2, 80 6, 54 14"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DoodleStar({ className, style }: DoodleProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} style={style} aria-hidden>
      <path
        d="M20 3 L24 15 L37 15 L27 23 L31 36 L20 28 L9 36 L13 23 L3 15 L16 15 Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PawPrint({ className, style }: DoodleProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} style={style} aria-hidden>
      <g fill="currentColor">
        <ellipse cx="16" cy="21" rx="7" ry="6" />
        <ellipse cx="7" cy="13" rx="3" ry="3.8" />
        <ellipse cx="12.5" cy="7.5" rx="3" ry="3.8" />
        <ellipse cx="19.5" cy="7.5" rx="3" ry="3.8" />
        <ellipse cx="25" cy="13" rx="3" ry="3.8" />
      </g>
    </svg>
  );
}

export function Bone({ className, style }: DoodleProps) {
  return (
    <svg viewBox="0 0 80 32" fill="none" className={className} style={style} aria-hidden>
      <path
        d="M18 10 H62 C 64 2, 78 2, 76 11 C 82 14, 80 26, 72 24 C 70 31, 58 30, 62 22 H18 C 22 30, 10 31, 8 24 C 0 26, -2 14, 4 11 C 2 2, 16 2, 18 10 Z"
        fill="#fbf6ea"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Heart({ className, style }: DoodleProps) {
  return (
    <svg viewBox="0 0 40 36" fill="none" className={className} style={style} aria-hidden>
      <path
        d="M20 33 C 6 22, 1 14, 4 8 C 7 2, 16 2, 20 10 C 23 3, 33 1, 36 8 C 39 15, 32 23, 20 33 Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Ícone de balão de conversa (genérico, não é logo de marca) */
export function ChatIcon({ className, style }: DoodleProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} style={style} aria-hidden>
      <path
        d="M6 25 L8 19 C 3 13, 6 5, 15 4 C 25 3, 30 10, 27 17 C 24 23, 16 25, 10 22 Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M12 12 q1 5 7 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/** Carimbo redondo com texto em volta. `id` precisa ser único na página. */
export function RoundStamp({
  id,
  ring,
  center,
  className,
  style,
}: DoodleProps & { id: string; ring: string; center: string }) {
  return (
    <svg viewBox="0 0 120 120" className={cn("stamp-ink", className)} style={style} aria-hidden>
      <defs>
        <path id={id} d="M60 60 m-43 0 a43 43 0 1 1 86 0 a43 43 0 1 1 -86 0" />
      </defs>
      <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="3.5" />
      <circle cx="60" cy="60" r="31" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text fill="currentColor" fontSize="11.5" fontWeight="700" letterSpacing="2.4" style={{ fontFamily: "var(--font-sans)" }}>
        <textPath href={`#${id}`}>{ring}</textPath>
      </text>
      <text
        x="60"
        y="66"
        textAnchor="middle"
        fill="currentColor"
        fontSize="17"
        fontWeight="700"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {center}
      </text>
    </svg>
  );
}

/* Borda de papel rasgado para emendar seções. Pontos fixos (sem random) para não variar entre servidor e cliente. */
const tornPoints = (() => {
  const pts: string[] = [];
  const offsets = [14, 6, 18, 9, 22, 4, 15, 11, 20, 7, 16, 3, 19, 10, 13, 5, 21, 8, 17, 12];
  for (let i = 0, x = 0; x <= 1200; i++, x += 30) pts.push(`${x} ${offsets[i % offsets.length]}`);
  return pts.join(" L");
})();

export function TornEdge({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1200 40"
      preserveAspectRatio="none"
      className={cn("block h-5 w-full md:h-8", flip && "rotate-180", className)}
      aria-hidden
    >
      <path d={`M0 40 L${tornPoints} L1200 40 Z`} fill="currentColor" />
    </svg>
  );
}

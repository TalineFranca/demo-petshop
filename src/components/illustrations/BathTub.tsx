/*
  Frente da banheira (vai POR CIMA do pet no simulador).
  Mesmo sistema de coordenadas do PetFigure, com espaço extra embaixo.
*/

const INK = "#26221c";

const foam: Array<[number, number, number]> = [
  [44, 238, 14],
  [68, 230, 19],
  [96, 238, 15],
  [124, 243, 12],
  [178, 243, 12],
  [204, 235, 16],
  [230, 228, 19],
  [256, 238, 14],
];

const bubbles: Array<[number, number, number, number]> = [
  // x, y, raio, atraso (s)
  [60, 214, 7, 0],
  [242, 206, 9, 0.8],
  [90, 196, 5, 1.6],
  [214, 190, 6, 2.2],
  [36, 196, 4, 1.1],
];

export function BathTubFront({ bubbly = true }: { bubbly?: boolean }) {
  return (
    <g strokeLinejoin="round">
      {bubbly &&
        bubbles.map(([x, y, r, delay]) => (
          <circle
            key={`${x}-${y}`}
            className="bubble"
            style={{ animationDelay: `${delay}s` }}
            cx={x}
            cy={y}
            r={r}
            fill="#ffffff"
            fillOpacity="0.7"
            stroke={INK}
            strokeWidth="2"
          />
        ))}
      {foam.map(([x, y, r]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill="#ffffff" stroke={INK} strokeWidth="2.5" />
      ))}
      {/* corpo */}
      <path d="M18 248 H282 L262 324 Q258 336 244 336 H56 Q42 336 38 324 Z" fill="#8a9660" stroke={INK} strokeWidth="4" />
      {/* bolinhas pintadas */}
      <g fill="#f3ead7" opacity="0.55">
        <circle cx="70" cy="276" r="6" />
        <circle cx="112" cy="300" r="5" />
        <circle cx="160" cy="274" r="7" />
        <circle cx="206" cy="304" r="5" />
        <circle cx="236" cy="272" r="6" />
      </g>
      {/* borda */}
      <path d="M10 240 H290 Q297 240 297 248 Q297 256 290 256 H10 Q3 256 3 248 Q3 240 10 240 Z" fill="#f3ead7" stroke={INK} strokeWidth="4" />
      {/* pezinhos */}
      <path d="M62 336 q-4 12 -14 12 h22 q-2 -6 2 -12 M238 336 q4 12 14 12 h-22 q2 -6 -2 -12" fill="#e0a91f" stroke={INK} strokeWidth="3" />
    </g>
  );
}

import { cn } from "@/lib/utils";

const tones = {
  mustard: "rgba(241, 210, 122, 0.8)",
  moss: "rgba(138, 150, 96, 0.65)",
  paper: "rgba(255, 255, 255, 0.6)",
  terracotta:
    "repeating-linear-gradient(45deg, rgba(192, 98, 63, 0.6) 0 6px, rgba(251, 246, 234, 0.6) 6px 12px)",
};

// pontas serrilhadas, como fita cortada no dente
const clip =
  "polygon(2% 0, 98% 4%, 100% 22%, 97% 42%, 100% 62%, 97% 82%, 99% 100%, 1% 96%, 3% 78%, 0 58%, 3% 38%, 0 18%)";

export type TapeTone = keyof typeof tones;

/** Pedaço de fita adesiva. Posicione com `className` (absolute + top/left…). */
export function Tape({
  tone = "mustard",
  rotate = -6,
  className,
}: {
  tone?: TapeTone;
  rotate?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn("pointer-events-none absolute z-10 block h-6 w-20 sm:h-7 sm:w-24", className)}
      style={{ background: tones[tone], transform: `rotate(${rotate}deg)`, clipPath: clip }}
    />
  );
}

import { cn } from "@/lib/utils";
import { Tape, type TapeTone } from "./Tape";

const tones = {
  paper: "bg-paper",
  cream: "bg-cream",
  mustard: "bg-mustard-soft",
  kraft: "kraft",
  grid: "bg-paper grid-paper",
  ruled: "bg-paper ruled",
};

type PaperCardProps = {
  as?: "div" | "article" | "aside" | "section" | "figure" | "li";
  tone?: keyof typeof tones;
  /** Inclinação em graus */
  rotate?: number;
  tape?: "top" | "corners";
  tapeTone?: TapeTone;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLElement>, "className" | "style" | "children">;

/** Pedaço de papel colado na página: tom, inclinação e fita opcionais. */
export function PaperCard({
  as: Tag = "div",
  tone = "paper",
  rotate = 0,
  tape,
  tapeTone = "mustard",
  className,
  style,
  children,
  ...rest
}: PaperCardProps) {
  return (
    <Tag
      className={cn("paper-shadow relative text-ink", tones[tone], className)}
      style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined, ...style }}
      {...rest}
    >
      {tape === "top" && <Tape tone={tapeTone} rotate={-3} className="-top-3 left-1/2 -translate-x-1/2" />}
      {tape === "corners" && (
        <>
          <Tape tone={tapeTone} rotate={-38} className="-left-6 -top-1" />
          <Tape tone={tapeTone} rotate={36} className="-right-6 -top-1" />
        </>
      )}
      {children}
    </Tag>
  );
}

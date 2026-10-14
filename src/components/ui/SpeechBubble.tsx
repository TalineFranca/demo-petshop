import { cn } from "@/lib/utils";

const tones = {
  paper: { cls: "bg-paper", fill: "#fbf6ea" },
  mustard: { cls: "bg-mustard-soft", fill: "#f1d27a" },
  cream: { cls: "bg-cream", fill: "#f3ead7" },
  white: { cls: "bg-white", fill: "#ffffff" },
};

/** Balão de fala desenhado à mão, com rabinho embaixo. */
export function SpeechBubble({
  children,
  tail = "left",
  tone = "paper",
  className,
}: {
  children: React.ReactNode;
  tail?: "left" | "right";
  tone?: keyof typeof tones;
  className?: string;
}) {
  const t = tones[tone];
  return (
    <div className={cn("hand-border relative border-[2.5px] border-ink px-5 py-4 text-ink", t.cls, className)}>
      {children}
      <svg
        viewBox="0 0 32 26"
        aria-hidden
        className={cn("absolute top-full -mt-[3px] h-6 w-8", tail === "left" ? "left-8" : "right-8 -scale-x-100")}
      >
        <path
          d="M3 0 C 7 10, 5 18, 0 24 C 13 21, 22 12, 27 0"
          fill={t.fill}
          stroke="#26221c"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

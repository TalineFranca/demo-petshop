import Image from "next/image";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";
import { PawPrint, Squiggle } from "../illustrations/Doodles";
import { SpeechBubble } from "../ui/SpeechBubble";

// Posição de cada balão no "mural de conversa" (desktop). No celular viram uma coluna.
const layout = [
  { place: "md:col-span-4 md:col-start-1", tail: "left", tone: "paper", tilt: -1.5 },
  { place: "md:col-span-3 md:col-start-4 md:-mt-6", tail: "right", tone: "mustard", tilt: 2 },
  { place: "md:col-span-3 md:col-start-2", tail: "left", tone: "white", tilt: 1 },
  { place: "md:col-span-3 md:col-start-5 md:mt-10", tail: "right", tone: "paper", tilt: -2 },
  { place: "md:col-span-4 md:col-start-1 md:-mt-4", tail: "left", tone: "mustard", tilt: 1.5 },
  { place: "md:col-span-3 md:col-start-6", tail: "right", tone: "white", tilt: -1 },
] as const;

export function Testimonials() {
  return (
    <section id="depoimentos" aria-labelledby="depoimentos-title" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="md:flex md:items-end md:justify-between md:gap-10">
          <h2
            id="depoimentos-title"
            className="font-display text-[clamp(2.6rem,7.5vw,4.6rem)] font-black leading-[0.92] tracking-tight"
          >
            Avaliações
            <span className="relative block pl-8 italic">
              escritas pelos pets
              <Squiggle className="absolute -bottom-2 left-8 h-3 w-[85%] text-accent" />
            </span>
          </h2>
          <p className="mt-6 max-w-xs font-hand text-xl leading-tight text-ink-soft md:mt-0">
            *traduzidas do latido, do miado e do assobio com ajuda de um petisco. Fidelidade não garantida.
          </p>
        </div>

        <ul className="mt-16 grid gap-y-14 md:grid-cols-8 md:gap-x-6 md:gap-y-12">
          {testimonials.map((t, i) => {
            const l = layout[i % layout.length];
            const right = l.tail === "right";
            return (
              <li key={t.id} className={l.place}>
                <figure style={{ transform: `rotate(${l.tilt}deg)` }}>
                  <SpeechBubble tail={l.tail} tone={l.tone}>
                    <blockquote className="font-display text-xl leading-snug sm:text-[1.35rem]">“{t.text}”</blockquote>
                  </SpeechBubble>
                  <figcaption className={cn("mt-6 flex items-center gap-3", right && "flex-row-reverse text-right")}>
                    <Image
                      src={t.avatar}
                      alt=""
                      width={72}
                      height={72}
                      className="h-16 w-16 shrink-0 rounded-full border-[2.5px] border-ink bg-kraft object-cover"
                    />
                    <span>
                      <span className="block font-hand text-2xl leading-none">— {t.author}</span>
                      <span className="block text-sm text-ink-soft">{t.about}</span>
                      <span className={cn("mt-1 flex gap-0.5", right && "justify-end")}>
                        {Array.from({ length: 5 }, (_, k) => (
                          <PawPrint key={k} className={cn("h-4 w-4", k < t.paws ? "text-accent-ink" : "text-ink/20")} />
                        ))}
                        <span className="sr-only">nota {t.paws} de 5 patinhas</span>
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

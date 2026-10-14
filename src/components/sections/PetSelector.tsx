"use client";

import { AnimatePresence, motion } from "framer-motion";
import { speciesOrder, speciesProfiles } from "@/data/pets";
import { usePet } from "../PetContext";
import { TornEdge } from "../illustrations/Doodles";
import { PetIllustration } from "../illustrations/PetIllustration";
import { PaperCard } from "../ui/PaperCard";
import { SpeechBubble } from "../ui/SpeechBubble";

const optionTilt = [-1.5, 1, -0.5];
const optionLook = [
  { x: 1, y: -0.3 },
  { x: -0.8, y: 0.4 },
  { x: 0.6, y: 0.8 },
];

export function PetSelector() {
  const { pet, setPet, profile } = usePet();

  return (
    <section id="quem" aria-labelledby="quem-title" className="on-dark relative bg-moss text-cream">
      <TornEdge className="absolute bottom-full left-0 text-moss" />

      <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-20 pt-24 sm:px-6 md:grid-cols-12 md:pb-28 md:pt-32">
        <div className="md:col-span-5">
          <p className="font-hand text-2xl text-mustard-soft">pergunta rápida pro seu bicho:</p>
          <h2
            id="quem-title"
            className="font-display text-[clamp(3.2rem,10vw,5.5rem)] font-black italic leading-[0.9]"
            style={{ fontVariationSettings: '"SOFT" 100, "WONK" 1' }}
          >
            Quem é
            <br />
            <span className="ml-10">você?</span>
          </h2>
          <p className="mt-5 max-w-sm text-lg leading-relaxed text-cream/90">
            Marca aí que o site se ajeita: muda os textos, as fichas de serviço, o simulador e até o mascote lá em
            cima.
          </p>

          <div className="mt-10 flex items-end gap-3" aria-live="polite">
            <PetIllustration species={pet} look={{ x: 0.9, y: -0.4 }} className="w-20 shrink-0" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={pet}
                initial={{ opacity: 0, y: 10, rotate: -3 }}
                animate={{ opacity: 1, y: 0, rotate: -1.5 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="mb-10"
              >
                <SpeechBubble tone="paper">
                  <p className="text-base leading-snug">{profile.selectorReply}</p>
                </SpeechBubble>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <PaperCard tone="ruled" rotate={1.5} tape="corners" className="p-5 pl-14 sm:p-8 sm:pl-16 md:col-span-7 md:-mt-6">
          <fieldset>
            <legend className="font-hand text-2xl text-accent-ink sm:text-3xl">
              Ficha de inscrição — marque com um X
            </legend>

            <div className="mt-4 divide-y-2 divide-dashed divide-ink/15">
              {speciesOrder.map((id, i) => {
                const option = speciesProfiles[id];
                const checked = pet === id;
                return (
                  <label
                    key={id}
                    className="flex cursor-pointer items-center gap-4 py-4 sm:gap-6"
                    style={{ transform: `rotate(${optionTilt[i]}deg)` }}
                  >
                    <input
                      type="radio"
                      name="species"
                      value={id}
                      checked={checked}
                      onChange={() => setPet(id)}
                      className="peer sr-only"
                    />
                    <span className="hand-border relative grid h-11 w-11 shrink-0 place-items-center border-[2.5px] border-ink bg-paper peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-4 peer-focus-visible:outline-ink peer-focus-visible:outline-dashed">
                      {checked && (
                        <svg viewBox="0 0 40 40" className="absolute -inset-2 h-[calc(100%+1rem)] w-[calc(100%+1rem)]" aria-hidden>
                          <motion.path
                            d="M8 8 L32 33 M33 7 C 24 16, 16 24, 7 34"
                            fill="none"
                            stroke="var(--color-terracotta-ink)"
                            strokeWidth="4.5"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                          />
                        </svg>
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-3xl font-bold leading-none sm:text-4xl">
                        {option.label}
                      </span>
                      <span className="mt-1 block font-hand text-xl leading-tight text-ink-soft">
                        {option.tagline}
                      </span>
                    </span>
                    <PetIllustration
                      species={id}
                      look={optionLook[i]}
                      className={`w-14 shrink-0 transition-transform duration-300 sm:w-20 ${checked ? "scale-110 -rotate-6" : "opacity-60 grayscale-[40%]"}`}
                    />
                  </label>
                );
              })}
            </div>
          </fieldset>
        </PaperCard>
      </div>
    </section>
  );
}

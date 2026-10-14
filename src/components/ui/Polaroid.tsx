"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import type { GalleryPet } from "@/data/pets";
import { cn } from "@/lib/utils";
import { PawPrint } from "../illustrations/Doodles";
import { Tape, type TapeTone } from "./Tape";

type PolaroidProps = {
  pet: GalleryPet;
  flipped: boolean;
  onToggle: () => void;
  rotate?: number;
  tapeTone?: TapeTone;
  /** Selinho opcional no canto (ex.: "sua turma!") */
  badge?: string;
  className?: string;
};

/** Polaroid que vira ao clicar e mostra a ficha do pet no verso. */
export function Polaroid({ pet, flipped, onToggle, rotate = 0, tapeTone = "mustard", badge, className }: PolaroidProps) {
  // `flat` só vale depois de montar, para o HTML do servidor e o do cliente baterem na hidratação
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const reduce = mounted && !!prefersReduced;

  return (
    <div className={cn("relative", className)} style={{ transform: `rotate(${rotate}deg)` }}>
      <Tape tone={tapeTone} rotate={rotate > 0 ? -8 : 7} className="-top-3 left-1/2 -translate-x-1/2" />
      {badge && (
        <span className="absolute -right-3 -top-4 z-20 grid h-16 w-16 rotate-12 place-items-center rounded-full border-2 border-ink bg-accent text-center font-hand text-lg leading-none text-ink">
          {badge}
        </span>
      )}

      <button
        type="button"
        onClick={onToggle}
        aria-pressed={flipped}
        className="group block w-full text-left perspective-[1100px]"
      >
        <motion.div
          className="grid transform-3d"
          animate={{ rotateY: !reduce && flipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 140, damping: 17 }}
        >
          {/* frente */}
          <div
            aria-hidden={flipped}
            className={cn(
              "paper-shadow bg-paper p-2.5 pb-3 backface-hidden [grid-area:1/1] sm:p-3",
              reduce && flipped && "invisible",
            )}
          >
            <div className="overflow-hidden bg-kraft">
              <Image
                src={pet.image}
                alt={pet.alt}
                width={480}
                height={480}
                className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>
            <p className="mt-2 text-center font-hand text-xl leading-tight sm:text-2xl">{pet.caption}</p>
            <span className="sr-only">— ver a ficha de {pet.name}</span>
          </div>

          {/* verso: a ficha */}
          <div
            aria-hidden={!flipped}
            className={cn(
              "paper-shadow ruled flex flex-col bg-paper p-3 pl-12 backface-hidden [grid-area:1/1] sm:p-4 sm:pl-14",
              !reduce && "rotate-y-180",
              reduce && !flipped && "invisible",
            )}
          >
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-ink-soft">ficha do cliente</p>
            <p className="font-display text-2xl font-black leading-none sm:text-3xl">{pet.name}</p>
            <p className="font-hand text-lg leading-tight text-accent-ink">{pet.breed}</p>
            <dl className="mt-2 space-y-1.5 text-sm leading-snug">
              <div>
                <dt className="font-bold">Mania:</dt>
                <dd>{pet.mania}</dd>
              </div>
              <div>
                <dt className="font-bold">Petisco favorito:</dt>
                <dd>{pet.snack}</dd>
              </div>
              <div>
                <dt className="font-bold">Nível de bagunça:</dt>
                <dd className="flex gap-0.5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <PawPrint key={i} className={cn("h-4 w-4", i < pet.mess ? "text-terracotta" : "text-ink/20")} />
                  ))}
                  <span className="sr-only">{pet.mess} de 5</span>
                </dd>
              </div>
            </dl>
            <span className="mt-auto pt-2 text-right font-hand text-base text-ink-soft">
              <span aria-hidden>↺ </span>clica pra virar
            </span>
          </div>
        </motion.div>
      </button>
    </div>
  );
}

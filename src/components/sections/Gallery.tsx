"use client";

import { useState } from "react";
import { galleryPets } from "@/data/pets";
import { cn } from "@/lib/utils";
import { usePet } from "../PetContext";
import { Heart, ScribbleCircle, TornEdge } from "../illustrations/Doodles";
import { PaperCard } from "../ui/PaperCard";
import { Polaroid } from "../ui/Polaroid";
import type { TapeTone } from "../ui/Tape";

// "bagunça organizada" do mural: inclinação e deslocamento de cada foto
const tilts = [-4, 3, -2, 5, -3, 2, -5, 4];
const nudges = ["", "md:translate-y-10", "md:-translate-y-3", "md:translate-y-14", "md:translate-y-4", "md:-translate-y-6", "md:translate-y-8", ""];
const tapes: TapeTone[] = ["mustard", "moss", "paper", "terracotta"];

export function Gallery() {
  const { pet } = usePet();
  const [flipped, setFlipped] = useState<string[]>([]);

  const toggle = (id: string) =>
    setFlipped((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));

  return (
    <section id="clientes" aria-labelledby="clientes-title" className="kraft relative">
      <TornEdge className="absolute bottom-full left-0 text-kraft" />

      <div className="mx-auto max-w-6xl px-4 pb-28 pt-20 sm:px-6 md:pt-28">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <h2
            id="clientes-title"
            className="font-display text-[clamp(2.8rem,8vw,5rem)] font-black leading-[0.9] tracking-tight md:col-span-7"
          >
            Clientes de{" "}
            <span className="relative inline-block px-3">
              4 patas
              <ScribbleCircle className="absolute -inset-x-2 -inset-y-3 h-[calc(100%+1.5rem)] w-[calc(100%+1rem)] text-terracotta" />
            </span>
          </h2>
          <div className="flex items-end gap-6 md:col-span-5">
            <p className="flex-1 font-hand text-2xl leading-tight md:pb-2">
              (clica na foto que ela vira e mostra a ficha: mania, petisco favorito e nível de bagunça)
            </p>
            <PaperCard
              as="aside"
              tone="mustard"
              rotate={4}
              tape="top"
              tapeTone="paper"
              className="hidden w-44 shrink-0 p-4 pt-5 sm:block"
            >
              <Heart className="w-6 text-terracotta-ink" />
              <p className="mt-1 font-hand text-xl leading-tight">
                Mural novo toda sexta. Quer o seu aqui? Manda foto no bilhete.
              </p>
            </PaperCard>
          </div>
        </div>

        <ul className="mt-16 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-8 md:grid-cols-4 md:gap-y-16">
          {galleryPets.map((p, i) => (
            <li
              key={p.id}
              className={cn("w-[82%] sm:w-auto", i % 2 ? "ml-auto sm:ml-0" : "mr-auto sm:mr-0", nudges[i % nudges.length])}
            >
              <Polaroid
                pet={p}
                flipped={flipped.includes(p.id)}
                onToggle={() => toggle(p.id)}
                rotate={tilts[i % tilts.length]}
                tapeTone={tapes[i % tapes.length]}
                badge={p.species === pet ? "sua turma!" : undefined}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

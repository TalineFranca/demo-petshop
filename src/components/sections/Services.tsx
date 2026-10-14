"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { useState } from "react";
import { services, type Service } from "@/data/services";
import { cn, formatBRL } from "@/lib/utils";
import { usePet } from "../PetContext";
import { Arrow, Bone, DoodleStar } from "../illustrations/Doodles";

type Swipe = { dir: "next" | "prev"; sign: number };

// pose de cada ficha conforme a profundidade na pilha
const poses = [
  { x: 0, y: 0, rotate: -1.5, scale: 1 },
  { x: 10, y: 14, rotate: 3, scale: 0.97 },
  { x: -8, y: 26, rotate: -4, scale: 0.94 },
];

const cardVariants = {
  enter: (s: Swipe) =>
    s.dir === "prev" ? { x: -380, rotate: -16, opacity: 0 } : { opacity: 0, y: 40, scale: 0.9 },
  exit: (s: Swipe) =>
    s.dir === "next"
      ? { x: s.sign * 460, y: 30, rotate: s.sign * 22, opacity: 0, transition: { duration: 0.35 } }
      : { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

function ServiceCard({ service, number }: { service: Service; number: number }) {
  return (
    <div className="ruled relative h-full border border-ink/15 bg-paper p-5 pl-14 pt-7 sm:p-7 sm:pl-16">
      <span className="absolute -top-5 left-12 rounded-t-md border-2 border-b-0 border-ink bg-accent px-3 pt-0.5 font-hand text-xl text-ink">
        nº {String(number).padStart(2, "0")}
      </span>

      {service.stamp && (
        <span className="stamp-ink absolute right-3 top-5 rotate-[9deg] border-[3px] border-terracotta-ink px-2 py-0.5 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-terracotta-ink sm:right-5">
          {service.stamp}
        </span>
      )}

      <p className="-rotate-2 font-hand text-2xl leading-[1.9rem] text-accent-ink">{service.scribble}</p>
      <h3 className="font-display text-[1.9rem] font-black leading-[1.9rem] sm:text-4xl">{service.title}</h3>
      <p className="mt-[1.9rem] max-w-[34ch] leading-[1.9rem]">{service.description}</p>

      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3 pl-9 sm:inset-x-7 sm:pl-9">
        <span className="font-hand text-xl text-ink-soft">tempo: {service.duration}</span>
        <span className="text-right">
          <span className="block text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ink-soft">a partir de</span>
          <span className="font-display text-3xl font-black">{formatBRL(service.priceFrom)}</span>
        </span>
      </div>
    </div>
  );
}

/** Pilha de fichas: arrasta a de cima pro lado, usa os botões ou as setas do teclado. */
function Deck({ list }: { list: Service[] }) {
  const [top, setTop] = useState(0);
  const [swipe, setSwipe] = useState<Swipe>({ dir: "next", sign: -1 });
  const n = list.length;

  const go = (dir: Swipe["dir"], sign = -1) => {
    setSwipe({ dir, sign });
    setTop((t) => (t + (dir === "next" ? 1 : -1) + n) % n);
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 90 || Math.abs(info.velocity.x) > 500) {
      go("next", Math.sign(info.offset.x) || -1);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go("next", -1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go("prev");
    }
  };

  const stack = Array.from({ length: Math.min(3, n) }, (_, depth) => ({
    depth,
    index: (top + depth) % n,
  })).reverse();

  const current = list[top];

  return (
    <div>
      <div
        role="group"
        aria-roledescription="pilha de fichas"
        aria-label="Fichas de serviço. Use as setas esquerda e direita para folhear."
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="relative mx-auto h-[27rem] w-full max-w-md select-none sm:h-[24rem]"
      >
        <AnimatePresence initial={false} custom={swipe}>
          {stack.map(({ depth, index }) => {
            const service = list[index];
            const isTop = depth === 0;
            return (
              <motion.article
                key={service.id}
                custom={swipe}
                variants={cardVariants}
                initial="enter"
                animate={{ ...poses[depth], opacity: 1 }}
                exit="exit"
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                drag={isTop ? "x" : false}
                dragSnapToOrigin
                dragElastic={0.7}
                onDragEnd={isTop ? onDragEnd : undefined}
                whileDrag={{ scale: 1.03, rotate: 0 }}
                aria-hidden={!isTop}
                className={cn(
                  "paper-shadow absolute inset-0",
                  isTop ? "cursor-grab touch-pan-y active:cursor-grabbing" : "pointer-events-none",
                )}
                style={{ zIndex: 10 - depth }}
              >
                <ServiceCard service={service} number={index + 1} />
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go("prev")}
          className="hand-border border-2 border-ink bg-paper px-4 py-1.5 font-hand text-xl transition-transform hover:-rotate-3"
        >
          ← voltar
        </button>
        <p className="min-w-[6.5rem] text-center font-hand text-xl" aria-live="polite">
          <span className="sr-only">Ficha {top + 1} de {n}: {current.title}. </span>
          <span aria-hidden>
            ficha {top + 1} / {n}
          </span>
        </p>
        <button
          type="button"
          onClick={() => go("next", -1)}
          className="hand-border border-2 border-ink bg-mustard px-4 py-1.5 font-hand text-xl transition-transform hover:rotate-3"
        >
          próxima →
        </button>
      </div>
    </div>
  );
}

export function Services() {
  const { pet, profile } = usePet();
  const list = services.filter((s) => s.species.includes(pet));

  return (
    <section id="servicos" aria-labelledby="servicos-title" className="relative overflow-x-clip pb-12 pt-24 md:pb-16 md:pt-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 md:grid-cols-12 md:items-center">
        <div className="relative md:col-span-5">
          <h2
            id="servicos-title"
            className="font-display text-[clamp(2.8rem,8vw,4.8rem)] font-black leading-[0.9] tracking-tight"
          >
            O cardápio
            <span className="mt-1 block -rotate-2 pl-6 font-hand text-[0.62em] font-normal tracking-normal text-accent-ink">
              de serviços (sem frescura)
            </span>
          </h2>
          <p className="mt-6 max-w-sm text-lg leading-relaxed">{profile.servicesIntro}</p>

          <div className="mt-8 hidden items-center gap-2 font-hand text-2xl text-ink-soft md:flex">
            arrasta a ficha de cima pro lado
            <Arrow className="h-12 w-20 text-ink-soft" />
          </div>
          <p className="mt-6 font-hand text-xl text-ink-soft md:hidden">arrasta a ficha pro lado ↓</p>

          <Bone className="absolute -bottom-16 right-6 hidden w-24 rotate-[-18deg] text-ink md:block" />
        </div>

        <div className="relative md:col-span-7 md:pl-10">
          <DoodleStar className="absolute -top-10 right-4 w-10 rotate-12 text-mustard" />
          <DoodleStar className="absolute -left-2 bottom-24 hidden w-7 -rotate-12 text-terracotta md:block" />
          {/* key={pet}: trocar de bicho reembaralha a pilha */}
          <Deck key={pet} list={list} />
        </div>
      </div>
    </section>
  );
}

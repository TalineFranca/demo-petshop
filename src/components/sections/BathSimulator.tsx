"use client";

import { AnimatePresence, motion, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { coatOptions, extraOptions, sizeOptions, type Coat, type Extra, type Size } from "@/data/prices";
import { calcBath, cn, formatBRL } from "@/lib/utils";
import { usePet } from "../PetContext";
import { BathTubFront } from "../illustrations/BathTub";
import { PetFigure, type PetCoat } from "../illustrations/PetIllustration";
import { Button } from "../ui/Button";
import { PaperCard } from "../ui/PaperCard";

const sizeScale: Record<Size, number> = { p: 0.72, m: 0.86, g: 1 };
const coatToFigure: Record<Coat, PetCoat> = { curta: "short", longa: "long", embaracada: "tangled" };

const optionBase =
  "hand-border relative cursor-pointer border-[2.5px] border-ink bg-paper transition-[transform,background-color] duration-200 has-checked:bg-mustard has-focus-visible:outline-[3px] has-focus-visible:outline-offset-4 has-focus-visible:outline-ink has-focus-visible:outline-dashed";

function AnimatedPrice({ value }: { value: number }) {
  const reduce = useReducedMotion();
  const spring = useSpring(value, { stiffness: 120, damping: 20 });
  const text = useTransform(spring, (v) => formatBRL(Math.round(v)));

  // Mesma árvore no servidor e no cliente; com reduced motion o número só pula pro valor final.
  useEffect(() => {
    if (reduce) spring.jump(value);
    else spring.set(value);
  }, [value, spring, reduce]);

  return <motion.span>{text}</motion.span>;
}

export function BathSimulator() {
  const { pet, profile } = usePet();
  const [size, setSize] = useState<Size>("m");
  const [coat, setCoat] = useState<Coat>("curta");
  const [extras, setExtras] = useState<Extra[]>([]);

  const { lines, total } = calcBath({ size, coat, extras });
  const toggleExtra = (id: Extra) =>
    setExtras((xs) => (xs.includes(id) ? xs.filter((x) => x !== id) : [...xs, id]));

  const sizeLabel = sizeOptions.find((o) => o.id === size)!.label.toLowerCase();
  const coatLabel = coatOptions.find((o) => o.id === coat)!.label.toLowerCase();
  const extrasLabel = extraOptions
    .filter((o) => extras.includes(o.id))
    .map((o) => o.label.toLowerCase())
    .join(", ");

  return (
    <section id="simulador" aria-labelledby="simulador-title" className="relative pb-24 pt-12 md:pb-32 md:pt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="max-w-2xl md:ml-[8%]">
          <p className="font-hand text-2xl text-accent-ink">simulador oficial (e totalmente inventado)</p>
          <h2
            id="simulador-title"
            className="font-display text-[clamp(2.6rem,7.5vw,4.6rem)] font-black leading-[0.92] tracking-tight"
          >
            Monta o banho,
            <br />
            <span className="italic">vê a conta.</span>
          </h2>
        </header>

        <div className="mt-14 grid gap-14 md:grid-cols-12 md:gap-8">
          {/* Pedido */}
          <PaperCard tone="grid" rotate={-1.2} tape="top" tapeTone="terracotta" className="p-5 sm:p-8 md:col-span-6">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
              <fieldset>
                <legend className="font-display text-2xl font-bold">1. Porte</legend>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {sizeOptions.map((o) => (
                    <label key={o.id} className={cn(optionBase, "flex flex-col items-center px-1.5 py-3 text-center has-checked:-rotate-2")}>
                      <input
                        type="radio"
                        name="porte"
                        value={o.id}
                        checked={size === o.id}
                        onChange={() => setSize(o.id)}
                        className="sr-only"
                      />
                      <span className="font-display text-3xl font-black uppercase leading-none" aria-hidden>
                        {o.id}
                      </span>
                      <span className="mt-1 text-sm font-bold">{o.label}</span>
                      <span className="mt-1 font-hand text-base leading-tight text-ink-soft">{o.hint}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="font-display text-2xl font-bold">2. Pelagem</legend>
                <div className="mt-3 space-y-2.5">
                  {coatOptions.map((o) => (
                    <label key={o.id} className={cn(optionBase, "flex items-center gap-3 px-4 py-2.5 has-checked:rotate-[0.6deg]")}>
                      <input
                        type="radio"
                        name="pelagem"
                        value={o.id}
                        checked={coat === o.id}
                        onChange={() => setCoat(o.id)}
                        className="sr-only"
                      />
                      <span className="font-bold">{o.label}</span>
                      <span className="font-hand text-lg leading-tight text-ink-soft">{o.hint}</span>
                      <span className="ml-auto shrink-0 text-sm tabular-nums">
                        {o.price ? `+ ${formatBRL(o.price)}` : "incluso"}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="font-display text-2xl font-bold">
                  3. Extras <span className="font-hand text-xl font-normal text-ink-soft">(marca quantos quiser)</span>
                </legend>
                <div className="mt-3 space-y-2.5">
                  {extraOptions.map((o) => {
                    const checked = extras.includes(o.id);
                    return (
                      <label key={o.id} className={cn(optionBase, "flex items-center gap-3 px-4 py-2.5")}>
                        <input
                          type="checkbox"
                          name="extras"
                          value={o.id}
                          checked={checked}
                          onChange={() => toggleExtra(o.id)}
                          className="sr-only"
                        />
                        <span
                          aria-hidden
                          className="grid h-6 w-6 shrink-0 place-items-center border-2 border-ink bg-paper font-display text-lg font-black leading-none"
                        >
                          {checked ? "✓" : ""}
                        </span>
                        <span className="font-bold">{o.label}</span>
                        <span className="hidden font-hand text-lg leading-tight text-ink-soft sm:inline">{o.hint}</span>
                        <span className="ml-auto shrink-0 text-sm tabular-nums">+ {formatBRL(o.price)}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            </form>
          </PaperCard>

          {/* Banheira + notinha */}
          <div className="relative md:col-span-6 md:pl-6">
            <svg
              viewBox="0 -50 300 410"
              className="mx-auto w-full max-w-88"
              role="img"
              aria-label={`Prévia: pet de porte ${sizeLabel}, pelagem ${coatLabel}${extrasLabel ? `, com ${extrasLabel}` : ""}, dentro da banheira.`}
            >
              <motion.g
                animate={{ scale: sizeScale[size] }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                style={{ originX: 0.5, originY: 1 }}
              >
                <PetFigure
                  species={pet}
                  coat={coatToFigure[coat]}
                  look={{ x: 0.2, y: -0.6 }}
                  extras={{
                    shine: extras.includes("hidratacao"),
                    perfume: extras.includes("perfume"),
                    bow: extras.includes("laco"),
                  }}
                  animated
                />
              </motion.g>
              <BathTubFront />
            </svg>

            <div className="relative mx-auto -mt-4 max-w-sm rotate-[1.5deg] drop-shadow-[4px_8px_10px_rgba(60,40,20,0.3)]">
              <div className="torn-bottom bg-paper px-6 pb-10 pt-6">
                <p className="text-center font-display text-xl font-black uppercase tracking-[0.15em]">Focinho Feliz</p>
                <p className="text-center text-xs text-ink-soft">notinha nº 0042 · não vale como nota fiscal</p>
                <hr className="my-4 border-t-2 border-dashed border-ink/30" />
                <ul className="space-y-1.5 text-[0.95rem]">
                  <AnimatePresence initial={false}>
                    {lines.map((l) => (
                      <motion.li
                        key={l.id}
                        layout
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-baseline gap-2"
                      >
                        <span>{l.label}</span>
                        <span aria-hidden className="flex-1 border-b-2 border-dotted border-ink/30" />
                        <span className="tabular-nums">{formatBRL(l.value)}</span>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
                <hr className="my-4 border-t-2 border-dashed border-ink/30" />
                <p className="flex items-baseline justify-between">
                  <span className="font-hand text-2xl">total</span>
                  <span className="font-display text-4xl font-black tabular-nums" aria-hidden>
                    <AnimatedPrice value={total} />
                  </span>
                  <span className="sr-only" aria-live="polite">
                    Total: {formatBRL(total)}
                  </span>
                </p>
                <p className="mt-3 font-hand text-lg leading-tight text-ink-soft">{profile.simulatorNote}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center gap-2">
              <Button href="#bilhete" variant="ink">
                Gostei. Quero marcar →
              </Button>
              <p className="text-xs text-ink-soft">*preços fictícios — nenhum pet real foi cobrado.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { usePet } from "../PetContext";
import { Arrow, PawPrint, RoundStamp, Squiggle } from "../illustrations/Doodles";
import { PetIllustration } from "../illustrations/PetIllustration";
import { Button } from "../ui/Button";
import { PaperCard } from "../ui/PaperCard";
import { SpeechBubble } from "../ui/SpeechBubble";
import { Tape } from "../ui/Tape";

const nav = [
  { href: "#servicos", label: "serviços" },
  { href: "#simulador", label: "simular banho" },
  { href: "#clientes", label: "clientes" },
  { href: "#bilhete", label: "mandar bilhete" },
];

const LOGO_CLICKS = 5;
const LOGO_WINDOW_MS = 2500;

export function Hero() {
  const { pet, profile } = usePet();
  const petBox = useRef<HTMLDivElement>(null);
  const hop = useAnimationControls();
  const [look, setLook] = useState({ x: 0, y: 0 });
  const [speech, setSpeech] = useState<{ text: string; loud: boolean; key: number } | null>(null);
  const [announce, setAnnounce] = useState("");
  const logoClicks = useRef<number[]>([]);
  const speechTimer = useRef<number | undefined>(undefined);
  const pokeIndex = useRef(0);

  // Olhos seguem o mouse; no touch, olham para onde a pessoa tocou e depois voltam.
  useEffect(() => {
    let raf = 0;
    let resetTimer: number | undefined;
    let point: { x: number; y: number } | null = null;

    const update = () => {
      raf = 0;
      const el = petBox.current;
      if (!el || !point) return;
      const r = el.getBoundingClientRect();
      const dx = point.x - (r.left + r.width / 2);
      const dy = point.y - (r.top + r.height * 0.42);
      const dist = Math.hypot(dx, dy) || 1;
      const reach = Math.min(dist / 220, 1);
      setLook({ x: (dx / dist) * reach, y: (dy / dist) * reach });
    };

    const onPointer = (e: PointerEvent) => {
      point = { x: e.clientX, y: e.clientY };
      if (!raf) raf = requestAnimationFrame(update);
      if (e.pointerType !== "mouse") {
        window.clearTimeout(resetTimer);
        resetTimer = window.setTimeout(() => setLook({ x: 0, y: 0 }), 1800);
      }
    };

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerdown", onPointer, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerdown", onPointer);
      cancelAnimationFrame(raf);
      window.clearTimeout(resetTimer);
    };
  }, []);

  useEffect(() => () => window.clearTimeout(speechTimer.current), []);

  const say = useCallback(
    (text: string, loud = false) => {
      window.clearTimeout(speechTimer.current);
      setSpeech({ text, loud, key: Date.now() });
      speechTimer.current = window.setTimeout(() => setSpeech(null), loud ? 1700 : 1300);
      void hop.start({
        y: loud ? [0, -22, 0, -10, 0] : [0, -12, 0],
        rotate: loud ? [0, -5, 4, 0] : [0, 3, 0],
        transition: { duration: loud ? 0.6 : 0.4 },
      });
    },
    [hop],
  );

  const poke = () => {
    const lines = profile.pokeLines;
    say(lines[pokeIndex.current++ % lines.length]);
  };

  // Easter egg: 5 cliques rápidos no logo e o mascote late/mia no balão.
  const onLogoClick = () => {
    const now = Date.now();
    logoClicks.current = [...logoClicks.current.filter((t) => now - t < LOGO_WINDOW_MS), now];
    if (logoClicks.current.length >= LOGO_CLICKS) {
      logoClicks.current = [];
      say(profile.easterEgg.onomatopoeia, true);
      setAnnounce("");
      requestAnimationFrame(() => setAnnounce(profile.easterEgg.announce));
    } else if (logoClicks.current.length === 3) {
      say("?");
    }
  };

  return (
    <>
      {/* Barra do topo */}
      <header className="relative z-30 mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 pt-5 sm:px-6">
        <a
          href="#inicio"
          className="sr-only-focusable fixed left-3 top-3 z-50 bg-ink px-3 py-2 font-bold text-cream"
        >
          Pular para o conteúdo
        </a>

        <button
          type="button"
          onClick={onLogoClick}
          className="group flex -rotate-2 items-center gap-2.5 text-left"
          aria-label={`${site.name}, logo (dica: clique cinco vezes seguidas)`}
        >
          <span className="grid h-12 w-12 place-items-center rounded-full border-[2.5px] border-ink bg-accent text-ink transition-transform duration-200 group-hover:rotate-12 group-active:scale-90">
            <PawPrint className="h-6 w-6" />
          </span>
          <span className="font-display text-xl font-black leading-[0.85] tracking-tight">
            Focinho
            <br />
            <span className="italic text-accent-ink">Feliz</span>
          </span>
        </button>

        <nav aria-label="Seções do site">
          <ul className="hidden items-center gap-7 font-hand text-2xl md:flex">
            {nav.map((item, i) => (
              <li key={item.href} style={{ transform: `rotate(${i % 2 ? 2 : -2}deg)` }}>
                <a
                  href={item.href}
                  className="decoration-accent decoration-wavy decoration-2 underline-offset-[6px] hover:underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#bilhete"
            className="font-hand text-2xl underline decoration-accent decoration-wavy decoration-2 underline-offset-4 md:hidden"
          >
            bilhete →
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section
        id="inicio"
        aria-labelledby="hero-title"
        className="relative mx-auto grid max-w-6xl gap-y-10 px-4 pb-20 pt-10 sm:px-6 md:grid-cols-12 md:pb-36 md:pt-16"
      >
        <div className="relative z-10 md:col-span-7">
          <p className="inline-block -rotate-2 bg-ink px-3 py-0.5 font-hand text-xl text-cream sm:text-2xl">
            {profile.hero.kicker}
          </p>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={pet}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28 }}
            >
              <h1
                id="hero-title"
                className="mt-5 font-display text-[clamp(2.6rem,8.6vw,6rem)] font-black leading-[0.92] tracking-tight"
                style={{ fontVariationSettings: '"SOFT" 100, "WONK" 1' }}
              >
                <span className="block">{profile.hero.titleLines[0]}</span>
                <span className="block pl-[7%] italic text-accent-ink">{profile.hero.titleLines[1]}</span>
              </h1>

              <p className="relative ml-[12%] mt-5 inline-block -rotate-3 font-hand text-[clamp(2.3rem,6.4vw,3.8rem)] leading-none">
                <span className="highlight">{profile.hero.punchline}</span>
                <Squiggle className="absolute -bottom-3 left-0 h-3 w-full text-accent" />
              </p>
              <p className="ml-[16%] mt-3 font-hand text-xl text-ink-soft sm:text-2xl">{profile.hero.aside}</p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button href="#simulador">Quanto fica o banho? →</Button>
            <a
              href="#quem"
              className="font-hand text-2xl underline decoration-accent decoration-wavy decoration-2 underline-offset-4"
            >
              ou conta pra gente quem é você
            </a>
          </div>
        </div>

        {/* Mascote */}
        <div className="relative md:col-span-5">
          <div ref={petBox} className="relative mx-auto w-[min(86%,380px)] md:mt-2">
            <div
              aria-hidden
              className="absolute inset-[8%_0_2%_4%] rotate-3 rounded-[46%_54%_42%_58%/55%_45%_55%_45%] border-[2.5px] border-ink bg-mustard-soft"
            />
            <Tape tone="moss" rotate={-24} className="-left-3 top-[18%]" />
            <Tape tone="terracotta" rotate={16} className="-right-4 bottom-[16%]" />

            <motion.div animate={hop} className="relative">
              <button
                type="button"
                onClick={poke}
                aria-label={`Fazer carinho em ${profile.mascotName}, o mascote`}
                className="block w-full rounded-full"
              >
                <PetIllustration
                  species={pet}
                  look={look}
                  mouth={speech?.loud ? "open" : "smile"}
                  animated
                  className="w-full"
                />
              </button>
            </motion.div>

            <AnimatePresence>
              {speech && (
                <motion.div
                  key={speech.key}
                  initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
                  animate={{ opacity: 1, scale: 1, rotate: -4 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="pointer-events-none absolute -top-6 right-0 origin-bottom-left sm:-right-6"
                  aria-hidden
                >
                  <SpeechBubble tone={speech.loud ? "mustard" : "paper"} className="px-4 py-2">
                    <span className={speech.loud ? "font-display text-3xl font-black" : "font-hand text-2xl"}>
                      {speech.text}
                    </span>
                  </SpeechBubble>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="pointer-events-none absolute -left-2 -bottom-10 flex -rotate-6 items-start gap-1 font-hand text-xl text-ink-soft sm:-left-10 sm:text-2xl">
              <span className="max-w-[9rem] leading-tight">
                psiu: {pet === "cat" ? "ela" : "ele"} tá de olho em você
              </span>
              <Arrow className="h-10 w-14 -rotate-[75deg] text-ink-soft" />
            </p>

            <div className="absolute -top-8 left-0 w-24 -rotate-12 text-terracotta-ink sm:-left-8 sm:w-28">
              <RoundStamp id="hero-stamp" ring="FOCINHO FELIZ • DESDE 2019* • " center="★" className="w-full" />
            </div>
          </div>

          <p className="sr-only">
            {site.since}, {site.sinceFootnote}
          </p>
        </div>

        {/* Bilhete de horário que invade a próxima seção */}
        <PaperCard
          as="aside"
          tone="ruled"
          rotate={-4}
          tape="top"
          tapeTone="moss"
          aria-label="Horário de funcionamento"
          className="z-20 mx-auto mt-10 w-72 p-4 pl-12 pt-6 md:absolute md:-bottom-14 md:left-[42%] md:mx-0 md:mt-0"
        >
          <p className="font-hand text-2xl leading-[1.9rem] text-accent-ink">horário:</p>
          <ul className="text-sm leading-[1.9rem]">
            {site.hours.map((h) => (
              <li key={h.days}>
                <strong>{h.days}</strong> · {h.time}
              </li>
            ))}
          </ul>
        </PaperCard>

        <p className="sr-only" aria-live="polite">
          {announce}
        </p>
      </section>
    </>
  );
}

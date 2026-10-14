"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { PawPrint } from "../illustrations/Doodles";

const STORAGE_KEY = "focinho-patinhas";

type Print = { id: number; x: number; y: number; rot: number };

/*
  Cursor de patinha + pegadas ao rolar a página, com um botão para desligar.
  O cursor é CSS puro (classe .paw-cursor no <html>, ver globals.css);
  as pegadas não aparecem com prefers-reduced-motion.
*/
export function PawCursor() {
  const [on, setOn] = useState(true);
  const [prints, setPrints] = useState<Print[]>([]);
  const reduce = useReducedMotion();

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "off") setOn(false);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("paw-cursor", on);
    try {
      localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
    } catch {}
  }, [on]);

  useEffect(() => {
    if (!on || reduce) {
      setPrints([]);
      return;
    }
    let lastY = window.scrollY;
    let travelled = 0;
    let step = 0;
    let nextId = 0;
    let raf = 0;
    const timers: number[] = [];

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        const delta = y - lastY;
        lastY = y;
        travelled += Math.abs(delta);
        if (travelled < 90) return;
        travelled = 0;
        step++;

        const down = delta > 0;
        const w = window.innerWidth;
        const baseX = w < 640 ? w - 30 : w - 70;
        const print: Print = {
          id: ++nextId,
          x: baseX + Math.sin(step * 0.6) * 14 + (step % 2 ? 10 : -10),
          y: y + window.innerHeight * (down ? 0.72 : 0.28),
          rot: (down ? 180 : 0) + (step % 2 ? 10 : -10),
        };
        setPrints((ps) => [...ps.slice(-11), print]);
        timers.push(window.setTimeout(() => setPrints((ps) => ps.filter((p) => p.id !== print.id)), 2600));
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, [on, reduce]);

  return (
    <>
      <div aria-hidden className="pointer-events-none absolute left-0 top-0 z-40 w-full">
        <AnimatePresence>
          {prints.map((p) => (
            <motion.span
              key={p.id}
              className="absolute block text-moss"
              style={{ left: p.x, top: p.y, rotate: p.rot }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.32, scale: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.8 } }}
            >
              <PawPrint className="h-5 w-5" />
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={() => setOn((v) => !v)}
        aria-pressed={on}
        className="hand-border fixed bottom-3 left-3 z-50 flex items-center gap-1.5 border-2 border-ink bg-paper px-2.5 py-2 sm:px-3 sm:py-1 font-hand text-lg text-ink shadow-[2px_2px_0_0_var(--color-ink)] transition-transform hover:-rotate-2"
      >
        <PawPrint className={on ? "h-5 w-5 text-terracotta sm:h-4 sm:w-4" : "h-5 w-5 text-ink/30 sm:h-4 sm:w-4"} />
        <span className="sr-only sm:not-sr-only">patinhas: {on ? "ligadas" : "desligadas"}</span>
      </button>
    </>
  );
}

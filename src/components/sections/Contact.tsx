"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { speciesOrder, speciesProfiles, type Species } from "@/data/pets";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import { usePet } from "../PetContext";
import { ChatIcon, TornEdge } from "../illustrations/Doodles";
import { Button } from "../ui/Button";
import { PaperCard } from "../ui/PaperCard";
import { SpeechBubble } from "../ui/SpeechBubble";

const days = ["terça", "quarta", "quinta", "sexta", "sábado"];
const periods = ["manhã", "tarde"];

const blankBase =
  "mx-1 border-0 border-b-[2.5px] border-dashed border-ink/50 bg-transparent px-1 font-hand text-[1.6rem] leading-none text-accent-ink placeholder:text-ink/35 focus:border-solid focus:border-ink sm:text-3xl";

/** Lacuna do bilhete: um input inline com rótulo só para leitor de tela */
function Blank({ label, className, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="inline">
      <span className="sr-only">{label}</span>
      <input {...props} className={cn(blankBase, className)} />
    </label>
  );
}

function Choice({
  label,
  options,
  className,
  ...props
}: { label: string; options: Array<{ value: string; label: string }> } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <label className="inline">
      <span className="sr-only">{label}</span>
      <select {...props} className={cn(blankBase, "appearance-none pr-2", className)}>
        {options.map((o) => (
          <option key={o.value} value={o.value} className="font-sans text-base text-ink">
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

const article: Record<Species, string> = { dog: "um cachorro", cat: "um gato", other: "outro tipo de bicho" };

export function Contact() {
  const { pet, setPet } = usePet();
  const available = services.filter((s) => s.species.includes(pet));
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    const serviceTitle = services.find((s) => s.id === get("servico"))?.title ?? get("servico");
    const ps = get("ps");
    setMessage(
      `Oi, ${site.name}! Aqui é ${get("nome")} e eu queria marcar ${serviceTitle} para ${get("pet")}, ` +
        `que é ${article[pet]}. Pode ser ${get("dia")} de ${get("turno")}? Meu número é ${get("telefone")}.` +
        (ps ? ` P.S.: ${ps}` : ""),
    );
  };

  return (
    <section id="bilhete" aria-labelledby="bilhete-title" className="on-dark relative bg-moss text-cream">
      <TornEdge className="absolute bottom-full left-0 text-moss" />

      <div className="mx-auto grid max-w-6xl gap-14 px-4 py-24 sm:px-6 md:grid-cols-12 md:py-32">
        <div className="md:col-span-4">
          <h2 id="bilhete-title" className="font-display text-[clamp(2.6rem,7vw,4.2rem)] font-black leading-[0.92]">
            Deixa um
            <span className="block -rotate-3 font-hand text-[1.25em] font-normal text-mustard-soft">bilhetinho</span>
          </h2>
          <p className="mt-6 max-w-xs text-lg leading-relaxed text-cream/90">
            Preenche as lacunas que a gente monta a mensagem. Rapidinho, sem formulário chato.
          </p>

          <PaperCard tone="kraft" rotate={-3} tape="top" tapeTone="paper" className="mt-12 max-w-xs p-5 pt-7 text-sm">
            <p className="font-hand text-2xl leading-none text-terracotta-ink">onde a gente (não) fica:</p>
            <p className="mt-2">{site.address}</p>
            <p className="mt-1">
              WhatsApp de mentira: <strong className="whitespace-nowrap">{site.phoneDisplay}</strong>
            </p>
            <ul className="mt-2 space-y-0.5">
              {site.hours.map((h) => (
                <li key={h.days}>
                  <strong>{h.days}:</strong> {h.time}
                </li>
              ))}
            </ul>
          </PaperCard>
        </div>

        <div className="md:col-span-8">
          <PaperCard tone="ruled" rotate={-1} tape="corners" tapeTone="mustard" className="p-5 pl-14 sm:p-10 sm:pl-16">
            <form onSubmit={onSubmit} aria-describedby="bilhete-dica">
              <p id="bilhete-dica" className="font-hand text-xl text-ink-soft">
                (as partes tracejadas são pra você escrever)
              </p>

              <p className="mt-4 font-display text-xl leading-[2.9rem] sm:text-2xl sm:leading-[3.2rem]">
                Oi, Focinho Feliz! Aqui é
                <Blank label="Seu nome" name="nome" required autoComplete="given-name" placeholder="seu nome" className="w-[8.5ch]" />
                e eu queria marcar
                <Choice
                  label="Serviço"
                  name="servico"
                  key={pet}
                  defaultValue={available[0]?.id}
                  options={available.map((s) => ({ value: s.id, label: s.title.toLowerCase() }))}
                />
                para o meu bicho,
                <Blank label="Nome do pet" name="pet" required placeholder="nome dele(a)" className="w-[11ch]" />, que é
                <Choice
                  label="Que bicho é"
                  name="especie"
                  value={pet}
                  onChange={(e) => setPet(e.target.value as Species)}
                  options={speciesOrder.map((s) => ({ value: s, label: article[s] }))}
                />
                . Pode ser
                <Choice label="Dia" name="dia" defaultValue="sábado" options={days.map((d) => ({ value: d, label: d }))} />
                de
                <Choice label="Turno" name="turno" defaultValue="manhã" options={periods.map((d) => ({ value: d, label: d }))} />?
                Meu número é
                <Blank
                  label="Seu telefone"
                  name="telefone"
                  type="tel"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="(00) 0000-0000"
                  className="w-[13ch]"
                />
                .
              </p>

              <label className="mt-4 block">
                <span className="font-hand text-2xl text-accent-ink">P.S.:</span>
                <span className="sr-only"> observação (opcional)</span>
                <textarea
                  name="ps"
                  rows={2}
                  placeholder={`alguma mania que a gente deva saber? (ex: ${speciesProfiles[pet].pokeLines[2]})`}
                  className="mt-1 block w-full resize-none border-0 bg-transparent font-hand text-2xl leading-[1.9rem] text-ink placeholder:text-ink/35"
                />
              </label>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button type="submit">
                  <ChatIcon className="h-6 w-6" />
                  Mandar pelo WhatsApp
                </Button>
                <span className="font-hand text-xl text-ink-soft">(de mentirinha, prometo)</span>
              </div>
            </form>

            <div role="status" aria-live="polite">
              <AnimatePresence>
                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: 16, rotate: -2 }}
                    animate={{ opacity: 1, y: 0, rotate: 0.5 }}
                    exit={{ opacity: 0 }}
                    className="mt-10"
                  >
                    <p className="font-hand text-2xl text-accent-ink">Pronto! Seu bilhete ficaria assim:</p>
                    <SpeechBubble tone="mustard" tail="right" className="mt-3">
                      <p className="leading-relaxed">{message}</p>
                    </SpeechBubble>
                    <p className="mt-8 text-sm leading-relaxed text-ink-soft">
                      Mas calma: este é um <strong>site demonstrativo</strong>. O número {site.phoneDisplay} não existe e
                      nenhuma mensagem foi enviada para lugar nenhum.
                    </p>
                    <button
                      type="button"
                      onClick={() => setMessage(null)}
                      className="mt-2 font-hand text-xl underline decoration-wavy underline-offset-4"
                    >
                      apagar e escrever outro
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </PaperCard>
        </div>
      </div>
    </section>
  );
}

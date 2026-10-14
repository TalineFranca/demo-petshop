import { site } from "@/data/site";
import { Bone, PawPrint, RoundStamp, TornEdge } from "../illustrations/Doodles";

export function Footer() {
  return (
    <footer className="on-dark relative bg-ink text-cream">
      <TornEdge className="absolute bottom-full left-0 text-ink" />

      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-24 pt-16 sm:px-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-6">
          <p
            className="font-display text-[clamp(3rem,10vw,6rem)] font-black italic leading-[0.85] tracking-tight"
            style={{ fontVariationSettings: '"SOFT" 100, "WONK" 1' }}
          >
            Focinho
            <br />
            <span className="ml-[12%] text-mustard">Feliz.</span>
          </p>
          <p className="mt-4 font-hand text-2xl text-cream/80">{site.tagline}</p>
        </div>

        <div className="space-y-1 text-sm text-cream/85 md:col-span-4">
          <p>{site.address}</p>
          <p>{site.phoneDisplay} (não liga, não existe)</p>
          {site.hours.map((h) => (
            <p key={h.days}>
              {h.days}: {h.time}
            </p>
          ))}
        </div>

        <div className="hidden justify-end text-mustard md:col-span-2 md:flex">
          <RoundStamp id="footer-stamp" ring="FEITO À MÃO • E À PATA • " center="FF" className="w-28 rotate-12" />
        </div>
      </div>

      <div className="border-t border-dashed border-cream/25">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 pb-16 pt-6 text-sm text-cream/80 sm:px-6 md:flex-row md:items-center md:justify-between">
          <p className="flex items-center gap-2">
            <PawPrint className="h-4 w-4 text-terracotta" />
            {site.credit}
          </p>
          <p className="flex items-center gap-2">
            Endereço, telefone, preços e depoimentos são inventados.
            <Bone className="w-10 text-cream" />
          </p>
        </div>
      </div>
    </footer>
  );
}

import {
  coatOptions,
  extraOptions,
  sizeOptions,
  type Coat,
  type Extra,
  type Size,
} from "@/data/prices";

/** Junta classes ignorando valores falsos */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export type BathSelection = { size: Size; coat: Coat; extras: Extra[] };
export type ReceiptLine = { id: string; label: string; value: number };

/** Calcula as linhas da notinha e o total do simulador de banho */
export function calcBath({ size, coat, extras }: BathSelection) {
  const sizeOpt = sizeOptions.find((o) => o.id === size)!;
  const coatOpt = coatOptions.find((o) => o.id === coat)!;

  const lines: ReceiptLine[] = [
    { id: "base", label: `Banho porte ${sizeOpt.label.toLowerCase()}`, value: sizeOpt.price },
  ];
  if (coatOpt.price > 0) {
    lines.push({ id: "coat", label: `Pelagem ${coatOpt.label.toLowerCase()}`, value: coatOpt.price });
  }
  for (const opt of extraOptions) {
    if (extras.includes(opt.id)) lines.push({ id: opt.id, label: opt.label, value: opt.price });
  }

  const total = lines.reduce((sum, l) => sum + l.value, 0);
  return { lines, total };
}

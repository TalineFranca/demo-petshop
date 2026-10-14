// Preços do simulador de banho. Valores FICTÍCIOS, em reais.

export type Size = "p" | "m" | "g";
export type Coat = "curta" | "longa" | "embaracada";
export type Extra = "hidratacao" | "perfume" | "laco";

export type PriceOption<T extends string> = {
  id: T;
  label: string;
  /** Comentário manuscrito do lado da opção */
  hint: string;
  price: number;
};

/** Preço base do banho por porte */
export const sizeOptions: PriceOption<Size>[] = [
  { id: "p", label: "Pequeno", hint: "cabe na bolsa", price: 45 },
  { id: "m", label: "Médio", hint: "ocupa o sofá inteiro", price: 60 },
  { id: "g", label: "Grande", hint: "é ele que te leva pra passear", price: 85 },
];

/** Acréscimo por tipo de pelagem */
export const coatOptions: PriceOption<Coat>[] = [
  { id: "curta", label: "Curta", hint: "seca num piscar", price: 0 },
  { id: "longa", label: "Longa", hint: "tipo comercial de xampu", price: 20 },
  { id: "embaracada", label: "Embaraçada", hint: "tem nó com nome próprio", price: 35 },
];

/** Extras opcionais */
export const extraOptions: PriceOption<Extra>[] = [
  { id: "hidratacao", label: "Hidratação", hint: "brilho de novela das nove", price: 18 },
  { id: "perfume", label: "Perfume", hint: "dura até a primeira poça", price: 8 },
  { id: "laco", label: "Laço", hint: "ou gravatinha, sem julgamento", price: 5 },
];

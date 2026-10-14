import type { Species } from "./pets";

export type Service = {
  id: string;
  title: string;
  /** Anotação manuscrita no topo da ficha */
  scribble: string;
  description: string;
  duration: string;
  /** Preço "a partir de", em reais (fictício) */
  priceFrom: number;
  /** Pra quais bichos essa ficha aparece (e em que ordem, pela posição na lista) */
  species: Species[];
  /** Texto do carimbo na ficha (opcional) */
  stamp?: string;
};

export const services: Service[] = [
  {
    id: "banho",
    title: "Banho lama-zero",
    scribble: "o clássico",
    description:
      "Shampoo neutro, água morninha e enxágue caprichado. Sai cheiroso, entra no carro e já está pensando na próxima poça.",
    duration: "~50 min",
    priceFrom: 45,
    species: ["dog", "cat"],
    stamp: "mais pedido",
  },
  {
    id: "spa-gato",
    title: "Spa do gato ranzinza",
    scribble: "sala sem cachorro!",
    description:
      "Ambiente separado, secador em modo sussurro e uma tosadora que sabe a hora de dar um tempo. Ele vai fingir que odiou.",
    duration: "~60 min",
    priceFrom: 70,
    species: ["cat"],
    stamp: "silêncio",
  },
  {
    id: "tosa",
    title: "Tosa com opinião",
    scribble: "higiênica, máquina ou tesoura",
    description:
      "A gente escuta o seu pedido — e o olhar do seu pet também. Se ele não aprovar o corte, refazemos o laço por conta da casa.",
    duration: "~1h30",
    priceFrom: 65,
    species: ["dog", "cat"],
  },
  {
    id: "checkup-miudo",
    title: "Revisão do miúdo",
    scribble: "pra coelho, hamster & cia",
    description:
      "Pesagem, unhas, dentinhos e uma conversa séria sobre o excesso de semente de girassol. Tudo no colo, sem pressa.",
    duration: "~30 min",
    priceFrom: 40,
    species: ["other"],
    stamp: "sem sustos",
  },
  {
    id: "banho-seco",
    title: "Banho a seco",
    scribble: "água? jamais.",
    description:
      "Coelhos e roedores não se dão bem com água. Escovação, pó de banho próprio pra espécie e muito carinho atrás da orelha.",
    duration: "~40 min",
    priceFrom: 38,
    species: ["other"],
  },
  {
    id: "unhas",
    title: "Unha & almofadinha",
    scribble: "chega de tec-tec no piso",
    description:
      "Corte de unhas, lixinha e hidratação das almofadinhas. Pros bichos pequenos, tudo feito no colinho e com pausa pra petisco.",
    duration: "~20 min",
    priceFrom: 25,
    species: ["dog", "cat", "other"],
  },
  {
    id: "daycare",
    title: "Creche com soneca",
    scribble: "gasta energia por você",
    description:
      "Brincadeira de manhã, soneca obrigatória à tarde e um relatório com fotos no fim do dia. Ele volta pra casa e desmaia.",
    duration: "diária",
    priceFrom: 80,
    species: ["dog"],
    stamp: "volta cansado",
  },
  {
    id: "hotel",
    title: "Hotelzinho",
    scribble: "pra quando você viaja",
    description:
      "Cama, rotina, comida de casa e uma chamada de vídeo por dia. (Ele provavelmente não vai atender. Não é pessoal.)",
    duration: "por noite",
    priceFrom: 95,
    species: ["dog", "cat", "other"],
  },
];

import type { Species } from "./pets";

export type Testimonial = {
  id: string;
  /** Quem "escreveu" (o pet, claro) */
  author: string;
  species: Species;
  about: string;
  avatar: string;
  text: string;
  /** Nota de 1 a 5 patinhas */
  paws: 1 | 2 | 3 | 4 | 5;
};

export const testimonials: Testimonial[] = [
  {
    id: "t-farofa",
    author: "Farofa",
    species: "dog",
    about: "vira-lata, especialista em poças",
    avatar: "/images/pet-farofa.svg",
    text: "Entrei cheirando a aventura e saí cheirando a talco. Não pedi isso. Mas a toalha quentinha me comprou.",
    paws: 4,
  },
  {
    id: "t-benta",
    author: "Dona Benta",
    species: "cat",
    about: "siamesa, crítica exigente",
    avatar: "/images/pet-dona-benta.svg",
    text: "Fui contra. Continuo contra. Mas o secador era silencioso e ninguém me olhou nos olhos. Respeito isso.",
    paws: 3,
  },
  {
    id: "t-pudim",
    author: "Pudim",
    species: "dog",
    about: "shih-tzu, influencer de bairro",
    avatar: "/images/pet-pudim.svg",
    text: "Me colocaram um laço. Recebi 37 elogios no caminho de casa. Estou reconsiderando tudo o que eu pensava sobre banho.",
    paws: 5,
  },
  {
    id: "t-jujuba",
    author: "Jujuba",
    species: "other",
    about: "coelha, 1,2 kg de opinião",
    avatar: "/images/pet-jujuba.svg",
    text: "Ninguém tentou me molhar. Me deram feno e coçaram atrás da orelha. Voltarei. Pulando.",
    paws: 5,
  },
  {
    id: "t-capitao",
    author: "Capitão",
    species: "other",
    about: "calopsita, cantor amador",
    avatar: "/images/pet-capitao.svg",
    text: "FIU-FIU! FIIIU! fiu. (Tradução da tutora: ele gostou das unhas e quer voltar quinta.)",
    paws: 5,
  },
  {
    id: "t-torresmo",
    author: "Torresmo",
    species: "dog",
    about: "dachshund, 40 cm de comprimento",
    avatar: "/images/pet-torresmo.svg",
    text: "A moça da tosa sabe exatamente onde coçar atrás da orelha. É só isso que eu tenho a declarar.",
    paws: 5,
  },
];

// Tudo aqui é FICTÍCIO. Troque à vontade.

export type Species = "dog" | "cat" | "other";

export type SpeciesProfile = {
  id: Species;
  /** Nome no seletor "Quem é você?" */
  label: string;
  /** Linha manuscrita embaixo do nome no seletor */
  tagline: string;
  /** Mascote desenhado no hero */
  mascotName: string;
  /** Som do easter egg (clique várias vezes no logo) */
  sound: { src: string; onomatopoeia: string; announce: string };
  hero: {
    kicker: string;
    titleLines: [string, string];
    punchline: string;
    aside: string;
  };
  /** Resposta que aparece depois de escolher no seletor */
  selectorReply: string;
  servicesIntro: string;
  simulatorNote: string;
  /** Frases do mascote quando alguém toca/clica nele */
  pokeLines: string[];
};

export const speciesProfiles: Record<Species, SpeciesProfile> = {
  dog: {
    id: "dog",
    label: "Cachorro",
    tagline: "late, abana, rola na lama",
    mascotName: "Biscoito",
    sound: { src: "/sounds/bark.wav", onomatopoeia: "AU! AU!", announce: "O Biscoito latiu." },
    hero: {
      kicker: "banho, tosa & paciência infinita",
      titleLines: ["Seu cachorro rolou", "na lama de novo?"],
      punchline: "A gente resolve.",
      aside: "(e não conta pra ninguém)",
    },
    selectorReply:
      "Anotado: cachorro. Já separamos a toalha grande, o petisco de fígado e um avental extra.",
    servicesIntro:
      "Pra quem chega pulando e sai pulando mais ainda. Folheia aí e escolhe o que o seu precisa.",
    simulatorNote: "obs: cachorro molhado se sacode. está incluso no preço.",
    pokeLines: ["ei!", "faz de novo", "cadê o petisco?", "hehe"],
  },
  cat: {
    id: "cat",
    label: "Gato",
    tagline: "julga, derruba coisas, dorme 16h",
    mascotName: "Paçoca",
    sound: { src: "/sounds/meow.wav", onomatopoeia: "MIAU.", announce: "A Paçoca miou." },
    hero: {
      kicker: "secador silencioso, zero julgamento",
      titleLines: ["Seu gato acha que", "banho é traição?"],
      punchline: "A gente negocia.",
      aside: "(com sachê na mesa)",
    },
    selectorReply:
      "Anotado: gato. Desligamos o rádio, baixamos a luz e vamos fingir que a ideia foi dele.",
    servicesIntro:
      "Sala separada, nenhum cachorro à vista e uma equipe que sabe a hora de recuar. Folheia com calma.",
    simulatorNote: "obs: o olhar de desprezo pós-banho é cortesia da casa.",
    pokeLines: ["...", "não autorizei", "tá, pode mais um", "mrrr"],
  },
  other: {
    id: "other",
    label: "Outro bicho",
    tagline: "coelho, hamster, calopsita, jabuti…",
    mascotName: "Tremoço",
    sound: { src: "/sounds/squeak.wav", onomatopoeia: "IIIK!", announce: "O Tremoço fez iiik." },
    hero: {
      kicker: "focinhos pequenos, cuidados enormes",
      titleLines: ["Coelho, calopsita,", "porquinho-da-índia?"],
      punchline: "Se tem focinho, a gente atende.",
      aside: "(bico e casco também valem)",
    },
    selectorReply:
      "Anotado: outro bicho. A gente adora! Coelho, hamster, calopsita, jabuti, pode vir, sem pressa.",
    servicesIntro:
      "Bicho pequeno não curte barulho nem água demais. Por isso a gente tem um jeitinho próprio pra eles.",
    simulatorNote: "obs: coelho não toma banho de água. aqui o ‘banho’ é a seco, prometido.",
    pokeLines: ["iik!", "*mexe o nariz*", "tem cenoura?", "boing"],
  },
};

export const speciesOrder: Species[] = ["dog", "cat", "other"];

// ------------------------------------------------------------------
// Galeria "Clientes de 4 patas"
// ------------------------------------------------------------------

export type GalleryPet = {
  id: string;
  name: string;
  species: Species;
  /** Raça / descrição curta */
  breed: string;
  /** Foto (placeholder em public/images, troque pelo arquivo real) */
  image: string;
  alt: string;
  /** Legenda manuscrita na frente da polaroid */
  caption: string;
  mania: string;
  snack: string;
  /** Nível de bagunça de 1 a 5 */
  mess: 1 | 2 | 3 | 4 | 5;
};

export const galleryPets: GalleryPet[] = [
  {
    id: "farofa",
    name: "Farofa",
    species: "dog",
    breed: "vira-lata caramelo",
    image: "/images/pet-farofa.svg",
    alt: "Foto ilustrativa do Farofa, um vira-lata caramelo de orelhas em pé",
    caption: "Farofa, pós-lama",
    mania: "Rouba meias e esconde no quintal",
    snack: "Bifinho de frango",
    mess: 5,
  },
  {
    id: "dona-benta",
    name: "Dona Benta",
    species: "cat",
    breed: "siamesa, 14 anos",
    image: "/images/pet-dona-benta.svg",
    alt: "Foto ilustrativa da Dona Benta, uma gata siamesa de olhos azuis",
    caption: "Dona Benta, não sorri",
    mania: "Senta exatamente no teclado do notebook",
    snack: "Sachê de atum (só a marca cara)",
    mess: 1,
  },
  {
    id: "jujuba",
    name: "Jujuba",
    species: "other",
    breed: "coelha mini lop",
    image: "/images/pet-jujuba.svg",
    alt: "Foto ilustrativa da Jujuba, uma coelha de orelhas caídas",
    caption: "Jujuba ♥",
    mania: "Dá piruetas quando está feliz",
    snack: "Folha de cenoura",
    mess: 2,
  },
  {
    id: "torresmo",
    name: "Torresmo",
    species: "dog",
    breed: "dachshund",
    image: "/images/pet-torresmo.svg",
    alt: "Foto ilustrativa do Torresmo, um dachshund de corpo comprido",
    caption: "Torresmo (inteiro não coube)",
    mania: "Late pro aspirador. Todo dia. Desde 2021.",
    snack: "Cenoura baby (ele acha que é osso)",
    mess: 3,
  },
  {
    id: "nhoque",
    name: "Nhoque",
    species: "cat",
    breed: "gato preto, ex-rua",
    image: "/images/pet-nhoque.svg",
    alt: "Foto ilustrativa do Nhoque, um gato preto de olhos amarelos",
    caption: "Nhoque, 3h da manhã",
    mania: "Corre pela casa às 3h sem motivo aparente",
    snack: "Petisco de salmão",
    mess: 4,
  },
  {
    id: "capitao",
    name: "Capitão",
    species: "other",
    breed: "calopsita",
    image: "/images/pet-capitao.svg",
    alt: "Foto ilustrativa do Capitão, uma calopsita com topete amarelo",
    caption: "Capitão, cantando",
    mania: "Assobia o hino do time errado",
    snack: "Painço",
    mess: 3,
  },
  {
    id: "pudim",
    name: "Pudim",
    species: "dog",
    breed: "shih-tzu",
    image: "/images/pet-pudim.svg",
    alt: "Foto ilustrativa do Pudim, um shih-tzu com laço na cabeça",
    caption: "Pudim de laço novo",
    mania: "Pousa pra foto sem ninguém pedir",
    snack: "Maçã sem semente",
    mess: 2,
  },
  {
    id: "brisa",
    name: "Brisa",
    species: "cat",
    breed: "persa",
    image: "/images/pet-brisa.svg",
    alt: "Foto ilustrativa da Brisa, uma gata persa muito peluda",
    caption: "Brisa, 40% pelo",
    mania: "Dorme dentro de qualquer caixa menor que ela",
    snack: "Frango cozido desfiado",
    mess: 2,
  },
];

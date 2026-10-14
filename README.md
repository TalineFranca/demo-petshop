# Focinho Feliz - pet shop fictício

Site demonstrativo (portfólio) de um pet shop que **não existe**. Nome, endereço, telefone, preços e depoimentos são inventados.

Next.js (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion. 100% estático, sem backend.

## Rodando

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # gera o site estático em out/
npm run typecheck
```

Para o Open Graph apontar para o domínio certo, defina `NEXT_PUBLIC_SITE_URL` (ex.: `https://focinhofeliz.exemplo`) no build.

## Onde trocar o conteúdo

Todo texto editável fica em `src/data/` (os tipos ficam junto):

| Arquivo | O que tem |
| --- | --- |
| `pets.ts` | textos que mudam por bicho (hero, seletor, mascote, som do easter egg) e as fichas da galeria |
| `services.ts` | fichas de serviço e para quais bichos cada uma aparece |
| `prices.ts` | preços do simulador de banho (porte, pelagem, extras) |
| `testimonials.ts` | depoimentos "escritos pelos pets" |
| `site.ts` | nome, endereço, horário, telefone fictício e o crédito do rodapé |

Fotos: os arquivos em `public/images/pet-*.svg` são placeholders. Troque por fotos reais com o mesmo nome (ou mude o caminho em `pets.ts`) e ajuste o `alt`.
Sons: `public/sounds/*.wav` são sintetizados; pode trocar por gravações curtas.

## Interações

- Mascote do topo segue o cursor com os olhos (no celular, olha para onde você toca); clicar nele faz carinho.
- Clicar 5 vezes seguidas no logo faz o mascote latir / miar / guinchar (o som só toca porque veio de um clique).
- "Quem é você?" troca textos, serviços, cor de destaque e mascote do site inteiro (`PetContext`).
- Fichas de serviço: arraste a de cima, use os botões ou as setas do teclado.
- Simulador de banho com preço montado em tempo real.
- Polaroids viram e mostram a ficha do pet.
- Bilhete em formato de lacunas monta uma mensagem de WhatsApp de mentira (nada é enviado).
- Cursor de patinha + pegadas ao rolar, com botão para desligar (a escolha fica salva no navegador).

Com `prefers-reduced-motion`, animações decorativas, pegadas e o giro 3D das polaroids são desligados.

---

Site demonstrativo criado por Lunia Sites - empresa fictícia.

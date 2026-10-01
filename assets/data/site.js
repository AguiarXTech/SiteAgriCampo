/**
 * site.js — dados institucionais gerais (CONTEXT.md §6.1, §6.5)
 *
 * CAMADA DE CONTEÚDO — fonte local, trocável.
 * Enquanto o site não está ligado à plataforma Mutare, o conteúdo vive aqui.
 * O formato espelha a collection `site-info` do Payload (um doc por tenant),
 * para que a migração futura seja direta. Ver README.md → "Camada de conteúdo".
 *
 * Campos com "PENDENTE" são placeholders — não bloqueiam o código, mas
 * precisam ser preenchidos antes do site ir ao ar (CONTEXT.md §10).
 */

export const site = {
  nome: "Agricampo Jr.",
  nomeCompleto: "Agricampo Jr. — Empresa Júnior de Agronomia",
  cidade: "São João Evangelista",
  estado: "MG",
  // vínculo acadêmico, fundação e federação — CONTEXT.md §6.1
  instituicao: "PENDENTE — confirmar instituição de ensino vinculada",
  anoFundacao: "PENDENTE",
  federacao: "PENDENTE — Brasil Júnior / federação estadual",

  // Nossa História — CONTEXT.md §6.1 (2–3 parágrafos)
  historia: [
    "PENDENTE — parágrafo 1 da história da Agricampo Jr.",
    "PENDENTE — parágrafo 2.",
    "PENDENTE — parágrafo 3.",
  ],

  // Missão ainda PENDENTE — a cliente enviou Visão e Valores (16/09/2026), missão não veio junto.
  missao: "PENDENTE — missão da empresa júnior.",
  visao:
    "A Agricampo tem como visão desenvolver os discentes e produtores assistidos, com o intuito de promover o crescimento socioeconômico e tecnológico, realizando serviços e orientações, com preços acessíveis, mantendo o profissionalismo e qualidade dos serviços prestados.",
  valores: [
    "Compromisso",
    "Resiliência",
    "Ética",
    "Equidade",
    "Autenticidade",
    "Conhecimento",
    "Respeito",
  ],

  // Hero da home.
  // ⚠️ Hoje este objeto é vestigial: index.html tem o texto do hero direto no
  // HTML (nunca foi ligado a um hero-render.js). Mantido em sincronia mesmo
  // assim, pra não virar fonte de verdade divergente. Linguagem simples,
  // pedido da cliente em 29/09/2026 — público é produtor rural, evitar termo
  // técnico/formal (CONTEXT.md §10).
  hero: {
    titulo: "Ajuda de verdade pra sua lavoura ou criação produzir mais",
    subtitulo:
      "Somos estudantes de Agronomia de São João Evangelista - MG. A gente vai até sua propriedade, vê o que precisa e ajuda a resolver, com preço justo.",
    ctaPrimario: { rotulo: "Fale com gente", href: "/contato.html" },
    ctaSecundario: { rotulo: "Ver o que a gente faz", href: "/servicos.html" },
    // imagem de fundo — foto real de campo (CONTEXT.md §5). PENDENTE de asset.
    imagem: "assets/img/hero-campo.jpg",
  },

  // Localização — mapa de MG + endereço (CONTEXT.md §6.6)
  localizacao: {
    // coordenadas do município (públicas) — refinar para o endereço da sede
    lat: -18.5477,
    lng: -42.7683,
    // posição do pin sobre o SVG do mapa de MG, em % (ajustar ao SVG final)
    pinMapa: { top: "34%", left: "72%" },
    enderecoSede: "PENDENTE — endereço completo da sede",
    comoChegar: "PENDENTE — texto de orientação de acesso",
    // vídeo do trajeto (CONTEXT.md §6.8) — hospedar no YouTube/Vimeo e embutir
    videoAcessoEmbed: "", // ex: https://www.youtube.com/embed/XXXX (PENDENTE de produção)
  },

  // Foto aérea da sede (CONTEXT.md §6.7) — PENDENTE de produção (drone)
  fotoAerea: "assets/img/sede/aerea.jpg",

  contato: {
    whatsapp: "", // PENDENTE — só dígitos com DDI/DDD, ex: 5533999999999
    email: "PENDENTE",
    endereco: "PENDENTE",
    redes: {
      instagram: "",
      linkedin: "",
      facebook: "",
    },
  },

  // Números de impacto — NÃO exibir enquanto forem placeholders (CONTEXT.md §8).
  // Preencher só com dados reais e então habilitar a seção na home.
  numeros: [
    // { valor: "1995", legenda: "Fundação" },
  ],
};

export default site;

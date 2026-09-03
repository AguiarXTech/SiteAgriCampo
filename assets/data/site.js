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

  missao: "PENDENTE — missão da empresa júnior.",
  visao: "PENDENTE — visão.",
  valores: ["PENDENTE — valor 1", "PENDENTE — valor 2", "PENDENTE — valor 3"],

  // Hero da home
  hero: {
    titulo: "Consultoria em agronomia para transformar a produtividade da sua propriedade",
    subtitulo:
      "Empresa Júnior de Agronomia em São João Evangelista - MG. Diagnóstico técnico, planejamento e acompanhamento a preços acessíveis.",
    ctaPrimario: { rotulo: "Fale com um consultor", href: "/contato.html" },
    ctaSecundario: { rotulo: "Conheça os serviços", href: "/servicos.html" },
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

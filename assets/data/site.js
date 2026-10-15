/**
 * site.js — dados institucionais gerais (CONTEXT.md §6.1, §6.5)
 *
 * CAMADA DE CONTEÚDO — fonte local, trocável.
 * Enquanto o site não está ligado à plataforma Mutare, o conteúdo vive aqui.
 * O formato espelha a collection `site-info` do Payload (um doc por tenant),
 * para que a migração futura seja direta. Ver README.md → "Camada de conteúdo".
 *
 * Quando a plataforma publica (branch `publicado`), os campos institucionais e
 * o contato vêm de conteudo-mutare.js (ver mutare.js). Campo vazio no painel
 * cai no valor local abaixo. Hero, localização e números continuam locais.
 *
 * Campos com "PENDENTE" são placeholders — não bloqueiam o código, mas
 * precisam ser preenchidos antes do site ir ao ar (CONTEXT.md §10).
 */

import { conteudo } from "./mutare.js?v=202610151544";

const siteLocal = {
  nome: "Agricampo Jr.",
  nomeCompleto: "Agricampo Jr. — Empresa Júnior de Agronomia",
  cidade: "São João Evangelista",
  estado: "MG",
  // vínculo acadêmico, fundação e federação — CONTEXT.md §6.1
  // Confirmados pela diretoria em documento enviado 14/10/2026 (mockup-cliente/referencia/).
  instituicao: "IFMG – Campus São João Evangelista",
  anoFundacao: "2015",
  federacao: "Núcleo Vale do Aço – NúVA, FEJEMG, Brasil Júnior",
  professorOrientador: "Alisson José Eufrásio de Carvalho",

  // Nossa História — CONTEXT.md §6.1. Texto oficial da cliente: o 1º parágrafo
  // veio em 02/10/2026 (usado também em index.html "Quem somos"); o 2º veio
  // em 14/10/2026. CONTEXT.md pedia 2-3 parágrafos — 2 parágrafos oficiais já
  // formam um texto completo, por isso não há mais um 3º placeholder aqui.
  historia: [
    "A AGRICAMPO foi fundada em junho de 2015 por estudantes do curso de Bacharelado em Agronomia do Instituto Federal de Minas Gerais – Campus São João Evangelista.",
    "A motivação para a criação da empresa júnior surgiu da oportunidade de colocar em prática os conhecimentos adquiridos ao longo do curso, além de levar essas habilidades para o meio rural, contribuindo para o desenvolvimento da agricultura local.",
  ],

  // Missão, visão e valores — texto oficial da cliente (visão/valores 16/09/2026, missão 02/10/2026).
  missao:
    "Disponibilizar serviços e orientação tecnológica de qualidade, visando o desenvolvimento do produtor rural e de sua propriedade, em São João Evangelista e região, oportunizando o aperfeiçoamento prático dos alunos envolvidos.",
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
    ctaPrimario: { rotulo: "Fale com a gente", href: "/contato.html" },
    ctaSecundario: { rotulo: "Ver o que a gente faz", href: "/servicos.html" },
    // imagem de fundo — foto real de campo (CONTEXT.md §5). PENDENTE de asset.
    imagem: "assets/img/hero-campo.jpg",
  },

  // Localização — mapa de MG + endereço (CONTEXT.md §6.6)
  localizacao: {
    // ⚠️ ainda as coordenadas públicas do MUNICÍPIO, não da sede exata — o
    // endereço completo chegou (abaixo), mas não pedi geocodificação ainda.
    lat: -18.5477,
    lng: -42.7683,
    // o pino do mapa de MG fica dentro do SVG (ferramentas/gerar-mapa-mg.py), na
    // posição real do município calculada a partir da malha do IBGE
    enderecoSede: "Avenida Primeiro de Junho, 1043, Centro, São João Evangelista - MG, CEP 39705-000 – Prédio de Convivência",
    comoChegar: "PENDENTE — texto de orientação de acesso",
    // vídeo do trajeto (CONTEXT.md §6.8) — hospedar no YouTube/Vimeo e embutir
    videoAcessoEmbed: "", // ex: https://www.youtube.com/embed/XXXX (PENDENTE de produção)
  },

  // Foto aérea da sede (CONTEXT.md §6.7) — PENDENTE de produção (drone)
  fotoAerea: "assets/img/sede/aerea.jpg",

  // Confirmados pela diretoria em documento enviado 14/10/2026.
  contato: {
    whatsapp: "5533999798615", // (33) 99979-8615
    email: "agricampo.presidencial@gmail.com",
    endereco: "Avenida Primeiro de Junho, 1043, Centro, São João Evangelista - MG, CEP 39705-000 – Prédio de Convivência",
    redes: {
      instagram: "https://www.instagram.com/agricampo.jr/",
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

/** Valor do painel quando preenchido; senão, o local. */
function ou(valor, local) {
  if (valor == null) return local;
  if (typeof valor === "string" && valor.trim() === "") return local;
  if (Array.isArray(valor) && valor.length === 0) return local;
  return valor;
}

/** WhatsApp só com dígitos e DDI 55 — o painel pode mandar "(33) 99979-8615". */
function normalizarWhatsapp(valor) {
  const digitos = String(valor ?? "").replace(/\D/g, "");
  if (!digitos) return "";
  return digitos.length <= 11 ? `55${digitos}` : digitos;
}

function mesclarMutare(local, c) {
  const s = c.site ?? {};
  const contato = s.contato ?? {};
  const redes = contato.redes ?? {};
  return {
    ...local,
    nome: ou(c.empresa?.nome, local.nome),
    instituicao: ou(s.instituicao, local.instituicao),
    anoFundacao: ou(s.anoFundacao == null ? "" : String(s.anoFundacao), local.anoFundacao),
    federacao: ou(s.federacao, local.federacao),
    professorOrientador: ou(s.professorOrientador, local.professorOrientador),
    historia: ou(s.descricao, local.historia),
    missao: ou(s.missao, local.missao),
    visao: ou(s.visao, local.visao),
    valores: ou(s.valores, local.valores),
    imagemCapa: s.imagemCapa ?? null,
    contato: {
      whatsapp: ou(normalizarWhatsapp(contato.whatsapp), local.contato.whatsapp),
      email: ou(contato.email, local.contato.email),
      endereco: ou(contato.endereco, local.contato.endereco),
      redes: {
        instagram: ou(redes.instagram, local.contato.redes.instagram),
        linkedin: ou(redes.linkedin, local.contato.redes.linkedin),
        facebook: ou(redes.facebook, local.contato.redes.facebook),
      },
    },
  };
}

export const site = conteudo ? mesclarMutare(siteLocal, conteudo) : siteLocal;

export default site;

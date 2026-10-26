/**
 * equipe.js — equipe da Agricampo Jr., agrupada por setor.
 *
 * CAMADA DE CONTEÚDO — fonte local, usada quando não há conteúdo publicado
 * pela plataforma Mutare.
 *
 * foto:        caminho servido pelo site (assets/img/equipe/<slug>.jpg)
 * fotoStatus:  "disponivel" (há foto) | "pendente" (mostra as iniciais)
 *
 * Quando a plataforma publica (branch `publicado`), setores e equipe vêm de
 * conteudo-mutare.js (ver mutare.js) e substituem as listas abaixo. Lá o
 * membro aponta o setor pelo NOME e a foto é URL absoluta já quadrada
 * (600×600) ou null — null mostra as iniciais, como aqui.
 */

import { conteudo } from "./mutare.js?v=202610172038";

/** Ordem de exibição dos setores + cultura associada a cada um. */
const setoresLocais = [
  { id: "presidencia", nome: "Presidência", culturaTema: "Café" },
  { id: "marketing", nome: "Marketing", culturaTema: "Girassol" },
  { id: "comercial", nome: "Comercial", culturaTema: "Soja" },
  { id: "projetos", nome: "Projetos", culturaTema: "Milho" },
  { id: "adm-financeiro", nome: "Administrativo-Financeiro", culturaTema: "Cana-de-açúcar" },
  { id: "rh", nome: "Recursos Humanos", culturaTema: "Algodão" },
  { id: "membros", nome: "Membros", culturaTema: "" },
];

const equipeLocal = [
  // --- Presidência ---------------------------------------------------------
  {
    nome: "Jheniffer Camille Dayrell da Silva",
    cargo: "Presidente",
    formacao: "Técnica em Agropecuária · Graduanda em Engenharia Agronômica",
    setor: "presidencia",
    culturaTema: "Café",
    ordem: 1,
    foto: "assets/img/equipe/jheniffer-camille.jpg",
    fotoStatus: "disponivel",
  },
  {
    nome: "Dayane Anjos",
    cargo: "Vice-Presidente",
    formacao: "Graduanda em Agronomia · 10º período",
    setor: "presidencia",
    culturaTema: "Café",
    ordem: 2,
    foto: "assets/img/equipe/dayane-anjos.jpg",
    fotoStatus: "disponivel",
  },

  // --- Marketing ---------------------------------------------------------
  {
    nome: "Lorena Coutinho Villela de Figueiredo",
    cargo: "Diretora de Marketing",
    formacao: "10º período · Coordenadora de Comunicação RR/NúVA 2026.1 · Equipe Agricampo/FAEMG Jovem",
    setor: "marketing",
    culturaTema: "Girassol",
    ordem: 1,
    foto: "assets/img/equipe/lorena-figueiredo.jpg",
    fotoStatus: "pendente",
  },
  {
    nome: "Caroline Gomes dos Santos",
    cargo: "Gerente de Marketing",
    formacao: "Eng. Agronômica · 9º período · Maratona FAEMG Jovem 2026 · AutoCAD, Google Earth, QGIS",
    setor: "marketing",
    culturaTema: "Girassol",
    ordem: 2,
    foto: "assets/img/equipe/caroline-santos.jpg",
    fotoStatus: "disponivel",
  },
  {
    nome: "Rafaella Gama Marques",
    cargo: "Gerente de Marketing",
    formacao: "6º período · inglês básico · Excel",
    setor: "marketing",
    culturaTema: "Girassol",
    ordem: 3,
    foto: "assets/img/equipe/rafaella-marques.jpg",
    fotoStatus: "pendente",
  },
  {
    nome: "Tais Eduarda",
    cargo: "Membro",
    formacao: "",
    setor: "marketing",
    culturaTema: "Girassol",
    ordem: 4,
    foto: "assets/img/equipe/tais-eduarda.jpg",
    fotoStatus: "pendente",
  },

  // --- Comercial ---------------------------------------------------------
  {
    nome: "Luciana de Oliveira Souza",
    cargo: "Diretora Comercial",
    formacao: "Maratona FAEMG Jovem 2026 · Excel avançado · AutoCAD, QGIS",
    setor: "comercial",
    culturaTema: "Soja",
    ordem: 1,
    foto: "assets/img/equipe/luciana-souza.jpg",
    fotoStatus: "disponivel",
  },
  {
    nome: "Nayara Jhennefer Damasceno Santos",
    cargo: "Gerente Comercial",
    formacao: "Técnica IFMG · 8º período · inglês/espanhol básico",
    setor: "comercial",
    culturaTema: "Soja",
    ordem: 2,
    foto: "assets/img/equipe/nayara-santos.jpg",
    fotoStatus: "pendente",
  },
  {
    nome: "Luís Felipe",
    cargo: "Membro",
    formacao: "",
    setor: "comercial",
    culturaTema: "Soja",
    ordem: 3,
    foto: "assets/img/equipe/luis-felipe.jpg",
    fotoStatus: "disponivel",
  },

  // --- Projetos --------------------------------------------------------
  {
    nome: "Heloisa Sofia de Souza Salema",
    cargo: "Diretora de Projetos",
    formacao: "6º período",
    setor: "projetos",
    culturaTema: "Milho",
    ordem: 1,
    foto: "assets/img/equipe/heloisa-salema.jpg",
    fotoStatus: "disponivel",
  },
  {
    nome: "Marlon Assis Pereira",
    cargo: "Gerente de Projetos",
    formacao: "Técnico em Agropecuária · 9º período",
    setor: "projetos",
    culturaTema: "Milho",
    ordem: 2,
    foto: "assets/img/equipe/marlon-pereira.jpg",
    fotoStatus: "disponivel",
  },
  {
    nome: "Diogo Augusto Soares",
    cargo: "Gerente de Projetos",
    formacao: "Técnico · 5º período",
    setor: "projetos",
    culturaTema: "Milho",
    ordem: 3,
    foto: "assets/img/equipe/diogo-soares.jpg",
    fotoStatus: "disponivel",
  },
  {
    nome: "Luana Marta dos Anjos",
    cargo: "Gerente de Projetos",
    formacao: "6º período",
    setor: "projetos",
    culturaTema: "Milho",
    ordem: 4,
    foto: "assets/img/equipe/luana-anjos.jpg",
    fotoStatus: "disponivel",
  },
  {
    nome: "Thaissa Alves Soares",
    cargo: "Gerente de Projetos",
    formacao: "10º período · Técnica em Nutrição e Dietética · pesquisa científica · QGIS",
    setor: "projetos",
    culturaTema: "Milho",
    ordem: 5,
    foto: "assets/img/equipe/thaissa-soares.jpg",
    fotoStatus: "pendente",
  },
  {
    nome: "Elias Pereira Gomes",
    cargo: "Gerente de Projetos",
    formacao: "6º período",
    setor: "projetos",
    culturaTema: "Milho",
    ordem: 6,
    foto: "assets/img/equipe/elias-gomes.jpg",
    fotoStatus: "pendente",
  },

  // --- Administrativo-Financeiro -----------------------------------------
  {
    nome: "Stefani de Jesus Oliveira Moreira",
    cargo: "Diretora do Administrativo-Financeiro",
    formacao: "8º período · Conselheira Multiplicadora 2026.2 · Equipe Agricampo/FAEMG Jovem",
    setor: "adm-financeiro",
    culturaTema: "Cana-de-açúcar",
    ordem: 1,
    foto: "assets/img/equipe/stefani-moreira.jpg",
    fotoStatus: "disponivel",
  },
  {
    nome: "Kary Cordeiro",
    cargo: "Gerente do Administrativo-Financeiro",
    formacao: "Técnica em Agropecuária · 8º período",
    setor: "adm-financeiro",
    culturaTema: "Cana-de-açúcar",
    ordem: 2,
    foto: "assets/img/equipe/kary-cordeiro.jpg",
    fotoStatus: "disponivel",
  },

  // --- Recursos Humanos ------------------------------------------------
  {
    nome: "Beatriz Chagas Ferreira",
    cargo: "Diretora de RH",
    formacao: "Técnica · 9º período · Excel e AutoCAD",
    setor: "rh",
    culturaTema: "Algodão",
    ordem: 1,
    foto: "assets/img/equipe/beatriz-ferreira.jpg",
    fotoStatus: "disponivel",
  },
  {
    nome: "Anabelly Cristina M. Silva",
    cargo: "Gerente de RH",
    formacao: "8º período",
    setor: "rh",
    culturaTema: "Algodão",
    ordem: 2,
    foto: "assets/img/equipe/anabelly-silva.jpg",
    fotoStatus: "disponivel",
  },
  {
    nome: "Luciene Rita Correia dos Santos",
    cargo: "Membro",
    formacao: "8º período · Maratona FAEMG Jovem 2026",
    setor: "rh",
    culturaTema: "Algodão",
    ordem: 3,
    foto: "assets/img/equipe/luciene-santos.jpg",
    fotoStatus: "disponivel",
  },

  // --- Membros ---------------------------------------------------------
  {
    nome: "Ronaldo Augusto Souza Alves",
    cargo: "Membro",
    formacao: "Técnico IFMG · 9º período · Excel, AutoCAD, QGIS, Looker Studio",
    setor: "membros",
    culturaTema: "",
    ordem: 1,
    foto: "assets/img/equipe/ronaldo-alves.jpg",
    fotoStatus: "disponivel",
  },
];

function setoresMutare(c) {
  const lista = (c.setores ?? []).map((s) => ({
    id: s.nome,
    nome: s.nome,
    culturaTema: s.cultura ?? "",
  }));
  // membro num setor fora da lista de setores: grupo no fim, pra não sumir do site
  for (const m of c.equipe ?? []) {
    if (m.setor && !lista.some((s) => s.id === m.setor)) {
      lista.push({ id: m.setor, nome: m.setor, culturaTema: "" });
    }
  }
  return lista;
}

function equipeMutare(c) {
  return (c.equipe ?? []).map((m, i) => ({
    nome: m.nome ?? "",
    cargo: m.cargo ?? "",
    formacao: m.formacao ?? "",
    bio: m.bio ?? "",
    setor: m.setor ?? "",
    ordem: i + 1,
    foto: m.foto ?? null,
    fotoAlt: m.fotoAlt ?? "",
    fotoStatus: m.foto ? "disponivel" : "pendente",
  }));
}

export const setores = conteudo ? setoresMutare(conteudo) : setoresLocais;
export const equipe = conteudo ? equipeMutare(conteudo) : equipeLocal;

/** Agrupa a equipe por setor, na ordem definida em `setores`. */
export function equipePorSetor() {
  return setores
    .map((setor) => ({
      ...setor,
      membros: equipe
        .filter((m) => m.setor === setor.id)
        .sort((a, b) => (a.ordem ?? 0) - (b.ordem ?? 0)),
    }))
    .filter((grupo) => grupo.membros.length > 0);
}

export default equipe;

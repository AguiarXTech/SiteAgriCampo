/**
 * equipe.js — equipe da Agricampo Jr. (CONTEXT.md §6.2)
 *
 * CAMADA DE CONTEÚDO — fonte local, trocável. O formato espelha a collection
 * `people` do Payload/Mutare, com dois campos a mais que ainda NÃO existem no
 * schema do Mutare e precisam ser adicionados lá na fase de integração:
 *   - setor        (agrupa a equipe — pedido da cliente)
 *   - culturaTema  (cultura agrícola associada ao setor — pedido da cliente)
 *
 * Fonte dos dados: "Info. membros para site.pdf" (Drive, extraído 01/09/2026).
 *
 * foto:
 *   - caminho final servido pelo site (assets/img/equipe/<slug>.jpg)
 * fotoStatus:
 *   - "disponivel"  → foto convertida e publicada em assets/img/equipe/ (600×800,
 *                     JPEG, sem EXIF), a partir do .heif da pasta de materiais
 *   - "pendente"    → sem foto; entra na sessão de fotos (CONTEXT.md §10)
 * fotoFonte:
 *   - nome do arquivo original na pasta de materiais, quando existir
 *
 * Fotos: 15 de 21 membros com foto (materiais recebidos 14/10/2026). Sem foto:
 * Lorena, Rafaella, Tais, Nayara, Thaissa, Elias. A pasta tem mais 6 retratos que
 * NÃO foram ligados a ninguém por falta de nome: "duda 1.heif" (provável Tais
 * Eduarda — confirmar) e IMG_7249/7492/7496/7561/7564.HEIC. Pedir à cliente quem
 * é quem antes de publicar — foto no nome errado é pior que placeholder.
 * ⚠️ Mapeamento setor → cultura é SUGESTÃO — decisão final é da cliente (§6.2).
 *
 * Correções pedidas pela cliente em 16/09/2026:
 *   - Rafaella Gama Marques: RH → Marketing
 *   - Anabelly Cristina M. Silva e Luciene Rita Correia dos Santos: → RH
 *   - Novos membros: Tais Eduarda (Marketing), Luís Felipe (Comercial)
 *   - "felipe 1.heif" (arquivo sem correspondência, ver histórico) é o Luís Felipe.
 *   Cargos dos 3 membros movidos de setor foram ajustados para nomear o setor novo
 *   (ex: "Gerente de RH" → "Gerente de Marketing"), mantendo o nível hierárquico —
 *   a cliente só pediu a troca de setor; confirmar se o cargo formal é outro.
 *
 * Quando a plataforma publica (branch `publicado`), setores e equipe vêm de
 * conteudo-mutare.js (ver mutare.js) e substituem as listas abaixo. Lá o
 * membro aponta o setor pelo NOME e a foto é URL absoluta já quadrada
 * (600×600) ou null — null mostra as iniciais, como aqui.
 */

import { conteudo } from "./mutare.js?v=202610151544";

/** Ordem de exibição dos setores + cultura sugerida (a validar com a cliente). */
const setoresLocais = [
  { id: "presidencia", nome: "Presidência", culturaTema: "Café", sugestao: true },
  { id: "marketing", nome: "Marketing", culturaTema: "Girassol", sugestao: true },
  { id: "comercial", nome: "Comercial", culturaTema: "Soja", sugestao: true },
  { id: "projetos", nome: "Projetos", culturaTema: "Milho", sugestao: true },
  { id: "adm-financeiro", nome: "Administrativo-Financeiro", culturaTema: "Cana-de-açúcar", sugestao: true },
  { id: "rh", nome: "Recursos Humanos", culturaTema: "Algodão", sugestao: true },
  { id: "membros", nome: "Membros", culturaTema: "", sugestao: false },
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
    fotoFonte: "jheniffer 1 .heif",
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
    fotoFonte: "dayane 1.heif",
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
    fotoFonte: "caroline 1.heif",
  },
  {
    // movida de RH → Marketing (pedido da cliente, 16/09/2026). Cargo ajustado
    // de "Gerente de RH" para "Gerente de Marketing" — confirmar com a cliente.
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
    // nova integrante (pedido da cliente, 16/09/2026) — cargo e formação a confirmar.
    nome: "Tais Eduarda",
    cargo: "Membro",
    formacao: "PENDENTE — cargo, formação e período a confirmar",
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
    fotoFonte: "luciana 1.heif",
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
    // novo integrante (pedido da cliente, 16/09/2026) — resolve a foto "felipe 1.heif"
    // que estava sem correspondência no PDF de equipe original.
    nome: "Luís Felipe",
    cargo: "Membro",
    formacao: "PENDENTE — cargo, formação e período a confirmar",
    setor: "comercial",
    culturaTema: "Soja",
    ordem: 3,
    foto: "assets/img/equipe/luis-felipe.jpg",
    fotoStatus: "disponivel",
    fotoFonte: "felipe 1.heif",
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
    fotoFonte: "heloisa 1 .heif",
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
    fotoFonte: "marlon 1.heif",
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
    fotoFonte: "giogo 1.heif",
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
    fotoFonte: "luana 1.heif",
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
    fotoFonte: "stefani 1.heif",
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
    fotoFonte: "kary 1.heif",
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
    fotoFonte: "beatriz 1 .heif",
  },
  {
    // movida de Marketing → RH (pedido da cliente, 16/09/2026). Cargo ajustado
    // de "Gerente de Marketing" para "Gerente de RH" — confirmar com a cliente.
    nome: "Anabelly Cristina M. Silva",
    cargo: "Gerente de RH",
    formacao: "8º período",
    setor: "rh",
    culturaTema: "Algodão",
    ordem: 2,
    foto: "assets/img/equipe/anabelly-silva.jpg",
    fotoStatus: "disponivel",
    fotoFonte: "anabelly 1.heif",
  },
  {
    // movida de "Membros" → RH (pedido da cliente, 16/09/2026).
    nome: "Luciene Rita Correia dos Santos",
    cargo: "Membro",
    formacao: "8º período · Maratona FAEMG Jovem 2026",
    setor: "rh",
    culturaTema: "Algodão",
    ordem: 3,
    foto: "assets/img/equipe/luciene-santos.jpg",
    fotoStatus: "disponivel",
    fotoFonte: "luciene 1.heif",
  },

  // --- Membros (sem cargo de liderança listado no PDF) -----------------
  {
    nome: "Ronaldo Augusto Souza Alves",
    cargo: "Membro",
    formacao: "Técnico IFMG · 9º período · Excel, AutoCAD, QGIS, Looker Studio",
    setor: "membros",
    culturaTema: "",
    ordem: 1,
    foto: "assets/img/equipe/ronaldo-alves.jpg",
    fotoStatus: "disponivel",
    fotoFonte: "Ronaldo .heif",
  },
];

function setoresMutare(c) {
  const lista = (c.setores ?? []).map((s) => ({
    id: s.nome,
    nome: s.nome,
    culturaTema: s.cultura ?? "",
    sugestao: false,
  }));
  // membro num setor fora da lista de setores: grupo no fim, pra não sumir do site
  for (const m of c.equipe ?? []) {
    if (m.setor && !lista.some((s) => s.id === m.setor)) {
      lista.push({ id: m.setor, nome: m.setor, culturaTema: "", sugestao: false });
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

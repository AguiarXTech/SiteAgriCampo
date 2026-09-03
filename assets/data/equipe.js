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
 *   - "disponivel"  → temos o arquivo de origem (.heif) — falta converter p/ web
 *   - "pendente"    → sem foto; entra na sessão de fotos (CONTEXT.md §10)
 * fotoFonte:
 *   - nome do arquivo original na pasta de materiais, quando existir
 *
 * ⚠️ 17 de 19 membros sem foto padronizada — maior gargalo de conteúdo (§6.2).
 * ⚠️ Mapeamento setor → cultura é SUGESTÃO — decisão final é da cliente (§6.2).
 * ⚠️ "felipe 1.heif" existe na pasta e não corresponde a ninguém do PDF (§6.2).
 */

/** Ordem de exibição dos setores + cultura sugerida (a validar com a cliente). */
export const setores = [
  { id: "presidencia", nome: "Presidência", culturaTema: "Café", sugestao: true },
  { id: "marketing", nome: "Marketing", culturaTema: "Girassol", sugestao: true },
  { id: "comercial", nome: "Comercial", culturaTema: "Soja", sugestao: true },
  { id: "projetos", nome: "Projetos", culturaTema: "Milho", sugestao: true },
  { id: "adm-financeiro", nome: "Administrativo-Financeiro", culturaTema: "Cana-de-açúcar", sugestao: true },
  { id: "rh", nome: "Recursos Humanos", culturaTema: "Algodão", sugestao: true },
  { id: "membros", nome: "Membros", culturaTema: "", sugestao: false },
];

export const equipe = [
  // --- Presidência ---------------------------------------------------------
  {
    nome: "Jheniffer Camille Dayrell da Silva",
    cargo: "Presidente",
    formacao: "Técnica em Agropecuária · Graduanda em Engenharia Agronômica",
    setor: "presidencia",
    culturaTema: "Café",
    ordem: 1,
    foto: "assets/img/equipe/jheniffer-camille.jpg",
    fotoStatus: "pendente",
  },
  {
    nome: "Dayane Anjos",
    cargo: "Vice-Presidente",
    formacao: "Graduanda em Agronomia · 10º período",
    setor: "presidencia",
    culturaTema: "Café",
    ordem: 2,
    foto: "assets/img/equipe/dayane-anjos.jpg",
    fotoStatus: "pendente",
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
    nome: "Anabelly Cristina M. Silva",
    cargo: "Gerente de Marketing",
    formacao: "8º período",
    setor: "marketing",
    culturaTema: "Girassol",
    ordem: 2,
    foto: "assets/img/equipe/anabelly-silva.jpg",
    fotoStatus: "disponivel",
    fotoFonte: "anabelly 1.heif",
  },
  {
    nome: "Caroline Gomes dos Santos",
    cargo: "Gerente de Marketing",
    formacao: "Eng. Agronômica · 9º período · Maratona FAEMG Jovem 2026 · AutoCAD, Google Earth, QGIS",
    setor: "marketing",
    culturaTema: "Girassol",
    ordem: 3,
    foto: "assets/img/equipe/caroline-santos.jpg",
    fotoStatus: "disponivel",
    fotoFonte: "caroline 1.heif",
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

  // --- Projetos --------------------------------------------------------
  {
    nome: "Heloisa Sofia de Souza Salema",
    cargo: "Diretora de Projetos",
    formacao: "6º período",
    setor: "projetos",
    culturaTema: "Milho",
    ordem: 1,
    foto: "assets/img/equipe/heloisa-salema.jpg",
    fotoStatus: "pendente",
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
    fotoStatus: "pendente",
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
    fotoStatus: "pendente",
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
    nome: "Rafaella Gama Marques",
    cargo: "Gerente de RH",
    formacao: "6º período · inglês básico · Excel",
    setor: "rh",
    culturaTema: "Algodão",
    ordem: 2,
    foto: "assets/img/equipe/rafaella-marques.jpg",
    fotoStatus: "pendente",
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
  {
    nome: "Luciene Rita Correia dos Santos",
    cargo: "Membro",
    formacao: "8º período · Maratona FAEMG Jovem 2026",
    setor: "membros",
    culturaTema: "",
    ordem: 2,
    foto: "assets/img/equipe/luciene-santos.jpg",
    fotoStatus: "pendente",
  },
];

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

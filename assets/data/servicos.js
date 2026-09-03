/**
 * servicos.js — serviços da Agricampo Jr. (CONTEXT.md §6.3)
 *
 * CAMADA DE CONTEÚDO — fonte local, trocável. Formato espelha a collection
 * `services` do Payload/Mutare (nome, descricao, imagem, ordem).
 *
 * ⚠️ TUDO PENDENTE (CONTEXT.md §10): a lista real de serviços, as descrições e
 * o critério de organização (por público-alvo OU por área técnica) ainda não
 * foram definidos pela cliente — essa decisão muda a arquitetura do menu.
 * Os itens abaixo são PLACEHOLDERS só para montar o layout da Fase 1.
 */

export const servicos = [
  {
    nome: "PENDENTE — Serviço 1",
    descricao: "PENDENTE — descrição curta do serviço.",
    publicoAlvo: "PENDENTE",
    imagem: "assets/img/servicos/servico-1.jpg",
    icone: "assets/img/servicos/servico-1.svg",
    ordem: 1,
  },
  {
    nome: "PENDENTE — Serviço 2",
    descricao: "PENDENTE — descrição curta do serviço.",
    publicoAlvo: "PENDENTE",
    imagem: "assets/img/servicos/servico-2.jpg",
    icone: "assets/img/servicos/servico-2.svg",
    ordem: 2,
  },
  {
    nome: "PENDENTE — Serviço 3",
    descricao: "PENDENTE — descrição curta do serviço.",
    publicoAlvo: "PENDENTE",
    imagem: "assets/img/servicos/servico-3.jpg",
    icone: "assets/img/servicos/servico-3.svg",
    ordem: 3,
  },
];

/**
 * cases / depoimentos (CONTEXT.md §6.4) — PENDENTE.
 * Sem cases reais ainda: a home usa o CTA "Peça um diagnóstico" no lugar de
 * números de resultado, conforme CONTEXT.md §6.4.
 */
export const depoimentos = [
  // {
  //   texto: "",
  //   nome: "",
  //   cargo: "",
  //   propriedade: "",
  //   foto: "assets/img/cases/.jpg",
  // },
];

export default servicos;

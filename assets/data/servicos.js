/**
 * servicos.js — serviços da Agricampo Jr. (CONTEXT.md §6.3)
 *
 * CAMADA DE CONTEÚDO — fonte local, trocável. Formato espelha a collection
 * `services` do Payload/Mutare (nome, descricao, imagem, ordem).
 *
 * Lista real recebida da cliente em 16/09/2026 (3 itens). Ela pediu para
 * "adicionar o restante dos serviços" — ou seja, esta lista está incompleta
 * de propósito; os demais itens ainda não foram enviados. Descrição,
 * público-alvo e critério de organização (por público-alvo OU por área
 * técnica) continuam PENDENTES (CONTEXT.md §10).
 */

export const servicos = [
  {
    nome: "Regulamentação de documentos",
    descricao: "PENDENTE — descrição curta do serviço.",
    publicoAlvo: "PENDENTE",
    imagem: "assets/img/servicos/regulamentacao-documentos.jpg",
    icone: "assets/img/servicos/regulamentacao-documentos.svg",
    ordem: 1,
  },
  {
    nome: "Análise de solo",
    descricao: "PENDENTE — descrição curta do serviço.",
    publicoAlvo: "PENDENTE",
    imagem: "assets/img/servicos/analise-de-solo.jpg",
    icone: "assets/img/servicos/analise-de-solo.svg",
    ordem: 2,
  },
  {
    nome: "Marketing rural",
    descricao: "PENDENTE — descrição curta do serviço.",
    publicoAlvo: "PENDENTE",
    imagem: "assets/img/servicos/marketing-rural.jpg",
    icone: "assets/img/servicos/marketing-rural.svg",
    ordem: 3,
  },
  // PENDENTE — "o restante dos serviços" (pedido da cliente em 16/09/2026, itens ainda não enviados)
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

/**
 * servicos.js — serviços e depoimentos da Agricampo Jr.
 *
 * CAMADA DE CONTEÚDO — fonte local, usada quando não há conteúdo publicado
 * pela plataforma Mutare. `ordem` segue os serviços mais procurados.
 *
 * imagem / imagemAlt: o card mostra a foto quando há `imagem`; sem imagem,
 * fica o bloco cinza.
 *
 * Quando a plataforma publica (branch `publicado`), a lista de serviços vem
 * de conteudo-mutare.js (ver mutare.js), na ordem do painel, e substitui
 * esta. Lá a imagem é URL absoluta ou null. Depoimentos continuam locais.
 */

import { conteudo } from "./mutare.js?v=202610172038";

const servicosLocais = [
  {
    nome: "Análise de solo",
    descricao: "A gente analisa o solo da sua propriedade e te diz o que fazer pra plantar melhor e colher mais.",
    publicoAlvo: "Produtor rural",
    imagem: "assets/img/servicos/analise-de-solo.jpg",
    imagemAlt: "Dois membros da Agricampo Jr. conferindo uma amostra de solo dentro de um balde, durante coleta em uma propriedade rural",
    icone: "assets/img/servicos/analise-de-solo.svg",
    ordem: 1,
  },
  {
    nome: "Regulamentação de documentos",
    descricao: "Ajudamos a regularizar o CAR e o ITR da sua propriedade, sem dor de cabeça.",
    publicoAlvo: "Produtor rural e proprietário de imóvel rural",
    imagem: "assets/img/servicos/regulamentacao-documentos.jpg",
    imagemAlt: "Mão segurando um GPS Garmin no campo, com a tela mostrando os pontos marcados no levantamento da área",
    icone: "assets/img/servicos/regulamentacao-documentos.svg",
    ordem: 2,
  },
  {
    nome: "Marketing rural",
    descricao: "A gente ajuda a divulgar o que você produz e vender melhor, com redes sociais e identidade visual.",
    publicoAlvo: "Produtor rural e pequenas empresas do agro",
    imagem: "assets/img/servicos/marketing-rural.jpg",
    imagemAlt: "Duas integrantes da Agricampo Jr. ao lado de um produtor no galpão de uma fazenda de gado leiteiro, com vacas ao fundo",
    icone: "assets/img/servicos/marketing-rural.svg",
    ordem: 3,
  },
];

/** Depoimentos de clientes atendidos — só depoimentos reais. */
export const depoimentos = [
  {
    texto: "Deu diferença muito boa, deu média de 40 toneladas por hectare.",
    nome: "Pedro",
    cargo: "Produtor rural",
    propriedade: "",
    servico: "Análise de solo",
    contexto: "Implantação de milho para silagem, com preparo de solo segundo as recomendações da Agricampo.",
    foto: "",
  },
];

export const servicos = conteudo
  ? (conteudo.servicos ?? []).map((s, i) => ({
      nome: s.nome ?? "",
      descricao: s.descricao ?? "",
      publicoAlvo: s.publicoAlvo ?? "",
      imagem: s.imagem ?? null,
      imagemAlt: s.imagemAlt ?? "",
      ordem: i + 1,
    }))
  : servicosLocais;

export default servicos;

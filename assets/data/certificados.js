/**
 * certificados.js — certificados da Agricampo Jr.
 *
 * CAMADA DE CONTEÚDO — fonte local, trocável. Formato espelha a collection
 * `certificates` do Payload/Mutare (titulo, imagem, emissor, dataEmissao, ordem).
 *
 * Página pedida pela cliente em 16/09/2026 ("adicionar aba sobre certificados
 * da empresa"). Nenhum certificado foi enviado ainda — itens abaixo são
 * PLACEHOLDERS só para montar o layout.
 *
 * Quando a plataforma publica (branch `publicado`), a lista inteira vem de
 * conteudo-mutare.js (ver mutare.js), na ordem do painel, e substitui esta.
 */

import { conteudo } from "./mutare.js?v=202610151544";

const certificadosLocais = [
  {
    titulo: "PENDENTE — Certificado 1",
    emissor: "PENDENTE",
    dataEmissao: "",
    imagem: "assets/img/certificados/certificado-1.jpg",
    ordem: 1,
  },
  {
    titulo: "PENDENTE — Certificado 2",
    emissor: "PENDENTE",
    dataEmissao: "",
    imagem: "assets/img/certificados/certificado-2.jpg",
    ordem: 2,
  },
];

export const certificados = conteudo
  ? (conteudo.certificados ?? []).map((c, i) => ({
      titulo: c.titulo ?? "",
      emissor: c.emissor ?? "",
      dataEmissao: c.dataEmissao ?? "",
      imagem: c.imagem ?? null,
      ordem: i + 1,
    }))
  : certificadosLocais;

export default certificados;

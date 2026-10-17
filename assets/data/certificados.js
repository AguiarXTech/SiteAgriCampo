/**
 * certificados.js — certificados da Agricampo Jr.
 *
 * CAMADA DE CONTEÚDO — fonte local, usada quando não há conteúdo publicado
 * pela plataforma Mutare. Vazia por enquanto.
 *
 * Quando a plataforma publica (branch `publicado`), a lista inteira vem de
 * conteudo-mutare.js (ver mutare.js), na ordem do painel, e substitui esta.
 */

import { conteudo } from "./mutare.js?v=202610172038";

const certificadosLocais = [];

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

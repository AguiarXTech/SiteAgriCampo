/**
 * equipe-render.js — monta o grid da Equipe a partir de assets/data/equipe.js.
 *
 * A página /sobre/equipe.html traz só o contêiner:
 *   <div data-equipe></div>
 * e este módulo gera os setores (CONTEXT.md §6.2): cabeçalho do setor com a
 * cultura agrícola associada + grid de membros. Foto ausente vira placeholder
 * com as iniciais, nunca silhueta genérica.
 */

import { equipePorSetor } from "../data/equipe.js";

function iniciais(nome) {
  return nome
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

function cardMembro(m) {
  const el = document.createElement("article");
  el.className = "membro";

  const temFoto = m.fotoStatus === "disponivel";
  const foto = temFoto
    ? `<img class="membro__foto" src="${m.foto}" alt="Foto de ${m.nome}" loading="lazy" width="300" height="400">`
    : `<div class="membro__foto" data-placeholder aria-hidden="true">${iniciais(m.nome)}</div>`;

  el.innerHTML = `
    ${foto}
    <h4 class="membro__nome">${m.nome}</h4>
    <p class="membro__cargo">${m.cargo}</p>
    ${m.formacao ? `<p class="membro__cargo">${m.formacao}</p>` : ""}
  `;
  return el;
}

export function renderizarEquipe() {
  const alvo = document.querySelector("[data-equipe]");
  if (!alvo) return;

  const frag = document.createDocumentFragment();

  equipePorSetor().forEach((grupo) => {
    const secao = document.createElement("section");
    secao.className = "setor";

    const cabecalho = document.createElement("div");
    cabecalho.className = "setor__cabecalho";
    cabecalho.innerHTML = `
      <h3 class="setor__nome">${grupo.nome}</h3>
      ${grupo.culturaTema ? `<span class="setor__cultura">${grupo.culturaTema}${grupo.sugestao ? " (a validar)" : ""}</span>` : ""}
    `;

    const grid = document.createElement("div");
    grid.className = "grid grid--3 grid--4";
    grupo.membros.forEach((m) => grid.appendChild(cardMembro(m)));

    secao.append(cabecalho, grid);
    frag.appendChild(secao);
  });

  alvo.replaceChildren(frag);
}

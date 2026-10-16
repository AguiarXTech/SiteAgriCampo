/**
 * equipe-render.js — monta o grid da Equipe a partir de assets/data/equipe.js.
 *
 * A página /sobre/equipe.html traz só o contêiner:
 *   <div data-equipe></div>
 * e este módulo gera os setores (CONTEXT.md §6.2): cabeçalho do setor com a
 * cultura agrícola associada + grid de membros. Foto ausente vira placeholder
 * com as iniciais, nunca silhueta genérica.
 *
 * Dados viram texto, nunca HTML: só textContent/setAttribute, sem innerHTML.
 */

import { equipePorSetor } from "../data/equipe.js?v=202610151544";

function elemento(tag, classe, texto) {
  const el = document.createElement(tag);
  if (classe) el.className = classe;
  if (texto != null) el.textContent = texto;
  return el;
}

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
  const el = elemento("article", "membro");

  if (m.fotoStatus === "disponivel" && m.foto) {
    const img = elemento("img", "membro__foto");
    img.setAttribute("src", m.foto);
    img.setAttribute(
      "alt",
      m.fotoAlt ||
        `Retrato de ${m.nome}, ${m.cargo} da Agricampo Jr., de camisa polo verde da empresa`,
    );
    img.setAttribute("loading", "lazy");
    img.setAttribute("width", "600");
    img.setAttribute("height", "600");
    el.appendChild(img);
  } else {
    const placeholder = elemento("div", "membro__foto", iniciais(m.nome));
    placeholder.setAttribute("data-placeholder", "");
    placeholder.setAttribute("aria-hidden", "true");
    el.appendChild(placeholder);
  }

  el.appendChild(elemento("h4", "membro__nome", m.nome));
  el.appendChild(elemento("p", "membro__cargo", m.cargo));
  if (m.formacao) el.appendChild(elemento("p", "membro__cargo", m.formacao));
  if (m.bio) el.appendChild(elemento("p", "membro__cargo", m.bio));
  return el;
}

export function renderizarEquipe() {
  const alvo = document.querySelector("[data-equipe]");
  if (!alvo) return;

  const frag = document.createDocumentFragment();

  equipePorSetor().forEach((grupo) => {
    const secao = elemento("section", "setor");

    const cabecalho = elemento("div", "setor__cabecalho");
    cabecalho.appendChild(elemento("h3", "setor__nome", grupo.nome));
    if (grupo.culturaTema) {
      cabecalho.appendChild(
        elemento(
          "span",
          "setor__cultura",
          `${grupo.culturaTema}${grupo.sugestao ? " (a validar)" : ""}`,
        ),
      );
    }

    const grid = elemento("div", "grid grid--3 grid--4");
    grupo.membros.forEach((m) => grid.appendChild(cardMembro(m)));

    secao.append(cabecalho, grid);
    frag.appendChild(secao);
  });

  alvo.replaceChildren(frag);
}

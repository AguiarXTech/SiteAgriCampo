/**
 * servicos-render.js — monta os cards de serviço a partir de assets/data/servicos.js.
 *
 * Dois pontos de montagem, ambos opcionais na página:
 *   [data-servicos-home]  → teaser da home, no máximo 3 itens
 *   [data-servicos]       → lista completa, em servicos.html
 */

import { servicos } from "../data/servicos.js";

function cardServico(s) {
  const el = document.createElement("article");
  el.className = "card-servico";
  const pendente = s.nome.startsWith("PENDENTE");
  el.innerHTML = `
    <div class="card-servico__foto"></div>
    <div class="card-servico__corpo">
      <p class="card-servico__label">${s.nome}</p>
      ${pendente ? "" : `<p class="card__texto" style="margin-top:.5rem">${s.descricao}</p>`}
    </div>
  `;
  return el;
}

export function renderizarServicos() {
  const lista = [...servicos].sort((a, b) => (a.ordem ?? 0) - (b.ordem ?? 0));

  const home = document.querySelector("[data-servicos-home]");
  if (home) {
    const frag = document.createDocumentFragment();
    lista.slice(0, 3).forEach((s) => frag.appendChild(cardServico(s)));
    home.replaceChildren(frag);
  }

  const completa = document.querySelector("[data-servicos]");
  if (completa) {
    const frag = document.createDocumentFragment();
    lista.forEach((s) => frag.appendChild(cardServico(s)));
    completa.replaceChildren(frag);
  }
}

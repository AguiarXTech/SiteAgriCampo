/**
 * certificados-render.js — monta o grid de certificados em certificados.html
 * a partir de assets/data/certificados.js.
 */

import { certificados } from "../data/certificados.js";

function cardCertificado(c) {
  const el = document.createElement("article");
  el.className = "card-servico";
  const pendente = c.titulo.startsWith("PENDENTE");
  el.innerHTML = `
    <div class="card-servico__foto"></div>
    <div class="card-servico__corpo">
      <p class="card-servico__label">${c.titulo}</p>
      ${pendente ? "" : `<p class="card__texto" style="margin-top:.5rem">${c.emissor}${c.dataEmissao ? " · " + c.dataEmissao : ""}</p>`}
    </div>
  `;
  return el;
}

export function renderizarCertificados() {
  const alvo = document.querySelector("[data-certificados]");
  if (!alvo) return;
  const frag = document.createDocumentFragment();
  [...certificados]
    .sort((a, b) => (a.ordem ?? 0) - (b.ordem ?? 0))
    .forEach((c) => frag.appendChild(cardCertificado(c)));
  alvo.replaceChildren(frag);
}

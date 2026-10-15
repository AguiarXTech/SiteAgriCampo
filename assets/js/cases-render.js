/**
 * cases-render.js — monta os cards de depoimento em cases.html
 * a partir de `depoimentos` em assets/data/servicos.js (CONTEXT.md §6.4).
 *
 * Com um único depoimento real, mostra um card estático. Quando houver 2+,
 * o HTML do carrossel comentado em cases.html pode ser ligado a
 * testimonials-carousel.js — ele mesmo só ativa com 2 ou mais slides.
 */

import { depoimentos } from "../data/servicos.js?v=202610141957";

function cardDepoimento(d) {
  const el = document.createElement("article");
  el.className = "depoimento";
  el.innerHTML = `
    <p class="depoimento__texto">${d.texto}</p>
    <div class="depoimento__rodape">
      <div>
        <p class="depoimento__autor">${d.nome}${d.cargo ? ` · ${d.cargo}` : ""}</p>
        ${d.contexto ? `<p class="depoimento__contexto">${d.contexto}</p>` : ""}
      </div>
      ${d.servico ? `<span class="depoimento__servico">${d.servico}</span>` : ""}
    </div>
  `;
  return el;
}

export function renderizarDepoimentos() {
  const alvo = document.querySelector("[data-depoimentos]");
  if (!alvo || depoimentos.length === 0) return;
  const frag = document.createDocumentFragment();
  depoimentos.forEach((d) => frag.appendChild(cardDepoimento(d)));
  alvo.replaceChildren(frag);
}

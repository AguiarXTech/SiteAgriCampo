/**
 * cases-render.js — monta os cards de depoimento em cases.html
 * a partir de `depoimentos` em assets/data/servicos.js (CONTEXT.md §6.4).
 *
 * Com um único depoimento real, mostra um card estático. Quando houver 2+,
 * o HTML do carrossel comentado em cases.html pode ser ligado a
 * testimonials-carousel.js — ele mesmo só ativa com 2 ou mais slides.
 *
 * Dados viram texto, nunca HTML: só textContent/setAttribute, sem innerHTML.
 */

import { depoimentos } from "../data/servicos.js?v=202610151544";

function elemento(tag, classe, texto) {
  const el = document.createElement(tag);
  if (classe) el.className = classe;
  if (texto != null) el.textContent = texto;
  return el;
}

function cardDepoimento(d) {
  const el = elemento("article", "depoimento");
  el.appendChild(elemento("p", "depoimento__texto", d.texto));

  const rodape = elemento("div", "depoimento__rodape");
  const autoria = elemento("div");
  autoria.appendChild(
    elemento("p", "depoimento__autor", `${d.nome}${d.cargo ? ` · ${d.cargo}` : ""}`),
  );
  if (d.contexto) autoria.appendChild(elemento("p", "depoimento__contexto", d.contexto));
  rodape.appendChild(autoria);
  if (d.servico) rodape.appendChild(elemento("span", "depoimento__servico", d.servico));

  el.appendChild(rodape);
  return el;
}

export function renderizarDepoimentos() {
  const alvo = document.querySelector("[data-depoimentos]");
  if (!alvo || depoimentos.length === 0) return;
  const frag = document.createDocumentFragment();
  depoimentos.forEach((d) => frag.appendChild(cardDepoimento(d)));
  alvo.replaceChildren(frag);
}

/**
 * servicos-render.js — monta os cards de serviço a partir de assets/data/servicos.js.
 *
 * Dois pontos de montagem, ambos opcionais na página:
 *   [data-servicos-home]  → teaser da home, no máximo 3 itens
 *   [data-servicos]       → lista completa, em servicos.html
 *
 * Dados viram texto, nunca HTML: só textContent/setAttribute, sem innerHTML.
 */

import { servicos } from "../data/servicos.js?v=202610151544";

function elemento(tag, classe, texto) {
  const el = document.createElement(tag);
  if (classe) el.className = classe;
  if (texto != null) el.textContent = texto;
  return el;
}

function cardServico(s) {
  const el = elemento("article", "card-servico");
  const nome = s.nome ?? "";
  const pendente = nome.startsWith("PENDENTE");

  if (s.imagem) {
    const img = elemento("img", "card-servico__foto");
    img.setAttribute("src", s.imagem);
    img.setAttribute("alt", s.imagemAlt ?? "");
    img.setAttribute("loading", "lazy");
    img.setAttribute("width", "800");
    img.setAttribute("height", "600");
    el.appendChild(img);
  } else {
    el.appendChild(elemento("div", "card-servico__foto"));
  }

  const corpo = elemento("div", "card-servico__corpo");
  corpo.appendChild(elemento("p", "card-servico__label", nome));
  if (!pendente && s.descricao) {
    const p = elemento("p", "card__texto", s.descricao);
    p.style.marginTop = ".5rem";
    corpo.appendChild(p);
  }
  el.appendChild(corpo);
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

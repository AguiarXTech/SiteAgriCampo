/**
 * certificados-render.js — monta o grid de certificados em certificados.html
 * a partir de assets/data/certificados.js.
 *
 * Dados viram texto, nunca HTML: só textContent/setAttribute, sem innerHTML.
 */

import { certificados } from "../data/certificados.js?v=202610151544";

function elemento(tag, classe, texto) {
  const el = document.createElement(tag);
  if (classe) el.className = classe;
  if (texto != null) el.textContent = texto;
  return el;
}

function cardCertificado(c) {
  const el = elemento("article", "card-servico");
  const titulo = c.titulo ?? "";
  const pendente = titulo.startsWith("PENDENTE");

  if (!pendente && c.imagem) {
    const img = elemento("img", "card-servico__foto");
    img.setAttribute("src", c.imagem);
    img.setAttribute("alt", `Certificado: ${titulo}`);
    img.setAttribute("loading", "lazy");
    img.setAttribute("width", "800");
    img.setAttribute("height", "600");
    el.appendChild(img);
  } else {
    el.appendChild(elemento("div", "card-servico__foto"));
  }

  const corpo = elemento("div", "card-servico__corpo");
  corpo.appendChild(elemento("p", "card-servico__label", titulo));
  if (!pendente) {
    const detalhe = [c.emissor, c.dataEmissao].filter(Boolean).join(" · ");
    if (detalhe) {
      const p = elemento("p", "card__texto", detalhe);
      p.style.marginTop = ".5rem";
      corpo.appendChild(p);
    }
  }
  el.appendChild(corpo);
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

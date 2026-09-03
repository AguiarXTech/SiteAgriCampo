/**
 * main.js — ponto de entrada de JS do site.
 * Carregado em toda página com <script type="module" src="/assets/js/main.js">.
 *
 * Orquestra os módulos; cada um só age se encontrar sua marcação na página.
 */

import { montarIncludes } from "./includes.js";
import { iniciarNavMobile } from "./nav-mobile.js";
import { iniciarValidacaoFormulario } from "./form-validation.js";
import { iniciarCarrosselDepoimentos } from "./testimonials-carousel.js";
import { renderizarEquipe } from "./equipe-render.js";
import { hidratarSite } from "./site-render.js";

async function iniciar() {
  // header/footer primeiro — os demais dependem da marcação injetada
  await montarIncludes();

  hidratarSite();
  iniciarNavMobile();
  iniciarValidacaoFormulario();
  iniciarCarrosselDepoimentos();
  renderizarEquipe();

  // ano corrente no rodapé
  document.querySelectorAll("[data-ano]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciar);
} else {
  iniciar();
}

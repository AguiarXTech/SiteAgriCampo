/**
 * main.js — ponto de entrada de JS do site.
 * Carregado em toda página com <script type="module" src="assets/js/main.js">
 * (caminho relativo a <base>, não à raiz — ver includes.js).
 *
 * Orquestra os módulos; cada um só age se encontrar sua marcação na página.
 */

import { montarIncludes } from "./includes.js?v=202610141957";
import { iniciarNavMobile } from "./nav-mobile.js?v=202610141957";
import { iniciarValidacaoFormulario } from "./form-validation.js?v=202610141957";
import { iniciarCarrosselDepoimentos } from "./testimonials-carousel.js?v=202610141957";
import { renderizarEquipe } from "./equipe-render.js?v=202610141957";
import { renderizarServicos } from "./servicos-render.js?v=202610141957";
import { renderizarCertificados } from "./certificados-render.js?v=202610141957";
import { renderizarDepoimentos } from "./cases-render.js?v=202610141957";
import { hidratarSite } from "./site-render.js?v=202610141957";

async function iniciar() {
  // header/footer primeiro — os demais dependem da marcação injetada
  await montarIncludes();

  hidratarSite();
  iniciarNavMobile();
  iniciarValidacaoFormulario();
  renderizarEquipe();
  renderizarServicos();
  renderizarCertificados();
  renderizarDepoimentos();
  iniciarCarrosselDepoimentos(); // depois de renderizarDepoimentos — precisa do HTML já montado

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

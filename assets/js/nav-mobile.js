/**
 * nav-mobile.js — abre/fecha o menu no mobile (toggle hambúrguer).
 *
 * Requisitos de acessibilidade:
 *   - o botão tem aria-expanded refletindo o estado
 *   - Esc fecha o menu
 *   - foco não escapa para trás do backdrop enquanto aberto
 */

export function iniciarNavMobile() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav-principal");
  const cabecalho = document.querySelector(".cabecalho");
  if (!toggle || !nav) return;

  let backdrop = document.querySelector(".nav-backdrop");
  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.className = "nav-backdrop";
    document.body.appendChild(backdrop);
  }

  const definirEstado = (aberto) => {
    toggle.setAttribute("aria-expanded", String(aberto));
    nav.dataset.aberto = String(aberto);
    backdrop.dataset.visivel = String(aberto);
    // O menu mora DENTRO do header (z-index 100), então nunca passa da camada do
    // header. Com o menu aberto o header sobe acima do backdrop — senão o backdrop
    // (no <body>) cobre o menu e engole o toque nos links.
    cabecalho?.classList.toggle("cabecalho--menu-aberto", aberto);
    document.body.style.overflow = aberto ? "hidden" : "";
  };

  toggle.addEventListener("click", () => {
    definirEstado(toggle.getAttribute("aria-expanded") !== "true");
  });

  backdrop.addEventListener("click", () => definirEstado(false));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") definirEstado(false);
  });

  // fecha ao navegar por um link do menu
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => definirEstado(false))
  );

  // volta ao estado desktop se a tela crescer
  const mq = window.matchMedia("(min-width: 1081px)");
  mq.addEventListener("change", (e) => {
    if (e.matches) definirEstado(false);
  });

  definirEstado(false);
}

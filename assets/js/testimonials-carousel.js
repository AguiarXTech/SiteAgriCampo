/**
 * testimonials-carousel.js — carrossel de depoimentos, JS vanilla.
 * Sem biblioteca externa (CONTEXT.md §8): o projeto é HTML/CSS/JS puro.
 *
 * Marcação esperada:
 *   <div class="carrossel" data-carrossel>
 *     <div class="carrossel__trilha">
 *       <article class="carrossel__slide">...</article>
 *       ...
 *     </div>
 *     <button data-carrossel-anterior>...</button>
 *     <button data-carrossel-proximo>...</button>
 *     <div class="carrossel__pontos" data-carrossel-pontos></div>
 *   </div>
 *
 * Só inicializa se houver slides — sem depoimentos reais, a seção nem existe
 * na página (CONTEXT.md §6.4).
 */

export function iniciarCarrosselDepoimentos() {
  document.querySelectorAll("[data-carrossel]").forEach(configurar);
}

function configurar(raiz) {
  const trilha = raiz.querySelector(".carrossel__trilha");
  const slides = Array.from(raiz.querySelectorAll(".carrossel__slide"));
  if (slides.length < 2) return;

  const btnAnterior = raiz.querySelector("[data-carrossel-anterior]");
  const btnProximo = raiz.querySelector("[data-carrossel-proximo]");
  const pontosWrap = raiz.querySelector("[data-carrossel-pontos]");

  let indice = 0;
  const total = slides.length;

  const pontos = slides.map((_, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "carrossel__ponto";
    b.setAttribute("aria-label", `Ir para o depoimento ${i + 1}`);
    b.addEventListener("click", () => irPara(i));
    pontosWrap?.appendChild(b);
    return b;
  });

  function irPara(i) {
    indice = (i + total) % total;
    trilha.style.transform = `translateX(-${indice * 100}%)`;
    pontos.forEach((p, pi) => p.setAttribute("aria-current", String(pi === indice)));
  }

  btnAnterior?.addEventListener("click", () => irPara(indice - 1));
  btnProximo?.addEventListener("click", () => irPara(indice + 1));

  // autoplay pausável, respeitando prefers-reduced-motion
  const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let timer;
  const iniciar = () => {
    if (reduz) return;
    timer = setInterval(() => irPara(indice + 1), 6000);
  };
  const parar = () => clearInterval(timer);

  raiz.addEventListener("mouseenter", parar);
  raiz.addEventListener("mouseleave", iniciar);
  raiz.addEventListener("focusin", parar);
  raiz.addEventListener("focusout", iniciar);

  irPara(0);
  iniciar();
}

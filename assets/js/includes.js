/**
 * includes.js — injeta partials compartilhados (header e footer).
 *
 * Site estático sem build: em vez de repetir o <header>/<footer> em cada
 * página, cada página traz <div data-include="assets/partials/header.html">
 * e este módulo troca pelo HTML do partial.
 *
 * ⚠️ Usa fetch — precisa ser servido por HTTP (não abre por file://).
 *    Local: `npx serve` na raiz, ou a extensão Live Server do VS Code.
 *
 * Caminhos são relativos SEM barra inicial — funcionam em qualquer
 * profundidade (/index.html, /sobre/equipe.html) ou subpasta de hospedagem
 * (ex: GitHub Pages project site) porque cada página define <base href="./">
 * ou <base href="../">, que resolve o resto. Trocar para "/assets/..." de
 * volta só funciona se o site for servido exatamente na raiz do domínio.
 */

async function carregarInclude(el) {
  const url = el.getAttribute("data-include");
  if (!url) return;
  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`${resp.status} ao carregar ${url}`);
    el.outerHTML = await resp.text();
  } catch (erro) {
    console.error("[includes] falha:", erro);
  }
}

export async function montarIncludes() {
  const alvos = Array.from(document.querySelectorAll("[data-include]"));
  await Promise.all(alvos.map(carregarInclude));
  marcarLinkAtivo();
}

/** Marca no menu o link da página atual com aria-current="page". */
function marcarLinkAtivo() {
  const normalizar = (caminho) => caminho.replace(/index\.html$/, "").replace(/\/$/, "") || "/";
  const atual = normalizar(location.pathname);
  document.querySelectorAll(".nav-principal__link[href]").forEach((link) => {
    // link.pathname (não getAttribute) já vem resolvido contra <base> —
    // é o que permite comparar um href relativo com location.pathname.
    const href = normalizar(link.pathname);
    if (href === atual) link.setAttribute("aria-current", "page");
  });
}

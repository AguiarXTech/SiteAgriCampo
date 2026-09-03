/**
 * includes.js — injeta partials compartilhados (header e footer).
 *
 * Site estático sem build: em vez de repetir o <header>/<footer> em cada
 * página, cada página traz <div data-include="/assets/partials/header.html">
 * e este módulo troca pelo HTML do partial.
 *
 * ⚠️ Usa fetch — precisa ser servido por HTTP (não abre por file://).
 *    Local: `npx serve` na raiz, ou a extensão Live Server do VS Code.
 *
 * Caminhos são root-relative (começam com "/"), então funcionam igual em
 * qualquer profundidade (/index.html e /sobre/equipe.html). Se a hospedagem
 * final for em subpasta (ex: GitHub Pages project site), definir <base> nas
 * páginas ou trocar por caminho absoluto do domínio.
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
  const atual = location.pathname.replace(/index\.html$/, "").replace(/\/$/, "") || "/";
  document.querySelectorAll(".nav-principal__link[href]").forEach((link) => {
    const href = link.getAttribute("href").replace(/index\.html$/, "").replace(/\/$/, "") || "/";
    if (href === atual) link.setAttribute("aria-current", "page");
  });
}

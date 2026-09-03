/**
 * site-render.js — injeta dados de assets/data/site.js nos pontos marcados
 * do header/footer/páginas depois que os partials são montados.
 *
 * Hoje cobre só o essencial (WhatsApp e contato do rodapé). À medida que os
 * dados de CONTEXT.md §6.5 chegarem, ligar mais campos aqui em vez de editar
 * HTML em várias páginas.
 */

import { site } from "../data/site.js";

export function hidratarSite() {
  const { whatsapp, email, endereco } = site.contato;

  // botão flutuante de WhatsApp
  const zap = document.querySelector("[data-whatsapp]");
  if (zap) {
    if (whatsapp) {
      const msg = encodeURIComponent("Olá! Vim pelo site e gostaria de falar com a Agricampo Jr.");
      zap.href = `https://wa.me/${whatsapp}?text=${msg}`;
    } else {
      zap.setAttribute("aria-disabled", "true");
      zap.title = "WhatsApp ainda não configurado";
    }
  }

  // preenche qualquer [data-site="contato.email"] etc., quando existir
  document.querySelectorAll("[data-site]").forEach((el) => {
    const chave = el.getAttribute("data-site");
    const valor = chave.split(".").reduce((o, k) => (o == null ? o : o[k]), site);
    if (valor && typeof valor === "string" && !valor.startsWith("PENDENTE")) {
      el.textContent = valor;
    }
  });

  void email;
  void endereco;
}

/**
 * form-validation.js — validação client-side do formulário de contato.
 * Spec dos campos: CONTEXT.md §7 (extraída do formulário do AgroPlan-UFV).
 *
 * ⚠️ Isto valida; NÃO envia. O envio depende de um serviço externo
 *    (Formspree / EmailJS — decisão pendente, CONTEXT.md §10). O ponto de
 *    integração está marcado abaixo com "TODO envio".
 */

const REGRAS = {
  nome: (v) => v.trim().length >= 3 || "Informe seu nome completo.",
  contato: (v) =>
    /^[()\d\s+-]{8,}$/.test(v.trim()) || "Informe um telefone válido com DDD.",
  email: (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || "Informe um e-mail válido.",
  localizacao: (v) => v.trim().length >= 3 || "Informe a cidade e o estado.",
  atividade: (v) => v.trim() !== "" || "Selecione sua atividade principal.",
  area: (v) => v.trim() !== "" || "Informe o tamanho aproximado da área.",
  mensagem: (v) => v.trim().length >= 10 || "Conte um pouco mais como podemos ajudar.",
};

function validarCampo(campo) {
  const nome = campo.name;
  const regra = REGRAS[nome];
  if (!regra) return true;

  const resultado = regra(campo.value);
  const wrapper = campo.closest(".campo");
  const erroEl = wrapper?.querySelector(".campo__erro");

  if (resultado === true) {
    wrapper?.classList.remove("campo--invalido");
    if (erroEl) erroEl.textContent = "";
    campo.removeAttribute("aria-invalid");
    return true;
  }

  wrapper?.classList.add("campo--invalido");
  if (erroEl) erroEl.textContent = resultado;
  campo.setAttribute("aria-invalid", "true");
  return false;
}

export function iniciarValidacaoFormulario() {
  const form = document.querySelector('form[data-formulario="contato"]');
  if (!form) return;

  const aviso = form.querySelector(".form-aviso");
  const campos = Array.from(form.elements).filter((el) => el.name in REGRAS);

  campos.forEach((campo) => {
    campo.addEventListener("blur", () => validarCampo(campo));
    campo.addEventListener("input", () => {
      if (campo.closest(".campo")?.classList.contains("campo--invalido")) {
        validarCampo(campo);
      }
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const tudoOk = campos.map(validarCampo).every(Boolean);

    if (!tudoOk) {
      const primeiroInvalido = form.querySelector('[aria-invalid="true"]');
      primeiroInvalido?.focus();
      return;
    }

    // TODO envio — plugar Formspree/EmailJS aqui (CONTEXT.md §10).
    // Enquanto não há serviço, apenas confirma a validação localmente.
    if (aviso) {
      aviso.className = "form-aviso form-aviso--sucesso";
      aviso.textContent =
        "Formulário validado. O envio ainda não está conectado a um serviço (pendência técnica).";
      aviso.hidden = false;
    }
    console.info("[form] payload pronto para envio:", Object.fromEntries(new FormData(form)));
  });
}

/**
 * mutare.js — carrega o conteúdo publicado pela plataforma Mutare, se houver.
 *
 * A plataforma grava `conteudo-mutare.js` só na branch `publicado` (refeita do
 * zero a cada publicação a partir da `main`). Na `main` o arquivo NÃO existe,
 * e aí `conteudo` fica null e cada módulo de dados usa a sua fonte local.
 * Não criar nem editar `conteudo-mutare.js` à mão — é da plataforma.
 *
 * Import dinâmico, carregado uma vez por página (este módulo é compartilhado
 * por site.js, equipe.js, servicos.js e certificados.js). O `?t=` fura o cache
 * de ~10 min do GitHub Pages, pra publicação da diretoria aparecer na hora.
 *
 * O conteúdo vem do painel, digitado pela diretoria: é TEXTO, nunca HTML.
 * Os *-render.js montam tudo com textContent/setAttribute — manter assim.
 */

let conteudo = null;
try {
  ({ conteudo } = await import(`./conteudo-mutare.js?t=${Date.now()}`));
} catch {
  // arquivo ausente (branch main) ou inválido — segue com os dados locais
  conteudo = null;
}

export { conteudo };

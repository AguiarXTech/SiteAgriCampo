# Site Agricampo Jr.

Site institucional da **Agricampo Jr.**, empresa júnior de Agronomia de
São João Evangelista - MG.

**Stack:** HTML5 + CSS3 + JavaScript vanilla (ES modules). Sem framework, sem build,
sem back-end — site 100% estático, publicado pelo GitHub Pages.

---

## Como rodar localmente

O site usa `fetch` para injetar header/footer e ES modules para a camada de conteúdo —
isso **não funciona abrindo o HTML por `file://`**. É preciso um servidor HTTP:

```bash
npx serve .
# ou: python -m http.server 8000
```

---

## Como publicar

Antes do commit que vai para a `main`, rode:

```bash
python3 ferramentas/versionar-assets.py
```

Ele carimba `?v=<data-hora>` em todo CSS/JS referenciado, para o navegador de quem já
visitou o site não continuar com o CSS/JS antigo em cache.

---

## Estrutura

```
/
├── index.html
├── sobre/historia.html, sobre/equipe.html
├── servicos.html, certificados.html, cases.html, contato.html
├── assets/
│   ├── css/        main.css importa os demais; variables.css tem os design tokens
│   ├── js/         main.js é o ponto de entrada; *-render.js montam as seções
│   ├── data/       camada de conteúdo (ver abaixo)
│   ├── partials/   header, footer e mapa de MG
│   └── img/
└── ferramentas/    scripts de desenvolvimento (não fazem parte do site servido)
```

---

## Camada de conteúdo (`assets/data/`)

Todo o conteúdo vive em `assets/data/*.js`, separado do HTML.

O conteúdo é gerenciado pela plataforma **Mutare**: a cada publicação ela grava
`assets/data/conteudo-mutare.js` na branch `publicado`, que é a servida pelo site.
`site.js`, `equipe.js`, `servicos.js` e `certificados.js` usam esse arquivo quando ele
existe (via `mutare.js`) e caem nos dados locais quando não existe (caso da `main`).

- Não criar nem editar `conteudo-mutare.js` à mão, nem trabalhar na branch `publicado`.
- O conteúdo do painel é sempre tratado como texto: os renderizadores montam o DOM com
  `textContent`/`setAttribute`, nunca `innerHTML`.

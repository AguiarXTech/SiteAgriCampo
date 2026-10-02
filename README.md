# Site Agricampo Jr.

Site institucional e comercial da **Agricampo Jr.**, empresa júnior de Agronomia de
São João Evangelista - MG.

**Stack:** HTML5 + CSS3 + JavaScript vanilla (ES modules). Sem framework, sem build,
sem back-end — site 100% estático (CONTEXT.md §2).

Direção de design: estrutura da linha **AgroPlan-UFV** (seções que alternam fundo
claro/escuro, cards que invertem de cor, headings em CAIXA ALTA, botão pill, foto real
de campo — CONTEXT.md §5) **recolorida com a marca real da cliente** a partir da logo e
de um post que a empresa já publica (`mockup-cliente/referencia/`, recebidos 16/09/2026):
**preto `#000000` + verde-sinal `#00AF02`** substituem o verde-escuro estimado do
AgroPlan. Ver `variables.css` para o racional completo token por token.

O contexto completo do projeto está em [`estrutura/CONTEXT.md`](estrutura/CONTEXT.md).
A plataforma que vai gerenciar o conteúdo deste site (Mutare, da AguiarXTech) está
descrita em [`estrutura/PLATAFORMA_MUTARE_README.md`](estrutura/PLATAFORMA_MUTARE_README.md).

---

## Como rodar localmente

O site usa `fetch` para injetar header/footer e para ler a camada de conteúdo — isso
**não funciona abrindo o HTML por `file://`**. É preciso um servidor HTTP:

```bash
npx serve .
# ou: python -m http.server 8000
# ou: extensão "Live Server" do VS Code
```

Depois abra `http://localhost:3000` (ou a porta indicada).

---

## Estrutura

```
/
├── index.html                 Home
├── sobre/
│   ├── historia.html          Nossa História + mapa de MG + Nossa Sede (#sede)
│   └── equipe.html            Equipe por setor (grid gerado por JS)
├── servicos.html
├── certificados.html          Certificados da empresa (grid gerado por JS)
├── cases.html                 Depoimentos / Casos de Sucesso
├── contato.html               Formulário (spec §7) + Como Chegar (#como-chegar)
├── assets/
│   ├── css/
│   │   ├── main.css           único arquivo linkado pelas páginas (@import dos demais)
│   │   ├── variables.css      DESIGN TOKENS — único lugar com hex
│   │   ├── reset.css
│   │   ├── base.css           elementos + utilitários de layout
│   │   ├── components.css     header, hero, cards, form, rodapé, whatsapp, mapa
│   │   └── pages/             CSS específico por página (vazio por ora)
│   ├── js/
│   │   ├── main.js            ponto de entrada (type="module")
│   │   ├── includes.js        injeta os partials
│   │   ├── nav-mobile.js      menu hambúrguer
│   │   ├── form-validation.js validação client-side (não envia — ver pendências)
│   │   ├── testimonials-carousel.js
│   │   ├── equipe-render.js   monta o grid da equipe
│   │   ├── servicos-render.js monta os cards de serviço (home + servicos.html)
│   │   ├── certificados-render.js monta o grid de certificados.html
│   │   └── site-render.js     injeta dados institucionais (whatsapp, contato)
│   ├── data/                  CAMADA DE CONTEÚDO (ver abaixo)
│   │   ├── site.js            institucional, hero, localização, contato (§6.1, §6.5)
│   │   ├── equipe.js          equipe real por setor (§6.2)
│   │   ├── servicos.js        serviços (§6.3) — 3 reais recebidos, restante pendente
│   │   └── certificados.js    certificados da empresa — placeholders
│   ├── partials/
│   │   ├── header.html
│   │   └── footer.html
│   └── img/                   logo/ equipe/ servicos/ cases/ parceiros/ mapa/ sede/
└── estrutura/                 documentos de contexto (não é parte do site servido)
```

---

## Camada de conteúdo (`assets/data/`)

Todo o conteúdo textual e estruturado vive em `assets/data/*.js`, **separado do HTML**.
O formato de cada arquivo espelha as *collections* do Payload/Mutare
(`site-info`, `people`, `services`), para que a migração para a plataforma seja direta:

| Arquivo | Collection Mutare | Observação |
| --- | --- | --- |
| `site.js` | `site-info` | um documento por tenant |
| `equipe.js` | `people` | **+ campos `setor` e `culturaTema`** que ainda não existem no schema do Mutare |
| `servicos.js` | `services` (+ cases) | cases podem virar collection nova |

Quando o site for ligado ao Mutare, troca-se a origem desses módulos por chamadas à
API da plataforma — o HTML e o CSS não mudam.

---

## Pendências que bloqueiam o site ir ao ar

Não bloqueiam o desenvolvimento (há placeholders), mas precisam ser resolvidas
(CONTEXT.md §10):

- [x] ~~Cores exatas em hex~~ — **travadas em 16/09/2026**, extraídas pixel a pixel da
      logo real (`--cor-primaria: #000000`, `--cor-acento: #00af02` em `variables.css`).
- [x] ~~Logo~~ — **recebida e integrada**: `assets/img/logo/agricampo-logo-branca.png`
      (header) e `agricampo-logo-colorida.png`, recortadas da arte original
      (`mockup-cliente/referencia/`). Favicon gerado a partir da mesma arte
      (`favicon-16/32/180.png`) — ainda não é um ícone dedicado, então fica pouco
      legível em 16px; se a cliente tiver uma versão só do símbolo (sem o texto
      "AGRICAMPO"), o favicon fica bem melhor.
- [ ] **Tipografia** — título trocado para **Baloo 2** (aproximação do lettering bold/
      arredondado dos posts reais); não é a fonte exata (provável arte vetorizada à mão
      no Canva) — pedir o arquivo de fonte se quiser 1:1.
- [ ] **Assets de imagem** — ainda faltam em `assets/img/`:
  - fotos da equipe: converter os `.heif` do Drive para `.jpg`/`.webp` e nomear conforme
    o campo `foto` em `assets/data/equipe.js` (ex: `equipe/marlon-pereira.jpg`)
  - `hero-campo.jpg`, `sede/aerea.jpg` (foto de drone — produção pendente)
  - `mapa/minas-gerais.svg` — contorno real de MG (hoje é um retângulo placeholder)
- [x] ~~Missão, visão e valores~~ — **recebidos da cliente** (visão/valores 16/09/2026,
      missão 02/10/2026) e publicados em `assets/data/site.js` + `index.html`.
- [x] ~~Instituição de ensino vinculada~~ — **confirmada 02/10/2026**: IFMG – Campus
      São João Evangelista.
- [ ] **Conteúdo** — ainda faltam: história completa (só o 1º parágrafo é texto oficial;
      faltam mais 2), ano de fundação, federação, restante da lista de serviços
      (3 confirmados), certificados, cases, número de WhatsApp, e-mail e endereço.
- [ ] **Serviço de envio do formulário** — Formspree ou EmailJS (ver `form-validation.js`, `TODO envio`).
- [x] ~~Hospedagem~~ — **no ar desde 01/10/2026** via GitHub Pages:
      https://aguiarxtech.github.io/SiteAgriCampo/ (repositório público, branch `main`).
      Todo caminho é relativo a `<base>` (ver `includes.js`), então funciona igual numa
      subpasta ou, se um domínio próprio for comprado depois, na raiz.
- [ ] **Mapeamento setor → cultura agrícola** — validar com a cliente (sugestão em `equipe.js`).
- [ ] Esclarecer a foto `felipe 1.heif` (sem correspondência na lista da equipe).

---

## Roadmap

- **Fase 0 — Fundação** ✅ estrutura, design tokens, camada de conteúdo (equipe real),
  shell (header/footer/nav/whatsapp), esqueleto de todas as páginas.
- **Fase 1 — MVP** — Home, Sobre, Serviços, Contato com conteúdo real; formulário
  conectado a um serviço de envio; mapa de MG com SVG real.
- **Fase 2 — Conteúdo + qualidade** — fotos da equipe, foto aérea, vídeo de acesso,
  cases, hex confirmados, passe de acessibilidade/SEO/imagens, deploy.
- **Fase 3 — Integração Mutare** — trocar a camada de conteúdo pela API da plataforma;
  no lado do Mutare, adicionar os campos/collections que faltam.
- **Fase 4 — Conteúdos** — Blog, Ebooks, Trabalhe Conosco.

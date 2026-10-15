# CONTEXT.md — Site Institucional/Comercial da Agricampo Jr. (Empresa Júnior de Agronomia)

> Documento de contexto para o agente programador. Stack: **HTML, CSS e JS puro (estático, sem framework, sem CMS)**.
> Cliente: **Agricampo Jr.**, sediada em São João Evangelista - MG.
> Status: direção de design e estrutura aprovadas pela cliente (Lorena, Diretora de Marketing) em 17/08/2026. Equipe completa e logos já recebidos (01/09/2026) — ver seção 6.2. Demais conteúdos (história, serviços, cases) ainda **pendentes** — ver seção 10.

---

## 1. Visão Geral do Projeto

- **Tipo de cliente:** Agricampo Jr., Empresa Júnior de Agronomia (organização estudantil sem fins lucrativos, prestando consultoria paga a produtores rurais, cooperativas e agroindústrias)
- **Localização da sede:** São João Evangelista - MG
- **Objetivo do site:** institucional (mostrar quem são, equipe, vínculo acadêmico, localização) + comercial (captar leads/clientes via formulário e WhatsApp)
- **Referências de design analisadas:** AgroPlan-UFV ([agroplanufv.com](https://agroplanufv.com)), Agrosmart ([agrosmart.com.br](https://agrosmart.com.br)) e ESALQ Jr. ([esalqjuniorconsultoria.com](https://www.esalqjuniorconsultoria.com)) — ver seção 5 para análise visual detalhada de cada uma
- **Direção estratégica aprovada:** conforme análise consolidada da pesquisa de benchmark (documento "4. Análise Consolidada e Recomendações" — ver Drive do projeto)
- **Ideias específicas da cliente (reunião 01/09/2026), incorporadas no sitemap (seção 4) e no content schema (seção 6):**
  1. Mapa de Minas Gerais com marcador na cidade de São João Evangelista, posicionado ao lado da seção "Nossa História"/"Sobre"
  2. Equipe organizada por setor (Presidência, Marketing, Comercial, Projetos, Administrativo-Financeiro, RH) — dados reais já disponíveis, ver 6.2
  3. Cada setor da equipe associado visualmente a uma cultura agrícola (ex: algodão, milho, soja, cana) — decisão de qual setor recebe qual cultura ainda em aberto, ver 6.2
  4. Seção com foto aérea (drone) da sede/instituição — asset ainda não produzido, ver seção 10
  5. Seção com vídeo mostrando o trajeto/acesso até a localização da empresa — asset ainda não produzido, ver seção 10

---

## 2. Stack Técnica

- HTML5 semântico + CSS3 + JavaScript vanilla (ES6+)
- **Sem framework, sem back-end, sem CMS** — site 100% estático
- Formulário de contato: front-end puro. Precisa de um serviço de envio (Formspree, EmailJS ou similar) já que não há back-end — **decisão técnica pendente, ver seção 10**
- Hospedagem: compatível com Netlify, Vercel (modo estático) ou GitHub Pages — **decisão pendente**

---

## 3. Estrutura de Pastas Recomendada

O site de referência (AgroPlan-UFV) usa páginas próprias por seção, não single-page scroll. Reproduzir essa arquitetura favorece SEO individual por página e é mais fácil de manter em HTML puro do que uma SPA:

```
/
├── index.html
├── sobre/
│   ├── historia.html
│   └── equipe.html
├── servicos.html
├── cases.html                 (Depoimentos / Casos de Sucesso)
├── blog/
│   └── index.html             (fase 2 — pode entrar como "em breve")
├── contato.html
├── assets/
│   ├── css/
│   │   ├── reset.css
│   │   ├── variables.css      (design tokens: cores, tipografia, espaçamento)
│   │   ├── base.css
│   │   ├── components.css     (botões, cards, formulário, carrossel)
│   │   └── pages/              (CSS específico por página, se necessário)
│   ├── js/
│   │   ├── main.js
│   │   ├── nav-mobile.js
│   │   ├── form-validation.js
│   │   └── testimonials-carousel.js
│   └── img/
│       ├── logo/
│       ├── equipe/            (subpastas opcionais por setor: marketing/, comercial/, projetos/, etc.)
│       ├── servicos/
│       ├── cases/
│       ├── parceiros/
│       ├── mapa/               (SVG do mapa de MG, se optar pela abordagem estática)
│       └── sede/                (foto aérea da instituição, quando produzida)
└── README.md
```

---

## 4. Sitemap Aprovado

Baseado no menu real do AgroPlan-UFV (referência aprovada), adaptado ao sitemap validado na pesquisa:

```
Início
Sobre
  ├── Nossa História  →  bloco com mapa de MG + pin em São João Evangelista ao lado do texto
  ├── Localização/Como Chegar  →  vídeo de acesso + mapa interativo (pode ser subseção de Sobre ou de Contato, ver nota abaixo)
  ├── Nossa Sede  →  foto aérea (drone) da instituição
  └── Equipe  →  organizada por setor: Presidência, Marketing, Comercial, Projetos, Administrativo-Financeiro, RH
Serviços
Depoimentos / Cases
Conteúdos (fase 2, opcional)
  ├── Blog
  └── Ebooks
Contato  →  também recebe o mapa/vídeo de localização, se a cliente preferir centralizar "como chegar" aqui em vez de em Sobre
```

**Nota de arquitetura:** o mapa + vídeo de localização fazem sentido tanto em "Sobre" (contexto institucional) quanto em "Contato" (utilidade prática). Recomendo colocar o mapa com pin em Sobre/Nossa História (reforça pertencimento à cidade) e o vídeo de trajeto em Contato (ajuda quem já decidiu visitar). Confirmar com a cliente antes de fixar no HTML.

CTA principal do menu/header: botão de destaque "Fale com um Consultor" (copy exata usada pela referência — funciona bem, reaproveitar ou adaptar).

---

## 5. Identidade Visual — Direção Aprovada

A cliente confirmou AgroPlan-UFV e Agrosmart como referências favoritas. Abaixo, análise visual real (não mais estimada) de cada site, extraída de prints — de AgroPlan-UFV e Aegro a partir de capturas enviadas pelo usuário em 01/09/2026; de ESALQ Jr. a partir de inspeção ao vivo no mesmo dia. Agrosmart segue sem confirmação visual (só temos a análise textual da pesquisa original).

### AgroPlan-UFV (referência favorita nº1 da cliente) — análise confirmada por print

- **Header:** fundo verde escuro sólido, fixo, logo branca (ícone de folha + "AGROplan UFV") à esquerda, menu branco com dropdowns (Início, Sobre, Serviços, Depoimentos, Eventos, Conteúdos, Contato)
- **Hero:** foto real de campo/trator com bandeira/banner verde da empresa sobreposta, headline **toda em caixa alta**, branca, bold, 2 linhas ("CONSULTORIA ESPECIALIZADA PARA TRANSFORMAR A PRODUTIVIDADE DA SUA FAZENDA."), subtexto branco menor, CTA em botão pill branco com texto verde escuro bold ("FALE COM UM CONSULTOR")
- **Padrão de contraste alternado (característica mais marcante do site):** seções alternam fundo branco e fundo verde escuro sólido a cada bloco. Em fundo branco, os cards de destaque (Missão/Visão/Valores) viram blocos verde escuro sólido com texto branco. Em fundo verde escuro (seção Soluções), os cards de serviço viram blocos brancos com foto + label verde bold caixa alta. Esse "inverter o cartão" é o principal recurso de hierarquia visual do site — vale replicar
- **Cards Missão/Visão/Valores:** fundo verde escuro sólido, ícone branco simples (círculos interligados, ícone de pontilhado, nós conectados), título branco bold caixa alta, texto branco menor
- **Grid de serviços:** cards brancos com foto no topo (foto real, não ilustração) + label verde bold caixa alta embaixo, sem borda, sem sombra pesada
- **Bloco de números de impacto:** fundo branco, 4 colunas, ícone preto simples (selo, prancheta, pin de mapa, capelo de formatura) + número grande verde bold + legenda cinza pequena (1995 / +500 / +40 / 100%)
- **Depoimentos:** fundo verde escuro sólido, grid tipo mosaico com tamanhos variados — alguns cards com foto de fundo (lavoura) + texto branco bold sobreposto, outros cards brancos sólidos com texto verde escuro bold + nome verde caixa alta + cargo cinza
- **Parceiros:** fundo branco, grid simples de logos coloridos (preservam cor original de cada marca), sem tratamento uniforme
- **Formulário de contato:** fundo verde escuro sólido, título branco bold caixa alta à esquerda + foto real da equipe (pessoas de polo verde, pose de grupo), formulário à direita com labels brancos e inputs em caixa branca — bate exatamente com o que já documentamos na seção 7
- **Paleta identificada (visualmente confiável agora):** verde escuro institucional dominante — estimativa `#1B4D3E` a `#1E5631` (a faixa mais provável olhando o tom); verde médio de destaque usado em textos sobre fundo branco (títulos, números) — estimativa `#2E7D4F` a `#357A46`; branco puro; preto/cinza escuro só nos ícones da seção de números. **Ainda recomendo confirmar o hex exato via DevTools antes de travar `variables.css`** — a estimativa visual é boa mas não é pixel-perfect
- **Tipografia:** sans-serif geométrica bold para headings (visual parecido com Poppins ou Montserrat), peso regular para corpo de texto
- **Botões:** formato pill (bordas 100% arredondadas) tanto preenchido quanto outline, dependendo do fundo

### Aegro (referência adicional, mapeada na pesquisa original) — análise confirmada por print

Visualmente é quase o oposto do AgroPlan: não usa blocos de cor sólida alternados, é limpo estilo SaaS/tech.

- **Header:** fundo branco, logo verde (ícone circular estilo folha + wordmark "aegro" minúsculo), menu preto com dropdowns (Planos, Soluções, Para Você, Educação), botão verde preenchido "Teste grátis" + botão outline "Entrar no Aegro"
- **Hero:** fundo cinza muito claro (quase branco), badge pill verde pequeno ("JÁ DISPONÍVEL"), headline **em caixa normal** (não all-caps) preta bold — contraste direto com o estilo all-caps do AgroPlan/ESALQ, parágrafo cinza, botão verde em gradiente (canto levemente arredondado, não pill total), mockup de laptop+celular com print da interface do produto à direita
- **Cards de feature:** fundo branco ou cinza bem claro, sem bloco de cor sólida — título verde bold pequeno + texto preto/cinza, ícone preto simples em outline
- **Seções internas (feature sections):** label verde caixa alta pequeno acima do título ("GESTÃO RURAL FÁCIL", "CONTROLE TOTAL NO CAMPO") + headline preta bold grande em caixa normal + parágrafo cinza + lista de 3 bullets em caixa cinza clara com ícone + link verde sublinhado ("veja em ação") + botão verde "Agende uma Demonstração"
- **Imagens:** mockups de produto (laptop/celular) e fotos de pessoas reais (agricultor), nunca fotos de lavoura pura como no AgroPlan
- **Botão WhatsApp flutuante verde** — mesmo padrão confirmado nas outras referências
- **Paleta identificada:** verde vibrante/tech como cor de ação — estimativa `#00B85C` a `#1DBF73` (mais claro e saturado que o verde institucional do AgroPlan); preto para headings; cinza médio para corpo de texto; branco e cinza muito claro para fundos — **não usa verde escuro como cor dominante de fundo**, é o oposto do padrão AgroPlan
- **Tipografia:** sans-serif também, mas headings em peso bold sem caixa alta — visual mais "app" que "institucional"

### ESALQ Jr. (inspecionado ao vivo via print, 01/09/2026)

- Header branco fixo, logo circular à esquerda, menu com dropdowns (Home, Expedição, Feira de Carreiras, Instituição, Conteúdos, Soluções, Contato)
- Hero: foto de lavoura com overlay verde escuro translúcido, headline branca em duas linhas com uma palavra em verde-claro de destaque ("A **Melhor** Empresa Júnior..."), subtexto curto, dois botões CTA lado a lado (verde escuro, texto branco)
- Botão de WhatsApp flutuante verde, canto inferior direito — confirma padrão já identificado na pesquisa
- Bloco de 3 colunas com fundo verde escuro sólido, cada uma com lista de bullets com ícone de check — usado para comunicar "o que oferecemos / pra quem / por quê confiar"
- Bloco de 4 ícones em linha (fundo branco), cada um com ícone outline verde + título verde + descrição curta em cinza — usado para value props (Atendimento de Qualidade, Conhecimentos Avançados, Preços Acessíveis, +30 anos de história)
- Seção "O que fazemos?": grid 2 colunas com ícone outline + título + descrição de uma linha por serviço — visual bem mais limpo/minimalista que o AgroPlan
- Paleta claramente identificável: verde escuro institucional (tom próximo a `#0d3b24`/`#123` — conferir exato via DevTools) + verde médio de destaque para textos-chave + branco + cinza texto

### Decisão de direção — AgroPlan (blocos sólidos alternados) vs. Aegro (minimalista SaaS)

Como a cliente escolheu AgroPlan como favorita nº1, a recomendação é seguir a linha dela: **fundo verde escuro sólido alternando com fundo branco, cards que invertem cor conforme o fundo, tipografia em caixa alta nos headings, fotografia real de campo**. Os elementos do Aegro (labels pequenos em caixa alta acima dos títulos, blocos cinza-claro para bullets de feature, botões em gradiente) podem ser incorporados como *detalhes* de refinamento sem abandonar a linha mais "institucional" do AgroPlan — mas isso é uma escolha de estilo, vale confirmar com a cliente qual dos dois pesa mais.

⚠️ **Agrosmart segue sem confirmação visual** — não houve print desse site em nenhuma rodada. Se a cliente quer garantir que a direção final reflita bem as duas referências que ela escolheu, ainda vale conseguir prints do Agrosmart antes de fechar o design definitivo.

Paleta de trabalho atualizada (baseada agora em observação visual real do AgroPlan, ainda não pixel-perfect):

```css
:root {
  --color-primary: #1B4D3E;       /* verde escuro institucional (AgroPlan) — confirmar exato via DevTools */
  --color-primary-mid: #2E7D4F;   /* verde médio de destaque, usado em texto sobre fundo branco */
  --color-accent: #1DBF73;        /* verde tech/vibrante (referência Aegro), reservar para CTAs se quiser contraste extra */
  --color-neutral: #F5F1E8;       /* bege/terroso para fundos alternados, se optar por variar além do branco/verde */
  --color-text: #1A1A1A;
  --color-gray: #6B7280;          /* cinza de corpo de texto, padrão Aegro */
  --color-white: #FFFFFF;
}
```

**Tipografia sugerida:** sans-serif geométrica bold para headings (Poppins ou Montserrat, alinhado à referência AgroPlan) — usar caixa alta nos headings principais se for seguir a linha do AgroPlan; peso regular para corpo. Definir isso antes de começar a codar componentes.



---

## 6. Modelo de Conteúdo por Bloco (Content Schema)

Cada bloco abaixo é o que o agente precisa para montar o HTML/estrutura de dados de cada seção. Status indica se já temos a informação ou se é placeholder.

### 6.1 Identidade Institucional (usado no Sobre + rodapé)
| Campo | Status |
|---|---|
| Nome oficial + sigla | **CONFIRMADO** — Agricampo Jr. |
| Cidade/sede | **CONFIRMADO** — São João Evangelista - MG |
| Universidade/curso vinculado | PENDENTE (equipe é majoritariamente de Agronomia — confirmar instituição de ensino exata) |
| Ano de fundação | PENDENTE |
| Federação (Brasil Júnior / estadual) | PENDENTE |
| História (2-3 parágrafos) | PENDENTE |
| Missão / Visão / Valores | PENDENTE |
| Logo (SVG/PNG — versão colorida, branca, monocromática) | **PARCIAL** — logo colorida e logo branca já recebidas em PNG (`Logo-colorida-agricampo.png`, `Logo-branca-Agricampo.png`, na pasta Drive "Materiais para site - Agricampo Jr."). Falta versão monocromática e versão vetorial (SVG) — pedir se existir, ou vetorizar a partir do PNG |

### 6.2 Equipe — **DADOS REAIS DISPONÍVEIS**, organizados por setor

Fonte: `Info. membros para site.pdf`, pasta Drive "Materiais para site - Agricampo Jr." (extraído 01/09/2026). A equipe já está naturalmente estruturada em 6 setores — usar exatamente essa divisão para os grupos/abas da página Equipe, conforme pedido da cliente.

**Setor sugerido → cultura agrícola:** a cliente quer cada setor visualmente associado a uma cultura (ex: algodão, milho, soja, cana). Abaixo uma sugestão de mapeamento — **decisão final é da cliente**, levar para validação:

| Setor | Cultura sugerida (a validar) | Racional da sugestão |
|---|---|---|
| Presidência / Vice-Presidência | Café | Cultura historicamente associada a liderança/tradição em MG |
| Marketing | Girassol | Visual, cor, comunicação/"vitrine" |
| Comercial | Soja | Principal commodity de exportação/negociação do agro brasileiro |
| Projetos | Milho | Cultura mais versátil/técnica, combina com o maior número de projetos |
| Administrativo-Financeiro | Cana-de-açúcar | Associação histórica com cadeia produtiva/processamento |
| Recursos Humanos | Algodão | Textura/cuidado, sem relação técnica forte — trocar se a cliente tiver ideia melhor |

**Presidência**
| Nome | Cargo | Foto disponível? |
|---|---|---|
| Jheniffer Camille Dayrell da Silva | Presidente — Técnica em Agropecuária, Graduanda em Engenharia Agronômica | ❌ FALTA |
| Dayane Anjos | Vice-Presidente — Graduanda em Agronomia, 10º período | ❌ FALTA |

**Diretoria e Gerência de Marketing**
| Nome | Cargo | Foto disponível? |
|---|---|---|
| Lorena Coutinho Villela de Figueiredo | Diretora de Marketing — 10º período; Coordenadora de Comunicação RR/NúVA 2026.1; Equipe Agricampo/FAEMG Jovem | ❌ FALTA |
| Anabelly Cristina M. Silva | Gerente de Marketing — 8º período | ✅ `anabelly 1.heif` |
| Caroline Gomes dos Santos | Gerente de Marketing — Eng. Agronômica, 9º período; Maratona FAEMG Jovem 2026; AutoCAD, Google Earth, QGIS | ✅ `caroline 1.heif` |

**Diretoria e Gerência Comercial**
| Nome | Cargo | Foto disponível? |
|---|---|---|
| Luciana de Oliveira Souza | Diretora Comercial — Maratona FAEMG Jovem 2026; Excel avançado; AutoCAD, QGIS | ✅ `luciana 1.heif` |
| Nayara Jhennefer Damasceno Santos | Gerente Comercial — Técnica IFMG, 8º período; inglês/espanhol básico | ❌ FALTA |

**Diretoria e Gerência de Projetos** (maior equipe)
| Nome | Cargo | Foto disponível? |
|---|---|---|
| Heloisa Sofia de Souza Salema | Diretora de Projetos — 6º período | ❌ FALTA |
| Marlon Assis Pereira | Gerente de Projetos — Técnico em Agropecuária, 9º período | ✅ `marlon 1.heif` |
| Diogo Augusto Soares | Gerente de Projetos — Técnico, 5º período | ❌ FALTA |
| Luana Marta dos Anjos | Gerente de Projetos — 6º período | ✅ `luana 1.heif` |
| Thaissa Alves Soares | Gerente de Projetos — 10º período; Técnica em Nutrição e Dietética; pesquisa científica; QGIS | ❌ FALTA |
| Elias Pereira Gomes | Gerente de Projetos — 6º período | ❌ FALTA |

**Diretoria e Gerência Administrativo-Financeiro**
| Nome | Cargo | Foto disponível? |
|---|---|---|
| Stefani de Jesus Oliveira Moreira | Diretora do Adm-Financeiro — 8º período; Conselheira Multiplicadora 2026.2; Equipe Agricampo/FAEMG Jovem | ✅ `stefani 1.heif` |
| Kary Cordeiro | Gerente do Adm-Financeiro — Técnica em Agropecuária, 8º período | ❌ FALTA |

**Diretoria e Gerência de Recursos Humanos**
| Nome | Cargo | Foto disponível? |
|---|---|---|
| Beatriz Chagas Ferreira | Diretora de RH — Técnica, 9º período; Excel e AutoCAD | ✅ `beatriz 1 .heif` |
| Rafaella Gama Marques | Gerente de RH — 6º período; inglês básico, Excel | ❌ FALTA |

**Membros sem cargo de liderança listado**
| Nome | Cargo | Foto disponível? |
|---|---|---|
| Ronaldo Augusto Souza Alves | Técnico IFMG, 9º período; Excel, AutoCAD, QGIS, Looker Studio | ✅ `Ronaldo .heif` |
| Luciene Rita Correia dos Santos | 8º período; Maratona FAEMG Jovem 2026 | ❌ FALTA |

⚠️ **Inconsistência a esclarecer com a cliente:** existe uma foto `felipe 1.heif` na pasta de materiais que não corresponde a nenhum nome do PDF de equipe. Perguntar se é membro que falta incluir na lista ou arquivo solto.

⚠️ **17 de 19 membros ainda sem foto individual padronizada.** Isso é o maior gargalo de conteúdo do projeto agora — vale já agendar a sessão de fotos, e definir o padrão (fundo, enquadramento) antes de tirar, para não ter que refazer.

Estrutura de dados sugerida por membro (para o agente montar o grid, incluindo o campo de setor/cultura):
```json
{
  "nome": "",
  "cargo": "",
  "setor": "",
  "cultura_tema": "",
  "foto": "assets/img/equipe/nome.jpg",
  "foto_status": "disponivel | pendente"
}
```

Professores orientadores / vínculo acadêmico: PENDENTE (não constava no PDF de equipe).

### 6.3 Serviços
| Campo | Status |
|---|---|
| Lista de serviços (nome, descrição curta, público-alvo, ícone) | PENDENTE |
| Critério de organização (por público OU por área técnica) | PENDENTE — decisão da cliente muda a arquitetura do menu |

Estrutura de dados sugerida por serviço:
```json
{
  "nome": "",
  "descricao": "",
  "publico_alvo": "",
  "icone": "assets/img/servicos/icone.svg"
}
```

### 6.4 Cases / Depoimentos
| Campo | Status |
|---|---|
| Cases reais (cliente, problema, solução, resultado, depoimento) | PENDENTE — se não houver ainda, usar CTA "Peça diagnóstico grátis" no lugar de números de resultado |

### 6.5 Contato
| Campo | Status |
|---|---|
| Número de WhatsApp oficial | PENDENTE |
| E-mail institucional | PENDENTE |
| Endereço físico (sede) | PENDENTE |
| Links de redes sociais | PENDENTE |

### 6.6 Mapa de Minas Gerais com Localização — **NOVO, pedido da cliente**
| Campo | Status |
|---|---|
| Coordenadas exatas de São João Evangelista - MG | PENDENTE (fácil de obter — coordenadas públicas do município) |
| Endereço completo da sede (para pin preciso, se diferente do centro da cidade) | PENDENTE |
| Formato do mapa | DECISÃO TÉCNICA — opções: (a) SVG estático do mapa de MG com marcador fixo posicionado via CSS, leve e sem dependência externa; (b) embed do Google Maps/OpenStreetMap centrado na cidade, mais preciso mas depende de API/iframe externo |

Recomendação técnica: como o projeto é HTML/CSS/JS puro sem back-end, a opção (a) — SVG estático do contorno de MG com um ponto marcado via posição absoluta — é mais simples de implementar e não depende de chave de API. A opção (b) fica melhor caso a cliente queira o mapa interativo (zoom, rota). Confirmar preferência antes de implementar.

Posicionamento: ao lado do bloco "Nossa História" (pedido explícito da cliente).

### 6.7 Foto Aérea da Sede — **NOVO, pedido da cliente**
| Campo | Status |
|---|---|
| Foto aérea (drone) da instituição | **PENDENTE DE PRODUÇÃO** — não existe ainda na pasta de materiais do Drive. Precisa ser fotografada (drone) antes de virar conteúdo real |

Seção dedicada — sugestão: bloco full-width logo após ou antes da seção de mapa/localização, criando uma sequência visual "onde estamos" (mapa) → "nossa sede vista de cima" (foto aérea).

### 6.8 Vídeo de Acesso/Localização — **NOVO, pedido da cliente**
| Campo | Status |
|---|---|
| Vídeo mostrando o trajeto até a sede | **PENDENTE DE PRODUÇÃO** — não existe ainda na pasta de materiais do Drive |
| Hospedagem do vídeo | DECISÃO TÉCNICA — como o site é estático, recomendo hospedar no YouTube (não listado) ou Vimeo e embutir via `<iframe>`, em vez de servir arquivo de vídeo pesado direto do site |

Posicionamento sugerido: página de Contato, junto com o mapa — funciona como "manual de chegada" pra quem for visitar a sede.

---

## 7. Especificação do Formulário de Contato (JÁ DEFINIDO — extraído da referência aprovada)

Campos exatos, extraídos diretamente do formulário do AgroPlan-UFV (site de referência aprovado pela cliente — pode ser reaproveitado quase 1:1):

| Campo | Tipo | Obrigatório |
|---|---|---|
| Nome Completo | text | sim |
| Seu Melhor Contato | tel — placeholder `(DDD) X XXXX-XXXX` | sim |
| E-mail | email | sim |
| Localização da Propriedade (Cidade e Estado) | text | sim |
| Qual é a sua atividade principal | select — opções: Milho, Feijão, Cafeicultura, Cana, Pecuária, Silagem, Pastagem, Horticultura, Fruticultura, Outros | sim |
| Tamanho aproximado da área | text/number | sim |
| Como podemos ajudar | textarea | sim |

Botão de envio: **"Enviar contato"**

Isso já pode virar o HTML do formulário sem esperar mais nada da cliente — é estrutura, não conteúdo específico da EJ.

---

## 8. Requisitos Funcionais

- Formulário com validação client-side (JS) antes do envio
- Botão de WhatsApp flutuante (padrão confirmado nas duas referências e no restante do setor) — número pendente (seção 10)
- Menu responsivo com toggle mobile (hambúrguer)
- Carrossel de depoimentos (JS vanilla — evitar dependência pesada de biblioteca externa dado que o projeto é HTML/CSS/JS puro)
- Scroller/carrossel de logos de parceiros (se houver parceiros a exibir)
- Contadores animados para números de impacto — **opcional**, só implementar quando houver números reais (não simular)

---

## 9. Requisitos Não-Funcionais

- Mobile-first, totalmente responsivo (breakpoints padrão: 480px, 768px, 1024px, 1280px)
- Imagens otimizadas (WebP quando possível) + lazy loading (`loading="lazy"`)
- Acessibilidade básica: `alt` em todas as imagens, contraste mínimo AA, navegação por teclado no menu e formulário
- SEO on-page: `<title>` e `<meta description>` únicos por página, uso correto de `<header>`, `<nav>`, `<main>`, `<footer>`, hierarquia de headings sem pular níveis

---

## 10. Itens Pendentes (bloqueiam conteúdo real, não bloqueiam início do código)

Estes itens **não impedem o agente de começar a estruturar HTML/CSS** com placeholders, mas precisam ser resolvidos antes do site ir ao ar:

- [x] ~~Nome oficial da EJ~~ — **Agricampo Jr.**, sede em São João Evangelista - MG
- [x] ~~Logo~~ — **recebida** (colorida + branca, PNG). Falta versão monocromática e vetorial (SVG)
- [x] ~~Dados da equipe~~ — **recebidos e organizados por setor** (ver 6.2). 17 de 19 membros ainda sem foto — maior gargalo atual
- [ ] Universidade/instituição de ensino vinculada, ano de fundação, federação (Brasil Júnior/estadual)
- [ ] Missão / Visão / Valores
- [ ] Cores exatas em hex (agora temos estimativa visual confiável de AgroPlan-UFV e Aegro via prints reais, ver seção 5 — falta só confirmar via DevTools/color picker antes de travar `variables.css`, e ainda falta print do Agrosmart)
- [ ] Lista de serviços com descrição e decisão de organização (por público ou por área)
- [ ] Sessão de fotos da equipe (padronizar enquadramento/fundo antes de agendar)
- [ ] Esclarecer identidade de "felipe 1.heif" (foto sem correspondência no PDF de equipe)
- [ ] Decisão de mapeamento setor→cultura agrícola (sugestão em 6.2, validar com a cliente)
- [ ] Coordenadas/endereço exato da sede para o mapa
- [ ] Foto aérea (drone) da sede — **produção pendente**
- [ ] Vídeo de acesso/trajeto até a sede — **produção pendente**
- [ ] Cases/depoimentos reais (ou confirmação de usar "diagnóstico grátis" como CTA substituto)
- [ ] Número de WhatsApp oficial
- [ ] E-mail e endereço institucional
- [ ] Serviço de envio do formulário (Formspree / EmailJS / outro)
- [ ] Onde o site será hospedado (e onde hospedar o vídeo — YouTube não listado / Vimeo)

---

## 11. Fases de Desenvolvimento Sugeridas

**Fase 1 — MVP:** Home + Sobre + Serviços + Contato (formulário funcional, mesmo que com serviço de envio provisório)
**Fase 2:** Cases/Depoimentos (alimentado conforme projetos forem concluídos)
**Fase 3:** Blog, Ebooks, Processo Seletivo/Trabalhe Conosco

Recomendação: o agente pode começar a estruturar HTML/CSS/design tokens da Fase 1 imediatamente usando placeholders nos campos marcados PENDENTE — não precisa esperar todo o conteúdo pra começar a codar a arquitetura.

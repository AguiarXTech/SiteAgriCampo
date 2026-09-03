# Mutare

Plataforma SaaS da **AguiarXTech** para que empresas juniores editem o conteúdo do próprio
site — fotos, textos, equipe, serviços e certificados — sem depender da agência a cada
alteração.

Cada site-cliente é um **tenant** isolado. A agência acessa todos; cada cliente, só o seu.

O contexto completo do produto e as decisões de arquitetura estão em [CLAUDE.md](CLAUDE.md).
**Este projeto é escrito inteiramente em português do Brasil** — ver a seção 0 daquele
documento antes de contribuir.

## Stack

| Camada | Escolha |
| --- | --- |
| Framework | Next.js 16 (App Router) com Payload CMS 3.88 embutido |
| Banco | PostgreSQL, via `@payloadcms/db-postgres` |
| Multi-tenancy | `@payloadcms/plugin-multi-tenant` |
| Mídia | disco local hoje; Cloudflare R2 (adapter S3) quando o bucket existir |
| Auth | nativa do Payload (JWT/cookie) |

Node exigido: `^18.20.2 || >=20.9.0`. Gerenciador: `pnpm`.

## Rodando local

O Postgres deste ambiente é uma instalação **portátil** em `C:\Users\aguia\pgsql\pgsql`
(dados em `C:\Users\aguia\pgdata17`). Não é serviço do Windows — precisa subir a cada boot.

```powershell
pnpm install
cp .env.example .env     # preencha DATABASE_URL e PAYLOAD_SECRET

pnpm db:start            # sobe o Postgres portátil
pnpm dev                 # painel em http://localhost:3000/admin
pnpm db:stop
```

### Dados de teste

```powershell
pnpm seed:fase0          # recria o tenant 'agro-junior' com um doc por collection
```

Credenciais do seed (**só desenvolvimento**): `agencia@aguiarxtech.com` e
`diretoria@agrojunior.com.br`, senha `spike-fase0`.

## Como verificar

### Onde rodar

**Sempre na raiz do projeto** (`C:\Users\aguia\mutare`), onde ficam `package.json` e
`node_modules`. De dentro de `tests\` ou de qualquer subpasta, nada funciona.

**Não chame as ferramentas direto.** `tsc`, `vitest`, `eslint` e `playwright` não são
comandos globais — são dependências do projeto, instaladas em `node_modules\.bin\`. Digitar
`tsc --noEmit` no terminal dá *"o termo não é reconhecido"*. Use os scripts do `pnpm`
(ou `pnpm exec tsc --noEmit`, que acha o binário local).

Funciona igual no PowerShell, no CMD e no Git Bash — inclusive os comandos `db:*`.

### O comando único

```powershell
pnpm db:start            # pré-requisito: o Postgres não sobe sozinho
pnpm verificar           # typecheck + lint + testes de integração
```

Se o banco estiver parado, o erro é de conexão — não é teste falhando.

| Comando | O que faz |
| --- | --- |
| `pnpm verificar` | typecheck + lint + integração. É o de todo dia. |
| `pnpm typecheck` | só o TypeScript (`tsc --noEmit`) |
| `pnpm lint` | só o ESLint |
| `pnpm test:int` | só os testes de integração (vitest) |
| `pnpm test:e2e` | e2e (playwright); sobe o dev server sozinho |
| `pnpm test` | integração + e2e |

O e2e sobe o próprio servidor e **não reaproveita** um já em execução: reaproveitar
ignoraria a configuração de teste e faria a suíte medir um sistema diferente do descrito.
Se você estiver com `pnpm dev` aberto na porta 3000, o Playwright vai reclamar — feche antes.

Na primeira vez que rodar o e2e, o Playwright pode reclamar que o navegador não existe
(`Executable doesn't exist at ...`). Ele baixa sozinho com `pnpm exec playwright install
chromium` — é uma vez só, e o próprio erro informa o comando.

O teste que importa nesta fase é
[tests/int/isolamento-tenant.int.spec.ts](tests/int/isolamento-tenant.int.spec.ts): prova
que um client do tenant A não lê, cria, edita nem exclui nada do tenant B. Ele roda com
`overrideAccess: false` — sem essa flag a Local API do Payload ignora o usuário passado e
opera como superusuário, e o teste passaria sem provar nada.

### Conferindo com os próprios olhos

Saída de teste verde ainda é acreditar no relatório. Para conferir clicando:

```powershell
pnpm db:start
pnpm seed:verificacao    # monta dois tenants, com um login de cliente para cada
pnpm dev
```

O seed imprime o roteiro no terminal. Em `http://localhost:3000/admin`, senha
`verificacao123` para todos os logins:

1. Entre como `cliente.alfa@exemplo.com`. Em **Serviços**, **Equipe** e **Certificados** só
   pode aparecer conteúdo da Alfa. Nada da Beta, em nenhuma lista.
2. Confira que **não existe** seletor de tenant no topo — cliente enxerga um tenant só.
3. Em **Informações do site**: editar funciona, excluir não deve estar disponível.
4. Saia e entre como `cliente.beta@exemplo.com`. Espelho do passo 1: só conteúdo da Beta.
5. Saia e entre como `agencia@aguiarxtech.com`. O seletor de tenant aparece, e a agência
   alterna entre Alfa e Beta vendo o conteúdo dos dois.

Se em algum passo um cliente enxergar conteúdo do outro tenant, o isolamento quebrou.

## Estrutura

```txt
src/
├── colecoes/          o modelo de dados — uma collection por arquivo
│   ├── Usuarios.ts            quem entra no painel
│   ├── EmpresasJuniores.ts    os clientes (tenants)
│   ├── InformacoesDoSite.ts   texto e imagens principais de cada site
│   ├── Servicos.ts  Equipe.ts  Certificados.ts  Midia.ts
│   ├── LogsDeAcesso.ts        trilha de auditoria, somente-adição
│   └── PedidosDeAcesso.ts     quem pediu ajuda para entrar
│
├── seguranca/         todas as defesas, agrupadas pelo que protegem
│   ├── permissoes.ts          quem pode fazer o quê
│   ├── tenantDaEscrita.ts     impede gravar no tenant de outro cliente
│   ├── auditoria.ts           o que fica registrado, e o que nunca pode ser
│   ├── dadosPessoais.ts       exportação e exclusão (LGPD)
│   ├── pedidoDeAcesso.ts      o formulário público de ajuda
│   ├── limites/
│   │   ├── requisicoes.ts     limite por origem
│   │   └── upload.ts          tamanho e tipo de arquivo aceito
│   ├── portaoDeAcesso.ts      barra quem ainda não trocou a senha temporária
│   └── onboarding/            criação de cliente e senha de primeiro acesso
│
├── componentes/       o que aparece na tela
│   ├── marca/                 logo, ícone, assinatura da agência
│   ├── painel/                tela inicial e avisos de ajuda
│   └── publico/               formulário de pedido de acesso
│
├── estilos/
│   └── tokens.css     cor, raio, sombra e tempo — o único lugar com hex
│
├── app/
│   ├── (frontend)/    páginas públicas: ajuda e troca de senha
│   ├── (payload)/     o painel e a API — gerado pelo Payload
│   └── marca/         serve os arquivos de `identidade/`
│
├── migrations/        alterações de schema, versionadas
├── proxy.ts           cabeçalhos, CSP, limite de requisições, portão de acesso
└── payload.config.ts

identidade/            logos, cores e manual de marca — você mexe aqui
scripts/               Postgres portátil, seeds, limpeza da auditoria
patches/               o patch do Argon2id sobre o Payload
tests/                 int (vitest) e e2e (playwright)
```

**Os `slug` das collections permanecem em inglês** (`users`, `tenants`, `site-info`…):
são contrato de banco e de API, e traduzi-los quebraria os dados existentes. Os nomes de
arquivo e os rótulos do painel são PT-BR, como manda a seção 0 do
[CLAUDE.md](CLAUDE.md).

## Comandos úteis

```powershell
pnpm generate:types      # regenera src/payload-types.ts após mudar o schema
pnpm generate:importmap  # regenera o importMap do admin após mudar componentes/plugins
pnpm db:status           # o Postgres portátil está no ar?
```

## Migrações de banco

O projeto **não** usa o modo `push` do Drizzle: toda alteração de schema vira um arquivo
versionado em `src/migrations/`, revisável antes de aplicar.

```powershell
pnpm migrate:create <nome>   # depois de mudar collection ou campo
pnpm migrate                 # aplica o que estiver pendente
pnpm migrate:status          # o que já foi aplicado
```

Mudou o schema e o painel não reflete? Provavelmente falta gerar e aplicar a migração —
antes, o `push` fazia isso sozinho ao subir o servidor.

## Central da agência

O acesso `agency_admin` tem, em `/admin/central`, um fluxo que cria um cliente inteiro de
uma vez: a empresa júnior, o primeiro acesso com senha temporária, o documento de
Informações do Site e — opcionalmente — conteúdo de exemplo.

Isso existe porque o caminho manual tem quatro telas e uma ordem que, se errada, entrega
um cliente que entra e encontra tela quebrada: o documento de informações **precisa**
existir antes do primeiro acesso, já que o cliente pode editá-lo mas não criá-lo.

A senha temporária aparece **uma vez** na tela e é enviada por e-mail. Vale 7 dias e o
cliente é obrigado a trocá-la no primeiro acesso — enquanto não trocar, o painel inteiro
fica bloqueado para ele.

## Dados pessoais (LGPD)

| O quê | Como |
| --- | --- |
| Exportar os próprios dados | `GET /api/users/meus-dados` com sessão ativa |
| Pedir exclusão da conta | `POST /api/users/solicitar-exclusao`; cai em Auditoria → Pedidos |
| Descartar auditoria antiga | `pnpm limpar:auditoria` (retenção de 12 meses) |

A limpeza é **manual por enquanto** — agendar depende da hospedagem, ainda não decidida.
Rode de tempos em tempos: registro de acesso guarda e-mail e endereço de origem, e guardar
dado pessoal além do necessário é violação por si só.

## Visual

`src/estilos/tokens.css` é a fonte da verdade: cor, raio, sombra e tempo. É o
**único** arquivo onde se escreve hex — a folha do painel
(`src/app/(payload)/custom.scss`) e a das páginas públicas
(`src/app/(frontend)/styles.css`) consomem de lá, e é isso que mantém as duas
pontas parecidas.

Três regras que vêm da identidade e não se afrouxam sem revisar
[o manual](identidade/manual/IDENTIDADE_VISUAL.md):

1. O fundo é branco. Os neutros fazem quase toda a tela.
2. Existe **uma** cor de ação — o azul da logo. Não há segunda cor de destaque.
3. O verde da marca não carrega informação. Ele aparece só na logo e no fio
   decorativo do topo, porque tem 1,37:1 sobre branco e ninguém o enxergaria.

A raiz do site não tem página: `/` redireciona para o painel. As únicas telas
públicas são o pedido de ajuda e a troca de senha — as duas que alguém trancado
do lado de fora precisa alcançar.

## Logo da empresa no ícone de conta

O ícone no canto do cabeçalho mostra a marca de quem está usando: a logo da
AguiarXTech para a agência, e a logo da empresa júnior para o cliente.

Para enviar a logo de um cliente: **Empresas juniores → a empresa → Logo da
empresa**. Imagem quadrada funciona melhor; o painel não corta nem distorce a
marca (`object-fit: contain`), como manda a identidade.

Sem logo cadastrada, aparecem as iniciais da empresa — nunca a silhueta cinza,
que não distingue um cliente do outro. Só a agência grava esse campo.

## Identidade visual

Os arquivos de marca ficam em **[identidade/](identidade/)** — logos da Mutare e da
AguiarXTech, cores e manual de marca. Solte o arquivo com o nome certo e ele **aparece no
painel sozinho**, sem rodar comando: basta reiniciar o `pnpm dev`. O
[README da pasta](identidade/README.md) lista os nomes esperados.

Enquanto a pasta está vazia, o painel usa uma marca provisória tipográfica — nada quebra
por falta de arquivo, e dá para subir uma logo hoje e o resto depois.

## Estado do roadmap

Fases 0, 1 e 2 concluídas. O andamento detalhado, com o que falta em cada fase, está na
seção 12 do [CLAUDE.md](CLAUDE.md).

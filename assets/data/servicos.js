/**
 * servicos.js — serviços da Agricampo Jr. (CONTEXT.md §6.3)
 *
 * CAMADA DE CONTEÚDO — fonte local, trocável. Formato espelha a collection
 * `services` do Payload/Mutare (nome, descricao, imagem, ordem).
 *
 * imagem / imagemAlt: o card só mostra a foto quando há imagemAlt — é o sinal
 * de que o arquivo existe em assets/img/servicos/ (fotos de 14/10/2026).
 *
 * Lista de nomes recebida em 16/09/2026; critério de organização e a
 * confirmação de que são os 3 mais buscados vieram no documento de
 * 14/10/2026 (mockup-cliente/referencia/) — "os mais procurados: análise
 * de solo, documentação (CAR e ITR) e Marketing Rural". `ordem` abaixo
 * segue esse ranking de procura. "Regulamentação de documentos" é
 * especificamente CAR e ITR, confirmado no mesmo documento.
 *
 * O documento de 14/10/2026 citava um "arquivo separado" com a descrição de
 * cada serviço, que não chegou junto. A cliente pediu (também 14/10/2026)
 * pra eu mesmo escrever essas descrições — são rascunho meu, curto e no
 * tom simples do resto do site, não texto oficial dela. Troca fácil
 * quando/se o arquivo original chegar. Ainda PENDENTE: o restante da lista
 * (só temos os 3 mais procurados, pode haver outros serviços menores).
 */

export const servicos = [
  {
    nome: "Análise de solo",
    descricao: "A gente analisa o solo da sua propriedade e te diz o que fazer pra plantar melhor e colher mais.",
    publicoAlvo: "Produtor rural",
    imagem: "assets/img/servicos/analise-de-solo.jpg",
    imagemAlt: "Dois membros da Agricampo Jr. conferindo uma amostra de solo dentro de um balde, durante coleta em uma propriedade rural",
    icone: "assets/img/servicos/analise-de-solo.svg",
    ordem: 1,
  },
  {
    nome: "Regulamentação de documentos",
    descricao: "Ajudamos a regularizar o CAR e o ITR da sua propriedade, sem dor de cabeça.",
    publicoAlvo: "Produtor rural e proprietário de imóvel rural",
    imagem: "assets/img/servicos/regulamentacao-documentos.jpg",
    imagemAlt: "Mão segurando um GPS Garmin no campo, com a tela mostrando os pontos marcados no levantamento da área",
    icone: "assets/img/servicos/regulamentacao-documentos.svg",
    ordem: 2,
  },
  {
    nome: "Marketing rural",
    descricao: "A gente ajuda a divulgar o que você produz e vender melhor, com redes sociais e identidade visual.",
    publicoAlvo: "Produtor rural e pequenas empresas do agro",
    imagem: "assets/img/servicos/marketing-rural.jpg",
    imagemAlt: "Duas integrantes da Agricampo Jr. ao lado de um produtor no galpão de uma fazenda de gado leiteiro, com vacas ao fundo",
    icone: "assets/img/servicos/marketing-rural.svg",
    ordem: 3,
  },
  // PENDENTE — pode haver outros serviços além dos 3 mais procurados (confirmar com a cliente)
];

/**
 * cases / depoimentos (CONTEXT.md §6.4).
 *
 * Primeiro depoimento real, 14/10/2026: a diretora de projetos (Heloisa)
 * fez follow-up por WhatsApp com um cliente atendido no ano anterior
 * (serviço de análise de solo, para implantação de milho para silagem) e
 * printou a resposta — captura em mockup-cliente/referencia/. Transcrito
 * aqui literalmente, só com o sobrenome do cliente omitido (não veio no
 * print). NÃO inventar depoimentos — se precisar de mais pra preencher a
 * página, o caminho é repetir esse mesmo follow-up de WhatsApp com outros
 * clientes atendidos, não fabricar texto.
 */
export const depoimentos = [
  {
    texto: "Deu diferença muito boa, deu média de 40 toneladas por hectare.",
    nome: "Pedro",
    cargo: "Produtor rural",
    propriedade: "",
    servico: "Análise de solo",
    contexto: "Implantação de milho para silagem, com preparo de solo segundo as recomendações da Agricampo.",
    foto: "",
  },
];

export default servicos;

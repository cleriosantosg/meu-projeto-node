
const express = require("express");
const app = express();

// Banco de personagens
const personagensBanco = [
  { nome: "hulk", exibicao: "Hulk", empresa: "marvel", tipo: "Herói" },
  { nome: "homemaranha", exibicao: "Homem-Aranha", empresa: "marvel", tipo: "Herói" },
  { nome: "ironman", exibicao: "Homem de Ferro", empresa: "marvel", tipo: "Herói" },
  { nome: "thor", exibicao: "Thor", empresa: "marvel", tipo: "Herói" },
  { nome: "lexluthor", exibicao: "Lex Luthor", empresa: "dc", tipo: "Vilão" },
  { nome: "batman", exibicao: "Batman", empresa: "dc", tipo: "Herói" },
  { nome: "superman", exibicao: "Superman", empresa: "dc", tipo: "Herói" },
  { nome: "coringa", exibicao: "Coringa", empresa: "dc", tipo: "Vilão" }
];

// Função para montar os links dos personagens
function listarPersonagens(empresa) {
  const personagens = personagensBanco.filter(
    p => p.empresa === empresa
  );

  return `
    <ul>
      ${personagens.map(p => `
        <li>
          <a href="/personagem/${p.empresa}/${p.nome}">
            ${p.exibicao}
          </a>
        </li>
      `).join("")}
    </ul>
  `;
}

// 1. ROTA PRINCIPAL
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <title>Catálogo de Heróis</title>
    </head>
    <body>
      <h1>Catálogo de Heróis</h1>

      <p>Bem-vindo ao site da Marvel e DC!</p>

      <h2>Empresas</h2>

      <ul>
        <li><a href="/marvel">Marvel</a></li>
        <li><a href="/dc">DC Comics</a></li>
      </ul>

      <hr>

      <h2>Personagens cadastrados</h2>

      ${listarPersonagens("marvel")}
      ${listarPersonagens("dc")}

    </body>
    </html>
  `);
});

// 2. ROTA MARVEL
app.get("/marvel", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <title>Marvel</title>
    </head>
    <body>
      <h1>Marvel</h1>

      <p>
        A Marvel é uma empresa de entretenimento conhecida
        por seus personagens e histórias de super-heróis.
      </p>

      <h2>Personagens da Marvel</h2>

      ${listarPersonagens("marvel")}

      <a href="/">Voltar para a página inicial</a>
    </body>
    </html>
  `);
});

// 3. ROTA DC
app.get("/dc", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <title>DC Comics</title>
    </head>
    <body>
      <h1>DC Comics</h1>

      <p>
        A DC Comics é uma editora conhecida por criar
        personagens como Batman, Superman e Mulher-Maravilha.
      </p>

      <h2>Personagens da DC</h2>

      ${listarPersonagens("dc")}

      <a href="/">Voltar para a página inicial</a>
    </body>
    </html>
  `);
});

// 4. ROTA COM DOIS PARÂMETROS
app.get("/personagem/:empresa/:nome", (req, res) => {

  const empresa = req.params.empresa;
  const nome = req.params.nome;

  const personagem = personagensBanco.find(
    p => p.empresa === empresa.toLowerCase() &&
         p.nome === nome.toLowerCase()
  );

  if (!personagem) {
    return res.status(404).send(`
      <h1>Personagem não encontrado!</h1>
      <a href="/">Voltar ao início</a>
    `);
  }

  res.send(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <title>${personagem.exibicao}</title>
    </head>
    <body>
      <h1>Informações do personagem</h1>

      <h2>${personagem.exibicao}</h2>

      <p>Empresa: ${empresa.toUpperCase()}</p>
      <p>Nome recebido: ${nome}</p>
      <p>Tipo: ${personagem.tipo}</p>

      <a href="/${personagem.empresa}">
        Voltar para ${personagem.empresa.toUpperCase()}
      </a>

      <br><br>

      <a href="/">Voltar para a página inicial</a>
    </body>
    </html>
  `);
});

// 5. ROTA ANTIGA COM UM PARÂMETRO
app.get("/personagem/:nome", (req, res) => {
  const nomePersonagem = req.params.nome;

  res.send(`Personagem recebido: ${nomePersonagem}`);
});

// 6. ROTA DE BUSCA ANTERIOR
app.get("/buscar/:nome", (req, res) => {

  const nomeBusca = req.params.nome.toLowerCase();

  const encontrado = personagensBanco.find(
    p => p.nome === nomeBusca
  );

  if (encontrado) {
    res.send(`
      ${encontrado.exibicao} é um ${encontrado.tipo}
      da ${encontrado.empresa.toUpperCase()}.
    `);
  } else {
    res.status(404).send("Personagem não encontrado.");
  }
});

// INICIALIZAÇÃO DO SERVIDOR
app.listen(3030, () => {    
  console.log("Servidor iniciado em http://localhost:3030");
});

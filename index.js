const express = require("express");
const app = express();

// 1. Rota Simples com mensagem (rota padrão '/')
app.get("/", (req, res) => {
  res.send("Bem-vindo ao servidor de super-heróis!");
});

// 2. Cada uma na sua rota (Rotas separadas para marvel e dc)
app.get("/marvel", (req, res) => {
  res.send("Este é o universo de heróis da Marvel.");
});

app.get("/dc", (req, res) => {
  res.send("Este é o universo de heróis da DC.");
});

// 3. Pegando parâmetros de entrada (ex: /personagem/batman)
app.get("/personagem/:nome", (req, res) => {
  const nomePersonagem = req.params.nome;
  res.send(`Personagem recebido: ${nomePersonagem}`);
});

// 4. Tratando parâmetros de entrada (Validação de 8 personagens e editoras/papéis)
// Base de dados simulada com 8 personagens válidos
const personagensBanco = [
  { nome: "hulk", editora: "marvel", tipo: "herói" },
  { nome: "homemaranha", editora: "marvel", tipo: "herói" },
  { nome: "ironman", editora: "marvel", tipo: "herói" },
  { nome: "thor", editora: "marvel", tipo: "herói" },
  { nome: "lexluthor", editora: "dc", tipo: "vilão" },
  { nome: "batman", editora: "dc", tipo: "herói" },
  { nome: "superman", editora: "dc", tipo: "herói" },
  { nome: "coringa", editora: "dc", tipo: "vilão" }
];

app.get("/buscar/:nome", (req, res) => {
  // Transforma o parâmetro digitado em minúsculas para facilitar a busca
  const nomeBusca = req.params.nome.toLowerCase();

  // Procura o personagem na lista
  const encontrado = personagensBanco.find(p => p.nome === nomeBusca);

  if (encontrado) {
    res.send(`${encontrado.nome} é um ${encontrado.tipo} da ${encontrado.editora}`);
  } else {
    res.send("Personagem não encontrado");
  }
});

// Inicializando o servidor na porta 3000
app.listen(3000, () => {
  console.log("Servidor está a ouvir na porta 3000");
});
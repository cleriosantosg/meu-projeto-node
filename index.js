const express = require("express");
const app = express();


app.get("/", (req, res) => {
  res.send("Bem-vindo ao servidor de super-heróis da DC e Marvel!");
});


app.get("/marvel", (req, res) => {
  res.send("Este é o universo de heróis da Marvel.");
});

app.get("/dc", (req, res) => {
  res.send("Este é o universo de heróis da DC.");
});

app.get("/personagem/:nome", (req, res) => {
  const nomePersonagem = req.params.nome;
  res.send(`Personagem recebido: ${nomePersonagem}`);
});


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

  const nomeBusca = req.params.nome.toLowerCase();

  
  const encontrado = personagensBanco.find(p => p.nome === nomeBusca);

  if (encontrado) {
    res.send(`${encontrado.nome} é um ${encontrado.tipo} da ${encontrado.editora}`);
  } else {
    res.send("Personagem não encontrado");
  }
});


app.listen(3000, () => {
  console.log("Servidor está a ouvir na porta 3000");
});

const express = require("express");
const rotas = require("./routes");
const tratadorDeErros = require("./middleware/tratadorDeErros");
const server = express();

server.use(express.json());

server.use(rotas);

server.use((_req, res, _next) =>
  res.status(404).json({ erro: "Rota não existe" })
);

server.use(tratadorDeErros);

server.listen(3000, () => console.log("Servidor está rodando!"));

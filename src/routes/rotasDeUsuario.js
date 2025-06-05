const express = require("express");
const controladorDeUsuario = require("../controllers/controladorDeUsuario");
const capturaErros = require("../utils/capturaErros");
const rotasDeUsuario = express.Router();

rotasDeUsuario.get("/todos", capturaErros(controladorDeUsuario.pegarTodos));
rotasDeUsuario.get("/:id", capturaErros(controladorDeUsuario.pegarUmPeloID));
rotasDeUsuario.post("/cadastrar", capturaErros(controladorDeUsuario.cadastrar));
rotasDeUsuario.post("/conectar", capturaErros(controladorDeUsuario.conectar));
rotasDeUsuario.put("/:id", capturaErros(controladorDeUsuario.atualizar));
rotasDeUsuario.delete("/:id", capturaErros(controladorDeUsuario.deletar));

module.exports = rotasDeUsuario;

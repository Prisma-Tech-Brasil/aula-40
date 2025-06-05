const servicoDeUsuario = require("../services/servicoDeUsuario");
const { HttpError } = require("../errors/HttpError");

class ControladorDeUsuario {
  pegarTodos(_req, res) {
    const usuarios = servicoDeUsuario.buscarTodos();

    res.status(200).json(usuarios);
  }

  pegarUmPeloID(req, res) {
    const id = req.params.id;
    const usuario = servicoDeUsuario.pegarPeloID(id);

    res.status(200).json(usuario);
  }

  cadastrar(req, res) {
    const { nome, email, cpf, senha } = req.body;
    const resposta = servicoDeUsuario.cadastrar(nome, email, cpf, senha);

    if (resposta.error) res.status(400).json(resposta.error);

    res.status(201).json(resposta);
  }

  conectar(req, res) {
    const { email, senha } = req.body;
    const resposta = servicoDeUsuario.conectar(email, senha);

    res.status(200).json(resposta);
  }

  atualizar(req, res) {
    const dados = req.body;
    const usuarioId = req.params.id;
    const resposta = servicoDeUsuario.atualizar(usuarioId, dados);

    res.status(200).json(resposta);
  }

  deletar(req, res) {
    const id = req.params.id;
    servicoDeUsuario.deletar(id);

    res
      .status(200)
      .json({ mensagem: `Usuário com ID ${id} deletado com sucesso.` });
  }
}

module.exports = new ControladorDeUsuario();

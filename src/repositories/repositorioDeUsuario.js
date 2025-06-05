const { Usuario } = require("../models/Usuario");

class RepositorioDeUsuario {
  buscarTodos() {
    return Usuario.buscarTodos();
  }

  criar(usuario) {
    return usuario.salvar();
  }

  buscarPeloEmail(email) {
    return Usuario.buscarPeloEmail(email);
  }

  buscarPeloId(id) {
    return Usuario.buscarPeloId(id);
  }

  atualizar(usuarioId, dadosAtualizados) {
    return Usuario.atualizar(usuarioId, dadosAtualizados);
  }

  deletarUmUsuario(id) {
    return Usuario.deletarUmUsuario(id);
  }
}

module.exports = new RepositorioDeUsuario();

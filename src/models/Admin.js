class Admin extends Usuario {
  constructor(nome, email, cpf, senhaHash) {
    super(nome, email, cpf, senhaHash);
    this.role = "admin";
  }

  async criarProfessor(nome, email, cpf, senhaHash, disciplinas) {
    const professor = new Professor(nome, email, cpf, senhaHash, disciplinas);
    return RepositorioDeUsuario.criar(professor);
  }

  async excluirUsuario(id) {
    return RepositorioDeUsuario.excluir(id);
  }

  async buscarUsuarios() {
    return RepositorioDeUsuario.buscarTodos();
  }
}

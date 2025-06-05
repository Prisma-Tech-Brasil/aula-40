const { PrismaClient } = require("@prisma/client");
const { Usuario } = require("../models/Usuario");

const prisma = new PrismaClient();

class RepositorioDeUsuario {
  async buscarTodos() {
    return await prisma.user.findMany();
  }

  async criar({ nome, email, cpf, senha }) {
    const senhaHash = await Usuario.criptografar(senha);

    return await prisma.user.create({
      data: {
        nome,
        email,
        cpf,
        senha: senhaHash,
        role: "aluno"
      }
    });
  }

  async buscarPeloEmail(email) {
    return await prisma.user.findUnique({ where: { email } });
  }

  async buscarPeloId(id) {
    return await prisma.user.findUnique({ where: { id } });
  }

  async atualizar(id, dadosAtualizados) {
    return await prisma.user.update({
      where: { id },
      data: dadosAtualizados
    });
  }

  async deletarUmUsuario(id) {
    return await prisma.user.delete({ where: { id } });
  }
}

module.exports = new RepositorioDeUsuario();

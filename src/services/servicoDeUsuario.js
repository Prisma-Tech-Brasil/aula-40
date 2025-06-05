const z = require("zod");
const jwt = require("jsonwebtoken");
const RepositorioDeUsuario = require("../repositories/repositorioDeUsuario");
const { Usuario } = require("../models/Usuario");
const { HttpError } = require("../errors/HttpError");

class ServicoDeUsuario {
  async buscarTodos() {
    return await RepositorioDeUsuario.buscarTodos();
  }

  async pegarPeloID(id) {
    if (!id) {
      throw new HttpError(400, "O ID não foi informado");
    }

    const usuario = await RepositorioDeUsuario.buscarPeloId(id);
    if (!usuario) {
      throw new HttpError(404, "Usuário não encontrado!");
    }

    return usuario;
  }

  async cadastrar(nome, email, cpf, senha) {
    const userSchema = z.object({
      nome: z
        .string({ required_error: "O nome é obrigatório." })
        .trim()
        .min(3, { message: "O nome deve conter pelo menos três caractere." }),
      email: z
        .string({ required_error: "O email é obrigatório." })
        .email({ message: "O email deve ser um email válido." }),
      cpf: z
        .string({ required_error: "O CPF é obrigatório." })
        .trim()
        .min(11, { message: "O CPF deve conter 11 caracteres." }),
      senha: z
        .string({ required_error: "A senha é obrigatória." })
        .trim()
        .min(8, { message: "A senha deve conter pelo menos 8 caracteres." })
    });

    const validacao = userSchema.safeParse({ nome, email, cpf, senha });

    if (validacao.success === false) {
      return { error: validacao.error.format() };
    }

    const usuario = new Usuario(nome, email, cpf, senha);
    return await RepositorioDeUsuario.criar(usuario);
  }

  async conectar(email, senha) {
    const usuarioEncontrado = await RepositorioDeUsuario.buscarPeloEmail(email);
    if (!usuarioEncontrado) {
      throw new HttpError(404, "Usuário não encontrado.");
    }

    const autenticado = usuarioEncontrado.compararSenha(senha);
    if (!autenticado) {
      throw new HttpError(401, "Senha incorreta.");
    }

    const token = jwt.sign(
      {
        id: usuarioEncontrado.id,
        role: usuarioEncontrado.role || "student"
      },
      "senhaSecreta",
      { expiresIn: "1d" }
    );
    // Atualizar o token do usuário
    usuarioEncontrado.token = token;
    await RepositorioDeUsuario.atualizar(usuarioEncontrado.id, { token });

    return token;
  }

  async atualizar(usuarioId, dadosNovos) {
    const usuarioExistente = await RepositorioDeUsuario.buscarPeloId(usuarioId);
    if (!usuarioExistente) {
      throw new HttpError(404, "Usuário não encontrado!");
    }

    const { nome, email, cpf, senha } = dadosNovos;

    const dadosAtualizados = {
      nome: nome ?? usuarioExistente.nome,
      email: email ?? usuarioExistente.email,
      cpf: cpf ?? usuarioExistente.cpf,
      senha: senha ?? usuarioExistente.senha
    };

    return await RepositorioDeUsuario.atualizar(usuarioId, dadosAtualizados);
  }

  async deletar(id) {
    const usuarioExistente = await RepositorioDeUsuario.buscarPeloId(id);
    if (!usuarioExistente) {
      throw new HttpError(404, "Usuário nao encontrado!");
    }

    return await RepositorioDeUsuario.deletarUmUsuario(id);
  }
}

module.exports = new ServicoDeUsuario();

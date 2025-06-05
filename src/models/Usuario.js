const bcrypt = require("bcrypt");

class Usuario {
  static async criptografar(senha) {
    return await bcrypt.hash(senha, 10);
  }

  static async compararSenha(senha, hash) {
    return await bcrypt.compare(senha, hash);
  }
}

module.exports = { Usuario };

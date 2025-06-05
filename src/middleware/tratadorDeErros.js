const { HttpError } = require("../errors/HttpError");

function tratadorDeErros(err, _req, res, _next) {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ erro: err.message });
  }

  console.error("Erro inesperado:", err);
  return res
    .status(500)
    .json(err.message);
}

module.exports = tratadorDeErros;

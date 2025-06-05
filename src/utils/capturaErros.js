function capturaErros(handler) {
  return (req, res, next) => {
    try {
      const resultado = handler(req, res, next);

      if (resultado instanceof Promise) {
        resultado.catch(next);
      }
    } catch (err) {
      next(err);
    }
  };
}

module.exports = capturaErros;

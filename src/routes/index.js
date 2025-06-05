const express = require("express");
const router = express.Router();

const rotasDeUsuario = require("../routes/rotasDeUsuario");

router.get("/", (_req, res) => res.status(200).send("Olá mundo"));

router.use("/usuarios", rotasDeUsuario);

module.exports = router;
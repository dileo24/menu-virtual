const { Router } = require("express");
const allPedidos = require("../middlewares/pedidos/allPedidos");
const createPedido = require("../middlewares/pedidos/createPedido");
const checkAuth = require("../middlewares/auth/auth");
const checkRoleAuth = require("../middlewares/auth/roleAuth");

const router = Router();

router.get("/", allPedidos, async (req, res) => {
  return res.json(req.body.allPedidos);
});

router.post("/", createPedido, async (req, res) => {
  return res.status(200).send(req.body.resultado);
});

module.exports = router;

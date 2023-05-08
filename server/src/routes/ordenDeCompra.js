const { Router } = require("express");

const allOrdenDeCompras = require("../middlewares/ordenDeCompra/allOrdenDeCompras");
const createOrdenDeCompras = require("../middlewares/ordenDeCompra/createOrdenDeCompras");
const deleteOrdenDeCompras = require("../middlewares/ordenDeCompra/deleteOrdenDeCompras");

const router = Router();

router.get("/", allOrdenDeCompras, async (req, res) => {
  return res.json(req.body.allOrdenDeCompras);
});

router.post("/", createOrdenDeCompras, async (req, res) => {
  return res.status(200).send(req.body.resultado);
});

router.delete("/:id", deleteOrdenDeCompras, async (req, res) => {
  return res.json({
    respuesta: `orden de compra con id ${req.body.eliminado} eliminado`,
  });
});

module.exports = router;

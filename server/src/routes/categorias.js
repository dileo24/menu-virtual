const { Router } = require("express");
const allCategory = require("../middlewares/categorias/allCategories");
const createCategory = require("../middlewares/categorias/createCategory");
const deleteCategory = require("../middlewares/categorias/deleteCategory");
const updateCategory = require("../middlewares/categorias/updateCategory");

const router = Router();

router.get("/", allCategory, async (req, res) => {
  return res.json(req.body.allCategories);
});

router.post("/", createCategory, async (req, res) => {
  return res.status(200).send(req.body.resultado);
});

router.delete("/id", deleteCategory, async (req, res) => {
  return res.json({
    respuesta: `categoria con id ${req.body.eliminado} eliminado`,
  });
});

router.put("/id", updateCategory, async (req, res) => {
  return res.json({ respuesta: `Categoria actualizado` });
});
module.exports = router;

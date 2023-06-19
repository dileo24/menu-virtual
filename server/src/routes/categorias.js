const { Router } = require("express");
const allCategory = require("../middlewares/categorias/allCategories");
const createCategory = require("../middlewares/categorias/createCategory");
const deleteCategory = require("../middlewares/categorias/deleteCategory");
const updateCategory = require("../middlewares/categorias/updateCategory");
const checkAuth = require("../middlewares/auth/auth");
const checkRoleAuth = require("../middlewares/auth/roleAuth");

const router = Router();

router.get("/", allCategory, async (req, res) => {
  return res.json(req.body.allCategories);
});

router.post(
  "/",
  checkAuth,
  checkRoleAuth([1, 2]),
  createCategory,
  async (req, res) => {
    return res.status(200).send(req.body.resultado);
  }
);

router.delete(
  "/:id",
  checkAuth,
  checkRoleAuth([1, 2]),
  deleteCategory,
  async (req, res) => {
    return res.json({
      respuesta: `categoria eliminada`,
    });
  }
);

router.put(
  "/:id",
  checkAuth,
  checkRoleAuth([1, 2]),
  updateCategory,
  async (req, res) => {
    return res.json({ respuesta: `Categoria actualizado` });
  }
);
module.exports = router;

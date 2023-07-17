const { Router } = require("express");
const allSubcategory = require("../middlewares/subcategorias/allSubcategories");
const createSubcateg = require("../middlewares/subcategorias/createSubcateg");
const deleteSubcateg = require("../middlewares/subcategorias/deleteSubcateg");
const updateSubcateg = require("../middlewares/subcategorias/updateSubcateg");
const checkAuth = require("../middlewares/auth/auth");
const checkRoleAuth = require("../middlewares/auth/roleAuth");

const router = Router();

router.get("/", allSubcategory, async (req, res) => {
  return res.json(req.body.allSubcategories);
});

router.post(
  "/",
  checkAuth,
  checkRoleAuth([1, 2]),
  createSubcateg,
  async (req, res) => {
    return res.status(200).send(req.body.resultado);
  }
);

router.delete(
  "/:id",
  checkAuth,
  checkRoleAuth([1, 2]),
  deleteSubcateg,
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
  updateSubcateg,
  async (req, res) => {
    return res.json({ respuesta: `Categoria actualizado` });
  }
);

module.exports = router;

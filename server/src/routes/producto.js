const { Router } = require("express");
const allProducts = require("../middlewares/products/allProducts");
const findProductByID = require("../middlewares/products/findProductByID");
const createProduct = require("../middlewares/products/createProducts");
const updateProduct = require("../middlewares/products/updateProducts");
const deleteProduct = require("../middlewares/products/deleteProducts");
const checkAuth = require("../middlewares/auth/auth");
const checkRoleAuth = require("../middlewares/auth/roleAuth");

const router = Router();

router.get("/", allProducts, async (req, res) => {
  return res.json(req.body.allProducts);
});

router.get("/:id", findProductByID, async (req, res) => {
  return res.json(req.body.productById);
});

router.post(
  "/",
  checkAuth,
  checkRoleAuth([2, 1]),
  createProduct,
  async (req, res) => {
    return res.status(200).send(req.body.resultado);
  }
);

router.put("/:id", updateProduct, async (req, res) => {
  return res.json(req.body.resultado);
});

router.delete("/:id", deleteProduct, async (req, res) => {
  return res.json(req.body.resultado);
});

module.exports = router;

const { Router } = require("express");
const allSubcategorys = require("../middlewares/subcategorias/allSubcategorias");

const router = Router();

router.get("/", allSubcategorys, async (req, res) => {
  return res.json(req.body.allSubCategorys);
});

module.exports = router;

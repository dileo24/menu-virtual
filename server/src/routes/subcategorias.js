const { Router } = require("express");
const allSubcategory = require("../middlewares/subcategorias/allSubcategories");

const router = Router();

router.get("/", allSubcategory, async (req, res) => {
  return res.json(req.body.allSubcategories);
});

module.exports = router;

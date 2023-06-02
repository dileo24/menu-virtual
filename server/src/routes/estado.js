const { Router } = require("express");
const allEstados = require("../middlewares/estados/allEstados");

const router = Router();

router.get("/", allEstados, async (req, res) => {
  return res.json(req.body.allEstados);
});

module.exports = router;

const { Router } = require("express");
const allPagos = require("../middlewares/pagos/allPAgos");

const router = Router();

router.get("/", allPagos, async (req, res) => {
  return res.json(req.body.allPagos);
});

module.exports = router;

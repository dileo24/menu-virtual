const { Router } = require("express");
const allRols = require("../middlewares/rols/allRols");

const router = Router();

router.get("/", allRols, async (req, res) => {
  return res.json(req.body.allRols);
});

module.exports = router;

const { Router } = require("express");
const allItemsExtra = require("../middlewares/itemsExtra/allItemsExtra");

const router = Router();

router.get("/", allItemsExtra, async (req, res) => {
  return res.json(req.body.allItemsExtra);
});

module.exports = router;

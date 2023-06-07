const { Router } = require("express");
const allItemsExtra = require("../middlewares/itemsExtra/allItemsExtra");
const createItemsExtra = require("../middlewares/itemsExtra/createItemsExtra");
const checkAuth = require("../middlewares/auth/auth");
const checkRoleAuth = require("../middlewares/auth/roleAuth");

const router = Router();

router.get("/", allItemsExtra, async (req, res) => {
  return res.json(req.body.allItemsExtra);
});

router.post(
  "/",
  checkAuth,
  checkRoleAuth([2, 1]),
  createItemsExtra,
  async (req, res) => {
    return res.status(200).send(req.body.resultado);
  }
);

module.exports = router;

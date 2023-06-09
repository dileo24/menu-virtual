const { Router } = require("express");
const allItemsExtra = require("../middlewares/itemsExtra/allItemsExtra");
const createItemsExtra = require("../middlewares/itemsExtra/createItemsExtra");
const deleteItems = require("../middlewares/itemsExtra/deleteItems");
const updateItem = require("../middlewares/itemsExtra/updateItem");
const checkAuth = require("../middlewares/auth/auth");
const checkRoleAuth = require("../middlewares/auth/roleAuth");
const getItemByID = require("../middlewares/itemsExtra/getItemByID");

const router = Router();

router.get("/", allItemsExtra, async (req, res) => {
  return res.json(req.body.allItemsExtra);
});

router.get("/:id", getItemByID, async (req, res) => {
  return res.json(req.body.itemById);
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

router.put(
  "/:id",
  checkAuth,
  checkRoleAuth([2, 1]),
  updateItem,
  async (req, res) => {
    return res.json(req.body.resultado);
  }
);

router.delete(
  "/:id",
  checkAuth,
  checkRoleAuth([2, 1]),
  deleteItems,
  async (req, res) => {
    return res.json(req.body.resultado);
  }
);

module.exports = router;

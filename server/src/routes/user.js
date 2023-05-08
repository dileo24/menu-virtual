const { Router } = require("express");
const allUsers = require("../middlewares/users/allUsers");
const createUser = require("../middlewares/users/createUser");
const updateUsers = require("../middlewares/users/updateUsers");
const deleteUser = require("../middlewares/users/deleteUser");
const findUserByID = require("../middlewares/users/findUserByID");

const router = Router();

router.get("/", allUsers, async (req, res) => {
  return res.json(req.body.allUsers);
});

router.post("/", createUser, async (req, res) => {
  return res.status(200).send(req.body.resultado);
});
router.get("/:id", findUserByID, async (req, res) => {
  return res.json(req.body.findUserByID);
});

router.put("/:id", updateUsers, async (req, res) => {
  return res.json(req.body.resultado);
});

router.delete("/:id", deleteUser, async (req, res) => {
  return res.json(req.body.eliminado);
});

module.exports = router;

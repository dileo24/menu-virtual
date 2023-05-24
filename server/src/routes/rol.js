const { Router } = require("express");
const allRols = require("../middlewares/rols/allRols");
const createRol = require("../middlewares/rols/createRol");
const updateRol = require("../middlewares/rols/updateRol");
const deleteRol = require("../middlewares/rols/deleteRol");

const router = Router();

router.get("/", allRols, async (req, res) => {
  return res.json(req.body.allRols);
});

router.post("/", createRol, async (req, res) => {
  return res.status(200).send(req.body.resultado);
});

router.put("/:id", updateRol, async (req, res) => {
  return res.json(req.body.resultado);
});

router.delete("/:id", deleteRol, async (req, res) => {
  return res.json(req.body.resultado);
});

module.exports = router;

const { Router } = require("express");
const allUsers = require("../middlewares/users/allUsers");
const login = require("../middlewares/users/login");
const createUser = require("../middlewares/users/createUser");
const updateUsers = require("../middlewares/users/updateUsers");
const deleteUser = require("../middlewares/users/deleteUser");
const findUserByID = require("../middlewares/users/findUserByID");
const checkAuth = require("../middlewares/auth/auth");
const checkRoleAuth = require("../middlewares/auth/roleAuth");

const router = Router();

router.get(
  "/",
  /*  checkAuth, */
  /* checkRoleAuth([2]), */ allUsers,
  async (req, res) => {
    return res.json(req.body.allUsers);
  }
);
router.post("/login", login, async (req, res) => {
  return res.json(req.body);
});

router.post(
  "/register",
  checkAuth,
  checkRoleAuth([1]),
  createUser,
  async (req, res) => {
    return res.status(200).send(req.body.resultado);
  }
);

router.get("/:id", findUserByID, async (req, res) => {
  return res.json(req.body.findUserByID);
});

router.put(
  "/:id",
  checkAuth,
  checkRoleAuth([1]),
  updateUsers,
  async (req, res) => {
    return res.json(req.body.resultado);
  }
);

router.delete(
  "/:id",
  checkAuth,
  checkRoleAuth([1]),
  deleteUser,
  async (req, res) => {
    return res.json(req.body.eliminado);
  }
);

module.exports = router;

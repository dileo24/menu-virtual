const express = require("express");

const User = require("./user");
const Product = require("./producto");
const Rols = require("./rol");
const Categorias = require("./categorias");
const router = express();
router.use(express.json());

// Configurar routers
// router.use('/auth', authRouter);

router.use("/productos", Product);
router.use("/usuarios", User);
router.use("/roles", Rols);
router.use("/categorias", Categorias);
router.all("*", (req, res) => {
  res.redirect("/");
});

module.exports = router;

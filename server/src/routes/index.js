const express = require("express");

const User = require("./user");
const Product = require("./producto");
const Rols = require("./rol");
const Pagos = require("./pago");
const Estados = require("./estado");
const Pedidos = require("./pedido");
const Categorias = require("./categorias");
const Subcategorias = require("./subcategorias");
const router = express();
router.use(express.json());

// Configurar routers
// router.use('/auth', authRouter);

router.use("/productos", Product);
router.use("/usuarios", User);
router.use("/roles", Rols);
router.use("/pedidos", Pedidos);
router.use("/pagos", Pagos);
router.use("/estados", Estados);
router.use("/categorias", Categorias);
router.use("/subcategorias", Subcategorias);
router.all("*", (req, res) => {
  res.redirect("/");
});

module.exports = router;

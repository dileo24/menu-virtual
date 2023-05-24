const express = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const Home = require("./home");
const User = require("./user");
const Product = require("./producto");
const Rols = require("./rol");
const router = express();
const OrdenDeCompra = require("./ordenDeCompra");
router.use(express.json());

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/productos", Product);
router.use("/usuarios", User);
router.use("/roles", Rols);
router.use("/ordenDeCompras", OrdenDeCompra);
router.use("/", Home);
router.all("*", (req, res) => {
  res.redirect("/");
});

module.exports = router;

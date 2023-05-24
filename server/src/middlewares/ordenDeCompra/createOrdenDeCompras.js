const { OrdenDeCompra } = require("../../db");

const createOrdenDeCompras = async (req, res, next) => {
  try {
    const { fecha, retira, destino, descripcion } = req.body;

    if (typeof descripcion === "string") {
      const newOrdenDeCompra = await OrdenDeCompra.create({
        fecha,
        retira,
        destino,
        descripcion,
      });
      next();
    } else {
      throw new Error("datos pasados por body son incorrectos");
    }
  } catch (err) {
    req.body.resultado = { status: "404", respuesta: err.message };

    next();
  }
};
module.exports = createOrdenDeCompras;

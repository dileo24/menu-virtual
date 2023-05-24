const { OrdenDeCompra } = require("../../db");

const allOrdenDeCompras = async (req, res, next) => {
  try {
    const { empresaId } = req.query;
    if (empresaId) {
      req.body.allOrdenDeCompras = await OrdenDeCompra.findAll({
        where: { empresaId: empresaId },
        order: [["id", "DESC"]],
      });
      next();
    } else {
      req.body.allOrdenDeCompras = await OrdenDeCompra.findAll({
        order: [["id", "DESC"]],
      });
      next();
    }
  } catch (err) {
    console.log("error en allOrdenDeCompras");
    res.status(404);
  }
};

module.exports = allOrdenDeCompras;

const { Pedido, Pago } = require("../../db");

const allPagos = async (req, res, next) => {
  try {
    req.body.allPagos = await Pago.findAll({
      include: Pedido,
      order: [["id", "ASC"]],
    });
    next();
  } catch (err) {
    console.log("error en allPagos");
    res.status(404);
  }
};

module.exports = allPagos;

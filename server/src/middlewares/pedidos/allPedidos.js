const { Pedido, Pago } = require("../../db");

const allPedidos = async (req, res, next) => {
  try {
    req.body.allPedidos = await Pedido.findAll({
      order: [["id", "ASC"]],
      include: {
        model: Pago,
      },
    });
    next();
  } catch (err) {
    console.log("error en allPedidos", err);
    res.status(404);
  }
};

module.exports = allPedidos;

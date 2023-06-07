const { Pedido, Pago, Estado } = require("../../db");

const allPedidos = async (req, res, next) => {
  try {
    req.body.allPedidos = await Pedido.findAll({
      order: [["id", "ASC"]],
      /* attributes: { exclude: ["PagoId", "EstadoId"] }, */
      include: [
        {
          model: Pago,
          attributes: ["id", "tipo"],
        },
        {
          model: Estado,
          attributes: ["id", "tipo"],
        },
      ],
    });
    next();
  } catch (err) {
    console.log("error en allPedidos", err);
    res.status(404);
  }
};

module.exports = allPedidos;

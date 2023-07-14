const { Pedido, Estado } = require("../../db");

const allEstados = async (req, res, next) => {
  try {
    req.body.allEstados = await Estado.findAll({
      include: Pedido,
      order: [["id", "ASC"]],
    });
    next();
  } catch (err) {
    console.log("error en allEstados");
    res.status(404);
  }
};

module.exports = allEstados;

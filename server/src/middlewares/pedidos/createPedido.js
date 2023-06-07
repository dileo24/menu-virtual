const { Pedido, Pago, Estado } = require("../../db");

const createPedido = async (req, res, next) => {
  try {
    const { productos, mesa, precio, aclaraciones, itemsExtra, tipoPagoID } =
      req.body;

    const tipoPago = await Pago.findByPk(tipoPagoID);
    const estado = await Estado.findOne({
      where: { id: "1" },
    });

    const newPedido = await Pedido.create({
      productos,
      mesa,
      precio,
      aclaraciones,
      itemsExtra,
    });

    await tipoPago.addPedido(newPedido);
    await estado.addPedido(newPedido);

    req.body.resultado = {
      status: "200",
      respuesta: `el pedido para la mesa ${mesa} está ${estado.tipo}`,
    };

    next();
  } catch (err) {
    console.log("error en createPedido");
    console.log(err.message);
    req.body.resultado = { status: "404", respuesta: err.message };
    console.log(req.body.resultado);
    next();
  }
};

module.exports = createPedido;

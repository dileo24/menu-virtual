const { Pedido, Pago, Estado } = require("../../db");

const createPedido = async (req, res, next) => {
  try {
    const {
      productos,
      mesa,
      precio,
      aclaraciones,
      creacionFecha,
      creacionHora,
      itemsExtra,
      tipoPagoID,
    } = req.body;
    const tipoPago = await Pago.findByPk(tipoPagoID);
    const estado = await Estado.findOne({
      where: { id: "1" },
    });
    const filteredItemsExtra = itemsExtra.filter(
      (subArray) => subArray[0] !== "vacio"
    );
    const itemsExtraJSON = JSON.stringify(filteredItemsExtra);

    const newPedido = await Pedido.create({
      productos,
      mesa,
      precio,
      aclaraciones,
      itemsExtra: itemsExtraJSON,
      creacionFecha,
      creacionHora,
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

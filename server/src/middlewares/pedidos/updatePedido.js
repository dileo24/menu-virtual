const { Pedido, Estado, Pago } = require("../../db");

const updatePedido = async (req, res, next) => {
  try {
    const { productos, mesa, precio, tipoPagoID, estadoID } = req.body;
    const id = req.params.id;
    const pedido = await Pedido.findByPk(id);
    if (pedido !== null) {
      await Pedido.update(
        {
          productos: productos || pedido.productos,
          precio: precio || pedido.precio,
          mesa: mesa || pedido.mesa,
          tipoPagoID: tipoPagoID || pedido.tipoPagoID,
          estadoID: estadoID || pedido.estadoID,
        },
        { where: { id: id } }
      );
      if (estadoID) {
        await pedido.setEstado(await Estado.findByPk(estadoID));
      }
      if (tipoPagoID) {
        await pedido.setPago(await Pago.findByPk(tipoPagoID));
      }
      req.body.resultado = {
        status: "200",
        respuesta: `El pedido ${id} se ha actualizado exitosamente`,
      };
      next();
    } else {
      throw new Error(`Pedido con el ID ${id} no se ha encontrado`);
    }
  } catch (err) {
    console.log("error en updatePedido");
    console.log(err);
    res.status(412).json({ resultado: err });
  }
};

module.exports = updatePedido;

const { Pedido } = require("../../db");

const updatePedido = async (req, res, next) => {
  try {
    const { productos, mesa, precio, tipoPagoID } = req.body;
    const id = req.params.id;
    const pedido = await Pedido.findByPk(id);
    if (pedido.lenght !== 0) {
      await Pedido.update(
        {
          productos: productos || pedido.productos,
          precio: precio || pedido.precio,
          mesa: mesa || pedido.mesa,
          tipoPagoID: tipoPagoID || pedido.tipoPagoID,
        },
        { where: { id: id } }
      );
      req.body.resultado = {
        status: "200",
        respuesta: `El pedido ${nombre} se ha actualizado exitosamente`,
      };
      next();
    } else {
      throw new Error(`pedido con el ${id} no se ha encontrado`);
    }
  } catch (err) {
    console.log("error en updateProduct");
    console.log(err);
    res.status(412).json({ resultado: err });
  }
};

module.exports = updatePedido;

const { Producto, Categoria } = require("../../db");

const createProduct = async (req, res, next) => {
  try {
    const { productos, mesa, precio, tipoPagoID, estado } = req.body;

    const tipoPago = await Categoria.findByPk(tipoPagoID);
    const newProduct = await Producto.create({
      productos,
      mesa,
      precio,
      estado,
    });
    await tipoPago.addProducto(newProduct);
    req.body.resultado = {
      status: "200",
      respuesta: `el pedido para la mesa ${mesa} está en estado ${estado}`,
    };

    next();
  } catch (err) {
    console.log("error en createProduct");
    console.log(err.message);
    req.body.resultado = { status: "404", respuesta: err.message };
    console.log(req.body.resultado);
    next();
  }
};

module.exports = createProduct;

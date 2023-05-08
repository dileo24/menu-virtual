const { Producto, Op } = require("../../db");

const deleteProduct = async (req, res, next) => {
  try {
    const id = req.body.id;
    const producto = await Producto.findOne({ where: { id } });
    if (!producto) {
      throw new Error(`No existe el producto con el ID: ${id}`);
    } else if (producto !== null || producto.id > 0) {
      await Producto.destroy({ where: { id: producto.id } });
      req.body.resultado = {
        status: 200,
        respuesta: `El Producto ${producto.nombre} ah sido eliminado`,
      };
      next();
    } else {
      throw new Error(`No existe el producto con el ID: ${id}`);
    }
  } catch (err) {
    console.log("error en deleteProduct");
    console.log(err);
    req.body.resultado = { status: 404, respuesta: err.message };
    next();
  }
};

module.exports = deleteProduct;

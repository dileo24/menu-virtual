const { Producto, Categoria } = require("../../db");

const createProduct = async (req, res, next) => {
  try {
    const { nombre, descripcion, precio, itemsExtra, categoriaID, imagen, cantidadPersonas } =
      req.body;
    if (typeof nombre !== "string" || nombre === undefined) {
      throw new Error(
        `El Nombre del Producto debe ser unicamente texto, y has insertado ${nombre === undefined ? "texto vacio" : nombre
        }`
      );
    }
    const categoria = await Categoria.findByPk(categoriaID);
    const newProduct = await Producto.create({
      nombre,
      descripcion,
      precio,
      imagen,
      itemsExtra,
      cantidadPersonas
    });
    await categoria.addProducto(newProduct);
    req.body.resultado = {
      status: "200",
      respuesta: `el Producto ${nombre} se ha creado exitosamente`,
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

const { Producto } = require("../../db");

const updateProduct = async (req, res, next) => {
  try {
    const { nombre, imagen, descripcion, precio, itemsExtra, categoriaID, cantidadPersonas } =
      req.body;
    const id = req.params.id;
    const producto = await Producto.findByPk(id);
    if (producto.lenght !== 0) {
      await Producto.update(
        {
          nombre: nombre || producto.nombre,
          precio: precio || producto.precio,
          descripcion: descripcion || producto.descripcion,
          imagen: imagen || producto.imagen,
          itemsExtra: itemsExtra || producto.itemsExtra,
          categoriaID: categoriaID || producto.categoriaID,
          cantidadPersonas: cantidadPersonas || producto.cantidadPersonas,
        },
        { where: { id: id } }
      );
      req.body.resultado = {
        status: "200",
        respuesta: `El producto ${nombre} se ha actualizado exitosamente`,
      };
      next();
    } else {
      throw new Error(`producto con el ${id} no se ha encontrado`);
    }
  } catch (err) {
    console.log("error en updateProduct");
    console.log(err);
    res.status(412).json({ resultado: err });
  }
};

module.exports = updateProduct;

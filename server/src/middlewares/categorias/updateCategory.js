const { Categoria } = require("../../db");

const updateCategory = async (req, res, next) => {
  try {
    const { nombre, descripcion } = req.body;
    const id = req.params.id;
    const categoria = await Categoria.findAll({ where: { id } });
    if (categoria.lenght !== 0) {
      await Categoria.update(
        {
          nombre: nombre || categoria.nombre,
          descripcion: descripcion || categoria.descripcion,
        },
        { where: { id: id } }
      );
      req.body.resultado = {
        status: "200",
        respuesta: `la Categoria ${nombre} se ha actualizado exitosamente`,
      };
      next();
    } else {
      throw new Error(`Categoria con el ${id} no se ah encontrado`);
    }
  } catch (error) {
    res.status(412).json({ resultado: error });
  }
};

module.exports = updateCategory;

const { Subcategoria } = require("../../db");

const updateSubcateg = async (req, res, next) => {
  try {
    const { nombre, descripcion } = req.body;
    const id = req.params.id;
    const subcategoria = await Subcategoria.findAll({ where: { id } });
    if (subcategoria.lenght !== 0) {
      await Subcategoria.update(
        {
          nombre: nombre || subcategoria.nombre,
          descripcion: descripcion || subcategoria.descripcion,
        },
        { where: { id: id } }
      );
      req.body.resultado = {
        status: "200",
        respuesta: `la subcategoria ${nombre} se ha actualizado exitosamente`,
      };
      next();
    } else {
      throw new Error(`subcategoria con el ${id} no se ah encontrado`);
    }
  } catch (error) {
    res.status(412).json({ resultado: error });
  }
};

module.exports = updateSubcateg;

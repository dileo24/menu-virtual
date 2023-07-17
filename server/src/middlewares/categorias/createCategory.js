const { Categoria, Subcategoria } = require("../../db");

const createCategory = async (req, res, next) => {
  try {
    const { nombre, subcategID } = req.body;
    if (nombre === undefined) {
      throw new Error("texto vacio");
    }

    if (!Array.isArray(subcategID)) {
      throw new Error(
        "El campo subcategID debe ser un array de id de subcategorías."
      );
    }

    const subcategorias = await Subcategoria.findAll({
      where: {
        id: subcategID,
      },
    });

    if (subcategorias.length !== subcategID.length) {
      throw new Error(
        "Una o más subcategorías no existen en la base de datos."
      );
    }

    const newCategory = await Categoria.create({
      nombre,
    });

    await newCategory.setSubcategorias(subcategorias);

    req.body.resultado = {
      status: "200",
      data: newCategory,
    };
    next();
  } catch (err) {
    req.body.resultado = { status: "404", respuesta: err.message };
    console.log(req.body.resultado);
    next();
  }
};

module.exports = createCategory;

const { Subcategoria, Categoria } = require("../../db");

const createSubcateg = async (req, res, next) => {
  try {
    const { nombre, categID } = req.body;

    if (typeof nombre === "string") {
      const categoria = await Categoria.findByPk(categID);
      if (!categoria) {
        throw new Error("La categoría especificada no existe.");
      }

      const newSubcateg = await Subcategoria.create({
        nombre,
        categID,
      });

      req.body.resultado = {
        status: "200",
        respuesta: `La subcategoría ${nombre} se ha creado exitosamente!`,
      };
      next();
    } else {
      throw new Error("datos pasados por body son incorrectos");
    }
  } catch (err) {
    req.body.resultado = { status: "404", respuesta: err.message };
    console.log(req.body.resultado);
    next();
  }
};

module.exports = createSubcateg;

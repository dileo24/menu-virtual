const { Categoria } = require("../../db");

const createCategory = async (req, res, next) => {
  try {
    const { nombre } = req.body;
    if (typeof nombre !== "string" || nombre === undefined) {
      throw new Error(
        `El Nombre de la categoria debe ser unicamente texto, y has insertado ${
          nombre === undefined ? "texto vacio" : nombre
        }`
      );
    }

    if (typeof nombre === "string") {
      const newCategory = await Categoria.create({
        nombre,
      });

      req.body.resultado = {
        status: "200",
        respuesta: `La categoria ${nombre} se ha creado exitosamente!`,
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

module.exports = createCategory;

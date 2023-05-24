const { Rol, Op } = require("../../db");

const createRol = async (req, res, next) => {
  try {
    const { rol } = req.body;
    if (typeof rol !== "string" || rol === undefined) {
      throw new Error(
        `El Nombre del Producto debe ser unicamente texto, y has insertado ${
          rol === undefined ? "texto vacio" : rol
        }`
      );
    }
    const newProduct = await Rol.create({
      rol,
    });
    req.body.resultado = {
      status: "200",
      respuesta: `el Rol ${rol} se ha creado exitosamente`,
    };
    next();
  } catch (err) {
    console.log("error en createRol");
    console.log(err.message);
    req.body.resultado = { status: "404", respuesta: err.message };
    console.log(req.body.resultado);
    next();
  }
};

module.exports = createRol;

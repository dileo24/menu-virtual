const { Usuario, Rol } = require("../../db");

const createUser = async (req, res, next) => {
  try {
    let { nombre, apellido, email, clave } = req.body;
    let { rolID } = req.body;

    nombre = nombre[0].toUpperCase() + nombre.slice(1).toLowerCase();
    apellido = apellido[0].toUpperCase() + apellido.slice(1).toLowerCase();
    email = email.toLowerCase();
    const elRol = await Rol.findOne({
      where: { id: rolID },
    });

    if (typeof nombre !== "string" || nombre === undefined) {
      throw new Error(
        `El Nombre del Usuario debe ser unicamente texto, y has insertado ${
          nombre === undefined ? "texto vacio" : nombre
        }`
      );
    }
    if (typeof apellido !== "string" || apellido === undefined) {
      throw new Error(
        `El Apellido del Usuario debe ser unicamente texto, y has insertado ${
          apellido === undefined ? "texto vacio" : apellido
        }`
      );
    }
    if (
      typeof nombre === "string" &&
      typeof apellido === "string" &&
      typeof email === "string" &&
      typeof clave === "string"
    ) {
      let newUser = await Usuario.findOne({
        where: { email },
      });
      if (newUser === null) {
        newUser = await Usuario.create({
          nombre,
          apellido,
          email,
          clave,
        });
      }
      await newUser.setRol(elRol);
      req.body.resultado = {
        respuesta: `el Usuario ${nombre} ${apellido} con email: ${email} y con el rol ${elRol.rol} se ha creado exitosamente!`,
      };
      next();
    } else {
      throw new Error("datos pasados por body son incorrectos");
    }
  } catch (err) {
    req.body.resultado = { status: "404", respuesta: err.message };

    next();
  }
};

module.exports = createUser;

const { Usuario, Rol } = require("../../db");
const { tokenSign } = require("../../helpers/generateToken");
const { encrypt } = require("../../helpers/handleCrypt");

const createUser = async (req, res, next) => {
  try {
    let { nombre, apellido, email, clave } = req.body;
    let { rolID } = req.body;
    const claveHash = await encrypt(clave);

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
          clave: claveHash,
        });
      }
      await newUser.setRol(elRol);

      const tokenSession = await tokenSign(newUser);

      req.body.resultado = {
        data: {
          nombre: newUser.nombre,
          apellido: newUser.apellido,
          email: newUser.email,
          rol: elRol.id,
        },
        tokenSession,
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

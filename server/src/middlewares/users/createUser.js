const { Usuario, Rol, Empresa, Op } = require("../../db");

const createUser = async (req, res, next) => {
  try {
    let { nombre, apellido, email } = req.body;
    let { rolID, empresaID } = req.body;
    //control de Primera letra en Mayusculas y las demas en Minuscula
    nombre = nombre[0].toUpperCase() + nombre.slice(1).toLowerCase();
    apellido = apellido[0].toUpperCase() + apellido.slice(1).toLowerCase();
    email = email.toLowerCase();
    const elRol = await Rol.findOne({
      where: { id: rolID },
    });
    const laEmpresa = await Empresa.findByPk(empresaID);

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
      typeof email === "string"
    ) {
      let newUser = await Usuario.findOne({
        where: { email },
      });
      if (newUser === null) {
        newUser = await Usuario.create({
          nombre,
          apellido,
          email,
          clave: nombre + apellido,
        });
      }
      await newUser.setRol(elRol);
      await laEmpresa.addUsuario(newUser);
      req.body.resultado = {
        status: "200",
        respuesta: `el Usuario ${nombre} ${apellido} con email: ${email} y con el rol ${elRol.rol} se ah creado exitosamente!, asociado a la Empresa: ${laEmpresa.nombre}`,
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

// if (
//   typeof nombre === "string" &&
//   typeof apellido === "string" &&
//   typeof email === "string" &&
//   typeof clave === "string"
// ) {
//   const newUser = await Usuario.create({
//     where: { email },
//     defaults: {
//       nombre,
//       apellido,
//       email,
//       clave,
//     },
//   });
//   // console.log("Usuario", newUser)
//   // console.log("ROL",elRol);
//   // console.log("EMPRESA",laEmpresa);
//   await newUser.setRols(elRol);
//   await newUser.setEmpresa(laEmpresa);

const { Usuario, Rol, Op } = require("../../db");

const updateUser = async (req, res, next) => {
  try {
    const { nombre, apellido, email, clave, bloqueo, rolID } = req.body;
    const id = req.params.id;
    const usuario = await Usuario.findByPk(id);
    if (usuario.lenght !== 0) {
      await Usuario.update(
        {
          nombre: nombre || usuario.nombre,
          apellido: apellido || usuario.apellido,
          email: email || usuario.email,
          clave: clave || usuario.clave,
          bloqueo: bloqueo || usuario.bloqueo,
        },
        { where: { id: id } }
      );
      if (rolID) {
        var rol = await Rol.findByPk(rolID);
        await usuario.setRol(rol);
      }
      req.body.resultado = {
        status: "200",
        respuesta: `el Usuario se ha actualizado exitosamente por el ${
          nombre ? `nombre: ${nombre} ` : ""
        }${apellido ? `apellido: ${apellido} ` : ""}${
          email ? `email: ${email} ` : ""
        }${rolID ? `rol: ${rol.rol}` : ""}`,
      };
      next();
    } else {
      throw new Error(`Usuario con el ID: ${id} no se ha encontrado`);
    }
  } catch (err) {
    console.log("error en updateUser");
    console.log(err);
    req.body.resultado = { status: 404, resultado: err.message };
    next();
  }
};

module.exports = updateUser;

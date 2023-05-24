const { Rol, Op } = require("../../db");

const updateRol = async (req, res, next) => {
  try {
    let { rol } = req.body;
    rol = rol.charAt(0).toUpperCase() + rol.slice(1).toLowerCase();
    const id = req.params.id;
    const idRol = await Rol.findAll({ where: { id } });
    if (idRol.lenght !== 0) {
      await Rol.update(
        {
          rol: rol || idRol.rol,
        },
        { where: { id: id } }
      );
      req.body.resultado = {
        status: "200",
        respuesta: `El Rol ${rol} se ha actualizado exitosamente`,
      };
      next();
    } else {
      throw new Error(`Usuario con el ${id} no se ha encontrado`);
    }
  } catch (err) {
    console.log("error en updateUser");
    console.log(err);
    res.status(412).json({ resultado: err });
  }
};

module.exports = updateRol;

const { Usuario, Rol, Op } = require("../../db");

const allUser = async (req, res, next) => {
  const { clave, email } = req.query;
  try {
    if (clave && email) {
      const allUsers = await Usuario.findOne({
        include: [
          {
            model: Rol,
            attributes: ["id", "rol"],
          },
        ],
        attributes: ["id", "nombre", "apellido", "clave", "email", "bloqueo"],
      });
      req.body.allUsers = { status: allUsers ? 200 : 404, resultado: allUsers };
      next();
    } else {
      const allUsers = await Usuario.findAll({
        include: [
          {
            model: Rol,
            attributes: ["id", "rol"],
          },
        ],
        attributes: ["id", "nombre", "apellido", "clave", "email", "bloqueo"],
      });
      req.body.allUsers = { status: 200, resultado: allUsers };
      next();
    }
  } catch (err) {
    console.log("error en allUser", err.message);
    req.body.allUsers = { status: 404, resultado: err.message };
  }
};

module.exports = allUser;

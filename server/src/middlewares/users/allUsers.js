const { Usuario, Rol, Op } = require("../../db");

const allUser = async (req, res, next) => {
  const { clave, email } = req.query;
  try {
    if (clave && email) {
      /*   const claveHash = functionHash(functionHash(clave)); */
      const allUsers = await Usuario.findOne({
        /* where: {
          [Op.and]: [
            { email: { [Op.iLike]: email } },
          ], 
        },*/
        include: [
          {
            model: Rol,
            attributes: ["id", "rol"],
          },
        ],
        attributes: ["id", "nombre", "apellido", "clave", "email", "bloqueo"],
      });
      // console.log("allusers",allUsers)
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

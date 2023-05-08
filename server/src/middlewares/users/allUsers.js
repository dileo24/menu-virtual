const { Usuario, Empresa, Rol, Op } = require("../../db");

const allUser = async (req, res, next) => {
  const { empresaId, clave, email } = req.query;
  try {
    if (clave && email) {
      // console.log("---Find User by Email and Clave");
      // console.log("email:",email);
      // console.log("clave:",clave);
      // console.log("claveHash1",functionHash(clave))
      // console.log("claveHash2",functionHash(functionHash(clave)))
      const claveHash = functionHash(functionHash(clave));
      const allUsers = await Usuario.findOne({
        where: {
          [Op.and]: [{ email: { [Op.iLike]: email } }, { clave: claveHash }],
        },
        include: [
          {
            model: Empresa,
            attributes: ["id", "nombre"],
          },
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
    } else if (empresaId) {
      const allUsers = await Usuario.findOne({
        where: { EmpresaId: empresaId },
        include: [
          {
            model: Empresa,
            attributes: ["id", "nombre"],
          },
          {
            model: Rol,
            attributes: ["id", "rol"],
          },
        ],
        attributes: ["id", "nombre", "apellido", "clave", "email", "bloqueo"],
      });
      req.body.allUsers = { status: 200, resultado: allUsers };
      next();
    } else {
      const allUsers = await Usuario.findAll({
        include: [
          {
            model: Empresa,
            attributes: ["id", "nombre"],
          },
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

const { verifyToken } = require("../../helpers/generateToken");
const { Usuario } = require("../../db");

const checkRoleAuth = (roles) => async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ").pop();
    const tokenData = await verifyToken(token);
    const userData = await Usuario.findByPk(tokenData.id);
    if ([].concat(roles).includes(userData.RolId)) {
      next();
    } else {
      return res.status(409).send({
        error: userData.RolId + " no es el RolId necesario para esta ruta",
      });
    }
  } catch (error) {
    return res.status(409).send({ error: "No tenés los permisos necesarios!" });
  }
};

module.exports = checkRoleAuth;

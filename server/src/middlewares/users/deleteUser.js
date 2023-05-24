const { Usuario, Op } = require("../../db");

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const usuario = await Usuario.findOne({ where: { id } });
    if (!usuario) {
      throw new Error(`No existe el producto con el ID: ${id}`);
    }
    await Usuario.destroy({ where: { id: usuario.id } });
    req.body.eliminado = {
      status: 200,
      resultado: `el usuario: ${usuario.nombre}, con ID: ${usuario.id} ah sido eliminado`,
    };
    next();
  } catch (err) {
    console.log("error en deleteUser");
    console.log(err);
    req.body.eliminado = { status: 404, resultado: err.message };
    next();
  }
};

module.exports = deleteUser;

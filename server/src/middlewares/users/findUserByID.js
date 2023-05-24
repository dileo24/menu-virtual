const { Usuario } = require("../../db");

const findUserByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    req.body.findUserByID = {
      status: 200,
      resultado: await Usuario.findByPk(id),
    };
    next();
  } catch (err) {
    req.body.findUserByID = { status: 404, resultado: err.message };
  }
};

module.exports = findUserByID;

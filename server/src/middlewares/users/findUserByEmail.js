const { Usuario, Op } = require("../../db");
const functionHash = require("../../functions/hash");

const findUserByEmail = async (req, res, next) => {
  try {
    const email = req.query.email;
    const clave = req.query.clave;
    const claveHash = functionHash(functionHash(clave));
    const resultado = await Usuario.findOne({
      where: {
        [Op.and]: [
          { email: email },
          { clave: claveHash }
        ]
      }
    })
    if(resultado){
      req.body.findUserByEmail = {
        status: 200,
        resultado,
      };
      next();
    }
    else{
      console.log("usuario no encontrado")

      req.body.findUserByEmail = {
        status: 404,
        resultado:"usuario no encontrado",
      };
      next();
    }
  } catch (err) {
    req.body.findUserByEmail = { status: 404, resultado: err.message };
  }
};

module.exports = findUserByEmail;

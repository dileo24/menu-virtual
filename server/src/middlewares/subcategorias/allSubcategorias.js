const { Subcategoria } = require("../../db");

const allSubCategorys = async (req, res, next) => {
  try {
    req.body.allSubCategorys = await Subcategoria.findAll({
      attributes: ["id", "nombre"],
    });
    next();
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = allSubCategorys;

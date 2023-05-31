const { Categoria } = require("../../db");

const allCategory = async (req, res, next) => {
  try {
    req.body.allCategories = await Categoria.findAll({
      attributes: ["id", "nombre"],
      order: [["nombre", "ASC"]],
    });
    next();
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = allCategory;

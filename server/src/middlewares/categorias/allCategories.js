const { Categoria, Subcategoria } = require("../../db");

const allCategory = async (req, res, next) => {
  try {
    req.body.allCategories = await Categoria.findAll({
      attributes: ["id", "nombre"],
      order: [["id", "ASC"]],
      include: [{ model: Subcategoria, as: "subcategoria" }],
    });
    next();
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = allCategory;

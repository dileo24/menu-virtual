const { Categoria, Subcategoria } = require("../../db");

const allSubcategory = async (req, res, next) => {
  try {
    req.body.allSubcategories = await Subcategoria.findAll({
      attributes: ["id", "nombre"],
      order: [["id", "ASC"]],
      include: [{ model: Categoria, as: "categoria" }],
    });
    next();
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = allSubcategory;

const { Subcategoria } = require("../../db");

const allSubcategory = async (req, res, next) => {
  try {
    console.log("buscando subcategs");
    req.body.allSubcategories = await Subcategoria.findAll({
      attributes: ["id", "nombre"],
      order: [["id", "ASC"]],
    });
    next();
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = allSubcategory;

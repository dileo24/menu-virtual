const { Producto, Categoria } = require("../../db");

const allProducts = async (req, res, next) => {
  try {
    req.body.allProducts = await Producto.findAll({
      order: [["id", "ASC"]],
      attributes: { exclude: "categoriaID" },
      include: {
        model: Categoria,
        as: "categoria",
      },
    });
    next();
  } catch (err) {
    console.log("error en allProducts", err);
    res.status(404);
  }
};

module.exports = allProducts;

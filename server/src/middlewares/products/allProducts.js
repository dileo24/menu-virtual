const { Producto, Categoria, Subcategoria } = require("../../db");

const allProducts = async (req, res, next) => {
  try {
    req.body.allProducts = await Producto.findAll({
      order: [["id", "asc"]],
      attributes: { exclude: ["categoriaID", "subcategoriaID"] },
      include: [
        { model: Categoria, as: "categoria" },
        { model: Subcategoria, as: "subcategoria" },
      ],
    });
    next();
  } catch (err) {
    console.log("error en allProducts", err);
    res.status(404);
  }
};

module.exports = allProducts;

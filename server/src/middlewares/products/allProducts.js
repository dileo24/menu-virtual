const { Producto, Categoria, ItemExtra } = require("../../db");

const allProducts = async (req, res, next) => {
  try {
    req.body.allProducts = await Producto.findAll({
      order: [["id", "asc"]],
      attributes: { exclude: ["categoriaID"] },
      include: { model: Categoria, as: "categoria" },
      /* {
          model: ItemExtra,
          as: "ItemExtras",
        }, */
    });
    next();
  } catch (err) {
    console.log("error en allProducts", err);
    res.status(404);
  }
};

module.exports = allProducts;

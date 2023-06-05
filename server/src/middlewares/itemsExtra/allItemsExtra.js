const { Producto, ItemExtra, Categoria } = require("../../db");

const allItemsExtra = async (req, res, next) => {
  try {
    req.body.allItemsExtra = await ItemExtra.findAll({
      /*  include: Producto, */
      attributes: { exclude: ["categoriaID"] },
      include: {
        model: Categoria,
        as: "categoriaItem",
      },
      order: [["precio", "ASC"]],
    });
    console.log("All Items Extra");
    next();
  } catch (err) {
    console.log("error en allItemsExtra");
    res.status(404);
  }
};

module.exports = allItemsExtra;

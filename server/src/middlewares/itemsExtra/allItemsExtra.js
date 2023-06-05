const { Producto, ItemExtra, Categoria } = require("../../db");

const allItemsExtra = async (req, res, next) => {
  try {
    req.body.allItemsExtra = await ItemExtra.findAll({
      /*  include: Producto, */ include: {
        model: Categoria,
        as: "categoriaItem",
      },
      order: [["id", "ASC"]],
    });
    console.log("All Items Extra");
    next();
  } catch (err) {
    console.log("error en allItemsExtra");
    res.status(404);
  }
};

module.exports = allItemsExtra;

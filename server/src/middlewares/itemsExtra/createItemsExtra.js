const { ItemExtra, Categoria, Subcategoria } = require("../../db");

const createItemsExtra = async (req, res, next) => {
  try {
    const {
      nombre,
      descripcion,
      precio,
      listado,
      categoriaID,
      imagen,
      subcategoriaID,
    } = req.body;
    const categoria = await Categoria.findByPk(categoriaID);
    const subcategoria = await Subcategoria.findByPk(subcategoriaID);
    const newItemExtra = await ItemExtra.create({
      nombre,
      descripcion,
      precio,
      imagen,
      listado,
    });
    await categoria.addItemExtra(newItemExtra);
    await subcategoria.addItemExtra(newItemExtra);
    req.body.resultado = {
      status: "200",
      respuesta: `el Item ${nombre} se ha creado exitosamente`,
    };

    next();
  } catch (err) {
    console.log("error en createProduct");
    console.log(err.message);
    req.body.resultado = { status: "404", respuesta: err.message };
    console.log(req.body.resultado);
    next();
  }
};

module.exports = createItemsExtra;

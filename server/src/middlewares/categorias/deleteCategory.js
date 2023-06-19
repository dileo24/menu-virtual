const { Categoria } = require("../../db");

const deleteCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const categoria = await Categoria.findOne({ where: { id } });
    if (!categoria) {
      throw new Error(`No existe la categoria con el ID: ${id}`);
    } else if (categoria !== null || categoria.id > 0) {
      await Categoria.destroy({ where: { id: categoria.id } });
      req.body.resultado = {
        status: 200,
        respuesta: `La categoria ${categoria} ha sido eliminado`,
      };
      next();
    } else {
      throw new Error(`No existe la categ con el ID: ${id}`);
    }
  } catch (err) {
    console.log("error en deleteCategory");
    console.log(err);
    req.body.resultado = { status: 404, respuesta: err.message };
    next();
  }
};

module.exports = deleteCategory;

const { Subcategoria } = require("../../db");

const deleteSubcateg = async (req, res, next) => {
  try {
    const id = req.params.id;
    const subcategoria = await Subcategoria.findOne({ where: { id } });
    if (!subcategoria) {
      throw new Error(`No existe la subcategoria con el ID: ${id}`);
    } else if (subcategoria !== null || subcategoria.id > 0) {
      await Subcategoria.destroy({ where: { id: subcategoria.id } });
      req.body.resultado = {
        status: 200,
        respuesta: `La subcategoria ${subcategoria} ha sido eliminado`,
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

module.exports = deleteSubcateg;

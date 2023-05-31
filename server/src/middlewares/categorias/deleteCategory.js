const { Categoria } = require("../../db");

const deleteCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const categoria = await Categoria.findOne({ where: { id } });
    if (categoria.id > 0) {
      await Categoria.destroy({ where: { id: categoria.id } });
      req.body.eliminado = categoria.id;
      next();
    } else {
      throw new Error(`no existe la categoria con esa ID: ${id}`);
    }
  } catch (error) {
    res.status(404).send(`categoria no encontrada`);
  }
};

module.exports = deleteCategory;

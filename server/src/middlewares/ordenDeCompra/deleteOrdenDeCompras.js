const { OrdenDeCompra } = require("../../db");

const deleteOrdenDeCompras = async (req, res, next) => {
  try {
    const id = req.params.id;
    const OrdenDeCompra = await OrdenDeCompra.findOne({ where: { id } });

    if (!OrdenDeCompra) {
      throw new Error(`No existe la OrdenDeCompra con el ID: ${id}`);
    }
    if (OrdenDeCompra.id > 0) {
      await OrdenDeCompra.destroy({ where: { id: OrdenDeCompra.id } });
      req.body.eliminado = {
        status: 200,
        resultado: `el orden de compra ${OrdenDeCompra.nombre} ah sido eliminado`,
      };
      next();
    } else {
      throw new Error(`no existe el orden de compra con ese ID: ${id}`);
    }
  } catch (err) {
    console.log("error en deleteOrdenDeCompra");
    console.log(err);
    req.body.eliminado = { status: 404, resultado: err.message };
  }
};

module.exports = deleteOrdenDeCompras;

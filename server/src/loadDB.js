const producto = require("./json/productos.json");
const { Producto } = require("./db.js");

async function fnProducto() {
  for (const p of producto) {
    const newProduct = await Producto.create({
      nombre: p.nombre,
      descripcion: p.descripcion,
      precio: p.precio,
    });
  }
}

module.exports = {
  fnProducto,
};

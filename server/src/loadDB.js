const producto = require("./json/productos.json");
const roles = require("./json/roles.json");
const { Producto, Rol } = require("./db.js");

async function fnRols() {
  for (const r of roles) {
    await Rol.create(r);
  }
}

async function fnProducto() {
  for (const p of producto) {
    await Producto.create({
      nombre: p.nombre,
      descripcion: p.descripcion,
      precio: p.precio,
    });
  }
}

module.exports = {
  fnProducto,
  fnRols,
};

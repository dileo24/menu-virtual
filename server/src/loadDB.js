const producto = require("./json/productos.json");
const roles = require("./json/roles.json");
const usuario = require("./json/usuarios.json");
const { Producto, Rol, Usuario } = require("./db.js");

async function fnRols() {
  for (const r of roles) {
    await Rol.create(r);
  }
}

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
  fnRols,
};

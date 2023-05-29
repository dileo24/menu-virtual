const producto = require("./json/productos.json");
const roles = require("./json/roles.json");
const usuario = require("./json/usuarios.json");
const { encrypt } = require("./helpers/handleCrypt");
const { Producto, Usuario, Rol } = require("./db.js");

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

async function fnSuperAdmin() {
  for (const sp of usuario) {
    const user = await Usuario.create({
      nombre: sp.nombre,
      apellido: sp.apellido,
      email: sp.email,
      clave: await encrypt(sp.clave),
      bloqueo: sp.bloqueo,
    });
    const rol = await Rol.findByPk(1);
    await user.setRol(rol);
  }
}

module.exports = {
  fnProducto,
  fnRols,
  fnSuperAdmin,
};

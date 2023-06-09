const producto = require("./json/productos.json");
const roles = require("./json/roles.json");
const itemsExtra = require("./json/itemsExtra.json");
const usuario = require("./json/usuarios.json");
const pagos = require("./json/pagos.json");
const estados = require("./json/estados.json");
const pedidos = require("./json/pedidos.json");
const { encrypt } = require("./helpers/handleCrypt");
const {
  Producto,
  Usuario,
  Rol,
  Categoria,
  Pago,
  Pedido,
  Estado,
  ItemExtra,
} = require("./db.js");
const categoria = require("./json/categorias.json");

async function fnRols() {
  for (const r of roles) {
    await Rol.create(r);
  }
}

async function fnPagos() {
  for (const p of pagos) {
    await Pago.create(p);
  }
}

async function fnEstado() {
  for (const e of estados) {
    await Estado.create(e);
  }
}
async function fnCategorias() {
  for (const cat of categoria) {
    await Categoria.create(cat);
  }
}
async function fnItemExtra() {
  for (const item of itemsExtra) {
    const newItem = await ItemExtra.create({
      nombre: item.nombre,
      descripcion: item.descripcion,
      precio: item.precio,
      listado: item.listado,
      mostrarPersonaItem: item.mostrarPersonaItem,
      mostarOtroCheckbox: item.mostarOtroCheckbox,
    });

    const categoria = await Categoria.findByPk(item.categoriaID);
    await categoria.addItemExtra(newItem);
  }
}

async function fnProducto() {
  for (const p of producto) {
    const newProduct = await Producto.create({
      nombre: p.nombre,
      descripcion: p.descripcion,
      precio: p.precio,
      itemsExtra: p.itemsExtra,
      cantidadPersonas: p.cantidadPersonas,
    });

    const categoria = await Categoria.findByPk(p.categoriaID);
    await categoria.addProducto(newProduct);
    /* console.log(p.itemExtraID);
    const itemExtras = await ItemExtra.findAll({
      where: {
        id: p.itemExtraID,
      },
    });
    console.log("Cantidad de itemExtras encontrados:", itemExtras.length);

    for (const itemExtra of itemExtras) {
      console.log(itemExtra);
      await itemExtra.addProducto(newProduct);
    } */
  }
}

async function fnPedidos() {
  for (const ped of pedidos) {
    const newPedido = await Pedido.create({
      productos: ped.productos,
      mesa: ped.mesa,
      precio: ped.precio,
      aclaraciones: ped.aclaraciones,
      itemsExtra: ped.itemsExtra,
      creacionFecha: ped.creacionFecha,
    });
    const tipoPago = await Pago.findByPk(ped.tipoPagoID);
    const estado = await Estado.findByPk(ped.estadoID);
    await estado.addPedido(newPedido);
    await tipoPago.addPedido(newPedido);
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
  fnCategorias,
  fnPagos,
  fnEstado,
  fnPedidos,
  fnItemExtra,
};

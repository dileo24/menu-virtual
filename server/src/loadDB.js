const producto = require("./json/productos.json");
const roles = require("./json/roles.json");
const usuario = require("./json/usuarios.json");
const pagos = require("./json/pagos.json");
const estados = require("./json/estados.json");
const pedidos = require("./json/pedidos.json");
const subcategoria = require("./json/subcategorias.json");
const { encrypt } = require("./helpers/handleCrypt");
const {
  Producto,
  Usuario,
  Rol,
  Categoria,
  Subcategoria,
  Pago,
  Pedido,
  Estado,
} = require("./db.js");
const categorias = require("./json/categorias.json");

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
  for (const cat of categorias) {
    await Categoria.create(cat);
  }
}

async function fnSubcategorias() {
  for (const subc of subcategoria) {
    const newSubcateg = await Subcategoria.create({
      nombre: subc.nombre,
    });
    let categoria = await Categoria.findByPk(subc.categID);
    await categoria.addSubcategoria(newSubcateg);
  }
}

async function SubcategEnCateg() {
  for (const cat of categorias) {
    let categoria = await Categoria.findOne({ where: { nombre: cat.nombre } });

    if (cat.subcategID && Array.isArray(cat.subcategID)) {
      for (const subcategID of cat.subcategID) {
        let subcategoria = await Subcategoria.findByPk(subcategID);
        if (subcategoria) {
          console.log(
            "agregando " + categoria.nombre + " a " + subcategoria.nombre
          );
          await categoria.addSubcategoria(subcategoria);
        } else {
          console.warn(`Subcategoria con ID ${subcategID} no encontrada.`);
        }
      }
    }
  }
}

async function fnProducto() {
  for (const p of producto) {
    const newProduct = await Producto.create({
      nombre: p.nombre,
      item: p.item,
      descripcion: p.descripcion,
      precio: p.precio,
      itemsExtra: p.itemsExtra,
      cantidadPersonas: p.cantidadPersonas,
      listado: p.listado,
      mostrarPersonaItem: p.mostrarPersonaItem,
      mostrarOtroCheckbox: p.mostrarOtroCheckbox,
    });
    const categoria = await Categoria.findByPk(p.categoriaID);
    if (p.subcategoriaID !== "") {
      let subcategoria = await Subcategoria.findByPk(p.subcategoriaID);
      await subcategoria.addProducto(newProduct);
    }
    await categoria.addProducto(newProduct);
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
      creacionHora: ped.creacionHora,
    });
    const tipoPago = await Pago.findByPk(ped.tipoPagoID);
    const estado = await Estado.findByPk(ped.estadoID);
    await estado.addPedido(newPedido);
    await tipoPago.addPedido(newPedido);
  }
}

async function fnUsuarios() {
  for (const sp of usuario) {
    const user = await Usuario.create({
      nombre: sp.nombre,
      apellido: sp.apellido,
      email: sp.email,
      clave: await encrypt(sp.clave),
      bloqueo: sp.bloqueo,
    });
    const rol = await Rol.findByPk(sp.rolID);
    await user.setRol(rol);
  }
}

module.exports = {
  fnProducto,
  fnRols,
  fnUsuarios,
  fnCategorias,
  fnPagos,
  fnEstado,
  fnPedidos,
  fnSubcategorias,
  SubcategEnCateg,
};

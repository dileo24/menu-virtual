require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY } = process.env;

// Local
// const sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/menu-virtual`,
//   {
//     logging: false, // set to console.log to see the raw SQL queries
//     native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//   }
// );

// Deploy
const sequelize = new Sequelize(DB_DEPLOY, {
  logging: false,
  native: false,
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const {
  Categoria,
  Rol,
  Usuario,
  Producto,
  Pago,
  Pedido,
  Estado,
  Subcategoria,
} = sequelize.models; // añadir modelos

// Aca vendrian las relaciones

Rol.hasMany(Usuario);
Usuario.belongsTo(Rol);

Pago.hasMany(Pedido);
Pedido.belongsTo(Pago);

Estado.hasMany(Pedido);
Pedido.belongsTo(Estado);

Categoria.hasMany(Producto, {
  foreignKey: "categoriaID",
});
Producto.belongsTo(Categoria, {
  foreignKey: "categoriaID",
  as: "categoria",
});

Producto.belongsTo(Subcategoria, {
  foreignKey: "subcategoriaID",
  as: "subcategoria",
});
Subcategoria.hasMany(Producto, {
  foreignKey: "subcategoriaID",
});

Categoria.hasMany(Subcategoria, {
  foreignKey: "categID",
  as: "subcategorias",
});
Subcategoria.belongsTo(Categoria, {
  foreignKey: "categID",
  as: "categoria",
});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importar la conexión { conn } = require('./db.js');
};

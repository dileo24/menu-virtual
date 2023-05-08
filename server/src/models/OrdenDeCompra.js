const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("OrdenDeCompra", {
    //id se crea automatico
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    fecha: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    retira: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destino: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

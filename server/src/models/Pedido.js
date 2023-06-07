const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Pedido",
    {
      //id se crea automatico
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },
      mesa: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      precio: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      aclaraciones: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
};

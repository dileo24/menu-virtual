const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Producto",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      precio: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },
      itemsExtra: {
        type: DataTypes.BOOLEAN,
      },
      imagen: {
        type: DataTypes.TEXT,
        validate: {
          isUrl: true,
        },
        /* defaultValue:
          "https://images.vexels.com/media/users/3/251903/isolated/preview/2a17d1b6d0fe74069965b267b75a5a4c-18-alimentos-comidas-planowashinkcontouroverlay-vinylcolor-13.png",
       */
      },
    },
    {
      timestamps: false,
    }
  );
};

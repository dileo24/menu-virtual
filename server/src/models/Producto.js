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
      item: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      combo: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      cantidadPersonas: {
        type: DataTypes.STRING,
        defaultValue: "1",
        allowNull: false,
      },
      precio: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "",
      },
      itemsExtra: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      imagen: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      mostrarPersonaItem: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: true,
      },
      mostrarOtroCheckbox: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      listado: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      imagen: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          isUrl: true, //por si es un link
          isImage(value) {
            //por si es un archivo
            if (value) {
              const supportedFormats = ["png", "jpg", "jpeg"];
              const extension = value.split(".").pop().toLowerCase();
              if (!supportedFormats.includes(extension)) {
                throw new Error("Formato de imagen no soportado");
              }
            }
          },
        },
      },
    },
    {
      timestamps: false,
    }
  );
};

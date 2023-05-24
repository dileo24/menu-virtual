const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Usuario",
    {
      //id se crea automatico
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
      apellido: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: {
            msg: "El Formato del Email no es el correcto",
          },
        },
      },
      clave: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [5, 20],
            msg: "La Clave debe ser entre 5 a 20 caracteres",
          },
        },
      },
      imagen: {
        type: DataTypes.TEXT, //puse .text para que cuando se ponga una imagen me permita mas caracteres para poner un link largo
        allowNull: true,
        defaultValue: "https://www.softzone.es/app/uploads/2018/04/guest.png",
      },
      bloqueo: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false, //El default es por si no le pasan algo por body, setea ese valor por defecto
      },
    },
    {
      timestamps: false,
    }
  );
};

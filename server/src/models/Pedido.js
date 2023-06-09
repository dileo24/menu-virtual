const { DataTypes } = require("sequelize");
const { format } = require("date-fns");

module.exports = (sequelize) => {
  sequelize.define(
    "Pedido",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },
      productos: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      itemsExtra: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
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
      creacionFecha: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      creacionFecha: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      actualizacionFecha: {
        type: DataTypes.STRING,
        allowNull: true,
      } /* 
      creacionHora: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        get() {
          const rawValue = this.getDataValue("createdAt");
          if (rawValue) {
            return format(rawValue, "HH:mm");
          }
          return null;
        },
      },
      actualizacionFecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        get() {
          const rawValue = this.getDataValue("updatedAt");
          if (rawValue) {
            return format(rawValue, "dd/MM/yyyy");
          }
          return null;
        },
      },

      actualizacionHora: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        get() {
          const rawValue = this.getDataValue("updatedAt");
          if (rawValue) {
            return format(rawValue, "HH:mm");
          }
          return null;
        },
      }, */,
    },
    {
      timestamps: false,
    }
  );
};

const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Themes = sequelize.define(
  "themes",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    theme: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
    tableName: 'themes',
  }
);

module.exports = Themes;

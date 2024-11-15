const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Tags = sequelize.define(
  "tags",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    tag: {
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
    tableName: 'tags',
  }
);

module.exports = Tags;

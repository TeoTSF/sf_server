const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Users = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    documentNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    resetCode: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    passwordChangeAt: {
      type: DataTypes.INTEGER,
      allowNull: true
  },
    signDeclare: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
    createdAt: true,
    tableName: 'users',
  }
);

Users.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  delete values.password;
  delete values.createdAt;
  delete values.resetCode;
  delete values.passwordChangeAt;  
  return values;
};

Users.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});


module.exports = Users;

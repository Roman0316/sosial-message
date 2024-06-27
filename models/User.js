const { DataTypes } = require('sequelize');
const { v4: uuid } = require('uuid');

const BaseModel = require('./BaseModel');
const { userRoles } = require('../constants/index');

module.exports = class User extends BaseModel {
  static modelName = 'user';

  static tableName = 'users';

  static protectedKeys = ['createdAt', 'updatedAt'];

  static Schema = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      protected: true,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(userRoles)),
      defaultValue: userRoles.user,
      allowNull: false,
    },
  };
};

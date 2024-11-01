const { DataTypes } = require('sequelize');

const BaseModel = require('./BaseModel');

module.exports = class ActionHistory extends BaseModel {
  static modelName = 'authHistory';

  static tableName = 'authHistorys';

  static protectedKeys = ['createdAt', 'updatedAt'];

  static Schema = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };
};

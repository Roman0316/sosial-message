const { DataTypes } = require('sequelize');

const BaseModel = require('./BaseModel');

module.exports = class ActionHistory extends BaseModel {
  static modelName = 'profileHistory';

  static tableName = 'profileHistorys';

  static protectedKeys = ['createdAt', 'updatedAt'];

  static Schema = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };
};

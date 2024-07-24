// const { DataTypes } = require('sequelize');

const BaseModel = require('./BaseModel');

module.exports = class Like extends BaseModel {
  static modelName = 'like';

  static tableName = 'likes';

  static protectedKeys = ['createdAt'];

  static schema = {};

  static associate(models) {
    Like.belongsTo(models.post, {
      foreignKey: 'postId',
      allowNull: false,
      onDelete: 'CASCADE',
    });

    Like.belongsTo(models.user, {
      foreignKey: 'userId',
      allowNull: true,
      onDelete: 'CASCADE',
    });
  }
};

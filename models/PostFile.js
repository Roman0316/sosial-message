const { DataTypes } = require('sequelize');

const BaseModel = require('./BaseModel');

module.exports = class PostFile extends BaseModel {
  static modelName = 'postFile';

  static tableName = 'postFiles';

  static protectedKeys = ['createdAt', 'updatedAt'];

  static Schema = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  };

  static associate(models) {
    PostFile.belongsTo(models.post, {
      foreignKey: 'postId',
    });
    PostFile.belongsTo(models.file, {
      foreignKey: 'fileId',
      allowNull: false,
      onDelete: 'CASCADE',
    });
  }
};

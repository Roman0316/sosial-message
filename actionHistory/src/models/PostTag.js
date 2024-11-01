const { DataTypes } = require('sequelize');

const BaseModel = require('./BaseModel');

module.exports = class PostTag extends BaseModel {
  static modelName = 'postTag';

  static tableName = 'postTags';

  static protectedKeys = ['createdAt', 'updatedAt'];

  static Schema = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  };

  static associate(models) {
    PostTag.belongsTo(models.post, {
      foreignKey: 'postId',
    });
    PostTag.belongsTo(models.tag, {
      foreignKey: 'tagId',
      allowNull: false,
      onDelete: 'CASCADE',
    });
  }
};

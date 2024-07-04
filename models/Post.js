const { DataTypes } = require('sequelize');

const BaseModel = require('./BaseModel');

module.exports = class Post extends BaseModel {
  static modelName = 'post';

  static tableName = 'posts';

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
      references: {
        model: { tableName: 'users' },
        key: 'id',
      },
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  };

  static associate(models) {
    Post.belongsTo(models.user, {
      foreignKey: 'userId',
    });

    Post.hasMany(models.postTag, {
      foreignKey: 'postId',
      allowNull: false,
    });

    Post.belongsToMany(models.tag, {
      foreignKey: {
        name: 'postId',
        allowNull: false,
      },
      through: models.postTag,
    });
  }
};

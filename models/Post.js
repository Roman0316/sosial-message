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
      allowNull: true,
      references: {
        model: { tableName: 'users' },
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  };

  static associate(models) {
    Post.belongsTo(models.user, {
      foreignKey: {
        name: 'userId',
        allowNull: true,
      },
    });

    Post.hasMany(models.postTag, {
      foreignKey: 'postId',
      allowNull: false,
    });

    Post.hasMany(models.like, {
      foreignKey: 'postId',
      allowNull: false,
    });

    Post.hasMany(models.postFile, {
      foreignKey: 'postId',
      allowNull: false,
    });

    Post.belongsToMany(models.file, {
      foreignKey: {
        name: 'postId',
        allowNull: false,
      },
      through: models.postFile,
    });

    Post.belongsToMany(models.tag, {
      foreignKey: {
        name: 'postId',
        allowNull: false,
      },
      through: models.postTag,
    });

    Post.belongsToMany(models.user, {
      foreignKey: {
        name: 'userId',
        allowNull: true,
      },
      through: models.like,
    });
  }
};

const { DataTypes } = require('sequelize');

const BaseModel = require('./BaseModel');

module.exports = class Tag extends BaseModel {
  static modelName = 'tag';

  static tableName = 'tags';

  static protectedKeys = ['createdAt', 'updatedAt'];

  static Schema = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    value: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  };

  static associate(models) {
    Tag.hasMany(models.postTag, {
      foreignKey: 'tagId',
      allowNull: false,
    });

    Tag.belongsToMany(models.post, {
      foreignKey: {
        name: 'tagId',
        allowNull: false,
      },
      through: models.postTag,
    });
  }
};

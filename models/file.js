const { DataTypes } = require('sequelize');

const BaseModel = require('./BaseModel');

module.exports = class File extends BaseModel {
  static modelName = 'file';

  static tableName = 'files';

  static protectedKeys = ['createdAt', 'updatedAt'];

  static Schema = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mimeType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    s3Key: {
      type: DataTypes.STRING,
      allowNull: false,

    },
  };

  static associate(models) {
    File.hasMany(models.postFile, {
      foreignKey: 'fileId',
      allowNull: false,
    });

    File.belongsToMany(models.post, {
      foreignKey: {
        name: 'fileId',
        allowNull: false,
      },
      through: models.postFile,
    });
  }
};

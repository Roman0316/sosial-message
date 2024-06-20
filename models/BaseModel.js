const { Model } = require('sequelize');
const { NotFound } = require('http-errors');

module.exports = class BaseModel extends Model {
  static modelName = 'baseModel';

  static tableName = 'baseModels';

  static associationScopes = {};

  static dateKeys = ['createdAt', 'updatedAt', 'deletedAt'];

  static initialize(sequelize) {
    super.init(this.Schema, {
      modelName: this.modelName,
      tableName: this.tableName,
      sequelize,
    });
  }

  static async findOneOrFail(where, options = {}) {
    const doc = await this.findOne({ where, ...options });
    if (!doc) {
      throw new NotFound(this.modelName);
    }
    return doc;
  }
};

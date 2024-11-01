const { Model } = require('sequelize');
const { NotFound } = require('http-errors');

module.exports = class BaseModel extends Model {
  static modelName = 'baseModel';

  static tableName = 'baseModels';

  static associationScopes = {};

  static dateKeys = ['createdAt', 'updatedAt', 'deletedAt'];

  static Settings = {};

  static initialize(sequelize) {
    super.init(this.Schema, {
      modelName: this.modelName,
      tableName: this.tableName,
      ...this.Settings,
      sequelize,
    });
  }

  /**
   * @param {object} options
   * @param {object=} options.where
   * @param {array<object>=} options.include
   * @param {array<string>=} options.attributes
   */
  static async findOneOrFail(options = {}) {
    const doc = await this.findOne(options);
    if (!doc) {
      throw new NotFound(this.modelName);
    }
    return doc;
  }
};

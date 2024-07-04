const { Sequelize } = require('sequelize');
const { dbConfig } = require('../config/dotenv');

const {
  User, Post, Tag, PostTag,
} = require('../models/index');

const {
  host, user, database, password, port, dialect,
} = dbConfig;

const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect,
});

// initialize models
User.initialize(sequelize);
Post.initialize(sequelize);
Tag.initialize(sequelize);
PostTag.initialize(sequelize);

// associate models
User.associate(sequelize.models);
Post.associate(sequelize.models);
Tag.associate(sequelize.models);
PostTag.associate(sequelize.models);

module.exports = {
  sequelize,
  User,
  Post,
  Tag,
};

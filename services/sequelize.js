const { Sequelize } = require('sequelize');
const { dbConfig } = require('../config/dotenv');

const {
  User, Post, Tag, PostTag, Like, File, PostFile,
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
Like.initialize(sequelize);
File.initialize(sequelize);
PostFile.initialize(sequelize);

// associate models
User.associate(sequelize.models);
Post.associate(sequelize.models);
Tag.associate(sequelize.models);
PostTag.associate(sequelize.models);
Like.associate(sequelize.models);
File.associate(sequelize.models);
PostFile.associate(sequelize.models);

module.exports = {
  Sequelize,
  sequelize,
  User,
  Post,
  Tag,
  Like,
};

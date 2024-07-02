const { Sequelize } = require('sequelize');
const { dbConfig } = require('../config/dotenv');

const { User, Post } = require('../models/index');

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

// associate models
User.associate(sequelize.models);
Post.associate(sequelize.models);

module.exports = {
  sequelize,
  User,
  Post,
};

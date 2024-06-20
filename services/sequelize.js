const { Sequelize } = require('sequelize');
const { dbConfig } = require('../config/dotenv');

const User = require('../models/User');

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

module.exports = {
  sequelize,
  User,
};

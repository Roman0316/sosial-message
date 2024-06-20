require('dotenv').config();

const dbConfig = {
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  dialect: 'postgres',
};

const PORT = process.env.API_PORT;

// sequelize cli required environments
const production = dbConfig;
const development = dbConfig;

module.exports = {
  dbConfig,
  PORT,
  production,
  development,
};

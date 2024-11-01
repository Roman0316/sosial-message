require('dotenv').config();

// API PORT
const PORT = process.env.API_PORT;

const dbConfig = {
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  dialect: 'postgres',
};

// sequelize cli required environments
const production = dbConfig;
const development = dbConfig;

module.exports = {
  dbConfig,
  PORT,
  production,
  development,
};

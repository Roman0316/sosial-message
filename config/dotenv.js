require('dotenv').config();

const PORT = process.env.API_PORT;

const secret = process.env.JWT_ACCESS_SECRET_KEY;

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
  secret,
};

require('dotenv').config();

// API PORT
const PORT = process.env.API_PORT;

// JWT Secret
const secret = process.env.JWT_ACCESS_SECRET_KEY;

// First Admin
const admin = {
  firstName: process.env.ADMIN_FIRST_NAME,
  lastName: process.env.ADMIN_LAST_NAME,
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
};

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

// S3 Minio
const s3Config = {
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_KEY,
  endpoint: process.env.S3_EXTERNAL_ENDPOINT,
  s3ForcePathStyle: true,
  signatureVersion: 'v4',
};

module.exports = {
  dbConfig,
  s3Config,
  PORT,
  production,
  development,
  secret,
  admin,
};

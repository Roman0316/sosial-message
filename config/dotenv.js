require('dotenv').config();

// API PORT
const PORT = process.env.API_PORT;

// JWT Secret
const secret = process.env.JWT_ACCESS_SECRET_KEY;
const EX = process.env.TOKEN_EXPIRATION;

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

// Redis
const redisConfig = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
};

// sequelize cli required environments
const production = dbConfig;
const development = dbConfig;

// S3 Minio
const s3Config = {
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_KEY,
  region: 'us-east-1',
  endpoint: process.env.S3_EXTERNAL_ENDPOINT,
  bucket: process.env.S3_BUCKET_NAME,
  s3ForcePathStyle: true,
  signatureVersion: 'v4',
};

module.exports = {
  dbConfig,
  redisConfig,
  s3Config,
  PORT,
  production,
  development,
  secret,
  admin,
  EX,
};

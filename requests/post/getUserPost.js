const { query } = require('express-validator');

const getUserPostRequest = [
  query('userId').exists().isUUID(),
];

module.exports = getUserPostRequest;

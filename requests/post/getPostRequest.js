const { query } = require('express-validator');

const getPostRequest = [
  query('userId').exists().isUUID(),
];

module.exports = getPostRequest;

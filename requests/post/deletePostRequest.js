const { query } = require('express-validator');

const deletePostRequest = [
  query('userId').exists().isUUID(),
];

module.exports = deletePostRequest;

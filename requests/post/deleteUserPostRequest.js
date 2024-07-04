const { query } = require('express-validator');

const deleteUserPostRequest = [
  query('userId').exists().isUUID(),
];

module.exports = deleteUserPostRequest;

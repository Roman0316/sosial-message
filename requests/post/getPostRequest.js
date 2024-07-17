const { param } = require('express-validator');

const getPostRequest = [
  param('userId').isUUID(),
];

module.exports = getPostRequest;

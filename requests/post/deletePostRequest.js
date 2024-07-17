const { param } = require('express-validator');

const deletePostRequest = [
  param('postId').exists().isUUID(),
];

module.exports = deletePostRequest;

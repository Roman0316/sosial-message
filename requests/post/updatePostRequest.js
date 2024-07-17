const { query, body } = require('express-validator');

const updatePostRequest = [
  query('postId').exists().isUUID(),
  body('text').isString().trim(),

];

module.exports = updatePostRequest;

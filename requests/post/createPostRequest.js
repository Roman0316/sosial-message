const { body } = require('express-validator');

const createPostRequest = [
  body('text').isString().trim(),
  body('tags').isString().trim(),
];

module.exports = createPostRequest;

const { query, body } = require('express-validator');

const changeUserPostRequest = [
  query('userId').exists().isUUID(),
  body('title').isString().isLength({ max: 255 })
    .withMessage('The title cannot be more than 255 characters')
    .trim(),
  body('content').isString().trim(),
  body('imageUrl').isString().isURL().withMessage('Wrong Url')
    .trim(),
  body('videoUrl').isString().isURL().withMessage('Wrong Url')
    .trim(),
  body('tags').isString().trim(),

];

module.exports = changeUserPostRequest;

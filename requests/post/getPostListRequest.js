const { query } = require('express-validator');

const getPostListRequest = [
  query('tag').isString().trim(),
  query('limit').default(20).isInt({ min: 1, max: 200 }).toInt(),
  query('offset').default(0).isInt({}).toInt(),
  query('typeOfSort').default('ASC')
    .isString()
    .trim()
    .isLength({ min: 3, max: 255 })
    .withMessage('The isAsc cannot be less than 3 and more than 255 characters'),
  query('userId').isUUID().trim(),
];

module.exports = getPostListRequest;

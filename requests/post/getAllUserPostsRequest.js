const { body } = require('express-validator');

const getAllUserPostsRequest = [
  body('typeOfSort').default('ASC')
    .isString()
    .trim()
    .isLength({ max: 4 })
    .withMessage('The typeOfSort cannot be more than 4 characters'),
];

module.exports = getAllUserPostsRequest;

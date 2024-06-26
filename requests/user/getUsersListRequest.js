const { query } = require('express-validator');

const getUsersListRequest = [
  query('orderBy')
    .default('firstName')
    .isString()
    .trim()
    .isLength({ max: 255 })
    .withMessage('The first name cannot be less than 1 and more than 255 characters'),
  query('typeOfSort')
    .default('ASC')
    .isString()
    .trim()
    .isLength({ min: 3, max: 255 })
    .withMessage('The isAsc cannot be less than 3 and more than 255 characters'),
];

module.exports = getUsersListRequest;

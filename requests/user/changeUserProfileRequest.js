const { body } = require('express-validator');

const changeUserProfileRequset = [
  body('firstName').exists().isString().isLength({ min: 1, max: 255 })
    .withMessage('The first name cannot be less than 1 and more than 20 characters')
    .trim(),
  body('lastName').exists().isString().isLength({ min: 1, max: 255 })
    .withMessage('The last name cannot be less than 1 and more than 20 characters')
    .trim(),
];

module.exports = changeUserProfileRequset;

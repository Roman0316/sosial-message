const { body } = require('express-validator');

const passwordSchema = require('./passwordSchema');

const registrationRequest = [
  body('firstName').exists().isString().isLength({ min: 1, max: 255 })
    .withMessage('The first name cannot be less than 1 and more than 20 characters')
    .trim(),
  body('email').exists().trim().isEmail()
    .withMessage('Wrong email'),
  body('password').exists().trim(),
  passwordSchema,
];

module.exports = registrationRequest;

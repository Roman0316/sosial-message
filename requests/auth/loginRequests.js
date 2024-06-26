const { body } = require('express-validator');

const loginRequest = [
  body('email').exists().trim().isEmail()
    .withMessage('Wrong email'),
  body('password').exists().isString().trim(),
];

module.exports = loginRequest;

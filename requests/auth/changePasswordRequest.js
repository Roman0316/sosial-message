const { body } = require('express-validator');

const passwordSchema = require('./passwordSchema');

const changePasswordRequest = [
  body('currentPassword').exists().trim(),
  passwordSchema,
];

module.exports = changePasswordRequest;

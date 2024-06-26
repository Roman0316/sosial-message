const { body } = require('express-validator');

const passwordSchema = body('password')
  .isString()
  .isLength({ min: 8, max: 64 })
  .withMessage('minLength: 8, maxLength: 64')
  .matches(/^[^\s]+$/)
  .withMessage('No spaces')
  .matches(/[\d.@#$%^&*!]/)
  .withMessage('Must contain a number: [0-9], or special characters: [.@#$%^&*!]');

module.exports = passwordSchema;

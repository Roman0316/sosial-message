const { BadRequest } = require('http-errors');
const { validationResult, matchedData } = require('express-validator');

const ErrorMessages = require('../constants/errorMessages');

function getErrorMessage(errors) {
  const {
    value, msg, param, location,
  } = errors[0];
  const details = `param: ${param}, location: ${location}`;
  if (value === undefined) {
    const errorMessage = `${ErrorMessages.missing_required_field.charAt(0).toUpperCase() + ErrorMessages.missing_required_field.slice(1)}`;
    return `${errorMessage.replace(/_/g, ' ')}; ${details}`;
  }
  return `${msg}; ${details}`;
}

module.exports = function validateRequest(validationSchema = []) {
  return [...validationSchema, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new BadRequest(getErrorMessage(errors.array())));
    }
    req.data = matchedData(req);
    return next();
  }];
};

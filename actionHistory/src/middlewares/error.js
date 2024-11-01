const { NotFound } = require('http-errors');

// eslint-disable-next-line no-unused-vars
module.exports = function ErrorHandler(err, req, res, next) {
  let { message, statusCode } = err;

  if (!statusCode) {
    statusCode = 500;
  }

  if (err instanceof NotFound) {
    message = `${message} not found`;
  }

  if (statusCode >= 500) {
    // eslint-disable-next-line no-console
    console.error(err);
    message = 'Internal Server Error';
  }

  res.status(statusCode).json({ message });
};

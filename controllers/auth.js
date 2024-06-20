const { BadRequest } = require('http-errors');

const User = require('../models/User');
const ErrorMessages = require('../constants/errorMessages');
const { hashPassword } = require('../utils/authHelpers');

async function registerUser(email) {
  const candidat = await User.findOne({
    where: { email },
  });
  if (candidat) throw new BadRequest(ErrorMessages.user_already_exists);
  return candidat;
  /* const userPassword = hashPassword(password);
  return User.create({
    email,
    password: userPassword,
  }); */
}

module.exports = {
  registerUser,
};

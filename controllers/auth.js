const { BadRequest, Unauthorized } = require('http-errors');

const User = require('../models/User');
const ErrorMessages = require('../constants/errorMessages');
const { hashPassword, comparePasswords, generateAccessToken } = require('../utils/authHelpers');

async function registerUser({ firstName, email, password }) {
  const candidat = await User.findOne({
    where: { email },
  });
  if (candidat) throw new BadRequest(ErrorMessages.auth_user_already_exists);
  const userPassword = await hashPassword(password);
  return User.create({
    firstName,
    email,
    password: userPassword,
  });
}

async function loginUser({ email, password }) {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Unauthorized(ErrorMessages.auth_invalid_email_or_password);
  const validPassword = await comparePasswords(password, user.password);
  if (!validPassword) throw new Unauthorized(ErrorMessages.auth_invalid_email_or_password);
  return generateAccessToken({
    id: user.id,
    email: user.email,
  });
}

async function changePassword({ email }, { currentPassword, password }) {
  const user = await User.findOneOrFail({ email });
  const isPasswordCorrect = await comparePasswords(currentPassword, user.password);
  if (!isPasswordCorrect) throw new BadRequest(ErrorMessages.auth_invalid_password);
  user.password = await hashPassword(password);
  return user.save();
}

module.exports = {
  registerUser,
  loginUser,
  changePassword,
};

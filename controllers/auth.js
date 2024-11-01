const { BadRequest, Unauthorized } = require('http-errors');

const { User } = require('../models/index');
const ErrorMessages = require('../constants/errorMessages');
const { hashPassword, comparePasswords, generateAccessToken } = require('../utils/authHelpers');

async function registerUser({ firstName, email, password }) {
  const candidat = await User.findOne({
    where: { email },
  });
  if (candidat) throw new BadRequest(ErrorMessages.auth_user_already_exists);
  const userPassword = await hashPassword(password);
  const user = await User.create({
    firstName,
    email,
    password: userPassword,
  });
  try {
    const body = {
      userEmail: user.email,
      action: 'USER_ARE_REGISTER',
    };
    const response = await (await fetch('http://localhost:3000/api/authHistory', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } })).json();
    // eslint-disable-next-line no-console
    console.log('response', response);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Failed to write authenticate history with user email ${user.email}, error: ${error}`);
  }

  return user;
}

async function loginUser({ email, password }) {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Unauthorized(ErrorMessages.auth_invalid_email_or_password);
  const validPassword = await comparePasswords(password, user.password);
  if (!validPassword) throw new Unauthorized(ErrorMessages.auth_invalid_email_or_password);

  try {
    const body = {
      userEmail: user.email,
      action: 'USER_ARE_LOGINED',
    };
    const response = await (await fetch('http://localhost:3000/api/authHistory', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } })).json();
    // eslint-disable-next-line no-console
    console.log('response', response);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Failed to write authenticate history with user email ${user.email}, error: ${error}`);
  }

  return generateAccessToken({
    id: user.id,
    email: user.email,
  });
}

async function changePassword({ email }, { currentPassword, password }) {
  const user = await User.findOneOrFail({ where: { email } });
  const isPasswordCorrect = await comparePasswords(currentPassword, user.password);
  if (!isPasswordCorrect) throw new BadRequest(ErrorMessages.auth_invalid_password);
  user.password = await hashPassword(password);

  try {
    const body = {
      userEmail: user.email,
      action: 'USER_PASSWORD_CHANGED',
    };
    const response = await (await fetch('http://localhost:3000/api/authHistory', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } })).json();
    // eslint-disable-next-line no-console
    console.log('response', response);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Failed to write authenticate history with user email ${user.email}, error: ${error}`);
  }

  return user.save();
}

module.exports = {
  registerUser,
  loginUser,
  changePassword,
};

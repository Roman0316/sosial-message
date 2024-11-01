const { NotFound } = require('http-errors');

const { User } = require('../models/index');
const { ErrorMessages } = require('../constants/errorMessages');

async function getUserProfile({ id }) {
  return User.findOneOrFail({
    where: { id },
    attributes: {
      exclude: ['password'],
    },
  });
}

async function updateUserProfile({ id }, { firstName, lastName }) {
  const updateUser = await User.update(
    {
      firstName,
      lastName,
    },
    {
      where: { id },
      returning: true,
      plain: true,
    },
  );
  if (updateUser.length === 0) throw new NotFound(ErrorMessages.user_not_found);

  try {
    const body = {
      userId: id,
      action: 'USER_PROFILE_UPDATED',
    };
    const response = await (await fetch('http://localhost:3000/api/profileHistory', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } })).json();
    // eslint-disable-next-line no-console
    console.log('response', response);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Failed to write profile history with userId ${id}, error: ${error}`);
  }

  return updateUser;
}

async function deleteUserProfile({ id }) {
  await User.destroy({ where: { id } });

  try {
    const body = {
      userId: id,
      action: 'USER_PROFILE_DELETED',
    };
    const response = await (await fetch('http://localhost:3000/api/profileHistory', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } })).json();
    // eslint-disable-next-line no-console
    console.log('response', response);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Failed to write profile history with userId ${id}, error: ${error}`);
  }
}

async function getUserList({ orderBy, typeOfSort }) {
  const { count, rows: users } = await User.findAndCountAll({
    attributes: {
      exclude: ['password'],
    },
    order: [
      ['role', 'ASC'],
      [orderBy, typeOfSort]],

  });
  return { count, users };
}

module.exports = {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  getUserList,
};

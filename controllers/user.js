const { NotFound } = require('http-errors');

const { User } = require('../models/index');
const { ErrorMessages } = require('../constants/index');

async function getUserProfile({ id }) {
  return User.findOneOrFail({ id }, {
    attributes: {
      exclude: ['password'],
    },
  });
}

async function changeUserProfile({ id }, { firstName, lastName }) {
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
  return updateUser;
}

async function deleteUserProfile({ id }) {
  await User.destroy({ where: { id } }); // протестировать!
}

async function getUsersList({ orderBy, typeOfSort }) {
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
  changeUserProfile,
  deleteUserProfile,
  getUsersList,
};

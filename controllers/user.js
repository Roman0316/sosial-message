const User = require('../models/User');

async function getUserProfile({ id }) {
  return User.findOneOrFail({ id }, {
    attributes: {
      exclude: ['password'],
    },
  });
}

async function changeUserProfile({ email }, { firstName, lastName }) {
  const updateUser = await User.update(
    {
      firstName,
      lastName,
    },
    {
      where: { email },
      returning: true,
      plain: true,
    },
  );
    // if (updateUser.length ===0)  !дописать тип ошибки!
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
      // ['createdAt', 'ASC'],
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

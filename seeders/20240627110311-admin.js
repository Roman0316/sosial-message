const { v4: uuid } = require('uuid');

const { hashPassword } = require('../utils/authHelpers');
const { admin } = require('../config/dotenv');
const { userRoles } = require('../constants/index');

module.exports = {
  up: async (queryInterface) => {
    const hashedPassword = await hashPassword(admin.password);
    await queryInterface.bulkInsert('users', [
      {
        id: uuid(),
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        password: hashedPassword,
        role: userRoles.admin,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', { email: admin.email });
  },
};

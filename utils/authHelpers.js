const bcrypt = require('bcrypt');

function hashPassword(password) {
  return bcrypt.hash(password, 7);
}

module.exports = {
  hashPassword,
};

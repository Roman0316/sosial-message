const {User, AuthHistory} = require('../services/sequelize');

 async function getAuthHistorys({
  email, orderBy = 'createdAt', isAsc = false, limit = 20, offset = 0,
}) {
  const where = {};

  if (email) {
    const user = await User.findOneOrFail({ where: { email } });
    where.userEmail = user.email;

  }

  const order = [[orderBy, isAsc ? 'ASC' : 'DESC']];

  const historys = await AuthHistory.findAll({
    where,
    order,
    limit,
    offset,
  });
  return historys;
} 

async function createAuthHistory({ userEmail, action }) {
  return AuthHistory.create({
    userEmail,
    action,
  });
}

module.exports = {
  createAuthHistory,
  getAuthHistorys,
};

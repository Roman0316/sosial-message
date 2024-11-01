const {User, ProfileHistory} = require('../services/sequelize');

 async function getProfileHistorys({
  id, orderBy = 'createdAt', isAsc = false, limit = 20, offset = 0,
}) {
  const where = {};

  if (id) {
    const user = await User.findOneOrFail({ where: { id } });
    where.userId = user.id;

  }

  const order = [[orderBy, isAsc ? 'ASC' : 'DESC']];

  const historys = await ProfileHistory.findAll({
    where,
    order,
    limit,
    offset,
  });
  return historys;
} 

async function createProfileHistory({ userId, action }) {
  return ProfileHistory.create({
    userId,
    action,
  });
}

module.exports = {
  createProfileHistory,
  getProfileHistorys,
};

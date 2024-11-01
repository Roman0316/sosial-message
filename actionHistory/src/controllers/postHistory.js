const { Post, PostHistory } = require('../services/sequelize');

  async function getPostHistorys({
  id: userId, orderBy = 'createdAt', isAsc = false, limit = 20, offset = 0,
}) {
  const where = {};

  if (userId) {
    const post = await Post.findOneOrFail({ where: { userId } });
    where.userId = post.userId;
  }

  const order = [[orderBy, isAsc ? 'ASC' : 'DESC']];

  const historys = await PostHistory.findAll({
    where,
    order,
    limit,
    offset,
  });
  return historys;
} 

async function createPostHistory({ userId, action }) {
  return PostHistory.create({
    userId,
    action,
  });
}

module.exports = {
  createPostHistory,
  getPostHistorys,
};

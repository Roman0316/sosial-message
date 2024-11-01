const { BadRequest } = require('http-errors');

const { ErrorMessages } = require('../constants/errorMessages');
const { Like, Post, User } = require('../models/index');

// создатёт лайк
async function creadLike({ id: userId }, { postId }) {
  const [user, post] = await Promise.all([
    User.findByPk(userId),
    Post.findByPk(postId),
  ]);
  if (!user || !post) throw new BadRequest(ErrorMessages.user_or_post_not_found);

  return Like.findOrCreate({ where: { userId, postId } });
}

// удаляет лайк
async function deleteLike({ id: userId }, { postId }) {
  const user = await User.findByPk(userId);
  const post = await Post.findByPk(postId);
  if (!user || !post) throw new BadRequest(ErrorMessages.user_or_post_not_found);

  return Like.destroy({ where: { userId, postId } });
}

module.exports = {
  creadLike,
  deleteLike,
};

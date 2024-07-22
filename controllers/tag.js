const {
  Op, fn, col, literal,
} = require('sequelize');

const { Tag, Post, PostTag } = require('../models/index');

async function getTagsList({ q }) {
  if (q) {
    const tags = await Tag.findAll({
      where: { value: { [Op.like]: `%${q}%` } },
      attributes: {
        include: [[fn('COUNT', col('posts.id')), 'postCount']],
      },
      include: [{
        model: Post,
        attributes: [],
        through: {
          model: PostTag,
          attributes: [],
        },
      }],
      group: ['tag.id'],
      order: [literal('COUNT("posts"."id") DESC')],
    });
    return tags;
  }

  const tags = await Tag.findAll({
    attributes: {
      include: [
        [fn('COUNT', col('posts.id')), 'postCount'],
      ],
    },
    include: [{
      model: Post,
      attributes: [],
      through: {
        model: PostTag,
        attributes: [],
      },
    }],
    group: ['tag.id'],
    order: [literal('COUNT("posts"."id") DESC')],
  });
  return tags;
}

module.exports = {
  getTagsList,
};

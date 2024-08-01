const {
  Op, fn, col, literal,
} = require('sequelize');

const { Tag, Post, PostTag } = require('../models/index');

/* -возвращает список тегов
   -сортирует по популярности
   -включает поле count - кол-во постов, на которых он размещён
   - если указан параметр (q), то возвращает только те теги, в названии которых содержится подстрока */

async function getTagList({ q }) {
  const where = q ? { value: { [Op.like]: `%${q}%` } } : {};
  return Tag.findAll({
    where,
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
}

/* с помощью spread-оператора:
  async function getTagList({ q }) {
  return Tag.findAll({
  ...(q && { where: { value: { [Op.like]: `%${q}%` } } }),
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
} */

module.exports = {
  getTagList,
};

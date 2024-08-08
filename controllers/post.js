const { Op, fn, col } = require('sequelize');
const { BadRequest } = require('http-errors');

const { ErrorMessages } = require('../constants/index');
const {
  Post, User, Tag, PostTag, Like,
} = require('../models/index');

// !!!получить посты с фильтрами
async function getPostList({
  tag: tagValue, limit = 20, offset = 0, typeOfSort = 'DESC', userId,
}) {
  const user = userId ? await User.findOneOrFail({ where: { id: userId } }) : null;
  const tag = tagValue ? await Tag.findOne({ where: { value: tagValue } }) : null;

  const options = {
    ...(user && { where: { userId: user.id } }),
    include: [
      {
        model: User,
        attributes: { exclude: ['password'] },
      },
    ],
    order: [['createdAt', typeOfSort]],
  };

  const count = await Post.count(options);
  if (offset > count) throw new BadRequest(ErrorMessages.invalid_value_offset);

  options.include.push(
    {
      model: Tag,
      duplicating: false,
      through: {
        model: PostTag,
        ...(tag && { where: { tagId: tag.id } }),
        attributes: [],
      },
    },
    {
      model: Like,
      attributes: [],
      duplicating: false,
    },
  );
  const posts = await Post.findAll({
    ...options,
    attributes: {
      include: [
        [fn('COUNT', col('likes."postId"')), 'likeCount'],
      ],
    },
    group: ['post.id', 'user.id', 'tags.id'],
    limit,
    offset,
  });

  return {
    count,
    posts,
  };
}

// !!!получить конкретный пост пользователя
async function getPost({ id: userId }, { postId }) {
  const post = await Post.findOne({
    where: {
      id: postId,
      userId,
    },
    attributes: {
      include: [[fn('COUNT', col('postId')), 'likeCount']],
      exclude: ['isPublished'],
    },
    include: [{
      model: User,
      as: 'user',
      attributes: ['firstName', 'id'],
    },
    {
      model: Like,
      attributes: [],
    }],
    group: ['post.id', 'user.id'],
  });
  return post ? post.get() : null;
}

// !!!создать пост
async function createPost({ id: userId }, { text, tags = [] }) {
  const post = await Post.create({
    userId,
    text,
  });

  if (tags.length) {
    console.log('tags', tags);

    const existingTags = await Tag.findAll({ where: { value: { [Op.in]: tags } } });

    console.log('existingTags', existingTags.map((t) => t.get()));

    const existingTagValues = existingTags.map(({ value }) => value);

    console.log('existingTagValues', existingTagValues);

    const tagsToCreate = tags.filter((tag) => !existingTagValues.includes(tag));

    console.log('tagsToCreate', tagsToCreate);

    const newTags = await Tag.bulkCreate(tagsToCreate.map((value) => ({ value })));

    console.log('newTags', newTags.map((t) => t.get()));

    await PostTag.bulkCreate([...existingTags, ...newTags].map((tag) => ({
      postId: post.id,
      tagId: tag.id,
    })), { returning: false });
  }

  return post.reload({
    include: [{
      model: Tag,
      through: {
        model: PostTag,
        attributes: [],
      },
    }],
  });
}

// !!!изменить пост
async function updatePost({ id: userId }, { postId }, {
  text,
}) {
  const post = await Post.findOne({
    where: {
      id: postId,
      userId,
    },
    attributes: [
      'id',
      'text',
    ],
  });

  if (!post) throw new BadRequest(ErrorMessages.missing_required_field);

  post.set({
    text,
  });
  await post.save();
  return post.get();
}

// !!!удалить конкретный пост пользователя
async function deletePost({ id }, { postId }) {
  await Post.destroy({
    where: {
      id: postId,
      userId: id,
    },
  });
}

module.exports = {
  getPostList,
  createPost,
  getPost,
  updatePost,
  deletePost,
};

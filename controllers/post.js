const {
  Post, User, Tag, PostTag,
} = require('../models/index');

// работа с фильтрами
// Сначала новые
// Сначала Старые
// по тегу
// получиьть только те посты которые нравятся
async function getAllPosts({
  tag,
  // createdAt, isLike = false, userId = 1,
}) {
  const where = {};
  const include = [];

  // if (createdAt) {
  //   where.createdAt = createdAt;
  // }
  // if (userId) {
  //   where.userId = userId;
  // }

  include.push(
    {
      model: Tag,
      // where: {}, условие если пришли теги по фильтру
      through: {
        model: PostTag,
        attributes: [],
      },
    },
  );

  // if (isLike) {
  //   include.push({
  //     // model: Post
  //     // througth: Like
  //     include: [{

  //     }]
  //   });
  // }

  return Post.findAll({ where, include });
}

async function getUserPost({ id }, { postId }) {
  const post = await Post.findOne({
    where: {
      id: postId,
      userId: id,
    },
    attributes: {
      exclude: ['id', 'userId', 'isPublished'],
    },
    include: [{
      model: User,
      as: 'user',
      attributes: ['firstName', 'id'],
    }],
  });
  return post;
}

async function createPost({ id }, {
  text, tags,
}) {
  const result = await Promise.all(tags.map((value) => Tag.create({ value })));

  const post = await Post.create({
    userId: id,
    text,
    tags,
  });

  await PostTag.create({ postId: post.id, tagId: result[0].id });

  return post.get();
}

async function changeUserPost({ id }, { postId }, {
  text,
}) {
  const post = await Post.findOne({
    where: {
      id: postId,
      userId: id,
    },
    attributes: [
      'id',
      'text',
      // 'content',
      // 'imageUrl',
      // 'videoUrl',
      // 'tags',
    ],
  });

  if (!post) {
    const err = new Error('No post');
    err.status = 400;
    throw err;
  }

  post.set({
    text,
    // content,
    // imageUrl,
    // videoUrl,
    // tags,
  });
  await post.save();
  return post.get();
}

/* async function getAllUserPosts({ id }, { typeOfSort }) {
  return Post.findAll({
    where: { userId: id },
    order: [['createdAt', typeOfSort]],
    attributes: {
      exclude: ['id', 'userId', 'isPublished'],
    },
  });
} */

async function deleteUserPost({ id }, { postId }) {
  await Post.destroy({
    where: {
      id: postId,
      userId: id,
    },
  });
}

module.exports = {
  getAllPosts,
  createPost,
  getAllUserPosts,
  getUserPost,
  changeUserPost,
  deleteUserPost,
};

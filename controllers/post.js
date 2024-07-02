const { Post, User } = require('../models/index');

async function getAllPosts() {
  return Post.findAll();
}

async function createPost({ id }, {
  title, content, imageUrl, videoUrl, likesCount, commentsCount, sharedCount, isPublished, tags,
}) {
  return Post.create({
    userId: id,
    title,
    content,
    imageUrl,
    videoUrl,
    likesCount,
    commentsCount,
    sharedCount,
    isPublished,
    tags,
  });
}

async function getAllUserPosts({ id }, { typeOfSort }) {
  return Post.findAll({
    where: { userId: id },
    order: [['createdAt', typeOfSort]],
    attributes: {
      exclude: ['id', 'userId', 'isPublished'],
    },
  });
}

async function getUserPost({ id }, { postId }) {
  const post = await Post.findOne({
    where: {
      id: postId,
      userId: id,
    },
    attributes: {
      exclude: ['isPublished'],
    },
    include: [{
      model: User,
      as: 'user',
      attributes: ['firstName', 'email'],
    }],
  });
  return post;
}

async function changeUserPost({ id }, { postId }, {
  title, content, imageUrl, videoUrl, tags,
}) {
  const post = await Post.findOne({
    where: {
      id: postId,
      userId: id,
    },
    attributes: ['id', 'title', 'content', 'imageUrl', 'videoUrl', 'tags'],
  });
  post.set({
    title,
    content,
    imageUrl,
    videoUrl,
    tags,
  });
  await post.save();
  return post.get();
}

async function deleteUserPost({ id }, { postId }) {
  await Post.destroy({
    where: {
      id: postId,
      userId: id,
    },
  });
}

async function deleteAllUserPosts({ id }) {
  await Post.destroy({ where: { userId: id } });
}

module.exports = {
  getAllPosts,
  createPost,
  getAllUserPosts,
  getUserPost,
  changeUserPost,
  deleteUserPost,
  deleteAllUserPosts,
};

const {
  Post, User, Tag, PostTag,
} = require('../models/index');

async function getPostList({ tag, limit, offset }) {
  const posts = await Post.findAll({
    include: [
      {
        model: Tag,
        // where
        through: {
          model: PostTag,
          attributes: [],
        },
      },
    ],
  });

  return posts.map((p) => p.get());
}

async function getPost({ id: userId }, { postId }) {
  const post = await Post.findOne({
    where: {
      id: postId,
      userId,
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
  return post.get();
}

async function createPost({ id: userId }, { text, tags }) {
  const result = await Promise.all(tags.map((value) => Tag.create({ value })));

  const post = await Post.create({
    userId,
    text,
  });

  await PostTag.create({ postId: post.id, tagId: result[0].id });

  return post.get();
}

async function updatePost({ id }, { postId }, {
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
    ],
  });

  if (!post) {
    const err = new Error('No post');
    err.status = 400;
    throw err;
  }
  post.set({
    text,
  });
  await post.save();
  return post.get();
}

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

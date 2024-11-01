const {
  Op, fn, col,
} = require('sequelize');
const { BadRequest } = require('http-errors');
const { v4: uuid } = require('uuid');

const { ErrorMessages } = require('../constants/errorMessages');
const {
  Post, User, Tag, PostTag, Like, File, PostFile,
} = require('../models/index');
// const { s3Config } = require('../config/dotenv');
const { putObject } = require('../services/s3');

// получить посты с фильтрами
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

// получить конкретный пост пользователя
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

// создать пост
async function createPost({ id: userId }, { text, tags = [] }, file) {
  const post = await Post.create({
    userId,
    text,
  });
  // const { endpoint, bucket } = s3Config;
  // const location = `${endpoint}/${bucket}/${key}`;

  if (tags.length) {
    const existingTags = await Tag.findAll({ where: { value: { [Op.in]: tags } } });
    const existingTagValues = existingTags.map(({ value }) => value);
    const tagsToCreate = tags.filter((tag) => !existingTagValues.includes(tag));
    const newTags = await Tag.bulkCreate(tagsToCreate.map((value) => ({ value })));

    await PostTag.bulkCreate([...existingTags, ...newTags].map((tag) => ({
      postId: post.id,
      tagId: tag.id,
    })), { returning: false });
  }

  if (file) {
    const {
      originalname, mimetype, size, buffer,
    } = file;
    const key = `${uuid()}.png`;
    await putObject(key, buffer, mimetype);

    const dataFile = await File.create({
      name: originalname,
      mimeType: mimetype,
      size,
      s3Key: key,
    });
    await PostFile.create({
      postId: post.id,
      fileId: dataFile.id,
    });
  }
  // const allData = { ...post, ...tagsTo, ...dataFile };

  try {
    const body = {
      userId,
      action: 'POST_CREATED',
    };
    const response = await (await fetch('http://localhost:3000/api/postHistory', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } })).json();
    // eslint-disable-next-line no-console
    console.log('response', response);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Failed to write post history with userId ${userId}, error: ${error}`);
  }
  return post.reload({
    include: [{
      model: Tag,
      through: {
        model: PostTag,
        attributes: [],
      },
    },
    {
      model: File,
      through: {
        model: PostFile,
        attributes: [],
      },
    }],
  });
}

// upload to S3
async function uploadFileToS3(file) {
  const {
    originalname, mimetype, size, buffer,
  } = file;
  const key = `${uuid()}.png`;
  await putObject(key, buffer, mimetype);

  const dataFile = await File.create({
    name: originalname,
    mimeType: mimetype,
    size,
    s3Key: key,
  });
  /* await PostFile.create({
    postId: post.id,
    fileId: dataFile.id,
  }); */
  return dataFile;
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

  try {
    const body = {
      userId,
      action: `${postId} POST_UPDATED`,
    };
    const response = await (await fetch('http://localhost:3000/api/postHistory', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } })).json();
    // eslint-disable-next-line no-console
    console.log('response', response);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Failed to write post history with userId ${userId}, error: ${error}`);
  }

  return post.get();
}

// !!!удалить конкретный пост пользователя
async function deletePost({ id: userId }, { postId }) {
  await Post.destroy({
    where: {
      id: postId,
      userId,
    },
  });

  try {
    const body = {
      userId,
      action: `${postId} POST_DELETED`,
    };
    const response = await (await fetch('http://localhost:3000/api/postHistory', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } })).json();
    // eslint-disable-next-line no-console
    console.log('response', response);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Failed to write post history with userId ${userId}, error: ${error}`);
  }
}

module.exports = {
  getPostList,
  createPost,
  getPost,
  updatePost,
  deletePost,
  uploadFileToS3,
};

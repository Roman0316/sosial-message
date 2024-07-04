const { Router } = require('express');

const wrap = require('../utils/wrap');
const { postController } = require('../controllers/index');
const { validateRequest } = require('../middlewares/index');
const { createPostRequest } = require('../requests/post/index');

const postRouter = Router();

// получить все посты пользователей + фильтрация
postRouter.get(
  '/',
  wrap(async (req, res) => {
    const posts = await postController.getAllPosts(req.query);
    res.json(posts);
  }),
);

// получить конкретный пост
postRouter.get(
  '/:postId',
  wrap(async (req, res) => {
    const userPost = await postController.getUserPost(req.user, req.params);
    res.json(userPost);
  }),
);

// создать пост
postRouter.post(
  '/',
  // validateRequest(createPostRequest),
  wrap(async (req, res) => {
    const post = await postController.createPost(req.user, req.body);
    res.status(201).json(post);
  }),
);

// изменить свой пост
postRouter.patch(
  '/:postId',
  wrap(async (req, res) => {
    const changedUserPost = await postController.changeUserPost(req.user, req.params, req.body);
    res.json(changedUserPost);
  }),
);

// возможно лишний роут
// postRouter.get(
//   '/owner',
//   wrap(async (req, res) => {
//     const userPosts = await postController.getAllUserPosts(req.user, req.query);
//     res.json(userPosts);
//   }),
// );

// удалить 1 пост
postRouter.delete(
  '/:postId',
  wrap(async (req, res) => {
    await postController.deleteUserPost(req.user, req.query);
    res.status(204).end();
  }),
);

module.exports = postRouter;

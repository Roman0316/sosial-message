const { Router } = require('express');

const wrap = require('../utils/wrap');
const { postController } = require('../controllers/index');
const { validateRequest } = require('../middlewares/index');
const { createPostRequest } = require('../requests/post/index');

const postRouter = Router();

postRouter.get(
  '/',
  wrap(async (req, res) => {
    const posts = await postController.getPostList(req.query);
    res.json(posts);
  }),
);

postRouter.get(
  '/:postId',
  wrap(async (req, res) => {
    const userPost = await postController.getPost(req.user, req.params);
    res.json(userPost);
  }),
);

postRouter.post(
  '/',
  // validateRequest(createPostRequest),
  wrap(async (req, res) => {
    const post = await postController.createPost(req.user, req.body);
    res.status(201).json(post);
  }),
);

postRouter.patch(
  '/:postId',
  wrap(async (req, res) => {
    const changedUserPost = await postController.updatePost(req.user, req.params, req.body);
    res.json(changedUserPost);
  }),
);

postRouter.delete(
  '/:postId',
  wrap(async (req, res) => {
    await postController.deletePost(req.user, req.query);
    res.status(204).end();
  }),
);

module.exports = postRouter;

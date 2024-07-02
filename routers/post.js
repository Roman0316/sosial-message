const { Router } = require('express');

const wrap = require('../utils/wrap');
const { postController } = require('../controllers/index');
// const { validateRequest } = require('../middlewares/index');
// const {  } = require('../requests/user/index');

const postRouter = Router();

postRouter.get(
  '/',
  wrap(async (req, res) => {
    const posts = await postController.getAllPosts();
    res.json(posts);
  }),
);

postRouter.post(
  '/create',
  wrap(async (req, res) => {
    await postController.createPost(req.user, req.body);
    res.status(204).end();
  }),
);

postRouter.get(
  '/get',
  wrap(async (req, res) => {
    const userPosts = await postController.getAllUserPosts(req.user, req.query);
    res.json(userPosts);
  }),
);

postRouter.get(
  '/getall',
  wrap(async (req, res) => {
    const userPost = await postController.getUserPost(req.user, req.query);
    res.json(userPost);
  }),
);

postRouter.patch(
  '/patch',
  wrap(async (req, res) => {
    const changedUserPost = await postController.changeUserPost(req.user, req.query, req.body);
    res.json(changedUserPost);
  }),
);

postRouter.delete(
  '/delete',
  wrap(async (req, res) => {
    await postController.deleteUserPost(req.user, req.query);
    res.status(204).end();
  }),
);

postRouter.delete(
  '/',
  wrap(async (req, res) => {
    await postController.deleteAllUserPosts(req.user);
    res.status(204).end();
  }),
);

module.exports = postRouter;

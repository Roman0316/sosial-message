const { Router } = require('express');

const wrap = require('../utils/wrap');
const { tagController } = require('../controllers/index');
/* const { validateRequest } = require('../middlewares/index');
const {
  getPostListRequest, getPostRequest, createPostRequest, updatePostRequest, deletePostRequest,
} = require('../requests/post/index'); */

const tagRouter = Router();

tagRouter.get(
  '/',
  wrap(async (req, res) => {
    const tags = await tagController.getTagsList(req.query);
    res.json(tags);
  }),
);

module.exports = tagRouter;

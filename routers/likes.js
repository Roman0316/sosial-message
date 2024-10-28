const { Router } = require('express');

const wrap = require('../utils/wrap');
const { likeController } = require('../controllers/index');

const likeRouter = Router();

likeRouter.post(
  '/like',
  wrap(async (req, res) => {
    await likeController.creadLike(req.user, req.query);
    res.status(204).end();
  }),
);

likeRouter.delete(
  '/unlike',
  wrap(async (req, res) => {
    await likeController.deleteLike(req.user, req.query);
    res.status(204).end();
  }),
);

module.exports = likeRouter;

const { Router } = require('express');

const wrap = require('../utils/wrap');
const { tagController } = require('../controllers/index');

const tagRouter = Router();

tagRouter.get(
  '/',
  wrap(async (req, res) => {
    const tags = await tagController.getTagList(req.query);
    res.json(tags);
  }),
);

module.exports = tagRouter;

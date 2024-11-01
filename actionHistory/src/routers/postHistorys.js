const { Router } = require('express');

const wrap = require('../utils/wrap');
const { postHistoryController } = require('../controllers/index');

const postHistoryRouter = Router();

postHistoryRouter.get(
  '/',
  wrap(async (req, res) => {
    const historys = await postHistoryController.getPostHistorys(req.query);
    res.json(historys);
  }),
);

postHistoryRouter.post(
  '/',
  wrap(async (req, res) => {
    const history = await postHistoryController.createPostHistory(req.body);
    res.json(history);
  }),
); 

module.exports = postHistoryRouter;

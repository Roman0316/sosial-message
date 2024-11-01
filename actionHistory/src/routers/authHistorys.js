const { Router } = require('express');

const wrap = require('../utils/wrap');
const { authHistoryController } = require('../controllers/index');

const authHistoryRouter = Router();

authHistoryRouter.get(
  '/',
  wrap(async (req, res) => {
    const historys = await authHistoryController.getAuthHistorys(req.query);
    res.json(historys);
  }),
);

authHistoryRouter.post(
  '/',
  wrap(async (req, res) => {
    const history = await authHistoryController.createAuthHistory(req.body);
    res.json(history);
  }),
); 

module.exports = authHistoryRouter;

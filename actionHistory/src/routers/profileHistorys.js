const { Router } = require('express');

const wrap = require('../utils/wrap');
const { profileHistoryController } = require('../controllers/index');

const profileHistoryRouter = Router();

profileHistoryRouter.get(
  '/',
  wrap(async (req, res) => {
    const historys = await profileHistoryController.getProfileHistorys(req.query);
    res.json(historys);
  }),
);

profileHistoryRouter.post(
  '/',
  wrap(async (req, res) => {
    const history = await profileHistoryController.createProfileHistory(req.body);
    res.json(history);
  }),
); 

module.exports = profileHistoryRouter;

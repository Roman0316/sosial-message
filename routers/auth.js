const { Router } = require('express');

const wrap = require('../utils/wrap');
const { authController } = require('../controllers/index');

const authRouter = Router();

authRouter.post(
  '/registration',
  wrap(async (res, req) => {
    const user = await authController.registerUser(req.body);
    res.json(user);
  }),
);

module.exports = authRouter;

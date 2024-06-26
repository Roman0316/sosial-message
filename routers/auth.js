const { Router } = require('express');

const wrap = require('../utils/wrap');
const { authController } = require('../controllers/index');
const validateRequest = require('../middlewares/validate');
const { registrationRequest, loginRequest, changePasswordRequest } = require('../requests/auth/index');
const authMiddleware = require('../middlewares/auth');

const authRouter = Router();

authRouter.post(
  '/registration',
  validateRequest(registrationRequest),
  wrap(async (req, res) => {
    await authController.registerUser(req.data);
    res.status(204).end();
  }),
);

authRouter.post(
  '/login',
  validateRequest(loginRequest),
  wrap(async (req, res) => {
    const token = await authController.loginUser(req.body);
    res.json(token);
  }),
);

authRouter.patch(
  '/change-password',
  authMiddleware,
  validateRequest(changePasswordRequest),
  wrap(async (req, res) => {
    await authController.changePassword(req.user, req.data);
    res.status(204).end();
  }),
);

authRouter.patch(
  '/change-data',
  authMiddleware,
  // validateRequest(), !написать changeUserDataRequest.js!
  wrap(async (req, res) => {
    const user = await authController.changeUserData(req.user, req.body); // req.body => req.data
    res.json(user);
  }),
);

authRouter.get(
  '/profile',
  authMiddleware,
  wrap(async (req, res) => {
    const user = await authController.getUserProfile();
    res.json(user);
  }),
);

module.exports = authRouter;

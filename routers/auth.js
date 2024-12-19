const { Router } = require('express');

const wrap = require('../utils/wrap');
const { authController } = require('../controllers/index');
const { validateRequest, authMiddleware } = require('../middlewares/index');
const { registrationRequest, loginRequest, changePasswordRequest } = require('../requests/auth/index');
const { user } = require('../constants/userRoles');

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
    const accessToken = await authController.loginUser(req.body);
    res.json({ accessToken });
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

authRouter.delete(
  '/logout',
  authMiddleware,
  wrap(async (req, res) => {
    await authController.logout(req.user);
    res.status(200).end();
  }),
);

module.exports = authRouter;

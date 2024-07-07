const { Router } = require('express');

const wrap = require('../utils/wrap');
const { userController } = require('../controllers/index');
const { validateRequest } = require('../middlewares/index');
const { updateUserProfileRequest, getUserListRequest } = require('../requests/user/index');

const userRouter = Router();

userRouter.get(
  '/users',
  validateRequest(getUserListRequest),
  wrap(async (req, res) => {
    const usersList = await userController.getUserList(req.query);
    res.json(usersList);
  }),
);

userRouter.get(
  '/profile',
  wrap(async (req, res) => {
    const user = await userController.getUserProfile(req.user);
    res.json(user);
  }),
);

userRouter.patch(
  '/profile',
  validateRequest(updateUserProfileRequest),
  wrap(async (req, res) => {
    const user = await userController.updateUserProfile(req.user, req.data);
    res.json(user);
  }),
);

userRouter.delete(
  '/profile',
  wrap(async (req, res) => {
    await userController.deleteUserProfile(req.user);
    res.status(204).end();
  }),
);

module.exports = userRouter;

const { Router } = require('express');

const wrap = require('../utils/wrap');
const { userController } = require('../controllers/index');
const { validateRequest } = require('../middlewares/index');
const { changeUserProfileRequest, getUsersListRequest } = require('../requests/user/index');

const userRouter = Router();

userRouter.get(
  '/profile',
  wrap(async (req, res) => {
    const user = await userController.getUserProfile(req.user);
    res.json(user);
  }),
);

userRouter.patch(
  '/profile-change',
  validateRequest(changeUserProfileRequest),
  wrap(async (req, res) => {
    const user = await userController.changeUserProfile(req.user, req.data);
    res.json(user);
  }),
);

userRouter.delete(
  '/profile-delete',
  wrap(async (req, res) => {
    await userController.deleteUserProfile(req.user);
    res.status(204).end();
  }),
);

userRouter.get(
  '/users',
  validateRequest(getUsersListRequest),
  wrap(async (req, res) => {
    const usersList = await userController.getUsersList(req.query);
    res.json(usersList);
  }),
);

module.exports = userRouter;

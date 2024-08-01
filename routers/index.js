const authRouter = require('./auth');
const userRouter = require('./users');
const postRouter = require('./posts');
const tagRouter = require('./tags');
const likeRouter = require('./likes');

module.exports = {
  authRouter,
  userRouter,
  postRouter,
  tagRouter,
  likeRouter,
};

const express = require('express');
const morgan = require('morgan');

const {
  authRouter, userRouter, postRouter, tagRouter, likeRouter,
} = require('./routers/index');
const { ErrorHandler, authMiddleware } = require('./middlewares/index');

const app = express();

app.get('/api', (req, res) => {
  res.status(200).json({ status: 'Hello World!' });
});

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);
app.use(authMiddleware);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/tags', tagRouter);
app.use('/api/likes', likeRouter);

app.use(ErrorHandler);

module.exports = app;

const express = require('express');
const morgan = require('morgan');

const { authRouter } = require('./routers/index');
const ErrorHandler = require('./middlewares/error');

const app = express();

app.get('/api', (req, res) => {
  res.status(200).json({ status: 'Hello World!' });
});

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);

app.use(ErrorHandler);

module.exports = app;

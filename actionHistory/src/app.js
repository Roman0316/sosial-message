const express = require('express');
const morgan = require('morgan');

const { authHistoryRouter, profileHistoryRouter, postHistoryRouter } = require('./routers/index');
const { ErrorHandler } = require('./middlewares/index');

const app = express();

app.get('/api', (req, res) => {
  res.status(200).json({ status: 'Hello World!' });
});

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/authHistory', authHistoryRouter);
app.use('/api/profileHistory', profileHistoryRouter);
app.use('/api/postHistory', postHistoryRouter);


app.use(ErrorHandler);

module.exports = app;

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const process = require('process');
const { errors } = require('celebrate');
const cors = require('cors');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const {
  NOT_FOUND,
} = require('./utils/errors/not_found');
require('dotenv').config();

const options = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3010',
    // 'https://YOUR.github.io',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

const { PORT = 3000 } = process.env;
const app = express();

app.use('*', cors(options));

app.use(bodyParser.json());

app.use(requestLogger); // подключаем логгер запросов

app.use('/users', auth, require('./routes/users'));

app.use('/movies', auth, require('./routes/movies'));

app.use('/', require('./routes/index'));

app.use(auth, (req, res, next) => next(new NOT_FOUND('Передан неправильный путь')));
// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  // не поддерживаются:
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  next();
});

app.listen(PORT, () => {
  console.log(`Port ${PORT}`);
});

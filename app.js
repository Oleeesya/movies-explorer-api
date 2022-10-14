require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const process = require('process');
const { errors } = require('celebrate');
const cors = require('cors');
const { messageNotFound } = require('./utils/const');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { NOT_FOUND } = require('./utils/errors/not_found');
const centralized = require('./utils/errors/centralized');
const { devDataBaseUrl, limiter } = require('./utils/config');

const { NODE_ENV, DATABASE_URL } = process.env;

const options = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3010',
    'http://api.domain.movies.nomoredomains.icu',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

const { PORT = 3000 } = process.env;

const app = express();

app.use(limiter);

app.use(helmet());

app.use('*', cors(options));

app.use(bodyParser.json());

app.use(requestLogger); // подключаем логгер запросов

app.use('/', require('./routes/index'));

app.use(auth, (req, res, next) => next(new NOT_FOUND(messageNotFound)));

// подключаемся к серверу mongo
mongoose.connect(String(NODE_ENV === 'production' ? DATABASE_URL : devDataBaseUrl), {
  useNewUrlParser: true,
  // не поддерживаются:
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use(centralized);

app.listen(PORT, () => {
  console.log(`Port ${PORT}`);
});

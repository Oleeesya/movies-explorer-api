const bcrypt = require('bcryptjs');

const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const {
  CONFLICT,
} = require('../utils/errors/conflict');
const {
  UNAUTHORIZED,
} = require('../utils/errors/unauthorized');
const {
  BAD_REQUEST,
} = require('../utils/errors/bad_request');

// возвращает информацию о пользователе (email и имя)
module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send({ email: user.email, name: user.name });
    })
    .catch(next);
};

// обновляет информацию о пользователе (email и имя)
module.exports.updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { ...req.body },
    // Передадим объект опций:
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BAD_REQUEST('Некорректные данные при обновлении данных пользователя'));
      } else {
        next(err);
      }
    });
};

// создает пользователей
module.exports.createUser = (req, res, next) => {
  // хешируем пароль
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash, // записываем хеш в базу
      name: req.body.name,
    }))

    .then((user) => {
      res.status(201).send({
        _id: user._id,
        email: user.email,
        name: user.name,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new CONFLICT('Пользователь с таким email уже существует'));
      } else if (err.name === 'ValidationError') {
        next(new BAD_REQUEST('Некорректные данные при создании пользователя'));
      } else {
        next(err);
      }
    });
};

// аутентификация — по адресу почты и паролю
// получаем из запроса почту и пароль и проверяем их
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // аутентификация успешна! пользователь в переменной user
      // создадим токен
      // Пейлоуд токена — зашифрованный в строку объект пользователя.
      // Методу sign мы передали два аргумента: пейлоуд токена и секретный ключ подписи:
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
        { expiresIn: '7d' },
      );
      // вернём токен
      res.send({ token });
    })
    .catch((err) => {
      // ошибка аутентификации
      next(new UNAUTHORIZED(err.message));
    });
};

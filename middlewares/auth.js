// мидлвэр для авторизации
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const { UNAUTHORIZED } = require('../utils/errors/unauthorized');
const { messageUnauthorized } = require('../utils/const');

module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;
  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UNAUTHORIZED(messageUnauthorized));
  }

  // извлечём токен
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // После извлечения токена из запроса нужно убедиться (верифицировать токен),
    // что пользователь прислал именно тот токен,
    // который был выдан ему ранее. Такую проверку осуществляет метод
    // verify модуля jsonwebtoken
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    // отправим ошибку, если не получилось
    return next(new UNAUTHORIZED(messageUnauthorized));
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  return next(); // пропускаем запрос дальше
};

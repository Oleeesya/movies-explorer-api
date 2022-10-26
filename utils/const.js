const linkRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\\.-]+)+[\w\-\\._~:/?#[\]@!\\$&'\\(\\)\\*\\+,;=.]+$/;
const messageConflict = 'Пользователь с таким email уже существует';
const messageBadRequest = 'Некорректные данные';
const messageUnauthorized = 'Необходима авторизация';
const messageNotFound = 'Передан неправильный путь';
const messageForbidden = 'Отсутствуют права доступа';

module.exports = {
  linkRegex,
  messageConflict,
  messageBadRequest,
  messageUnauthorized,
  messageNotFound,
  messageForbidden,
};

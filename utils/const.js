const linkRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\\.-]+)+[\w\-\\._~:/?#[\]@!\\$&'\\(\\)\\*\\+,;=.]+$/;
const ruRegex = /^[?!,.а-яА-ЯёЁ0-9\s]+$/;
const enRegex = /^[?!,.a-zA-Z0-9\s]+$/;
const messageConflict = 'Пользователь с таким email уже существует';
const messageBadRequest = 'Некорректные данные';
const messageUnauthorized = 'Необходима авторизация';
const messageNotFound = 'Передан неправильный путь';
const messageForbidden = 'Отсутствуют права доступа';

module.exports = {
  linkRegex,
  ruRegex,
  enRegex,
  messageConflict,
  messageBadRequest,
  messageUnauthorized,
  messageNotFound,
  messageForbidden,
};

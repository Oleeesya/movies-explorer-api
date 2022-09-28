const linkRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/; // eslint-disable-line
const ruRegex = /^[?!,.а-яА-ЯёЁ0-9\s]+$/;
const enRegex = /^[?!,.a-zA-Z0-9\s]+$/;

module.exports = {
  linkRegex,
  ruRegex,
  enRegex,
};

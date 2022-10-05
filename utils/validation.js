const { celebrate, Joi } = require('celebrate');

const validCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string(),
    director: Joi.string(),
    duration: Joi.number(),
    year: Joi.string(),
    description: Joi.string(),
    image: Joi.string(),
    trailerLink: Joi.string(),
    nameRU: Joi.string(),
    nameEN: Joi.string(),
    thumbnail: Joi.string(),
    movieId: Joi.number(),
  }),
});

const validRemoveMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().length(24),
  }),
});

const validLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validUpdateProfile = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

module.exports = {
  validCreateMovie,
  validRemoveMovie,
  validLogin,
  validCreateUser,
  validUpdateProfile,
};

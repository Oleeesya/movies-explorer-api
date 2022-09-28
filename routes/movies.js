const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMovies,
  createMovie,
  removeMovie,
} = require('../controllers/movies');

// возвращает все фильмы
router.get('/', getMovies);

// создаёт фильм
router.post('/', celebrate({
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
  }),
}), createMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().length(24),
  }),
}), removeMovie);

module.exports = router;

const router = require('express').Router();

const {
  getMovies,
  createMovie,
  removeMovie,
} = require('../controllers/movies');

const { validCreateMovie, validRemoveMovie } = require('../utils/validation');

// возвращает все фильмы
router.get('/', getMovies);

// создаёт фильм
router.post('/', validCreateMovie, createMovie);

router.delete('/:movieId', validRemoveMovie, removeMovie);

module.exports = router;

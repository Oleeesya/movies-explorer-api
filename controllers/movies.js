const Movie = require('../models/movie');
const {
  NOT_FOUND,
} = require('../utils/errors/not_found');
const {
  FORBIDDEN,
} = require('../utils/errors/forbidden');
const {
  BAD_REQUEST,
} = require('../utils/errors/bad_request');

// возвращает сохраненные фильмы пользователя
module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      const saveMovies = movies.filter((item) => item.owner.toString() === req.user._id);
      res.send(saveMovies);
    })
    .catch(next);
};

// создаёт фильм
module.exports.createMovie = (req, res, next) => {
  Movie.create({
    country: req.body.country,
    director: req.body.director,
    duration: req.body.duration,
    year: req.body.year,
    description: req.body.description,
    image: req.body.image,
    trailerLink: req.body.trailerLink,
    nameRU: req.body.nameRU,
    nameEN: req.body.nameEN,
    thumbnail: req.body.thumbnail,
    owner: req.user._id, // используем req.user
  })
    .then((movie) => {
      res.send({ data: movie });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BAD_REQUEST('Некорректные данные при создании фильма'));
      } else {
        next(err);
      }
    });
};

// удаляет фильм по идентификатору
module.exports.removeMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (movie === null) {
        throw new NOT_FOUND('Передан несуществующий _id фильма');
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new FORBIDDEN('Вы не можете удалить чужой фильм');
      }
      return Movie.findByIdAndRemove(req.params.movieId)
        .then((removeMovie) => {
          res.send({ data: removeMovie });
        });
    })
    .catch(next);
};

const Movie = require('../models/movie');
const { NOT_FOUND } = require('../utils/errors/not_found');
const { FORBIDDEN } = require('../utils/errors/forbidden');
const { BAD_REQUEST } = require('../utils/errors/bad_request');
const { messageBadRequest, messageNotFound, messageForbidden } = require('../utils/const');

// возвращает сохраненные фильмы пользователя
module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

// создаёт фильм
module.exports.createMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => {
      res.send({ data: movie });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BAD_REQUEST(messageBadRequest));
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
        throw new NOT_FOUND(messageNotFound);
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new FORBIDDEN(messageForbidden);
      }
      return Movie.findByIdAndRemove(req.params.movieId)
        .then((removeMovie) => {
          res.send({ data: removeMovie });
        });
    })
    .catch(next);
};

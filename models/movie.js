const mongoose = require('mongoose');
const { linkRegex } = require('../utils/const');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: mongoose.Schema.Types.Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    match: linkRegex,
    required: true,
  },
  trailerLink: {
    type: String,
    match: linkRegex,
    required: true,
  },
  thumbnail: {
    type: String,
    match: linkRegex,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.Number,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);

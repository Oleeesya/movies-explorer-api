const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const {
  getUser,
  updateProfile,
} = require('../controllers/users');

// возвращает всех пользователей
router.get('/me', auth, getUser);

// обновляет профиль
router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().min(2).max(30).required(),
  }),
}), updateProfile);

module.exports = router;

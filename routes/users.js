const router = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getUser,
  updateProfile,
} = require('../controllers/users');

const { validUpdateProfile } = require('../utils/validation');

// возвращает информацию о пользователе
router.get('/me', auth, getUser);

// обновляет профиль
router.patch('/me', validUpdateProfile, updateProfile);

module.exports = router;

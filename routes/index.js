const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

const { validLogin, validCreateUser } = require('../utils/validation');

router.post('/signin', validLogin, login);

router.post('/signup', validCreateUser, createUser);

router.use('/users', auth, require('./users'));

router.use('/movies', auth, require('./movies'));

module.exports = router;

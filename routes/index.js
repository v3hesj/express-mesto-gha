const router = require('express').Router();
const NotFoundError = require('../errors/not-found-err');
// const { celebrate, Joi } = require('celebrate');
const { auth } = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { validateAuth, validateRegister } = require('../utils/validation');

const cards = require('./cards');
const users = require('./users');

router.post(
  '/signin',
  validateAuth,
  login,
);

router.post(
  '/signup',
  validateRegister,
  createUser,
);

router.use(auth);
router.use('/cards', cards);
router.use('/users', users);
router.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;

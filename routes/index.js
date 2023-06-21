const router = require('express').Router();

const cards = require('./cards');
const users = require('./users');

router.use('/cards', cards);
router.use('/users', users);
router.use('/*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

module.exports = router;

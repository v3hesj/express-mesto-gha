const router = require('express').Router();

const cards = require('./cards.js');
const users = require('./users.js');

router.use('/cards', cards);
router.use('/users', users);

module.exports = router;
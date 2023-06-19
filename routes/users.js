const usersRouter = require('express').Router();

const { getAllUsers, findUser, createUser } = require('../controllers/users.js');

usersRouter.get('/', getAllUsers);
usersRouter.get('/:id', findUser);
usersRouter.post('/', createUser);

module.exports = usersRouter;
const usersRouter = require('express').Router();

const {
  getAllUsers, findUser, createUser, updateUser, updateAvatar,
} = require('../controllers/users');

usersRouter.get('/', getAllUsers);
usersRouter.get('/:id', findUser);
usersRouter.post('/', createUser);
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateAvatar);

module.exports = usersRouter;

const usersRouter = require('express').Router();
const { validateId, validateUpdate, validateAvatar } = require('../utils/validation');

const {
  getAllUsers, findUser, updateUser, updateAvatar, getUserInfo,
} = require('../controllers/users');

usersRouter.get('/', getAllUsers);
usersRouter.get('/me', getUserInfo);
usersRouter.get('/:id', validateId, findUser);
// usersRouter.post('/', createUser);
usersRouter.patch('/me', validateUpdate, updateUser);
usersRouter.patch('/me/avatar', validateAvatar, updateAvatar);

module.exports = usersRouter;

const { ObjectId } = require('mongoose').Types.ObjectId;
const { CodeSuccess, CodeError } = require('../utils/constants');
const User = require('../models/user');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(CodeSuccess.OK).send({ data: users }))
    .catch(() => res.status(CodeError.SERVER_ERROR).send({ message: 'Произошла ошибка' }));
};

module.exports.findUser = (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    res.status(CodeError.BAD_REQUEST).send({ message: 'Некорректный _id' });
    return;
  }

  User.findById({ _id: id })
    .then((user) => (user ? res.status(CodeSuccess.OK).send({ data: user }) : res.status(CodeError.NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден' })))
    .catch(() => res.status(CodeError.SERVER_ERROR).send({ message: 'Произошла ошибка' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(CodeSuccess.OK).send({ data: user }))
    .catch((err) => ((err.name === 'CastError' || err.name === 'ValidationError')
      ? res.status(CodeError.BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя' })
      : res.status(CodeError.SERVER_ERROR).send({ message: 'Произошла ошибка' })));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => (user ? res.status(CodeSuccess.OK).send({ data: user }) : res.status(CodeError.NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден' })))
    .catch((err) => ((err.name === 'ValidationError') ? res.status(CodeError.BAD_REQUEST).send({ message: 'Ошибка валидации' }) : res.status(CodeError.SERVER_ERROR).send({ message: 'Произошла ошибка' })));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => (user ? res.status(CodeSuccess.OK).send({ data: user }) : res.status(CodeError.NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден' })))
    .catch((err) => ((err.name === 'ValidationError') ? res.status(CodeError.BAD_REQUEST).send({ message: 'Ошибка валидации' }) : res.status(CodeError.SERVER_ERROR).send({ message: 'Произошла ошибка' })));
};

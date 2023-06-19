const ObjectId = require('mongoose').Types.ObjectId;

const User = require('../models/user');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.findUser = (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    res.status(400).send({ message: 'Некорректный _id' });
    return;
  }

  User.findById({ _id: id })
    .then((user) => (user ? res.status(200).send({ data: user }) : res.status(404).send({ message: 'Пользователь по указанному _id не найден' })))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true
  })
    .then((user) => (user ? res.status(200).send({ data: user }) : res.status(404).send({ message: 'Пользователь по указанному _id не найден' })))
    .catch((err) => ((err.name === 'ValidationError') ? res.status(400).send({ message: 'Ошибка валидации' }) : res.status(500).send({ message: 'Произошла ошибка' })));
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true
  })
    .then((user) => (user ? res.status(200).send({ data: user }) : res.status(404).send({ message: 'Пользователь по указанному _id не найден' })))
    .catch((err) => ((err.name === 'ValidationError') ? res.status(400).send({ message: 'Ошибка валидации' }) : res.status(500).send({ message: 'Произошла ошибка' })));
};
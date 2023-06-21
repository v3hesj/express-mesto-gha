const { ObjectId } = require('mongoose').Types.ObjectId;

const Card = require('../models/card');
const { CodeSuccess, CodeError } = require('../utils/constants');

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(CodeSuccess.OK).send({ data: cards }))
    .catch((err) => ((err.name === 'ValidationError')
      ? res.status(CodeError.BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании карточки' })
      : res.status(CodeError.SERVER_ERROR).send({ message: 'Произошла ошибка' })));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(CodeSuccess.CREATED).send({ data: card }))
    .catch((err) => ((err.name === 'ValidationError')
      ? res.status(CodeError.BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании карточки' })
      : res.status(CodeError.SERVER_ERROR).send({ message: 'Произошла ошибка' })));
};

module.exports.deleteCard = (req, res) => {
  if (!ObjectId.isValid(req.params)) {
    res.status(CodeError.BAD_REQUEST).send({ message: 'Передан невалидный id' });
    return;
  }
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        res.status(CodeError.NOT_FOUND).send({ message: 'Карточка с указанным _id не найдена' });
      } else if (!card.owner.equals(req.user._id)) {
        res.send({ message: 'Невозможно удалить чужую карточку' });
      } else {
        Card.findByIdAndRemove(req.params.id)
          .then(() => res.status(CodeSuccess.OK).send({ data: card, message: 'Карточка успешно удалена с сервера' }))
          .catch((err) => ((err.name === 'CastError')
            ? res.status(CodeError.BAD_REQUEST).send({ message: 'Переданы некорректные данные при удаления карточки' })
            : res.status(CodeError.SERVER_ERROR).send({ message: 'Произошла ошибка' })));
      }
    })
    .catch(() => res.status(CodeError.SERVER_ERROR).send({ message: 'Произошла ошибка' }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((selectedCard) => (selectedCard
      ? res.status(CodeSuccess.OK).send({ data: selectedCard })
      : res.status(CodeError.NOT_FOUND).send({ message: 'Передан несуществующий _id карточки' })))
    .catch((err) => ((err.name === 'CastError')
      ? res.status(CodeError.BAD_REQUEST).send({ message: 'Переданы некорректные данные для постановки/снятии лайка' })
      : res.status(CodeError.SERVER_ERROR).send({ message: 'Произошла ошибка' })));
};

module.exports.removeLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((selectedCard) => (selectedCard
      ? res.status(CodeSuccess.OK).send({ data: selectedCard })
      : res.status(CodeError.NOT_FOUND).send({ message: 'Передан несуществующий _id карточки' })))
    .catch((err) => ((err.name === 'CastError')
      ? res.status(CodeError.BAD_REQUEST).send({ message: 'Переданы некорректные данные для постановки/снятии лайка' })
      : res.status(CodeError.SERVER_ERROR).send({ message: 'Произошла ошибка' })));
};

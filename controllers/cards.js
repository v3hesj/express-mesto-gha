const ObjectId = require('mongoose').Types.ObjectId;

const Card = require('../models/card.js');

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch((err) => ((err.name === 'ValidationError') ? res.status(400).send({ message: 'Переданы некорректные данные при создании карточки' }) : res.status(500).send({ message: 'Произошла ошибка' })));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.deleteCard = (req, res) => {

  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка с указанным _id не найдена' });
      } else if (!card.owner.equals(req.user._id)) {
        res.send({ message: 'Невозможно удалить чужую карточку' });
      } else {
        Card.findByIdAndRemove(req.params.id)
          .then(() => res.status(200).send({ data: card, message: 'Карточка успешно удалена с сервера' }))
          .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((selectedCard) =>
      (selectedCard ? res.status(200).send({ data: selectedCard }) : res.status(404).send({ message: 'Передан несуществующий _id карточки' })))
    .catch((err) => ((err  instanceof CastError) ? res.status(400).send({ message: 'Переданы некорректные данные для постановки/снятии лайка' }) : res.status(500).send({ message: 'Произошла ошибка' })));
};

module.exports.removeLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
  .then((selectedCard) =>
     (selectedCard ? res.status(200).send({ data: selectedCard }) : res.status(404).send({ message: 'Передан несуществующий _id карточки' })))
  .catch((err) => ((err instanceof CastError) ? res.status(400).send({ message: 'Переданы некорректные данные для постановки/снятии лайка' }) : res.status(500).send({ message: 'Произошла ошибка' })));
};
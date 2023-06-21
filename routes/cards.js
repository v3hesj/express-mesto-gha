const cardsRouter = require('express').Router();

const {
  getAllCards, createCard, deleteCard, likeCard, removeLikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getAllCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:cardId', deleteCard);

cardsRouter.put('/:cardId/likes', likeCard);
cardsRouter.delete('/:cardId/likes', removeLikeCard);

module.exports = cardsRouter;

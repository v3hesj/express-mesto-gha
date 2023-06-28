const cardsRouter = require('express').Router();
const { validateCardCreate, validateCardId } = require('../utils/validation');

const {
  getAllCards, createCard, deleteCard, likeCard, removeLikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getAllCards);
cardsRouter.post('/', validateCardCreate, createCard);
cardsRouter.delete('/:cardId', validateCardId, deleteCard);

cardsRouter.put('/:cardId/likes', validateCardId, likeCard);
cardsRouter.delete('/:cardId/likes', validateCardId, removeLikeCard);

module.exports = cardsRouter;

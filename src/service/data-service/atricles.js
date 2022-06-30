`use strict`;

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../constants`);

class ArticlesService {
  constructor(offers) {
    this._offers = offers;
  }

  findAll() {
    return this._offers;
  }

  findOne(offerId) {
    return this._offers.find(offer => offer.id === offerId);
  }

  create(offerData) {
    const offer = Object.assign({id: nanoid(MAX_ID_LENGTH), comments: []}, offerData);
    this._offers.push(offer);
    return offer;
  }

  update(offerId, offerData) {
    const oldOffer = this._offers.find(offer => offer.id === offerId);
    return Object.assign(oldOffer, offerData);
  }

  delete(offerId) {
    const offer = this._offers.find(offer => offer.id === offerId);

    if(!offer) {
      return null;
    }

    this._offers = this._offers.filter(offer => offer.id !== offerId);
    return offer;
  }
}

module.exports = ArticlesService;

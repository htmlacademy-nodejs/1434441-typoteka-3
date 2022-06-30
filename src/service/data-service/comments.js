'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../constants`);

class CommentsService {
  constructor(offers) {
    this._offers = offers;
  }

  findAll(offerId) {
    const offer = this._offers.find(offer => offer.id === offerId);
    return offer.comments;
  }

  drop(commentId, offerId) {
    const article = this._offers.find(offer => offer.id === offerId);
    const comment = article.comments.find(comment => comment.id === commentId);

    if(!comment) {
      return null;
    }

    this._offers = this._offers.find(offer => offer.id === offerId)
      .comments.filter(comment => comment.id !== commentId);

    return comment;
  }

  create(offerId, commentData) {
    const offer = Object.assign({id: nanoid(MAX_ID_LENGTH)}, {text: commentData});
    this._offers.find(offer => offer.id === offerId)
      .comments.push(offer);
    return offer;
  }
}

module.exports = CommentsService;

'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../constants`);

class CommentsService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll(articleId) {
    const article = this._articles.find((art) => art.id === articleId);
    return article.comments;
  }

  delete(articleId, commentId) {
    const article = this._articles.find((art) => art.id === articleId);
    const comment = article.comments.find((cmnt) => cmnt.id === commentId);

    if (!comment) {
      return null;
    }

    this._articles = this._articles.find((art) => art.id === articleId)
      .comments.filter((cmnt) => cmnt.id !== commentId);

    return comment;
  }

  create(articleId, commentData) {
    const article = Object.assign({id: nanoid(MAX_ID_LENGTH)}, {text: commentData});
    this._articles.find((art) => art.id === articleId)
      .comments.push(article);
    return article;
  }
}

module.exports = CommentsService;

'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../constants`);

class CommentsService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll(articlesId) {
    const article = this._articles.find(article => article.id === articlesId);
    return article.comments;
  }

  drop(articleId, commentId) {
    const article = this._articles.find(article => article.id === articleId);
    const comment = article.comments.find(comment => comment.id === commentId);

    if(!comment) {
      return null;
    }

    this._articles = this._articles.find(article => article.id === articleId)
      .comments.filter(comment => comment.id !== commentId);

    return comment;
  }

  create(articleId, commentData) {
    const article = Object.assign({id: nanoid(MAX_ID_LENGTH)}, {text: commentData});
    this._articles.find(article => article.id === articleId)
      .comments.push(article);
    return article;
  }
}

module.exports = CommentsService;

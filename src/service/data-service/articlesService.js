`use strict`;

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../constants`);

class ArticlesService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll() {
    return this._articles;
  }

  findOne(articlesId) {
    return this._articles.find(article => article.id === articlesId);
  }

  create(articleData) {
    const article = Object.assign({id: nanoid(MAX_ID_LENGTH), comments: []}, articleData);
    this._articles.push(article);
    return article;
  }

  update(articleId, articleData) {
    const oldArticle = this._articles.find(article => article.id === articleId);
    return Object.assign(oldArticle, articleData);
  }

  delete(articleId) {
    const articleIndex = this._articles.findIndex(article => article.id === articleId);

    if (articleIndex === -1) {
      return null;
    }

    this._articles = [...this._articles.slice(0, articleIndex), ...this._articles.slice(articleIndex + 1)];
    return this._articles[articleIndex];
  }
}

module.exports = ArticlesService;

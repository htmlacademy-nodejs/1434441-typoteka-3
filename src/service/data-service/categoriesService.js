'use strict';

class CategoriesService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll() {
    return [...new Set(
        this._articles.flatMap((article) => article.category)
    )];
  }
}

module.exports = CategoriesService;

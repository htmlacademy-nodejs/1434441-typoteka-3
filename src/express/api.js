'use strict';

const axios = require(`axios`);

const TIMEOUT = `1000`;

const port = process.env.API_PORT || 3000;
const defaultURL = `http://localhost:${port}/api/`;

class API {
  constructor(baseURL, timeout) {
    this._http = axios.create({
      baseURL,
      timeout
    });
  }

  async _load(request, options) {
    const response = await this._http({request, ...options});
    return response.data;
  }

  getArticles() {
    return this._load(`/articles`);
  }

  getArticle(id) {
    return this._load(`/articles/${id}`);
  }

  getCategories() {
    return this._load(`categories`);
  }

  search(query) {
    return this._load(`search`, {params: {query}});
  }

  createArticle(data) {
    return this._load(`articles`, {metod: `POST`, data});
  }
}

const defaultAPI = new API(defaultURL, TIMEOUT);

module.exports = {
  API,
  getAPI: () => defaultAPI
};

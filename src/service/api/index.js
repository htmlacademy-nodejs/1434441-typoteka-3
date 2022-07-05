'use strict';

const {Router} = require("express");
const getMockData = require("../lib/get-mock-data");

const articles = require(`../api/articles`);
const categories = require(`../api/categories`);
const comments = require(`../api/comments`);
const search = require(`../api/search`);

const {
  ArticlesService,
  CategoriesService,
  CommentsService,
  SearchService
} = require(`../data-service`);

const app = Router();

(async () => {
  const mockData = await getMockData();

  articles(app, new ArticlesService(mockData));
  categories(app, new CategoriesService(mockData));
  comments(app, new ArticlesService(mockData), new CommentsService(mockData));
  search(app, new SearchService(mockData));
})();

module.exports = app;

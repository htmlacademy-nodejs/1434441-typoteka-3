'use strict';

const {Router} = require(`express`);
const personalRouter = new Router();

const api = require(`../api`).getAPI();

personalRouter.get(`/`, async (req, res) => {
  const articles = await api.getArticles();
  res.render(`my`, {articles});
});
personalRouter.get(`/comments`, async (req, res) => {
  const articles = await api.getArticles();
  const comments = articles.flatMap((article) => article.comments);
  res.render(`comments`, {comments: comments.slice(0, 5)});
});
personalRouter.get(`/categories`, (req, res) => {
  res.render(`all-categories`);
});

module.exports = personalRouter;

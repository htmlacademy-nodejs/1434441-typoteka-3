'use strict';

const {Router} = require(`express`);
const articleRouter = new Router();

const api = require(`../api`).getAPI();

articleRouter.get(`/add`, (req, res) => {
  res.render(`new-article`);
});
articleRouter.get(`/category/:id`, (req, res) => {
  res.render(`articles-by-category`);
});
articleRouter.get(`/post/:id`, (req, res) => {
  res.render(`post-detail`);
});
articleRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const [article, categories] = await Promise.all([
    api.getArticle(id),
    api.getCategories()
  ]);
  res.render(`edit-article`, {article, categories});
});

module.exports = articleRouter;

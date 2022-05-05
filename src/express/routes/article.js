'use strict';

const {Router} = require(`express`);
const articleRouter = new Router();

articleRouter.get(`/post`, (req, res) => {
  res.render(`post`);
});
articleRouter.get(`/category/:id`, (req, res) => {
  res.render(`articles-by-category`);
});
articleRouter.get(`/post/:id`, (req, res) => {
  res.render(`post-detail`);
});
articleRouter.get(`/:id`, (req, res) => {
  res.render(`${req.originalUrl}`);
});

module.exports = articleRouter;

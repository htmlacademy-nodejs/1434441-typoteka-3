'use strict';

const {Router} = require(`express`);
const articleRouter = new Router();

articleRouter.get(`/add`, (req, res) => {
  res.send(`${req.originalUrl}`);
});
articleRouter.get(`/category/:id`, (req, res) => {
  res.send(`${req.originalUrl}`);
});
articleRouter.get(`/edit/:id`, (req, res) => {
  res.send(`${req.originalUrl}`);
});
articleRouter.get(`/:id`, (req, res) => {
  res.send(`${req.originalUrl}`);
});

module.exports = articleRouter;

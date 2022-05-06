'use strict';

const {Router} = require(`express`);
const personalRouter = new Router();

personalRouter.get(`/`, (req, res) => {
  res.render(`main`);
});
personalRouter.get(`/comments`, (req, res) => {
  res.render(`comments`);
});
personalRouter.get(`/categories`, (req, res) => {
  res.render(`all-categories`);
});

module.exports = personalRouter;

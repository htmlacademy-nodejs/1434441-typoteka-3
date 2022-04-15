'use strict';

const {Router} = require(`express`);
const personalRouter = new Router();

personalRouter.get(`/`, (req, res) => {
  res.send(`${req.originalUrl}`);
});
personalRouter.get(`/comments`, (req, res) => {
  res.send(`${req.originalUrl}`);
});
personalRouter.get(`/categories`, (req, res) => {
  res.send(`${req.originalUrl}`);
});

module.exports = personalRouter;

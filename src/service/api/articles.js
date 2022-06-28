'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../constants`);

const articlesRouter = Router();

module.exports = (app, service) => {
  app.use(`/articles`, articlesRouter);

  articlesRouter.get(`/`, async (req, res) => {
    const articles = await service.findAll();
    res.status(HttpCode.OK).json(articles);
  });
};


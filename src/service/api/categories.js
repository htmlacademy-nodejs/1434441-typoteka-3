'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../constants`);

const categoriesRouter = new Router();

module.exports = (app, categoriesService) => {
  app.use(`/categories`, categoriesRouter);

  categoriesRouter.get(`/`, async (req, res) => {
    const articles = await categoriesService.findAll();
    res.status(HttpCode.OK).json(articles);
  });
};

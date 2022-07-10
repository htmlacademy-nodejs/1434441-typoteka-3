'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../constants`);

const searchValidator = require(`../middlewares/searchValidator`);

const searchRouter = new Router();

module.exports = (app, searchService) => {
  app.use(`/search`, searchRouter);

  searchRouter.get(`/`, searchValidator, (req, res) => {
    const {query} = res.locals;

    const searchResults = searchService.findAll(query);
    const searchStatus = searchResults.length > 0 ? HttpCode.OK : HttpCode.NOT_FOUND;

    res.status(searchStatus)
      .json(searchResults);
  });
};

'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../constants`);

const articlesValidator = require(`../middlewares/articlesValidator`);
const articlesSearch = require(`../middlewares/articlesSearch`);

const articlesRouter = new Router();

module.exports = (app, articlesService) => {
  app.use(`/articles`, articlesRouter);

  articlesRouter.get(`/`, async (req, res) => {
    const article = await articlesService.findAll();
    res.status(HttpCode.OK).json(article);
  });

  articlesRouter.post(`/`, articlesValidator, async (req, res) => {
    const article = articlesService.create(req.body);

    return res.status(HttpCode.CREATED).json(article);
  });

  articlesRouter.get(`/:articleId`, articlesSearch(articlesService), async (req, res) => {
    const {articleId} = req.params;
    const article = await articlesService.findOne(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND).send(`Article ${articleId} not found`);
    }

    return res.status(HttpCode.OK).json(article);
  });

  articlesRouter.put(`/:articleId`, articlesValidator, async (req, res) => {
    const {articleId} = req.params;
    const article = await articlesService.update(articleId, req.body);

    return res.status(HttpCode.OK).json(article);
  });

  articlesRouter.delete(`/:articleId`, articlesSearch(articlesService), async (req, res) => {
    const {articleId} = req.params;
    const article = await articlesService.delete(articleId);

    if (!article) {
      res.status(HttpCode.NOT_FOUND).send(`Not found`);
    }

    return res.status(HttpCode.OK).json(article);
  });
};

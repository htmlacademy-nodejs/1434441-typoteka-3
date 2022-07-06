'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../constants`);

const articlesSearch = require(`../middlewares/articlesSearch`);
const commentsValidator = require(`../middlewares/commentsValidator`);

const commentsRouter = Router();

module.exports = (app, articlesService, commentsService) => {
  app.use(`/articles`, commentsRouter);

  commentsRouter.get(`/:articleId/comments`, articlesSearch(articlesService), async (req, res) => {
    const {article} = res.locals;
    const comments = await commentsService.findAll(article.id);

    if(!comments) {
      res.status(HttpCode.NOT_FOUND).send(`Not found`);
    }

    return res.status(HttpCode.OK).json(comments);
  });

  commentsRouter.post(`/:articleId/comments`, articlesSearch(articlesService), async (req, res) => {
    const {article} = res.locals;
    const comment = await commentsService.create(article.id, req.body);

    if(!comment) {
      res.status(HttpCode.NOT_FOUND).send(`Not found`);
    }

    return res.status(HttpCode.OK).json(comment);
  });

  commentsRouter.delete(`/:articleId/comments/:commentId`, [articlesSearch(articlesService), commentsValidator], async (req, res) => {
    const {article} = res.locals;
    const {commentId} = req.params;
    const comment = await commentsService.delete(article.id, commentId);

    if(!comment) {
      res.status(HttpCode.NOT_FOUND).send(`Not found`);
    }

    return res.status(HttpCode.OK).json(comment);
  });
};


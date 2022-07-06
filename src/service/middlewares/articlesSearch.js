'use strict';

const {HttpCode} = require(`../constants`);

module.exports = (service) => (req, res, next) => {
  const {articleId} = req.params;
  const article = service.findOne(articleId);

  if (!article) {
    res.status(HttpCode.NOT_FOUND).send(`Offer with ${articleId} not found`);
    return;
  }

  res.locals.article = article;
  // eslint-disable-next-line consistent-return
  return next();
};

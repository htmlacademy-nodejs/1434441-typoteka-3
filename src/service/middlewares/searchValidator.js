'use strict';

const {HttpCode} = require(`../constants`);

module.exports = (req, res, next) => {
  const {query = ``} = req.query;
  const queryWords = query.split(` `);

  if (!query) {
    res.status(HttpCode.BAD_REQUEST).json([]);
    return;
  }

  if (queryWords.length < 2) {
    res.status(HttpCode.BAD_REQUEST).send(`More then one word`);
    return;
  }

  res.locals.query = query;
  next();
};

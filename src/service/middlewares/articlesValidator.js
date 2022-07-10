'use strict';

const {HttpCode} = require(`../constants`);
const offerKeys = [`title`, `announce`, `fulltext`, `createdDate`, `category`];

module.exports = (req, res, next) => {
  const clientData = req.body;
  const keys = Object.keys(clientData);
  const keysExist = offerKeys.every((key) => keys.includes(key));

  if (!keysExist) {
    res.status(HttpCode.BAD_REQUEST).send(`Bad request`);
    return;
  }

  next();
};

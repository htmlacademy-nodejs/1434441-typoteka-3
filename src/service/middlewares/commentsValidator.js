'use strict';

const {HttpCode} = require(`../constants`);
const commentKeys = ['text'];

module.exports = (req, res, next) => {
  const commentData = req.body;
  const keys = Object.keys(commentData);
  const keysExist = commentKeys.every(key => keys.includes(key));

  if(!keysExist) {
    res.status(HttpCode.BAD_REQUEST).send(`Bad request`);
    return
  }

  next();
};

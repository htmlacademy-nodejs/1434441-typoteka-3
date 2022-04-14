const {Router} = require(`express`);
const personalRouter = new Router();

personalRouter.get(`/`, (req, res) => {
  res.send(`/my`);
});
personalRouter.get(`/comments`, (req, res) => {
  res.send(`/my/comments`);
});
personalRouter.get(`/categories`, (req, res) => {
  res.send(`/my/categories`);
});

module.exports = personalRouter;

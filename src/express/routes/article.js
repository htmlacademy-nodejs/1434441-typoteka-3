const {Router} = require(`express`);
const articleRouter = new Router();

articleRouter.get(`/add`, (req, res) => {
  res.send(`/article/add`);
});
articleRouter.get(`/category/:id`, (req, res) => {
  res.send(`/article/category/${req.params.id}`);
});
articleRouter.get(`/edit/:id`, (req, res) => {
  res.send(`/article/edit/${req.params.id}`);
});
articleRouter.get(`/:id`, (req, res) => {
  res.send(`/article/${req.params.id}`);
});

module.exports = articleRouter;

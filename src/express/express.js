'use strict';

const express = require(`express`);
const personalRoutes = require(`./routes/personal`);
const articleRouter = require(`./routes/article`);
const api = require(`./api`).getAPI();

const app = express();

const port = 8080;
app.listen(port);

app.set(`views`, __dirname + `/templates`);
app.set(`view engine`, `pug`);

app.use(express.static(__dirname + `/public`));

app.get(`/`, async (req, res) => {
  const articles = await api.getArticles();
  res.render(`main`, {articles});
});

app.get(`/login`, (req, res) => {
  res.render(`login`);
});

app.get(`/register`, (req, res) => {
  res.render(`sign-up`);
});

app.get(`/search`, async (req, res) => {
  try {
    const {query} = req.query;
    const results = await api.search(query);
    res.render(`search`, {results});
  } catch (err) {
    res.render(`search`, {results: []});
  }
});

app.get(`/404`, (req, res) => {
  res.render(`errors/404`);
});

app.get(`/500`, (req, res) => {
  res.render(`errors/500`);
});

app.use(`/my`, personalRoutes);
app.use(`/articles`, articleRouter);

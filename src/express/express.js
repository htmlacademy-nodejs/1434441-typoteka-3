'use strict';

const express = require(`express`);
const personalRoutes = require(`./routes/personal`);
const articleRouter = require(`./routes/article`);

const app = express();

const port = 8080;
app.listen(port);

app.set(`views`, __dirname + `/templates`);
app.set(`view engine`, `pug`);

app.use(express.static(__dirname + `/public`));

app.get(`/login`, (req, res) => {
  res.render(`login`);
});

app.get(`/register`, (req, res) => {
  res.render(`sign-up`);
});

app.get(`/search`, (req, res) => {
  res.render(`search`);
});

app.get(`/my`, (req, res) => {
  res.render(`my`);
});

app.get(`/404`, (req, res) => {
  res.render(`errors/404`);
});

app.get(`/500`, (req, res) => {
  res.render(`errors/500`);
});

app.use(`/my`, personalRoutes);
app.use(`/article`, articleRouter);

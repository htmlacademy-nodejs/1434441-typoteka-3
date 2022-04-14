'use strict';

const express = require(`express`);
const personalRoutes = require(`./routes/personal`);
const articleRouter = require(`./routes/article`);

const app = express();

const port = 8080;

app.get(`/`, (req, res) => {
  res.send(`${req.originalUrl}`);
});
app.get(`/register`, (req, res) => {
  res.send(`${req.originalUrl}`);
});
app.get(`/login`, (req, res) => {
  res.send(`${req.originalUrl}`);
});
app.get(`/search`, (req, res) => {
  res.send(`${req.originalUrl}`);
});

app.use(`/my`, personalRoutes);
app.use(`/article`, articleRouter);

app.listen(port);

'use strict';

const DEFAULT_PORT = 3000;

const express = require('express');
const app = express();

const getMockData = require(`../lib/get-mock-data`);
const {HttpCode, API_PREFIX} = require(`../constants`);
const routes = require(`../api`);

const chalk = require(`chalk`);

const notFoundMessageText = `Not Found`;

app.use(express.json());
app.use(API_PREFIX, routes);

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    app.get('/posts', async (req, res) => {

      const mocks = getMockData();
      mocks.then(mocks => {
        if (!mocks || mocks.length === 0) {
          res.send([]);
          return
        }
        res.send(mocks);
      })
        .catch(() =>
          res.send(notFoundMessageText));
    });


    app.use((req, res) => {
      res.status(HttpCode.NOT_FOUND).send(notFoundMessageText);
    });

    app
      .listen(port)
      .on(`listening`, () => {
        console.info(chalk.green(`Ожидаю соединений на ${port}`));
      })
      .on(`error`, ({message}) => {
        console.error(chalk.red(`Ошибка создания сервера: ${message}`));
      });
  }
};


'use strict';

const DEFAULT_PORT = 3000;

const express = require('express');
const app = express();
const getMockData = require(`../lib/get-mock-data`);
const {HttpCode} = require(`../constants`);

const chalk = require(`chalk`);

const notFoundMessageText = `Not Found`;

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    app.get('/posts', async (req, res) => {

      const mocks = getMockData();
      mocks.then(mocks => {
          if (!mocks || mocks.length === 0) {
            res.send([])
            return
          }
          res.send(mocks);
        })
        // кажется этот catch никогда не сработает, но я могу ошибаться
        .catch (() =>
          res.send(notFoundMessageText)
      );
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

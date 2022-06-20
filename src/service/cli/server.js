'use strict';

const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;

const express = require('express');
const app = express();

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const notFoundMessageText = `Not Found`;

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    app.get('/posts', async (req, res) => {

      try {
        const mocksFile = await fs.readFile(FILENAME);
        const mocks = JSON.parse(mocksFile);

        if (!mocks || mocks.length === 0) {
          res.send([])
          return
        }
        res.send(mocks);

      } catch (err) {
        res.send(notFoundMessageText);
      }
    })

    app.get('*', (req, res) => {
      res.send(notFoundMessageText)
    })

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

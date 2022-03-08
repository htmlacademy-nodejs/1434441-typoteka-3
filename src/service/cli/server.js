'use strict';

const http = require(`http`);
const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const HttpCodes = require(`../constants`);

const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    const onConnect = async (req, res) => {
      const notFoundMessageText = `Not Found`;

      switch (req.url) {
        case '/':
          try {
            const mocksFile = await fs.readFile(FILENAME);
            const mocks = JSON.parse(mocksFile);
            const message = mocks.map((post) =>
              `<li>${post.title}</li>`).join(``);
            sendResponse(res, HttpCodes.OK, `<ul>${message}</ul>`);
          } catch (err) {
            sendResponse(res, HttpCodes.NOT_FOUND, notFoundMessageText);
          }

          break;
        default:
          sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
          break;
      }
    };

    http.createServer(onConnect)
      .listen(port)
      .on(`listening`, (err) => {
        console.info(chalk.green(`Ожидаю соединений на ${port}`));
      })
      .on(`error`, ({message}) => {
        console.error(chalk.red(`Ошибка создания сервера: ${message}`))
      });
  }

}

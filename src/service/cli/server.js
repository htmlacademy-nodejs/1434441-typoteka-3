'use strict';

const DEFAULT_PORT = 3000;

const express = require(`express`);
const app = express();

const getMockData = require(`../lib/get-mock-data`);
const {HttpCode, API_PREFIX} = require(`../constants`);
const routes = require(`../api`);

const {getLogger} = require(`../lib/logger`);

const notFoundMessageText = `Not Found`;
const logger = getLogger({name: `api`});

app.use(express.json());
app.use(API_PREFIX, routes);

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    app.get(`/posts`, async (req, res) => {

      const mocks = getMockData();
      mocks.then((data) => {
        if (!data || data.length === 0) {
          res.send([]);
          return;
        }
        res.send(data);
      })
        .catch((err) =>
          logger.error(`An error occurred: ${err.message}`)
        );
    });

    app.use((req, res, next) => {
      logger.debug(`Request on route ${req.url}`);
      res.on(`finish`, () => {
        logger.info(`Response status code ${res.statusCode}`);
      });
      next();
    });

    app.use((err, _req, _res, _next) => {
      logger.error(`An error occurred on processing request: ${err.message}`);
    });

    app.use((req, res) => {
      res.status(HttpCode.NOT_FOUND).send(notFoundMessageText);
      logger.error(`Route not found: ${req.url}`);
    });

    app
      .listen(port)
      .on(`listening`, () => {
        logger.info(`Listening to connections on ${port}`);
      })
      .on(`error`, ({message}) => {
        logger.error(`An error occurred on server creation: ${message}`);
      });
  }
};


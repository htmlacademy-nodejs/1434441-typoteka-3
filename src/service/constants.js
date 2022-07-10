'use strict';

module.exports.OFFER_MAX_COUNT = 1000;
module.exports.MAX_ID_LENGTH = 6;

module.exports.DEFAULT_COMMAND = `--help`;
module.exports.USER_ARGV_INDEX = 2;
module.exports.ExitCode = {
  error: 1,
  success: 0,
};
module.exports.Env = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`,
};

module.exports.API_PREFIX = `/api`;

module.exports.HttpCode = {
  OK: 200,
  CREATED: 201,
  DELETED: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

'use strict';

const fs = require(`fs`).promises;
const FILENAME = `mocks.json`;
const {HttpCode} = require(`../constants`);
let mocks = [];

const getMockData = async () => {
  if (mocks.length > 0) {
    return mocks;
  }

  try {
    const mocksFile = await fs.readFile(FILENAME);
    mocks = JSON.parse(mocksFile);
  } catch (err) {
    console.log(`Ответ сервера с ошибкой ${HttpCode.INTERNAL_SERVER_ERROR}`);
    return (err);
  }

  return mocks;
};

module.exports = getMockData;

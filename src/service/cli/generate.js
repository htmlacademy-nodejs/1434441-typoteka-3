'use strict';

const fs = require('fs').promises;
const dayjs = require('dayjs');
const chalk = require('chalk');
const {ExitCode} = require("../constants");

const {
  getRandomInt,
  shuffle,
} = require('../../../utils');

const DEFAULT_COUNT = 1;
const FILE_NAME = 'mocks.json';
const OFFER_MAX_COUNT = 1000;

const announceCount = {
  min: 1,
  max: 5,
};

const TITLES = [
  'Учим HTML и CSS',
  'Что такое золотое сечение',
  'Как собрать камни бесконечности',
  'Борьба с прокрастинацией',
  'Рок — это протест',
  'Самый лучший музыкальный альбом этого года',
];

const DESCRIPTION = [
  'Ёлки — это не просто красивое дерево. Это прочная древесина.',
  'Первая большая ёлка была установлена только в 1938 году.',
  'Вы можете достичь всего. Стоит только немного постараться и запастись книгами.',
  'Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.',
  'Золотое сечение — соотношение двух величин, гармоническая пропорция.',
  'Собрать камни бесконечности легко, если вы прирожденный герой.',
];

const CATEGORIES = [
  'IT',
  'Музыка',
  'Кино',
  'Программирование',
  'Железо',
];

const date = new Date();
const dateNowUnix = +date;
const datePastUnix = date.setMonth(date.getMonth() - 3);
const randomDate = getRandomInt(dateNowUnix, datePastUnix)

const offersCount = {
  min: 1,
  max: 1000,
};

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    'title': TITLES[getRandomInt(0, TITLES.length - 1)],
    'announce': shuffle(DESCRIPTION).slice(0, getRandomInt(announceCount.min, announceCount.max)).join(' '),
    'fulltext': shuffle(DESCRIPTION).slice(0, DESCRIPTION.length - 1).join(' '),
    'createdDate': dayjs(randomDate).format('YYYY-MM-DD HH:mm:ss'),
    'category': [shuffle(CATEGORIES).slice(0, CATEGORIES.length -1).join(', ')],
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countOffer > OFFER_MAX_COUNT) {
      console.error(`Не больше ${OFFER_MAX_COUNT} публикаций`);
      process.exit(ExitCode.error);
    }

    const content = JSON.stringify(generateOffers(countOffer), null, 2);

    try {
      await fs.writeFile(FILE_NAME, content);
      console.log(chalk.green(`Operation success. File created.`));
    } catch {
      console.error(chalk.red(`Can't write data to file...`));
    }
  }
};

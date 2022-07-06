'use strict';

const fs = require(`fs`).promises;
const dayjs = require(`dayjs`);
const chalk = require(`chalk`);
const {nanoid} = require("nanoid");
const {ExitCode, OFFER_MAX_COUNT, MAX_ID_LENGTH} = require(`../constants`);

const {
  getRandomInt,
  shuffle,
} = require(`../../../utils`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const announceCount = {
  min: 1,
  max: 5,
};

const commentsCount = {
  min: 1,
  max: 3,
};

const date = new Date();
const dateNowUnix = Number(date);
const datePastUnix = date.setMonth(date.getMonth() - 3);
const randomDate = getRandomInt(dateNowUnix, datePastUnix);

const getData = async (fileName) => {
  try {
    const data = await fs.readFile(`./data/` + fileName + `.txt`, `utf8`);
    return data.split(`\n`).filter(Boolean);
  } catch (err) {
    return console.error(err);
  }
};

const decomposeComments = (comments) => comments.map((comment) => ({
  id: nanoid(MAX_ID_LENGTH),
  text: comment,
}));

const generateOffers = (count, titles, categories, descriptions, comments) => (
Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    title: titles[getRandomInt(0, titles.length - 1)],
    announce: shuffle(descriptions).slice(0, getRandomInt(announceCount.min, announceCount.max)).join(` `),
    fulltext: shuffle(descriptions).slice(0, descriptions.length - 1).join(` `),
    createdDate: dayjs(randomDate).format(`YYYY-MM-DD HH:mm:ss`),
    category: [shuffle(categories).slice(0, categories.length - 1).join(`, `)],
    comments: decomposeComments(shuffle(comments).slice(0, getRandomInt(commentsCount.min, commentsCount.max))),
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    const descriptions = await getData(`descriptions`);
    const categories = await getData(`categories`);
    const titles = await getData(`titles`);
    const comments = await getData(`comments`);

    if (countOffer > OFFER_MAX_COUNT) {
      console.error(`Не больше ${OFFER_MAX_COUNT} публикаций`);
      process.exit(ExitCode.error);
    }

    const content = JSON.stringify(generateOffers(countOffer, titles, categories, descriptions, comments), null, 2);

    try {
      await fs.writeFile(FILE_NAME, content);
      console.log(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  }
};

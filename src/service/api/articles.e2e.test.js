'use strict';

const express = require(`express`);
const request = require(`supertest`);

const articles = require(`./articles`);
const DataService = require(`../data-service/articlesService`);
const {HttpCode} = require(`../constants`);

const mockData = [
  {
    "id": "tRvlxQ",
    "title": "Рок — это протест",
    "announce": "Собрать камни бесконечности легко, если вы прирожденный герой. Золотое сечение — соотношение двух величин, гармоническая пропорция. Первая большая ёлка была установлена только в 1938 году. Ёлки — это не просто красивое дерево. Это прочная древесина.",
    "fulltext": "Первая большая ёлка была установлена только в 1938 году. Собрать камни бесконечности легко, если вы прирожденный герой. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Золотое сечение — соотношение двух величин, гармоническая пропорция. Ёлки — это не просто красивое дерево. Это прочная древесина.",
    "createdDate": "2022-05-21 19:18:00",
    "category": [
      "Музыка, Железо, IT, Кино"
    ],
    "comments": [
      {
        "id": "C3PSWe",
        "text": "Согласен с автором!"
      }
    ]
  },
  {
    "id": "rlf2M2",
    "title": "Самый лучший музыкальный альбом этого года",
    "announce": "Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.",
    "fulltext": "Золотое сечение — соотношение двух величин, гармоническая пропорция. Ёлки — это не просто красивое дерево. Это прочная древесина. Собрать камни бесконечности легко, если вы прирожденный герой. Первая большая ёлка была установлена только в 1938 году. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.",
    "createdDate": "2022-05-21 19:18:00",
    "category": [
      "Железо, Кино, Музыка, Программирование"
    ],
    "comments": [
      {
        "id": "drfAiE",
        "text": "Это где ж такие красоты?"
      },
      {
        "id": "LT0L1a",
        "text": "Плюсую, но слишком много буквы!"
      }
    ]
  },
  {
    "id": "sb0WtM",
    "title": "Борьба с прокрастинацией",
    "announce": "Ёлки — это не просто красивое дерево. Это прочная древесина. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Первая большая ёлка была установлена только в 1938 году.",
    "fulltext": "Собрать камни бесконечности легко, если вы прирожденный герой. Ёлки — это не просто красивое дерево. Это прочная древесина. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Первая большая ёлка была установлена только в 1938 году.",
    "createdDate": "2022-05-21 19:18:00",
    "category": [
      "Музыка, Железо, Программирование, IT"
    ],
    "comments": [
      {
        "id": "uTqQ-3",
        "text": "Мне не нравится ваш стиль. Ощущение, что вы меня поучаете."
      },
      {
        "id": "OfFt6q",
        "text": "Планируете записать видосик на эту тему?"
      }
    ]
  },
  {
    "id": "ISZt3w",
    "title": "Борьба с прокрастинацией",
    "announce": "Первая большая ёлка была установлена только в 1938 году. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Ёлки — это не просто красивое дерево. Это прочная древесина. Собрать камни бесконечности легко, если вы прирожденный герой.",
    "fulltext": "Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Собрать камни бесконечности легко, если вы прирожденный герой. Первая большая ёлка была установлена только в 1938 году. Ёлки — это не просто красивое дерево. Это прочная древесина.",
    "createdDate": "2022-05-21 19:18:00",
    "category": [
      "Программирование, Кино, IT, Железо"
    ],
    "comments": [
      {
        "id": "Ig__Rh",
        "text": "Давно не пользуюсь стационарными компьютерами. Ноутбуки победили."
      },
      {
        "id": "BV4-Kj",
        "text": "Хочу такую же футболку :-)"
      }
    ]
  },
  {
    "id": "YuhyqR",
    "title": "Рок — это протест",
    "announce": "Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.",
    "fulltext": "Ёлки — это не просто красивое дерево. Это прочная древесина. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Первая большая ёлка была установлена только в 1938 году. Золотое сечение — соотношение двух величин, гармоническая пропорция. Собрать камни бесконечности легко, если вы прирожденный герой.",
    "createdDate": "2022-05-21 19:18:00",
    "category": [
      "IT, Музыка, Железо, Кино"
    ],
    "comments": [
      {
        "id": "mBnsaM",
        "text": "Планируете записать видосик на эту тему?"
      }
    ]
  }
];

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  articles(app, new DataService(cloneData));
  return app;
};

describe(`API returns articles list`,
  () => {
    const app = createAPI();

    let response;

    beforeAll(async () => {
      response = await request(app)
        .get(`/articles`)
    });

    test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
    test(`Expect list of 5 articles`, () => expect(response.body.length).toBe(5));
    test(`First article id equals tRvlxQ`,
      () => expect(response.body[0].id).toBe(`tRvlxQ`)
    );
  });

describe(`API returns article with given ip`,
  () => {
    const app = createAPI();

    let response;

    beforeAll(async () => {
      response = await request(app)
        .get(`/articles/sb0WtM`)
    });

    test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
    test(`Article's title is 'Борьба с прокрастинацией'`, () => expect(response.body.title)
      .toBe(`Борьба с прокрастинацией`));
  });

describe(`API creates an offer if data is valid`,
  () => {
    const newArticle = {
      title: `На маленьком плоту`,
      announce: `Сквозь бури, дождь и грозы, взяв только сны, грёзы и детскую мечту, я тихо уплыву, лишь в дом проникнет нолночь`,
      fulltext: `Чтоб рифмами наполнить, мир, в котором я живу. Ну и пусть! Будет нелёгким мой путь, тянут ко дну боль и грусть прежних ошибок груз`,
      createdDate: `2022-05-21 19:20:00`,
      category: [
        "Программирование, Кино, IT, Железо"
      ],
    };

    const app = createAPI();

    let response;

    beforeAll(async () => {
      response = await request(app)
        .post(`/articles`)
        .send(newArticle)
    });

    test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));
    test(`Returns offer created'`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));
    test(`Articles count has changed'`, () => request(app)
      .get(`/articles`)
      .expect((res) => expect(res.body.length).toBe(6)));
  });

describe(`API refuses to create an article if data is invalid`,
  () => {
    const newArticle = {
      title: `На маленьком плоту`,
      announce: `Сквозь бури, дождь и грозы, взяв только сны, грёзы и детскую мечту, я тихо уплыву, лишь в дом проникнет нолночь`,
      fulltext: `Чтоб рифмами наполнить, мир, в котором я живу. Ну и пусть! Будет нелёгким мой путь, тянут ко дну боль и грусть прежних ошибок груз`,
      createdDate: `2022-05-21 19:20:00`,
      category: [
        "Программирование, Кино, IT, Железо"
      ],
    };

    const app = createAPI();

    test(`Without any required property response code is 400`,
      async () => {
        for (const key of Object.keys(newArticle)) {
          const badArticle = {...newArticle};
          delete badArticle[key];
          await request(app)
            .post(`/articles`)
            .send(badArticle)
            .expect(HttpCode.BAD_REQUEST);
        }
      });
  });

describe(`API changes existent offer`,
  () => {
    const newArticle = {
      title: `На маленьком плоту`,
      announce: `Сквозь бури, дождь и грозы, взяв только сны, грёзы и детскую мечту, я тихо уплыву, лишь в дом проникнет нолночь`,
      fulltext: `Чтоб рифмами наполнить, мир, в котором я живу. Ну и пусть! Будет нелёгким мой путь, тянут ко дну боль и грусть прежних ошибок груз`,
      createdDate: `2022-05-21 19:20:00`,
      category: [
        "Программирование, Кино, IT, Железо"
      ],
    };

    const app = createAPI();

    let respone;

    beforeAll(async () => {
      respone = await request(app)
        .put(`/articles/tRvlxQ`)
        .send(newArticle);
    });

    test(`Status code 200`, () => expect(respone.statusCode).toBe(HttpCode.OK));
    test(`Returns changed offer`, () => expect(respone.body).toEqual(expect.objectContaining(newArticle)));
    test(`Offer is really changed`, () => request(app)
      .get(`/articles/tRvlxQ`)
      .expect((res) => expect(res.body.title).toBe(`На маленьком плоту`)));
  });

describe(`API changes existent offer`,
  () => {
    const newArticle = {
      title: `На маленьком плоту`,
      announce: `Сквозь бури, дождь и грозы, взяв только сны, грёзы и детскую мечту, я тихо уплыву, лишь в дом проникнет нолночь`,
      fulltext: `Чтоб рифмами наполнить, мир, в котором я живу. Ну и пусть! Будет нелёгким мой путь, тянут ко дну боль и грусть прежних ошибок груз`,
      createdDate: `2022-05-21 19:20:00`,
      category: [
        "Программирование, Кино, IT, Железо"
      ],
    };

    const app = createAPI();

    let response;

    beforeAll(async () => {
      response = await request(app)
        .put(`/articles/tRvlxQ`)
        .send(newArticle);
    });

    test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
    test(`Returns changed offer`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));
    test(`Offer is really changed`, () => request(app)
      .get(`/articles/tRvlxQ`)
      .expect((res) => expect(res.body.title).toBe(`На маленьком плоту`)));
  });

test(`API returns status code 404 when trying to change non-existent offer`,
  () => {
    const validArticle = {
      title: `На маленьком плоту`,
      announce: `Сквозь бури, дождь и грозы, взяв только сны, грёзы и детскую мечту, я тихо уплыву, лишь в дом проникнет нолночь`,
      fulltext: `Чтоб рифмами наполнить, мир, в котором я живу. Ну и пусть! Будет нелёгким мой путь, тянут ко дну боль и грусть прежних ошибок груз`,
      createdDate: `2022-05-21 19:20:00`,
      category: [
        "Программирование, Кино, IT, Железо"
      ],
    };

    const app = createAPI();

    return request(app)
      .put(`/article/NOEXST`)
      .send(validArticle)
      .expect(HttpCode.NOT_FOUND);
  });

test(`API returns status code 400 when trying to change an offer with invalid data`,
  () => {
    const invalidArticle = {
      title: `На маленьком плоту`,
      announce: `Сквозь бури, дождь и грозы, взяв только сны, грёзы и детскую мечту, я тихо уплыву, лишь в дом проникнет нолночь`,
      fulltext: `Чтоб рифмами наполнить, мир, в котором я живу. Ну и пусть! Будет нелёгким мой путь, тянут ко дну боль и грусть прежних ошибок груз`,
      createdDate: `2022-05-21 19:20:00`,
    };

    const app = createAPI();

    return request(app)
      .put(`/articles/tRvlxQ`)
      .send(invalidArticle)
      .expect(HttpCode.BAD_REQUEST);
  });

describe(`API correctly deletes an offer`,
  () => {
    const app = createAPI();

    let response;

    beforeAll(async () => {
      response = await request(app)
        .delete(`/articles/tRvlxQ`);
    });

    test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
    test(`Returns deleted offer`, () => expect(response.body.id).toBe(`tRvlxQ`));
    test(`Offer count is 4 now`, () => {
      request(app)
        .get(`/articles`)
        .expect((res) => expect(res.body.length).toBe(4));
    });
  });

test(`API refuses to delete non-existent offer`,
  () => {
    const app = createAPI();

    return request(app)
      .delete(`/articles/NOTEXST`)
      .expect(HttpCode.NOT_FOUND)
  });

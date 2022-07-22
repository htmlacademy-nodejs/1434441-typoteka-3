'use strict';

const multer = require(`multer`);
const path = require(`path`);
const {nanoid} = require(`nanoid`);
const {ensureArray} = require(`../../../utils`);
const {Router} = require(`express`);

const articleRouter = new Router();
const api = require(`../api`).getAPI();

const UPLOAD_DIR = `../upload/img`;
const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  }
});

const upload = multer({storage});

articleRouter.get(`/add`, (req, res) => {
  res.render(`new-article`);
});
articleRouter.post(`/add`, upload.single(`upload`), async (req, res) => {
  const {body, file} = req;
  const articleData = {
    photo: file ? file.filename : ``,
    title: body.title,
    announce: body.announcement,
    fulltext: body.fulltext,
    createdDate: body.date,
    category: ensureArray(body.category)
  };

  try {
    await api.createArticle(articleData);
    res.redirect(`/my`); // перенаправить на страницу с моими записями
  } catch (err) {
    res.redirect(`back`); // перенаправить на страницу назад, т.е. на текущую
  }
});
articleRouter.get(`/category/:id`, (req, res) => {
  res.render(`articles-by-category`);
});
articleRouter.get(`/post/:id`, (req, res) => {
  res.render(`post-detail`);
});
articleRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const [article, categories] = await Promise.all([
    api.getArticle(id),
    api.getCategories()
  ]);
  res.render(`edit-article`, {article, categories});
});

module.exports = articleRouter;

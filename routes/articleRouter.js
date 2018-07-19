const articleRouter = require(`express`).Router();
const { getAllArticles, getArticleComments } = require('../controllers/articles')

articleRouter.route("/")
  .get(getAllArticles)

articleRouter.route("/:article_id/comments")
  .get(getArticleComments)


module.exports = articleRouter
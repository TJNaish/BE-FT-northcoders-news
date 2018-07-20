const articleRouter = require(`express`).Router();
const { getAllArticles, getArticleComments, getSingleArticle, articleVotes, postNewComment } = require('../controllers/articles')

articleRouter.route("/")
  .get(getAllArticles)

articleRouter.route("/:article_id")
  .get(getSingleArticle)
  .put(articleVotes)

articleRouter.route("/:article_id/comments")
  .get(getArticleComments)
  .post(postNewComment)

module.exports = articleRouter
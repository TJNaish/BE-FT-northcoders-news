const { Article, Comment } = require('../models');

const getAllArticles = (req, res, next) => {
  Article.find()
    .then(articles => {
      res.status(200).send({ articles })
    })
    .catch(next)
}

const getArticleComments = (req, res, next) => {
  Article.find({ _id: req.params.article_id })
    .then(foundArticle => {
      res.status(200).send({ foundArticle })
    })
    .catch(next)
}

module.exports = { getAllArticles, getArticleComments }